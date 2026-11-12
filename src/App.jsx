import { useState, useMemo, useEffect } from "react";
import ShapePicker from "./components/ShapePicker.jsx";
import RingVisualizer from "./components/RingVisualizer.jsx";
import ResultPanel from "./components/ResultPanel.jsx";
import ComparisonTable from "./components/ComparisonTable.jsx";
import AdvancedDrawer from "./components/AdvancedDrawer.jsx";
import StoneSizeReference from "./components/StoneSizeReference.jsx";
import { DEFAULTS, RING_SIZE_KEYS, BAND_STYLES, FANCY_SHAPES, SHAPE_DATA, SHAPE_CARAT_RANGE } from "./data/diamondData.js";
import { computeResult, getSeatCircumference, getDimensions } from "./utils/calculations.js";

// Every breakpoint here comes from a real AMIPI source table (see SHAPE_DATA in diamondData.js):
// Round from the sieve-size lot chart, Ruby/Sapphire/Emerald Stone from gemsData.json's color-stone
// tables. 0.20 / 0.30 / 0.40 / 0.50 / 0.60 / 1.00 are kept as round-number stops for the fancy diamond
// shapes, which only have sparse quarter-carat dimension tables (no finer real data exists for those).
const CARAT_OPTIONS = [
  0.0025, 0.003, 0.005, 0.007, 0.0085, 0.01, 0.0125, 0.015, 0.017, 0.018, 0.02,
  0.022, 0.025, 0.03, 0.035, 0.038, 0.04, 0.042, 0.045, 0.047, 0.05, 0.053, 0.055,
  0.057, 0.06, 0.065, 0.07, 0.08, 0.082, 0.085, 0.09, 0.10, 0.11, 0.12, 0.13, 0.14,
  0.15, 0.162, 0.17, 0.1925, 0.20, 0.205, 0.21, 0.215, 0.24, 0.25, 0.26, 0.30, 0.31,
  0.315, 0.34, 0.35, 0.38, 0.40, 0.41, 0.43, 0.47, 0.50, 0.525, 0.55, 0.60, 0.625,
  0.66, 0.71, 0.75, 0.82, 0.91, 0.96, 1.00, 1.04,
];

// Format a stone's mm dimensions for the reference text shown alongside each carat option
function formatMm(shape, carat) {
  const dims = getDimensions(shape, carat);
  return dims.length === 1 ? `${dims[0].toFixed(2)}mm` : `${dims[0].toFixed(2)}×${dims[1].toFixed(2)}mm`;
}

// Show just enough decimal precision to distinguish tightly-spaced sieve sizes
// (e.g. 0.0085 vs 0.01) — trims trailing zeros but never drops below 2 decimals.
function formatCarat(carat) {
  let s = carat.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  const decimals = (s.split(".")[1] ?? "").length;
  return decimals < 2 ? carat.toFixed(2) : s;
}

// Get carat options available for a given shape — the shape's OWN real sieve/pointer
// breakpoints from SHAPE_DATA (not the shared CARAT_OPTIONS stop list, which predates the
// fancy-shape mm update and is missing some exact values, e.g. Emerald's 0.18 pointer).
// Using the table's own keys means every selectable size is an exact sourced entry, never
// an interpolated or rounded-off stand-in. SHAPE_CARAT_RANGE can still narrow this when set.
function getCaratOptions(shape) {
  const table = SHAPE_DATA[shape] ?? {};
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  if (!keys.length) return CARAT_OPTIONS;
  const [tableMin, tableMax] = [keys[0], keys[keys.length - 1]];
  const [min, max] = SHAPE_CARAT_RANGE[shape] ?? [tableMin, tableMax];
  return keys.filter((c) => c >= min && c <= max);
}

export default function App() {
  const [config, setConfig] = useState({ ...DEFAULTS });
  const [theme, setTheme] = useState(() => localStorage.getItem("appTheme") || "light");
  const [mobileTab, setMobileTab] = useState("configure");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("appTheme", theme);
  }, [theme]);

  function update(field, value) {
    setConfig((prev) => {
      const next = { ...prev, [field]: value };
      // If shape changes, clamp per-stone carat to valid range for that shape
      if (field === "shape") {
        const opts = getCaratOptions(value);
        if (opts.length > 0 && !opts.includes(next.perStoneCarat)) {
          next.perStoneCarat = opts[Math.min(1, opts.length - 1)];
        }
      }
      return next;
    });
  }

  const caratOptions = useMemo(() => getCaratOptions(config.shape), [config.shape]);
  const isFancy = FANCY_SHAPES.includes(config.shape);

  const result = useMemo(() => computeResult(config), [config]);
  const seatCircMm = useMemo(
    () => getSeatCircumference(config.ringSize, config.seatingOffsetMm),
    [config.ringSize, config.seatingOffsetMm]
  );

  // Coverage → band style label
  function bandLabel(coverage) {
    if (coverage >= 1.0) return "Full Eternity";
    if (coverage >= 0.74) return "¾ Eternity";
    if (coverage >= 0.49) return "½ Eternity";
    return `${Math.round(coverage * 100)}% Coverage`;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-left">
            <span className="logo-mark">◈</span>
            <div>
              <h1 className="app-title">Eternity Ring Builder</h1>
              <p className="app-subtitle">Amipi — Custom Diamond CTW Calculator</p>
            </div>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setTheme((t) => t === "light" ? "dark" : "light")}
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? "◐ Dark" : "○ Light"}
          </button>
        </div>
      </header>

      {/* Ring visualizer — shown here only ≤960px, pinned above the config/results tabs.
          Above that width it renders inside .results-col instead (see .visualizer-desktop). */}
      <div className="visualizer-pane">
        <RingVisualizer config={config} stoneCount={result.stoneCount} seatCircMm={seatCircMm} />
      </div>

      {/* Mobile tab switcher — hidden on desktop via CSS */}
      <div className="mobile-tab-bar">
        <button
          className={`mobile-tab-btn${mobileTab === "configure" ? " active" : ""}`}
          onClick={() => setMobileTab("configure")}
        >
          Configure
        </button>
        <button
          className={`mobile-tab-btn${mobileTab === "results" ? " active" : ""}`}
          onClick={() => setMobileTab("results")}
        >
          Results
        </button>
      </div>

      <main className="app-main">
        {/* ── Left column: controls ── */}
        <section className={`controls-col${mobileTab === "configure" ? " mob-active" : ""}`}>

          {/* Shape + Per-stone carat, side by side */}
          <div className="control-row">
            <div className="control-group">
              <h2 className="group-label">Stone Shape</h2>
              <ShapePicker value={config.shape} onChange={(v) => update("shape", v)} />
            </div>
            <div className="control-group">
              <h2 className="group-label">Per-Stone Carat</h2>
              <select
                className="select-input"
                value={config.perStoneCarat}
                onChange={(e) => update("perStoneCarat", parseFloat(e.target.value))}
              >
                {caratOptions.map((c) => (
                  <option key={c} value={c}>
                    {formatCarat(c)} ct — {formatMm(config.shape, c)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Orientation (fancy shapes only) */}
          {isFancy && (
            <div className="control-group">
              <h2 className="group-label">Orientation</h2>
              <div className="orient-toggle">
                <button
                  className={`orient-btn${config.orientation === "east-west" ? " active" : ""}`}
                  onClick={() => update("orientation", "east-west")}
                >
                  ↔ East–West
                  <span className="orient-sub">Length along band</span>
                </button>
                <button
                  className={`orient-btn${config.orientation === "north-south" ? " active" : ""}`}
                  onClick={() => update("orientation", "north-south")}
                >
                  ↕ North–South
                  <span className="orient-sub">Width along band</span>
                </button>
              </div>
            </div>
          )}

          {/* Coverage / Band Style */}
          <div className="control-group">
            <h2 className="group-label">
              Band Coverage
              <span className="group-val">{bandLabel(config.coverage)}</span>
            </h2>
            <div className="band-presets">
              {BAND_STYLES.map((bs) => (
                <button
                  key={bs.key}
                  className={`band-btn${Math.abs(config.coverage - bs.coverage) < 0.01 ? " active" : ""}`}
                  onClick={() => update("coverage", bs.coverage)}
                >
                  {bs.label}
                </button>
              ))}
            </div>
            <div className="coverage-slider-row">
              <input
                type="range"
                min="0.3" max="1.0" step="0.01"
                value={config.coverage}
                onChange={(e) => update("coverage", parseFloat(e.target.value))}
                className="coverage-slider"
              />
              <span className="coverage-pct">{Math.round(config.coverage * 100)}%</span>
            </div>
          </div>

          {/* Ring size */}
          <div className="control-group">
            <h2 className="group-label">Ring Size (US)</h2>
            <div className="size-grid">
              {RING_SIZE_KEYS.map((s) => (
                <button
                  key={s}
                  className={`size-btn${config.ringSize === s ? " active" : ""}${s.includes(".") ? " half-size" : ""}`}
                  onClick={() => update("ringSize", s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <AdvancedDrawer config={config} onChange={setConfig} />
        </section>

        {/* ── Right column: results ── */}
        <section className={`results-col${mobileTab === "results" ? " mob-active" : ""}`}>
          {/* Hidden ≤960px — the persistent .visualizer-pane above the tabs takes over there */}
          <div className="visualizer-desktop">
            <RingVisualizer config={config} stoneCount={result.stoneCount} seatCircMm={seatCircMm} />
          </div>
          <ResultPanel config={config} stoneCount={result.stoneCount} totalCTW={result.totalCTW} />
          <StoneSizeReference shape={config.shape} perStoneCarat={config.perStoneCarat} />
          <ComparisonTable config={config} />
        </section>
      </main>
    </div>
  );
}
