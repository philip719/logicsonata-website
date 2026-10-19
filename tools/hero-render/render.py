"""Photoreal hero render of the Logic Sonata private AI appliance, exploded into its parts.

Builds the scene in Blender (the `bpy` module) and path-traces it with Cycles. Layout, part offsets and
label anchors follow tools/hero-video/scene.js so the labels match the earlier animation.

Usage: python render.py out=render.png w=1200 h=900 samples=128 [tex=tex] [labels=labels.json]
Coordinates below are the three.js ones (y up, millimetre-like units); V() converts them to Blender.
"""
import json
import math
import random
import sys
from pathlib import Path

import bpy  # noqa: I001  (bpy must load before bmesh)
import bmesh
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Vector

ARGS = dict(a.split('=', 1) for a in sys.argv[1:] if '=' in a)
HERE = Path(__file__).resolve().parent
OUT = ARGS.get('out', 'render.png')
W, H = int(ARGS.get('w', 1200)), int(ARGS.get('h', 900))
SAMPLES = int(ARGS.get('samples', 128))
TEX = Path(ARGS.get('tex', HERE / 'tex'))
LABELS_OUT = ARGS.get('labels', 'labels.json')
S = 0.001  # one scene unit = 1 mm


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


def brushed_metal(name, color, rough=0.26, streak=420.0):
    """Anodised, brushed aluminium: fine directional streaks in roughness plus a whisper of bump."""
    mat = principled(name, color, metal=1.0, rough=rough)
    nt, p = nodes_of(mat)
    tc = nt.nodes.new('ShaderNodeTexCoord')
    mp = nt.nodes.new('ShaderNodeMapping')
    mp.inputs['Scale'].default_value = (1.0, streak, 1.0)
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


def textured(name, color_img, rough=0.45, metal_img=None, alpha_img=None, metal=0.0, base=None, spec=0.5):
    mat = principled(name, base or (0.5, 0.5, 0.5), metal=metal, rough=rough, spec=spec)
    nt, p = nodes_of(mat)
    if color_img:
        t = nt.nodes.new('ShaderNodeTexImage')
        t.image = image(color_img)
        t.interpolation = 'Cubic'
        nt.links.new(t.outputs['Color'], p.inputs['Base Color'])
    if metal_img:
        m = nt.nodes.new('ShaderNodeTexImage')
        m.image = image(metal_img, srgb=False)
        nt.links.new(m.outputs['Color'], p.inputs['Metallic'])
        inv = nt.nodes.new('ShaderNodeMapRange')
        inv.inputs['To Min'].default_value = rough
        inv.inputs['To Max'].default_value = 0.22
        nt.links.new(m.outputs['Color'], inv.inputs['Value'])
        nt.links.new(inv.outputs['Result'], p.inputs['Roughness'])
    if alpha_img:
        a = nt.nodes.new('ShaderNodeTexImage')
        a.image = image(alpha_img, srgb=False)
        a.interpolation = 'Cubic'
        nt.links.new(a.outputs['Color'], p.inputs['Alpha'])
    return mat


M = {
    'shell': brushed_metal('shell', (0.30, 0.315, 0.34), rough=0.27),
    'shell_in': principled('shell_in', (0.16, 0.17, 0.18), metal=1.0, rough=0.5),
    'grille': textured('grille', None, rough=0.36, alpha_img='grille.png', metal=1.0, base=(0.07, 0.075, 0.085)),
    'accent': principled('accent', (0.25, 0.01, 0.005), rough=0.3, emit=(1.0, 0.06, 0.03), strength=9.0),
    'fan': principled('fan', (0.018, 0.018, 0.02), rough=0.42, spec=0.4),
    'fan_frame': principled('fan_frame', (0.025, 0.025, 0.028), rough=0.5),
    'pcb': textured('pcb', 'pcb_color.png', rough=0.38, metal_img='pcb_metal.png'),
    'pcb_edge': principled('pcb_edge', (0.05, 0.09, 0.06), rough=0.6),
    'substrate': principled('substrate', (0.05, 0.11, 0.07), rough=0.45),
    'die': principled('die', (0.012, 0.012, 0.016), metal=0.3, rough=0.06, coat=1.0),
    'soc_lid': textured('soc_lid', 'soc_print.png', rough=0.3, base=(0.02, 0.02, 0.02)),
    'epoxy': textured('epoxy', 'mem_print.png', rough=0.55),
    'nic': textured('nic', 'nic_print.png', rough=0.55),
    'copper': principled('copper', (0.93, 0.55, 0.36), metal=1.0, rough=0.2),
    'copper_satin': brushed_metal('copper_satin', (0.9, 0.52, 0.33), rough=0.3, streak=260.0),
    'fin': principled('fin', (0.86, 0.87, 0.89), metal=1.0, rough=0.22),
    'rubber': principled('rubber', (0.012, 0.012, 0.013), rough=0.85, spec=0.3),
    'port': principled('port', (0.01, 0.01, 0.012), rough=0.45),
    'steel': principled('steel', (0.62, 0.63, 0.65), metal=1.0, rough=0.24),
    'gold': principled('gold', (1.0, 0.77, 0.36), metal=1.0, rough=0.2),
    'ssd_pcb': principled('ssd_pcb', (0.015, 0.02, 0.035), rough=0.4),
    'ssd_label': textured('ssd_label', 'ssd_label.png', rough=0.5),
    'ceramic': principled('ceramic', (0.45, 0.33, 0.2), rough=0.4),
    'inductor': principled('inductor', (0.08, 0.08, 0.085), metal=0.4, rough=0.5),
    'cap_top': brushed_metal('cap_top', (0.7, 0.71, 0.73), rough=0.25, streak=60.0),
    'logo': principled('logo', (0.62, 0.64, 0.68), metal=1.0, rough=0.1),
}
mat_logo = M['logo']
nt, p = nodes_of(mat_logo)
lt = nt.nodes.new('ShaderNodeTexImage')
lt.image = image('logo_mask.png', srgb=False)
nt.links.new(lt.outputs['Color'], p.inputs['Alpha'])

# ---------------------------------------------------------------- geometry helpers


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
    """Axis-aligned box sized in three.js terms (w along x, h along y, d along z) centred at pos."""
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=(w * S, d * S, h * S), verts=bm.verts)
    ob = link(name, bm, mat, V(*pos), rot)
    if r:
        bevel(ob, min(r, w / 2 - 0.01, h / 2 - 0.01, d / 2 - 0.01), seg)
    return ob


def plane(name, w, d, pos, mat, rot=(0, 0, 0)):
    """Flat textured rectangle (UV 0..1), horizontal unless rotated."""
    bm = bmesh.new()
    uv = bm.loops.layers.uv.new()
    bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5, calc_uvs=True)
    bmesh.ops.scale(bm, vec=(w * S, d * S, 1), verts=bm.verts)
    return link(name, bm, mat, V(*pos), rot)


def cyl(name, radius, height, pos, mat, axis='y', segs=48, r=0.0):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=segs, radius1=radius * S, radius2=radius * S, depth=height * S)
    rot = {'y': (0, 0, 0), 'x': (0, math.pi / 2, 0), 'z': (math.pi / 2, 0, 0)}[axis]
    ob = link(name, bm, mat, V(*pos), rot, smooth=True)
    if r:
        bevel(ob, r, 2)
    return ob


PARTS = {}


def part(name, offset):
    PARTS[name] = Vector(offset)
    return lambda x, y, z: (x + offset[0], y + offset[1], z + offset[2])


rng = random.Random(21)

# ---------------------------------------------------------------- the appliance (exploded)

# Base plate with rubber feet
P = part('base', [0, -78, 0])
box('base', 150, 4, 150, P(0, 2, 0), M['shell'], r=2.2)
for x, z in [(-55, -55), (55, -55), (-55, 55), (55, 55)]:
    cyl('foot', 9, 2.4, P(x, -1.2, z), M['rubber'], r=0.6)

# Side walls
P = part('left', [-72, 0, 0])
box('wall_l', 4, 42, 150, P(-73, 25, 0), M['shell'], r=1.4)
P = part('right', [72, 0, 0])
box('wall_r', 4, 42, 150, P(73, 25, 0), M['shell'], r=1.4)


def grille_panel(name, P, z, facing):
    """Perforated panel: alpha-mapped slots in a thin metal sheet, plus a rolled frame."""
    rot = (math.pi / 2, 0, 0) if facing > 0 else (math.pi / 2, 0, math.pi)
    pl = plane(name, 142, 42, P(0, 25, z), M['grille'], rot)
    sol = pl.modifiers.new('thick', 'SOLIDIFY')
    sol.thickness = 1.6 * S
    for (w, h, x, y) in [(142, 2.4, 0, 46.2), (142, 2.4, 0, 3.8), (2.4, 42, -70.8, 25), (2.4, 42, 70.8, 25)]:
        box(name + '_frame', w, h, 3.2, P(x, y, z), M['shell'], r=0.8)


P = part('front', [0, 0, 82])
grille_panel('front', P, 73, 1)
# Diagonal LED accent (the angled cut in the LS mark)
sx = (1400 / 2048 - 0.5) * 142
box('accent', 1.6, 44, 1.0, P(sx, 25, 74.8), M['accent'], rot=(0, math.pi / 6, 0))

P = part('rear', [0, 0, -82])
grille_panel('rear', P, -73, -1)
for x, w, h in [(-52, 9, 7), (-38, 9, 7), (-24, 9, 7), (-6, 14, 11), (16, 16, 12), (38, 16, 12), (58, 12, 8)]:
    box('port', w, h, 4, P(x, 20, -74.5), M['port'], r=0.8)
    box('port_shell', w + 1.2, h + 1.2, 2.5, P(x, 20, -73.6), M['steel'], r=0.8)

# Top cover with the etched mark
P = part('top', [0, 146, 0])
box('top', 150, 4, 150, P(0, 48, 0), M['shell'], r=2.2)
box('top_in', 140, 0.6, 140, P(0, 45.7, 0), M['shell_in'])
lw = 30
lh = lw * 120 / 206
plane('logo', lw, lh, P(42, 50.06, 46), mat_logo)

# Screws floating between lid and body
P = part('screws', [0, 104, 0])
for x, z in [(-66, -66), (66, -66), (-66, 66), (66, 66)]:
    cyl('screw_head', 3.2, 1.6, P(x, 46, z), M['steel'], r=0.5)
    cyl('screw_shaft', 1.4, 8, P(x, 41, z), M['steel'])
    box('screw_slot', 4.4, 0.8, 0.9, P(x, 46.8, z), M['port'], rot=(0, 0, 0.6))
    box('screw_slot', 0.9, 0.8, 4.4, P(x, 46.8, z), M['port'], rot=(0, 0, 0.6))

# Mainboard
P = part('board', [0, 8, 0])
box('board', 138, 1.6, 138, P(0, 10, 0), M['pcb_edge'], r=0.6)
plane('board_top', 138, 138, P(0, 10.82, 0), M['pcb'])
# AI superchip: substrate, stiffener ring, exposed die, decoupling caps
box('substrate', 46, 1.4, 46, P(0, 11.5, 0), M['substrate'], r=0.4)
for (w, d, x, z) in [(42, 3, 0, 19.5), (42, 3, 0, -19.5), (3, 36, 19.5, 0), (3, 36, -19.5, 0)]:
    box('stiffener', w, 1.2, d, P(x, 12.6, z), M['steel'], r=0.4)
box('die', 26, 1.0, 26, P(0, 12.7, 0), M['die'], r=0.3)
for i in range(24):
    a = i / 24 * math.tau
    box('cap', 1.6, 0.9, 0.9, P(math.cos(a) * 16.5, 12.7, math.sin(a) * 16.5), M['ceramic'], rot=(0, 0, -a))
# Unified memory packages
for x in (-35, 35):
    for z in (-24, -8, 8, 24):
        box('mem', 12, 1.4, 14, P(x, 11.5, z), M['epoxy'], r=0.3)
# Network controller with a finned heatsink
box('nic', 22, 2, 22, P(-42, 11.8, 46), M['nic'], r=0.4)
box('nic_sink', 18, 1.2, 18, P(-42, 13.4, 46), M['steel'], r=0.4)
for k in range(6):
    box('nic_fin', 1.0, 5, 18, P(-49.5 + k * 3, 16.4, 46), M['steel'])
# Power stage: inductors and electrolytic capacitors
for k in range(6):
    box('inductor', 7, 5, 7, P(-56 + k * 9, 13, -56), M['inductor'], r=0.6)
for k in range(5):
    cyl('ecap', 3.2, 7, P(-54 + k * 9, 14.3, -45), M['inductor'], r=0.4)
    cyl('ecap_top', 3.1, 0.3, P(-54 + k * 9, 17.9, -45), M['cap_top'])
# M.2 socket
box('m2_socket', 22, 3, 4, P(50, 12.3, 15), M['port'], r=0.4)
# Scattered passives
for _ in range(110):
    x, z = (rng.random() - 0.5) * 128, (rng.random() - 0.5) * 128
    if abs(x) < 44 and abs(z) < 36:
        continue
    if -58 < x < -26 and 30 < z < 62:
        continue
    if z < -38 or (40 < x and 12 < z):
        continue
    s = 1.2 + rng.random() * 2.2
    mat = M['ceramic'] if rng.random() < 0.6 else M['inductor']
    box('smd', s, 0.8 + rng.random() * 0.8, s * 0.55, P(x, 11.2, z), mat, rot=(0, 0, rng.choice([0, math.pi / 2])))

# NVMe SSD (slid out sideways)
P = part('ssd', [58, 14, 0])
box('ssd_pcb', 22, 1.0, 44, P(50, 11.6, 38), M['ssd_pcb'], r=0.3)
plane('ssd_label', 30, 18, P(50, 12.13, 36), M['ssd_label'], rot=(0, 0, math.pi / 2))
for k in range(7):
    box('ssd_pin', 1.4, 0.2, 3, P(41.6 + k * 2.8, 12.15, 59), M['gold'])

# Vapor chamber
P = part('chamber', [0, 52, 0])
box('chamber', 118, 3, 118, P(0, 16.5, 0), M['copper_satin'], r=1.2)

# Fin stack with copper heat pipes
P = part('fins', [0, 84, 0])
for i in range(34):
    box('fin', 0.6, 22, 110, P(-56 + i * 3.4, 29.5, 0), M['fin'])
for z in (-33, -11, 11, 33):
    cyl('heatpipe', 3.0, 124, P(0, 24.5, z), M['copper'], axis='x')

# Cooling fan: frame ring, struts, hub and swept blades
P = part('fan', [0, 100, 0])
bm = bmesh.new()
bmesh.ops.create_cone(bm, cap_ends=False, segments=96, radius1=38.5 * S, radius2=38.5 * S, depth=6 * S)
ob = link('fan_ring', bm, M['fan_frame'], V(*P(0, 43, 0)), smooth=True)
ob.modifiers.new('thick', 'SOLIDIFY').thickness = 2.4 * S
for k in range(4):
    a = k * math.pi / 2 + math.pi / 4
    box('strut', 26, 2.2, 3, P(math.cos(a) * 26, 40.4, math.sin(a) * 26), M['fan_frame'], r=0.6, rot=(0, 0, -a))
cyl('hub', 11, 5, P(0, 43, 0), M['fan'], r=0.8)
cyl('hub_accent', 4, 0.4, P(0, 45.6, 0), M['accent'])


def blade(angle):
    """A swept, pitched fan blade built on an (r, theta) grid and thickened."""
    bm = bmesh.new()
    nr, nt_ = 6, 10
    r0, r1, sweep = 11.5, 36.0, math.radians(30)
    grid = []
    for i in range(nr + 1):
        rr = r0 + (r1 - r0) * i / nr
        row = []
        for j in range(nt_ + 1):
            u = j / nt_
            th = angle + sweep * (u - 0.5) + 0.35 * (rr - r0) / (r1 - r0)
            y = 43 + (u - 0.5) * 5.5
            row.append(bm.verts.new(V(rr * math.cos(th), y, rr * math.sin(th)) - V(0, 0, 0)))
        grid.append(row)
    for i in range(nr):
        for j in range(nt_):
            bm.faces.new((grid[i][j], grid[i + 1][j], grid[i + 1][j + 1], grid[i][j + 1]))
    ob = link('blade', bm, M['fan'], V(*P(0, 0, 0)), smooth=True)
    ob.modifiers.new('thick', 'SOLIDIFY').thickness = 0.9 * S
    ob.modifiers.new('sub', 'SUBSURF').levels = 1
    return ob


for k in range(9):
    blade(k / 9 * math.tau)

# ---------------------------------------------------------------- studio

FLOOR_Y = -78 - 2.4
floor = plane('floor', 40000, 40000, (0, FLOOR_Y, 0), principled('floor', (0.0022, 0.0024, 0.0031), rough=0.45, spec=float(ARGS.get('floorspec', 0.03))))


def area(name, loc3, size, power, color, target=(0, 30, 0), shape='RECTANGLE', size_y=None, spread=180):
    li = bpy.data.lights.new(name, 'AREA')
    li.shape = shape
    li.size = size * S
    if size_y:
        li.size_y = size_y * S
    li.energy = power
    li.color = color
    li.spread = math.radians(spread)
    ob = bpy.data.objects.new(name, li)
    COL.objects.link(ob)
    ob.location = V(*loc3)
    d = V(*target) - ob.location
    ob.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
    return ob


def softbox(name, loc3, w, h, strength, color=(1, 1, 1), target=(0, 30, 0)):
    """Emissive card: shows up as a crisp highlight in metal but stays out of the camera."""
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.remove(nt.nodes['Principled BSDF'])
    em = nt.nodes.new('ShaderNodeEmission')
    em.inputs['Color'].default_value = (*color, 1)
    em.inputs['Strength'].default_value = strength
    nt.links.new(em.outputs['Emission'], nt.nodes['Material Output'].inputs['Surface'])
    bm = bmesh.new()
    bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5)
    bmesh.ops.scale(bm, vec=(w * S, h * S, 1), verts=bm.verts)
    ob = link(name, bm, mat, V(*loc3))
    d = V(*target) - ob.location
    ob.rotation_euler = d.to_track_quat('Z', 'Y').to_euler()
    ob.visible_camera = False
    return ob


area('key', (-520, 760, 560), 520, float(ARGS.get('key', 22)), (1.0, 0.95, 0.88), spread=26)
area('fill', (760, 260, 520), 600, float(ARGS.get('fill', 5)), (0.82, 0.88, 1.0))
area('top', (0, 1100, 80), 700, float(ARGS.get('topl', 20)), (1.0, 1.0, 1.0), shape='DISK', spread=60)
area('rim_red', (260, 520, -820), 420, float(ARGS.get('rim', 3.0)), (1.0, 0.16, 0.1), spread=70)
area('kicker', (-760, 320, -520), 320, float(ARGS.get('kick', 9)), (0.9, 0.93, 1.0))
softbox('strip_l', (-900, 500, 300), 220, 900, float(ARGS.get('strip', 0.35)))
softbox('strip_r', (900, 450, 200), 220, 900, float(ARGS.get('strip', 0.5)) * 0.55, (0.85, 0.9, 1.0))
# Red pool of light on the floor under the unit, painted into the floor so it never tints the parts
fm = floor.data.materials[0]
fnt, fp = nodes_of(fm)
tc = fnt.nodes.new('ShaderNodeTexCoord')
mp = fnt.nodes.new('ShaderNodeMapping')
mp.inputs['Location'].default_value = (0, -0.03, 0)
mp.inputs['Scale'].default_value = (1 / 0.30, 1 / 0.26, 1)
gr = fnt.nodes.new('ShaderNodeTexGradient')
gr.gradient_type = 'SPHERICAL'
pw = fnt.nodes.new('ShaderNodeMath')
pw.operation = 'POWER'
pw.inputs[1].default_value = 2.2
mul = fnt.nodes.new('ShaderNodeMath')
mul.operation = 'MULTIPLY'
mul.inputs[1].default_value = float(ARGS.get('glow', 0.9))
fnt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
fnt.links.new(mp.outputs['Vector'], gr.inputs['Vector'])
fnt.links.new(gr.outputs['Fac'], pw.inputs[0])
fnt.links.new(pw.outputs['Value'], mul.inputs[0])
fp.inputs['Emission Color'].default_value = (1.0, 0.11, 0.07, 1)
fnt.links.new(mul.outputs['Value'], fp.inputs['Emission Strength'])

world = bpy.data.worlds.new('world')
scene.world = world
world.use_nodes = True
world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.0035, 0.0038, 0.005, 1)

# ---------------------------------------------------------------- camera (matches the hero animation's exploded hold)

yaw, pitch, dist = math.radians(36), math.radians(20), 1450
target3 = (0, 44, 0)
cam_pos = (
    target3[0] + dist * math.cos(pitch) * math.sin(yaw),
    target3[1] + dist * math.sin(pitch),
    target3[2] + dist * math.cos(pitch) * math.cos(yaw),
)
cd = bpy.data.cameras.new('cam')
cd.sensor_fit = 'VERTICAL'
cd.sensor_height = 24
fov_y = 2 * math.atan(math.tan(math.radians(12)) * 900 / 1080)
cd.lens = 12 / math.tan(fov_y / 2)
cd.shift_y = -0.008
cd.clip_start = 0.05
cd.clip_end = 100
cd.dof.use_dof = True
cd.dof.aperture_fstop = float(ARGS.get('fstop', 4.0))
cam = bpy.data.objects.new('cam', cd)
COL.objects.link(cam)
cam.location = V(*cam_pos)
cam.rotation_euler = (V(*target3) - cam.location).to_track_quat('-Z', 'Y').to_euler()
cd.dof.focus_distance = (V(0, 26, 0) - cam.location).length
scene.camera = cam
if ARGS.get('cam') == 'top':  # debug view: straight down onto the lid, front edge at the bottom of the frame
    cam.location = V(0, 900, 0)
    cam.rotation_euler = (0, 0, 0)
    cd.dof.use_dof = False

# ---------------------------------------------------------------- render settings

scene.render.engine = 'CYCLES'
cy = scene.cycles
cy.device = 'CPU'
cy.samples = SAMPLES
cy.use_adaptive_sampling = True
cy.adaptive_threshold = 0.02
cy.use_denoising = True
cy.denoiser = 'OPENIMAGEDENOISE'
cy.max_bounces = 10
cy.glossy_bounces = 6
cy.transparent_max_bounces = 16
cy.caustics_reflective = False
cy.caustics_refractive = False
cy.blur_glossy = 0.6
scene.render.resolution_x = W
scene.render.resolution_y = H
scene.render.resolution_percentage = 100
scene.render.film_transparent = False
scene.view_settings.view_transform = 'AgX'
scene.view_settings.look = ARGS.get('look', 'AgX - Medium High Contrast')
scene.view_settings.exposure = float(ARGS.get('exposure', 0.0))
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_depth = '8'
scene.render.filepath = str(Path(OUT).resolve())

# ---------------------------------------------------------------- label anchors (same as the animation)

LABELS = [
    ('top', (-64, 50, 60), 'left'),
    ('fan', (30, 44, -20), 'right'),
    ('board', (0, 13.4, 0), 'left'),
    ('board', (35, 12.2, 24), 'right'),
    ('ssd', (50, 12.6, 50), 'right'),
    ('board', (-42, 17, 46), 'left'),
    ('front', (-40, 12, 75), 'left'),
]
bpy.context.view_layer.update()
anchors = []
for name, local, side in LABELS:
    o = PARTS[name]
    co = world_to_camera_view(scene, cam, V(local[0] + o.x, local[1] + o.y, local[2] + o.z))
    anchors.append({'part': name, 'side': side, 'x': co.x, 'y': 1 - co.y})
Path(LABELS_OUT).write_text(json.dumps(anchors, indent=1))

if ARGS.get('blend'):
    bpy.ops.wm.save_as_mainfile(filepath=str(Path(ARGS['blend']).resolve()))
bpy.ops.render.render(write_still=True)
print('rendered', OUT)
