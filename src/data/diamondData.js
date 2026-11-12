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
  // ─── Fancy cut shapes — sourced verbatim from AMIPI's "Fancy Seive with MM Chart" (SEIVE →
  // LENGTH × WIDTH mm → POINTER carat weight). Keyed here by the POINTER value (the nominal
  // carat weight for that sieve band), value = [length, width] in mm. Where the source sheet
  // listed two rows for the same POINTER (a handful of shapes have this), the later row in
  // the sheet is kept as the more likely correction.
  Asscher: {
    "0.05":[2.00,2.00], "0.10":[2.50,2.50], "0.12":[2.70,2.70], "0.15":[2.90,2.90],
    "0.20":[3.20,3.20], "0.25":[3.50,3.50], "0.30":[3.70,3.70], "0.40":[4.00,4.00],
    "0.50":[4.30,4.30], "0.60":[4.60,4.60], "0.75":[4.90,4.90], "0.90":[5.20,5.20],
    "1.00":[5.50,5.50],
  },
  Cushion: {
    "0.05":[2.20,2.20], "0.10":[2.70,2.70], "0.12":[2.90,2.90], "0.15":[3.10,3.10],
    "0.20":[3.40,3.40], "0.25":[3.60,3.60], "0.30":[4.00,4.00], "0.40":[4.20,4.20],
    "0.50":[4.60,4.60], "0.60":[5.00,5.00], "0.75":[5.30,5.30], "0.90":[5.60,5.60],
    "1.00":[5.80,5.80],
  },
  Emerald: {
    "0.05":[2.50,1.75], "0.10":[3.10,2.10], "0.12":[3.40,2.40], "0.15":[3.60,2.60],
    "0.18":[3.80,2.80], "0.20":[4.00,2.80], "0.25":[4.10,3.00], "0.30":[4.60,3.30],
    "0.40":[5.00,3.50], "0.50":[5.50,3.80], "0.60":[6.00,4.00], "0.75":[6.30,4.40],
    "0.90":[6.50,4.50], "1.00":[6.80,4.80],
  },
  Heart: {
    "0.05":[2.50,2.50], "0.10":[3.00,3.00], "0.12":[3.30,3.30], "0.15":[3.50,3.50],
    "0.20":[3.80,3.80], "0.25":[4.20,4.20], "0.30":[4.50,4.50], "0.40":[4.80,4.80],
    "0.50":[5.20,5.20], "0.60":[5.60,5.60], "0.75":[6.00,6.00], "0.90":[6.30,6.30],
    "1.00":[6.60,6.60],
  },
  Marquise: {
    "0.03":[3.00,1.50], "0.04":[3.50,1.75], "0.05":[3.70,1.85], "0.07":[4.00,2.00],
    "0.10":[4.60,2.30], "0.12":[5.00,2.50], "0.15":[5.50,2.75], "0.20":[6.00,3.00],
    "0.25":[6.50,3.25], "0.30":[6.80,4.30], "0.40":[7.50,3.75], "0.50":[8.00,4.00],
    "0.60":[8.80,4.40], "0.75":[9.20,4.60], "0.90":[9.80,4.90], "1.00":[10.10,5.05],
  },
  Oval: {
    "0.05":[3.00,2.10], "0.10":[3.60,2.60], "0.12":[3.80,2.70], "0.13":[4.00,2.80],
    "0.15":[4.20,3.00], "0.20":[4.60,3.20], "0.25":[5.00,3.50], "0.30":[5.50,3.80],
    "0.40":[6.00,4.00], "0.50":[6.50,4.50], "0.60":[6.80,4.80], "0.75":[7.20,5.00],
    "0.90":[7.60,5.40], "1.00":[8.00,5.60],
  },
  Pear: {
    "0.05":[3.10,2.00], "0.10":[4.00,2.50], "0.12":[4.20,2.80], "0.15":[4.50,3.00],
    "0.20":[5.00,3.20], "0.25":[5.50,3.50], "0.30":[5.80,3.80], "0.40":[6.20,4.10],
    "0.50":[6.80,4.50], "0.60":[7.40,4.80], "0.75":[7.80,5.00], "0.90":[8.20,5.30],
    "1.00":[8.50,5.50],
  },
  Princess: {
    "0.05":[2.00,2.00], "0.10":[2.50,2.50], "0.12":[2.70,2.70], "0.15":[3.00,3.00],
    "0.20":[3.20,3.20], "0.25":[3.40,3.40], "0.30":[3.70,3.70], "0.40":[4.00,4.00],
    "0.50":[4.30,4.30], "0.60":[4.60,4.60], "0.75":[5.00,5.00], "0.90":[5.30,5.30],
    "1.00":[5.50,5.50],
  },
  Radiant: {
    "0.05":[2.80,2.00], "0.10":[3.40,2.40], "0.12":[3.60,2.60], "0.15":[3.80,2.70],
    "0.20":[4.20,3.00], "0.25":[4.60,3.20], "0.30":[5.00,3.50], "0.40":[5.30,3.80],
    "0.50":[5.80,4.00], "0.60":[6.20,4.40], "0.75":[6.50,4.60], "0.90":[7.00,4.90],
    "1.00":[7.40,5.20],
  },
  Trilliant: {
    "0.05":[2.60,2.60], "0.10":[3.10,3.10], "0.12":[3.40,3.40], "0.15":[3.60,3.60],
    "0.20":[4.00,4.00], "0.25":[4.30,4.30], "0.30":[4.60,4.60], "0.40":[5.00,5.00],
    "0.50":[5.50,5.50], "0.60":[5.80,5.80], "0.75":[6.20,6.20], "0.90":[6.50,6.50],
    "1.00":[6.80,6.80],
  },

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
export const DIAMOND_SHAPES = ["Round","Princess","Emerald","Oval","Cushion","Asscher","Radiant","Marquise","Pear","Heart","Trilliant"];
export const COLOR_STONES = ["Ruby","Sapphire","Emerald Stone"];
export const SHAPES = DIAMOND_SHAPES;

// ─── Per-shape selectable carat range override ─────────────────────────────────
// Empty by default — every shape's picker spans the full carat range of its own
// SHAPE_DATA dimension table (see getCaratOptions in App.jsx), which now covers
// every sieve size in AMIPI's "Fancy Sieve with MM Chart" reference. Previously
// this narrowed Marquise/Pear/Oval/Princess/Emerald to only the carat band
// matching natural-cut inventory (gemsData.json's natural-origin price bands),
// which hid the smaller sieve sizes below that band even though real mm data
// exists for them — removed so the builder always offers every size the
// reference chart has, regardless of current inventory.
export const SHAPE_CARAT_RANGE = {};

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
