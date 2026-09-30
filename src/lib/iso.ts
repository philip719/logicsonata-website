// Isometric projection helpers for the hand-built SVG illustrations.
// World units: x runs to the lower right, y to the lower left, z straight up.

const COS30 = Math.cos(Math.PI / 6);

export type Point = [number, number];
export type Projector = (x: number, y: number, z: number) => Point;

export function makeIso(originX: number, originY: number, scale: number): Projector {
  return (x, y, z) => [originX + (x - y) * COS30 * scale, originY + ((x + y) / 2 - z) * scale];
}

export function pts(points: Point[]): string {
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

export type BoxFaces = { top: string; left: string; right: string };

/** The three visible faces of an axis-aligned box. */
export function boxFaces(iso: Projector, x: number, y: number, z: number, w: number, d: number, h: number): BoxFaces {
  const t = z + h;
  return {
    top: pts([iso(x, y, t), iso(x + w, y, t), iso(x + w, y + d, t), iso(x, y + d, t)]),
    left: pts([iso(x, y + d, t), iso(x + w, y + d, t), iso(x + w, y + d, z), iso(x, y + d, z)]),
    right: pts([iso(x + w, y, t), iso(x + w, y + d, t), iso(x + w, y + d, z), iso(x + w, y, z)]),
  };
}
