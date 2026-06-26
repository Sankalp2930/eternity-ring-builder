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
export const SHAPE_DATA = {
  Round:    { "0.05":[2.4],          "0.10":[3.0],          "0.25":[4.1],          "0.50":[5.2],          "0.75":[5.9],          "1.00":[6.5]          },
  Princess: {                         "0.10":[2.7,2.7],      "0.25":[3.5,3.5],      "0.50":[4.4,4.4],      "0.75":[5.0,5.0],      "1.00":[5.5,5.5]      },
  Emerald:  {                                                 "0.25":[4.3,3.0],      "0.50":[5.5,4.0],      "0.75":[6.3,4.5],      "1.00":[7.0,5.0]      },
  Oval:     {                                                 "0.25":[4.5,3.0],      "0.50":[6.0,4.0],      "0.75":[6.5,4.5],      "1.00":[7.7,5.7]      },
  Cushion:  {                                                 "0.25":[3.8,3.8],      "0.50":[4.9,4.9],      "0.75":[5.5,5.5],      "1.00":[5.9,5.9]      },
  Asscher:  {                                                 "0.25":[3.5,3.5],      "0.50":[4.5,4.5],      "0.75":[5.0,5.0],      "1.00":[5.5,5.5]      },
  Radiant:  {                                                 "0.25":[4.0,3.0],      "0.50":[5.0,4.0],      "0.75":[5.8,4.5],      "1.00":[6.5,5.0]      },
  Marquise: {                                                 "0.25":[6.0,3.0],      "0.50":[8.0,4.0],      "0.75":[9.0,4.5],      "1.00":[10.0,5.0]     },
  Pear:     {                                                 "0.25":[5.0,3.0],      "0.50":[6.0,4.0],      "0.75":[7.0,4.7],      "1.00":[7.7,5.2]      },
};

export const SHAPES = Object.keys(SHAPE_DATA);

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
