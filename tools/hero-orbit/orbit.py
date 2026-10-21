"""Hero animation: a Logic Sonata AI appliance that explodes into its parts while the camera spirals around it.

Builds the device in Blender (the `bpy` module, Python 3.11), animates explode / 360-degree spiral orbit /
reassemble as a seamless loop, renders with Cycles on a transparent background, and writes every part label's
screen position per frame (labels.json) so the HTML labels can follow the parts.

Usage: python orbit.py out=frames/ w=1280 h=720 samples=48 [frames=0-335] [step=1] [still=FRAME]
Units: millimetres in three.js terms (y up); V() converts to Blender (z up).
"""
import json
import math
import sys
from pathlib import Path

import bpy  # noqa: I001  (bpy must load before bmesh)
import bmesh
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Vector

ARGS = dict(a.split('=', 1) for a in sys.argv[1:] if '=' in a)
HERE = Path(__file__).resolve().parent
OUT = Path(ARGS.get('out', HERE / 'frames'))
W, H = int(ARGS.get('w', 1280)), int(ARGS.get('h', 720))
SAMPLES = int(ARGS.get('samples', 48))
EXPOSURE = float(ARGS.get('exp', -0.4))
TEX = HERE / 'tex'
S = 0.001
STORY = ARGS.get('scene') == 'story'   # scroll-story chapter 2: dark set, parts settle into one unit
FPS, END = 24, 336          # 14 s loop
OPEN_AT, OPEN_END = 48, 108  # explode
SHUT_AT, SHUT_END = 276, 324  # reassemble


def V(x, y, z):
    return Vector((x * S, -z * S, y * S))


bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
COL = scene.collection

# ---------------------------------------------------------------- materials


def nodes_of(mat):
    mat.use_nodes = True
    nt = mat.node_tree
    return nt, nt.nodes['Principled BSDF']


def principled(name, color, metal=0.0, rough=0.5, coat=0.0, emit=None, strength=0.0, spec=0.5):
    mat = bpy.data.materials.new(name)
    _, p = nodes_of(mat)
    p.inputs['Base Color'].default_value = (*color, 1)
    p.inputs['Metallic'].default_value = metal
    p.inputs['Roughness'].default_value = rough
    p.inputs['Coat Weight'].default_value = coat
    p.inputs['Specular IOR Level'].default_value = spec
    if emit:
        p.inputs['Emission Color'].default_value = (*emit, 1)
        p.inputs['Emission Strength'].default_value = strength
    return mat


def image(name, srgb=True):
    img = bpy.data.images.load(str(TEX / name))
    if not srgb:
        img.colorspace_settings.name = 'Non-Color'
    return img


def brushed_metal(name, color, rough=0.26, streak=420.0, vertical=False):
    """Brushed streaks run across the top by default; vertical=True brushes side walls horizontally."""
    mat = principled(name, color, metal=1.0, rough=rough)
    nt, p = nodes_of(mat)
    tc = nt.nodes.new('ShaderNodeTexCoord')
    mp = nt.nodes.new('ShaderNodeMapping')
    mp.inputs['Scale'].default_value = (1.0, 1.0, streak) if vertical else (1.0, streak, 1.0)
    nz = nt.nodes.new('ShaderNodeTexNoise')
    nz.inputs['Scale'].default_value = 6.0
    nz.inputs['Detail'].default_value = 8.0
    ramp = nt.nodes.new('ShaderNodeMapRange')
    ramp.inputs['To Min'].default_value = rough - 0.07
    ramp.inputs['To Max'].default_value = rough + 0.09
    bump = nt.nodes.new('ShaderNodeBump')
    bump.inputs['Strength'].default_value = 0.035
    nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
    nt.links.new(mp.outputs['Vector'], nz.inputs['Vector'])
    nt.links.new(nz.outputs['Fac'], ramp.inputs['Value'])
    nt.links.new(ramp.outputs['Result'], p.inputs['Roughness'])
    nt.links.new(nz.outputs['Fac'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], p.inputs['Normal'])
    return mat


def textured(name, color_img, rough=0.45, metal_img=None, alpha_img=None, metal=0.0, base=None):
    mat = principled(name, base or (0.5, 0.5, 0.5), metal=metal, rough=rough)
    nt, p = nodes_of(mat)
    if color_img:
        t = nt.nodes.new('ShaderNodeTexImage')
        t.image = image(color_img)
        nt.links.new(t.outputs['Color'], p.inputs['Base Color'])
    if metal_img:
        m = nt.nodes.new('ShaderNodeTexImage')
        m.image = image(metal_img, srgb=False)
        nt.links.new(m.outputs['Color'], p.inputs['Metallic'])
    if alpha_img:
        a = nt.nodes.new('ShaderNodeTexImage')
        a.image = image(alpha_img, srgb=False)
        nt.links.new(a.outputs['Color'], p.inputs['Alpha'])
    return mat


M = {
    'shell': brushed_metal('shell', (0.5, 0.515, 0.54), rough=0.3),
    'shell_dark': brushed_metal('shell_dark', (0.12, 0.125, 0.135), rough=0.3),
    'shell_side': brushed_metal('shell_side', (0.5, 0.515, 0.54), rough=0.3, vertical=True),
    'shell_dark_side': brushed_metal('shell_dark_side', (0.12, 0.125, 0.135), rough=0.3, vertical=True),
    'grille': textured('grille', None, rough=0.35, alpha_img='grille.png', metal=1.0, base=(0.06, 0.065, 0.07)),
    'grille_back': principled('grille_back', (0.01, 0.01, 0.012), rough=0.6),
    'light': principled('light', (0.1, 0.5, 0.48), rough=0.3, emit=(0.0, 0.78, 0.9), strength=3.2),
    'fan': principled('fan', (0.02, 0.02, 0.022), rough=0.42, spec=0.4),
    'fan_frame': principled('fan_frame', (0.035, 0.035, 0.04), rough=0.5),
    'pcb': textured('pcb', 'pcb_color.png', rough=0.38, metal_img='pcb_metal.png'),
    'substrate': principled('substrate', (0.05, 0.11, 0.07), rough=0.45),
    'die': principled('die', (0.012, 0.012, 0.016), metal=0.3, rough=0.06, coat=1.0),
    'soc_lid': textured('soc_lid', 'soc_print.png', rough=0.3),
    'mem': textured('mem', 'mem_print.png', rough=0.55),
    'copper': principled('copper', (0.93, 0.55, 0.36), metal=1.0, rough=0.2),
    'copper_satin': brushed_metal('copper_satin', (0.9, 0.52, 0.33), rough=0.3, streak=260.0),
    'fin': principled('fin', (0.95, 0.6, 0.42), metal=1.0, rough=0.25),
    'rubber': principled('rubber', (0.012, 0.012, 0.013), rough=0.85, spec=0.3),
    'port': principled('port', (0.01, 0.01, 0.012), rough=0.45),
    'steel': principled('steel', (0.62, 0.63, 0.65), metal=1.0, rough=0.24),
    'gold': principled('gold', (1.0, 0.77, 0.36), metal=1.0, rough=0.2),
    'ssd': principled('ssd', (0.015, 0.02, 0.035), rough=0.4),
    'inductor': principled('inductor', (0.08, 0.08, 0.085), metal=0.4, rough=0.5),
    'cap': brushed_metal('cap', (0.7, 0.71, 0.73), rough=0.25, streak=60.0),
    'logo': principled('logo', (0.85, 0.86, 0.88), metal=1.0, rough=0.08),
    'red': principled('red', (0.3, 0.01, 0.005), rough=0.3, emit=(1.0, 0.07, 0.04), strength=6.0),
}
nt, p = nodes_of(M['logo'])
lt = nt.nodes.new('ShaderNodeTexImage')
lt.image = image('logo_mask.png', srgb=False)
nt.links.new(lt.outputs['Color'], p.inputs['Alpha'])

# ---------------------------------------------------------------- geometry helpers

CURRENT = None   # the part (Empty) new objects are parented to


def link(name, bm, mat, loc, rot=(0, 0, 0), smooth=False):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    if smooth:
        for poly in me.polygons:
            poly.use_smooth = True
    ob = bpy.data.objects.new(name, me)
    COL.objects.link(ob)
    ob.location = loc
    ob.rotation_euler = rot
    me.materials.append(mat)
    if CURRENT:
        ob.parent = CURRENT
    return ob


def bevel(ob, width, seg=3):
    m = ob.modifiers.new('bevel', 'BEVEL')
    m.width = width * S
    m.segments = seg
    m.limit_method = 'ANGLE'
    m.harden_normals = True
    for poly in ob.data.polygons:
        poly.use_smooth = True
    return ob


def box(name, w, h, d, pos, mat, r=0.0, rot=(0, 0, 0), seg=3):
    """Box sized in three.js terms (w along x, h along y, d along z) centred at pos."""
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=(w * S, d * S, h * S), verts=bm.verts)
    ob = link(name, bm, mat, V(*pos), rot)
    if r:
        bevel(ob, min(r, w / 2 - 0.01, h / 2 - 0.01, d / 2 - 0.01), seg)
    return ob


def plane(name, w, d, pos, mat, rot=(0, 0, 0)):
    bm = bmesh.new()
    bm.loops.layers.uv.new()
    bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5, calc_uvs=True)
    bmesh.ops.scale(bm, vec=(w * S, d * S, 1), verts=bm.verts)
    return link(name, bm, mat, V(*pos), rot)


def cyl(name, radius, height, pos, mat, axis='y', segs=40, r=0.0):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=segs, radius1=radius * S, radius2=radius * S, depth=height * S)
    rot = {'y': (0, 0, 0), 'x': (0, math.pi / 2, 0), 'z': (math.pi / 2, 0, 0)}[axis]
    ob = link(name, bm, mat, V(*pos), rot, smooth=True)
    if r:
        bevel(ob, r, 2)
    return ob


PARTS = {}


def part(name, lift, anchor):
    """Start a part: an Empty that carries every object built until the next part() call.
    lift = how far it rises in the exploded view; anchor = where its label points (assembled coords)."""
    global CURRENT
    e = bpy.data.objects.new(name, None)
    COL.objects.link(e)
    CURRENT = e
    PARTS[name] = {'empty': e, 'lift': lift, 'anchor': anchor}


# ---------------------------------------------------------------- the appliance (assembled coordinates)
# Footprint 150 x 150 mm, 52 mm tall. Labels in the page follow PART_ORDER.

# 6. Base chassis: dark tray with rear ports and feet
part('base', -62, (75, 6, 60))
box('base_floor', 150, 3, 150, (0, 1.5, 0), M['shell_dark'], r=2.5)
for x, z, w, d in [(-73.5, 0, 3, 150), (73.5, 0, 3, 150), (0, 73.5, 150, 3), (0, -73.5, 150, 3)]:
    box('base_wall', w, 12, d, (x, 7, z), M['shell_dark_side'], r=1.0)
for i, (w, h) in enumerate([(16, 13), (16, 13), (9, 4), (9, 4), (9, 4), (14, 6), (12, 7)]):
    box('port', w * 0.6, h * 0.6, 4, (-52 + i * 15, 7, -75), M['port'], r=0.6)
box('power_led', 3, 1.2, 1, (60, 9, 75.2), M['red'])
for x, z in [(-58, -58), (58, -58), (-58, 58), (58, 58)]:
    cyl('foot', 10, 3, (x, -1.5, z), M['rubber'], r=0.8)

# 5. Mainboard: big PCB with NVMe, power stages and capacitors
part('mainboard', -16, (70, 15, 55))
box('mb', 142, 1.8, 142, (0, 14, 0), M['pcb'])
box('ssd', 22, 2.2, 70, (-48, 16, 10), M['ssd'], r=0.5)
for i in range(4):
    box('nand', 16, 1.2, 12, (-48, 17.6, -12 + i * 15), M['port'], r=0.3)
for i in range(6):
    box('inductor', 9, 6, 9, (30 + (i % 3) * 13, 18, -50 + (i // 3) * 13), M['inductor'], r=0.8)
for i in range(5):
    cyl('cap', 3.2, 8, (64, 19, -40 + i * 9), M['cap'])
for i in range(8):
    box('conn', 6, 3, 4, (-50 + i * 10, 16.5, -68), M['steel'], r=0.4)

# 4. AI superchip module on its carrier
part('module', 28, (55, 22, 40))
box('module_pcb', 104, 1.6, 98, (8, 19, 6), M['pcb'])
box('substrate', 46, 1.6, 46, (8, 20.6, 4), M['substrate'], r=0.6)
box('soc', 36, 1.4, 36, (8, 22, 4), M['soc_lid'], r=0.4)
box('die', 26, 0.4, 20, (8, 22.9, 4), M['die'], r=0.2)
for i in range(8):
    x = 8 + (-34 if i < 4 else 34)
    box('mem', 14, 1.4, 11, (x, 20.6, -17 + (i % 4) * 14), M['mem'], r=0.3)

# 3. Copper heatsink: vapor chamber, fin stack and heat pipes
part('heatsink', 72, (62, 36, 45))
box('vapor', 118, 3, 104, (8, 25, 6), M['copper_satin'], r=1.2)
for i in range(44):
    box('fin', 0.7, 16, 96, (-44 + i * 2.4, 35, 6), M['fin'])
for z in (-24, -8, 8, 24):
    cyl('pipe', 3, 112, (8, 44.5, z + 6), M['copper'], axis='x')

# 2. Fan tray: three blowers on a frame
part('fans', 118, (60, 48, 50))
box('tray', 140, 2.5, 140, (0, 47, 0), M['fan_frame'], r=1.0)


def fan(cx, cz):
    cyl('ring', 22, 6, (cx, 50, cz), M['fan_frame'], r=0.8)
    cyl('hub', 7, 7, (cx, 51, cz), M['fan'], r=0.8)
    for k in range(9):
        bm = bmesh.new()
        a0 = k / 9 * math.tau
        grid = []
        for i in range(5):
            rr = 7.5 + 13.5 * i / 4
            row = []
            for j in range(7):
                u = j / 6
                th = a0 + math.radians(28) * (u - 0.5) + 0.35 * i / 4
                row.append(bm.verts.new(V(cx + rr * math.cos(th), 50.5 + (u - 0.5) * 4.2, cz + rr * math.sin(th))))
            grid.append(row)
        for i in range(4):
            for j in range(6):
                bm.faces.new((grid[i][j], grid[i + 1][j], grid[i + 1][j + 1], grid[i][j + 1]))
        ob = link('blade', bm, M['fan'], (0, 0, 0), smooth=True)
        ob.modifiers.new('thick', 'SOLIDIFY').thickness = 0.8 * S


for cx, cz in [(-44, 20), (0, -22), (44, 20)]:
    fan(cx, cz)

# 1. Aluminium shell: top and four walls, perforated front, LS mark and a cyan light bar
part('shell', 165, (75, 60, 75))
box('top', 150, 3, 150, (0, 60, 0), M['shell'], r=2.5)
box('wall_back', 150, 46, 3, (0, 37, -73.5), M['shell_side'], r=1.0)
box('wall_l', 3, 46, 150, (-73.5, 37, 0), M['shell_side'], r=1.0)
box('wall_r', 3, 46, 150, (73.5, 37, 0), M['shell_side'], r=1.0)
gp = plane('front_grille', 146, 40, (0, 38, 74.6), M['grille'], (math.pi / 2, 0, 0))
gp.modifiers.new('thick', 'SOLIDIFY').thickness = 1.4 * S
plane('front_back', 146, 40, (0, 38, 72.5), M['grille_back'], (math.pi / 2, 0, 0))
box('front_frame_top', 150, 4, 3, (0, 59, 74), M['shell_side'], r=0.8)
box('front_frame_bot', 150, 4, 3, (0, 16, 74), M['shell_side'], r=0.8)
box('light_bar', 120, 2.2, 1, (0, 16, 75.6), M['light'])
logo = plane('logo', 44, 18, (0, 61.6, 22), M['logo'])
CURRENT = None

PART_ORDER = ['shell', 'fans', 'heatsink', 'module', 'mainboard', 'base']

# ---------------------------------------------------------------- animation


def smooth(t):
    t = max(0.0, min(1.0, t))
    return t * t * t * (t * (t * 6 - 15) + 10)


def openness(f):
    if f < OPEN_AT or f >= SHUT_END:
        return 0.0
    if f < OPEN_END:
        return smooth((f - OPEN_AT) / (OPEN_END - OPEN_AT))
    if f < SHUT_AT:
        return 1.0
    return 1.0 - smooth((f - SHUT_AT) / (SHUT_END - SHUT_AT))


def keyed(f, keys):
    """Smoothly interpolate (frame, value) keys; the curve eases in and out at every key."""
    for (f0, v0), (f1, v1) in zip(keys, keys[1:]):
        if f0 <= f <= f1:
            return v0 + (v1 - v0) * smooth((f - f0) / (f1 - f0))
    return keys[-1][1]


ELEV = [(0, 32), (OPEN_END, 30), (160, 6), (222, -26), (SHUT_AT, 6), (SHUT_END, 26), (END, 32)]
DIST = [(0, 560), (OPEN_AT, 560), (OPEN_END, 960), (SHUT_AT, 960), (SHUT_END, 560), (END, 560)]


def camera_at(f):
    az = math.tau * f / END + math.radians(35)      # one full turn per loop, constant speed
    el = math.radians(keyed(f, ELEV))
    d = keyed(f, DIST)
    o = openness(f)
    cy = 30 + o * 52                                  # look at the middle of the stack
    tgt = (0, cy, 0)
    pos = (tgt[0] + d * math.cos(el) * math.sin(az), cy + d * math.sin(el), tgt[2] + d * math.cos(el) * math.cos(az))
    return V(*pos), V(*tgt)


cam_data = bpy.data.cameras.new('cam')
cam_data.lens = 50
cam = bpy.data.objects.new('cam', cam_data)
COL.objects.link(cam)
scene.camera = cam
target = bpy.data.objects.new('target', None)
COL.objects.link(target)
tc = cam.constraints.new('TRACK_TO')
tc.target = target
tc.track_axis = 'TRACK_NEGATIVE_Z'
tc.up_axis = 'UP_Y'


def pose(f):
    o = openness(f)
    for info in PARTS.values():
        info['empty'].location = V(0, info['lift'] * o, 0)
    loc, tgt = camera_at(f)
    cam.location = loc
    target.location = tgt


# ---------------------------------------------------------------- studio (soft, light grey)

world = bpy.data.worlds.new('world')
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes['Background']
bg.inputs['Color'].default_value = (0.62, 0.64, 0.66, 1)
bg.inputs['Strength'].default_value = 0.55


def area(name, loc3, size, power, color=(1, 1, 1), size_y=None):
    li = bpy.data.lights.new(name, 'AREA')
    li.shape = 'RECTANGLE'
    li.size = size * S
    li.size_y = (size_y or size) * S
    li.energy = power
    li.color = color
    ob = bpy.data.objects.new(name, li)
    COL.objects.link(ob)
    ob.location = V(*loc3)
    d = V(0, 60, 0) - ob.location
    ob.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
    return ob


if not STORY:
    area('top', (0, 900, 100), 900, 150)
    area('key', (-650, 760, 520), 1000, 110)
    area('fill', (700, 560, 400), 900, 45)
    area('rim', (300, 760, -700), 600, 90)
    area('under', (0, -700, 200), 700, 45)

scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = SAMPLES
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 6
scene.render.film_transparent = not STORY
scene.render.resolution_x = W
scene.render.resolution_y = H
scene.render.fps = FPS
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
scene.view_settings.view_transform = 'AgX'
scene.view_settings.look = 'AgX - Medium High Contrast'
scene.view_settings.exposure = EXPOSURE


# ---------------------------------------------------------------- scroll-story chapter (scene=story)
# 48 frames scrubbed by scroll: the parts start apart above the base and settle into one unit on a dark, glossy
# floor lit teal from the left and red from behind, matching the neighbouring chapters.
if STORY:
    END = 48
    for info in PARTS.values():
        info['lift'] = (info['lift'] + 62) * 0.8          # base rests on the floor; the rest stack above it

    def openness(f):
        return 1.0 - smooth(f / 40)

    def camera_at(f):
        t = smooth(f / (END - 1))
        az = math.radians(18 + 34 * t)
        el = math.radians(27 - 9 * t)
        d = 1080 - 420 * t
        cy = 30 + openness(f) * 85
        pos = (d * math.cos(el) * math.sin(az), cy + d * math.sin(el), d * math.cos(el) * math.cos(az))
        return V(*pos), V(0, cy, 0)

    bg.inputs['Color'].default_value = (0.004, 0.006, 0.007, 1)
    bg.inputs['Strength'].default_value = 1.0
    floor_mat = principled('floor', (0.012, 0.015, 0.017), rough=0.55)
    CURRENT = None
    plane('floor', 6000, 6000, (0, -3, 0), floor_mat)
    lights = [area('teal', (-520, 420, 220), 260, 24, color=(0.12, 0.95, 0.85)),
              area('red', (150, 140, -230), 220, 4, color=(1.0, 0.08, 0.05)),
              area('key', (0, 900, 300), 500, 7),
              area('rim', (300, 500, -700), 400, 10)]
    for li in lights:
        li.visible_camera = False                      # light the set without showing the panels
    scene.view_settings.exposure = -0.3

# ---------------------------------------------------------------- label tracks + render


def anchor_world(info, f):
    x, y, z = info['anchor']
    return V(x, y + info['lift'] * openness(f), z)


def part_corners(name):
    """The eight corners of a part's assembled bounding box, in world space."""
    e = PARTS[name]['empty']
    pts = [c.matrix_world @ Vector(k) for c in e.children if c.type == 'MESH' for k in c.bound_box]
    lo = Vector([min(p[i] for p in pts) for i in range(3)])
    hi = Vector([max(p[i] for p in pts) for i in range(3)])
    return [Vector((x, y, z)) for x in (lo.x, hi.x) for y in (lo.y, hi.y) for z in (lo.z, hi.z)]


def track(f):
    """Per part: the right-hand edge of its silhouette at mid height, so a label line always points outwards."""
    pose(f)
    bpy.context.view_layer.update()
    pts = []
    for name in PART_ORDER:
        up = Vector((0, 0, PARTS[name]['lift'] * openness(f) * S))
        cs = [world_to_camera_view(scene, cam, c + up) for c in CORNERS[name]]
        pts.append([round(max(c.x for c in cs), 4), round(1 - sum(c.y for c in cs) / 8, 4)])
    return pts


pose(0)
bpy.context.view_layer.update()
CORNERS = {name: part_corners(name) for name in PART_ORDER}

OUT.mkdir(parents=True, exist_ok=True)
json.dump({'fps': FPS, 'frames': END, 'open': [OPEN_END, SHUT_AT], 'parts': PART_ORDER,
           'track': [track(f) for f in range(END)]}, open(OUT / 'labels.json', 'w'))

if 'labels_only' in ARGS:
    frames = []
elif 'still' in ARGS:
    frames = [int(ARGS['still'])]
else:
    a, b = (int(v) for v in ARGS.get('frames', f'0-{END - 1}').split('-'))
    frames = range(a, b + 1, int(ARGS.get('step', 1)))
for f in frames:
    pose(f)
    scene.render.filepath = str(OUT / f'f{f:04d}.png')
    bpy.ops.render.render(write_still=True)
