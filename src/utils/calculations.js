import { RING_SIZES, SHAPE_DATA, DEFAULTS } from "../data/diamondData.js";

// ─── Interpolate stone dimensions for any carat value ─────────────────────────
export function getDimensions(shape, carat) {
  const table = SHAPE_DATA[shape];
  if (!table) return [3.0];

  // Parse all entries as [numericCarat, dims] pairs — avoids string-key formatting bugs
  const entries = Object.entries(table)
    .map(([k, v]) => [parseFloat(k), v])
    .sort((a, b) => a[0] - b[0]);

  if (entries.length === 0) return [3.0];

  // Clamp to table range
  if (carat <= entries[0][0]) return entries[0][1];
  if (carat >= entries[entries.length - 1][0]) return entries[entries.length - 1][1];

  // Find surrounding bracket
  let loEntry = entries[0], hiEntry = entries[1];
  for (let i = 0; i < entries.length - 1; i++) {
    if (carat >= entries[i][0] && carat <= entries[i + 1][0]) {
      loEntry = entries[i];
      hiEntry = entries[i + 1];
      break;
    }
  }

  const t = (carat - loEntry[0]) / (hiEntry[0] - loEntry[0]);
  const dimLo = loEntry[1];
  const dimHi = hiEntry[1];
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
