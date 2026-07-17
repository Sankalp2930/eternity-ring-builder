// ─── Ring Size → Inner Circumference (mm) ────────────────────────────────────
export const RING_SIZES = {
  "3":   44.2,  "3.5": 45.5,
  "4":   46.8,  "4.5": 48.0,
  "5":   49.3,  "5.5": 50.6,
  "6":   51.9,  "6.5": 53.1,
  "7":   54.4,  "7.5": 55.7,
  "8":   57.0,  "8.5": 58.3,
  "9":   59.5,  "9.5": 60.8,
  "10":  62.1, "10.5": 63.4,
  "11":  64.6, "11.5": 65.9,
  "12":  67.2, "12.5": 68.5,
  "13":  69.7,
};

export const RING_SIZE_KEYS = Object.keys(RING_SIZES).sort(
  (a, b) => parseFloat(a) - parseFloat(b)
);

// ─── Shape → Carat → [length, width?] in mm ──────────────────────────────────
// Round: single value = diameter. Fancy: [length, width].
// Round table sourced from AMIPI's own sieve-size lot chart
// (prodweb/src/Pages/Diamond/amiplots2.json — "rd" rows, DIAMETER (MM) → AVERAGE WEIGHT).
// The 1.2mm row's source weight (0.085) was a typo breaking the size progression — corrected to 0.0085.
// Bands above 4.1mm have no single DIAMETER (MM) in the source (only a minSize/maxSize range), so the
// midpoint of that range is used as the representative mm.
export const SHAPE_DATA = {
  Round: {
    "0.0025":[0.80], "0.003":[0.90],  "0.005":[1.00],  "0.007":[1.10],  "0.0085":[1.20],
    "0.01":[1.30],   "0.0125":[1.40], "0.015":[1.50],  "0.018":[1.60],  "0.022":[1.70],
    "0.025":[1.80],  "0.03":[1.90],   "0.035":[2.00],  "0.04":[2.15],   "0.05":[2.30],
    "0.055":[2.40],  "0.06":[2.50],   "0.07":[2.60],   "0.08":[2.70],   "0.09":[2.80],
    "0.10":[2.90],   "0.11":[3.00],   "0.12":[3.10],   "0.13":[3.20],   "0.14":[3.30],
    "0.15":[3.40],   "0.162":[3.50],  "0.1925":[3.60], "0.205":[3.70],  "0.215":[3.80],
    "0.24":[3.90],   "0.25":[4.00],   "0.26":[4.10],   "0.315":[4.345], "0.38":[4.52],
    "0.41":[4.72],   "0.47":[4.895],  "0.525":[5.12],  "0.625":[5.42],  "0.71":[5.595],
    "0.75":[5.77],   "0.82":[5.995],  "0.91":[6.145],  "0.96":[6.22],   "1.04":[6.47],
  },
  Princess: {                         "0.10":[2.7,2.7],      "0.25":[3.5,3.5],      "0.50":[4.4,4.4],      "0.75":[5.0,5.0],      "1.00":[5.5,5.5]      },
  Emerald:  {                                                 "0.25":[4.3,3.0],      "0.50":[5.5,4.0],      "0.75":[6.3,4.5],      "1.00":[7.0,5.0]      },
  Oval:     {                                                 "0.25":[4.5,3.0],      "0.50":[6.0,4.0],      "0.75":[6.5,4.5],      "1.00":[7.7,5.7]      },
  Cushion:  {                                                 "0.25":[3.8,3.8],      "0.50":[4.9,4.9],      "0.75":[5.5,5.5],      "1.00":[5.9,5.9]      },
  Asscher:  {                                                 "0.25":[3.5,3.5],      "0.50":[4.5,4.5],      "0.75":[5.0,5.0],      "1.00":[5.5,5.5]      },
  Radiant:  {                                                 "0.25":[4.0,3.0],      "0.50":[5.0,4.0],      "0.75":[5.8,4.5],      "1.00":[6.5,5.0]      },
  Marquise: {                                                 "0.25":[6.0,3.0],      "0.50":[8.0,4.0],      "0.75":[9.0,4.5],      "1.00":[10.0,5.0]     },
  Pear:     {                                                 "0.25":[5.0,3.0],      "0.50":[6.0,4.0],      "0.75":[7.0,4.7],      "1.00":[7.7,5.2]      },

  // ─── Color stones (round only) — from prodweb/src/Pages/Diamond/gemsData.json ──────────
  // Ruby and sapphire share one weight-per-mm table (both corundum, same specific gravity);
  // emerald (beryl) is lighter, hence a distinct table at the same mm breakpoints.
  Ruby: {
    "0.01":[1.2], "0.017":[1.5], "0.03":[1.8], "0.045":[2.0], "0.047":[2.1],
    "0.053":[2.2], "0.057":[2.3], "0.082":[2.5], "0.085":[2.6], "0.10":[2.7],
    "0.12":[3.0],  "0.17":[3.4],  "0.21":[3.6],  "0.31":[3.9],  "0.35":[4.2],
    "0.43":[4.5],  "0.47":[4.7],  "0.55":[5.0],  "0.66":[5.2],
  },
  Sapphire: {
    "0.01":[1.2], "0.017":[1.5], "0.03":[1.8], "0.045":[2.0], "0.047":[2.1],
    "0.053":[2.2], "0.057":[2.3], "0.082":[2.5], "0.085":[2.6], "0.10":[2.7],
    "0.12":[3.0],  "0.17":[3.4],  "0.21":[3.6],  "0.31":[3.9],  "0.35":[4.2],
    "0.43":[4.5],  "0.47":[4.7],  "0.55":[5.0],  "0.66":[5.2],
  },
  "Emerald Stone": {
    "0.007":[1.2], "0.01":[1.5],  "0.02":[1.8],  "0.03":[2.0],  "0.035":[2.1],
    "0.038":[2.2], "0.042":[2.3], "0.055":[2.5], "0.06":[2.6],  "0.065":[2.7],
    "0.09":[3.0],  "0.13":[3.4],  "0.15":[3.6],  "0.20":[3.9],  "0.26":[4.2],
    "0.30":[4.5],  "0.34":[4.7],  "0.40":[5.0],  "0.43":[5.2],
  },
};

// ─── Diamond cut shapes vs. color stones — kept separate so pickers can group them ──────
export const DIAMOND_SHAPES = ["Round","Princess","Emerald","Oval","Cushion","Asscher","Radiant","Marquise","Pear"];
export const COLOR_STONES = ["Ruby","Sapphire","Emerald Stone"];
export const SHAPES = DIAMOND_SHAPES;

// ─── Per-shape selectable carat range, where it differs from the dimension table's own
// keys — sourced from prodweb/src/Pages/Diamond/gemsData.json's natural-origin price bands,
// intersected with the dimension table's range (never widened past what we have a size
// estimate for, only narrowed to what AMIPI's natural-cut inventory actually carries).
// Cushion/Asscher/Radiant have no natural-only band in that source, so they fall back to
// the dimension table's own range (still an estimate, not confirmed against real inventory).
export const SHAPE_CARAT_RANGE = {
  Marquise: [0.25, 0.44],
  Pear:     [0.25, 0.44],
  Oval:     [0.25, 0.4499],
  Princess: [0.10, 0.44],
  Emerald:  [0.25, 0.7399],
};

export const BAND_STYLES = [
  { key: "full",         label: "Full Eternity",         coverage: 1.00 },
  { key: "three-quarter",label: "¾ Eternity",            coverage: 0.75 },
  { key: "half",         label: "Half Eternity",         coverage: 0.50 },
];

// ─── App defaults ─────────────────────────────────────────────────────────────
export const DEFAULTS = {
  ringSize:        "6.5",
  shape:           "Round",
  perStoneCarat:   0.10,
  coverage:        1.0,
  orientation:     "east-west",   // east-west | north-south
  seatingOffsetMm: 2.0,
  gapMm:           0.15,
  predictionMode:  "realistic",   // realistic | smooth
};

// ─── Shapes that have a meaningful orientation ────────────────────────────────
export const FANCY_SHAPES = ["Emerald","Oval","Radiant","Marquise","Pear"];
