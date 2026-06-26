import { RING_SIZES, SHAPE_DATA, DEFAULTS } from "../data/diamondData.js";

// ─── Interpolate stone dimensions for any carat value ─────────────────────────
export function getDimensions(shape, carat) {
  const table = SHAPE_DATA[shape];
  if (!table) return [3.0];

  const carats = Object.keys(table).map(Number).sort((a, b) => a - b);

  // Clamp to table range
  if (carat <= carats[0]) return table[carats[0].toFixed(2)] ?? table[String(carats[0])];
  if (carat >= carats[carats.length - 1]) return table[carats[carats.length - 1].toFixed(2)] ?? table[String(carats[carats.length - 1])];

  // Linear interpolation between surrounding entries
  let lo = carats[0], hi = carats[1];
  for (let i = 0; i < carats.length - 1; i++) {
    if (carat >= carats[i] && carat <= carats[i + 1]) {
      lo = carats[i];
      hi = carats[i + 1];
      break;
    }
  }

  const loKey = lo % 1 === 0 ? lo.toFixed(2) : String(lo);
  const hiKey = hi % 1 === 0 ? hi.toFixed(2) : String(hi);
  const dimLo = table[loKey] ?? table[String(lo)];
  const dimHi = table[hiKey] ?? table[String(hi)];

  const t = (carat - lo) / (hi - lo);
  return dimLo.map((v, i) => v + t * ((dimHi[i] ?? v) - v));
}

// ─── Ring geometry ─────────────────────────────────────────────────────────────
export function getInnerCircumference(ringSize) {
  return RING_SIZES[String(ringSize)] ?? RING_SIZES[DEFAULTS.ringSize];
}

export function getSeatCircumference(ringSize, seatingOffsetMm) {
  const ic = getInnerCircumference(ringSize);
  const innerDiameter = ic / Math.PI;
  return Math.PI * (innerDiameter + seatingOffsetMm);
}

// ─── Stone footprint given orientation ────────────────────────────────────────
// east-west → length runs along the band → footprint = length (dims[0])
// north-south → width runs along the band → footprint = width (dims[1] ?? dims[0])
export function getFootprintMm(dims, orientation) {
  if (dims.length === 1) return dims[0]; // round — diameter in all directions
  return orientation === "east-west" ? dims[0] : (dims[1] ?? dims[0]);
}

// ─── Core count calculation ────────────────────────────────────────────────────
export function computeStoneCount({ ringSize, shape, perStoneCarat, coverage, orientation, seatingOffsetMm, gapMm }) {
  const dims = getDimensions(shape, perStoneCarat);
  const footprintMm = getFootprintMm(dims, orientation);
  const pitch = footprintMm + gapMm;
  const seatCirc = getSeatCircumference(ringSize, seatingOffsetMm);
  return Math.floor((coverage * seatCirc) / pitch);
}

// ─── Mode A: realistic (discrete steps) ───────────────────────────────────────
export function computeRealistic(config) {
  const { perStoneCarat } = config;
  const count = computeStoneCount(config);
  return {
    stoneCount: count,
    totalCTW: count * perStoneCarat,
  };
}

// ─── Mode B: smooth linear scale from reference size 6.5 ─────────────────────
export function computeSmooth(config) {
  const { ringSize, perStoneCarat, seatingOffsetMm } = config;
  const refConfig = { ...config, ringSize: DEFAULTS.ringSize };
  const refCount = computeStoneCount(refConfig);
  const refCTW = refCount * perStoneCarat;

  const seatRef = getSeatCircumference(DEFAULTS.ringSize, seatingOffsetMm);
  const seatTarget = getSeatCircumference(ringSize, seatingOffsetMm);

  const totalCTW = refCTW * (seatTarget / seatRef);
  // stone count is locked to ref size for smooth mode
  return {
    stoneCount: refCount,
    totalCTW,
  };
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────
export function computeResult(config) {
  if (config.predictionMode === "smooth") return computeSmooth(config);
  return computeRealistic(config);
}

// ─── Comparison table: sizes 4–10 ─────────────────────────────────────────────
export function buildComparisonTable(config) {
  const sizes = ["4","4.5","5","5.5","6","6.5","7","7.5","8","8.5","9","9.5","10"];
  return sizes.map((size) => {
    const cfg = { ...config, ringSize: size };
    const result = computeResult(cfg);
    return {
      size,
      innerCirc: getInnerCircumference(size),
      seatCirc: getSeatCircumference(size, config.seatingOffsetMm),
      stoneCount: result.stoneCount,
      totalCTW: result.totalCTW,
    };
  });
}
