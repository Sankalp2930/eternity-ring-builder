import { useState, useMemo } from "react";
import ShapePicker from "./components/ShapePicker.jsx";
import RingVisualizer from "./components/RingVisualizer.jsx";
import ResultPanel from "./components/ResultPanel.jsx";
import ComparisonTable from "./components/ComparisonTable.jsx";
import AdvancedDrawer from "./components/AdvancedDrawer.jsx";
import { DEFAULTS, RING_SIZE_KEYS, BAND_STYLES, FANCY_SHAPES, SHAPE_DATA } from "./data/diamondData.js";
import { computeResult, getSeatCircumference } from "./utils/calculations.js";

const CARAT_OPTIONS = [0.05, 0.08, 0.10, 0.15, 0.20, 0.25, 0.30, 0.40, 0.50, 0.60, 0.75, 1.00];

// Get carat options available for a given shape
function getCaratOptions(shape) {
  const table = SHAPE_DATA[shape] ?? {};
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  const min = keys[0] ?? 0.05;
  const max = keys[keys.length - 1] ?? 1.00;
  return CARAT_OPTIONS.filter((c) => c >= min && c <= max);
}

export default function App() {
  const [config, setConfig] = useState({ ...DEFAULTS });

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
          <span className="logo-mark">◈</span>
          <div>
            <h1 className="app-title">Eternity Ring Builder</h1>
            <p className="app-subtitle">Custom Diamond CTW Calculator</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        {/* ── Left column: controls ── */}
        <section className="controls-col">

          {/* Shape */}
          <div className="control-group">
            <h2 className="group-label">Diamond Shape</h2>
            <ShapePicker value={config.shape} onChange={(v) => update("shape", v)} />
          </div>

          {/* Per-stone carat */}
          <div className="control-group">
            <h2 className="group-label">Per-Stone Carat</h2>
            <div className="carat-grid">
              {caratOptions.map((c) => (
                <button
                  key={c}
                  className={`carat-btn${config.perStoneCarat === c ? " active" : ""}`}
                  onClick={() => update("perStoneCarat", c)}
                >
                  {c.toFixed(2)}
                  <span className="carat-unit">ct</span>
                </button>
              ))}
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
        <section className="results-col">
          <RingVisualizer config={config} stoneCount={result.stoneCount} seatCircMm={seatCircMm} />
          <ResultPanel config={config} stoneCount={result.stoneCount} totalCTW={result.totalCTW} />
          <ComparisonTable config={config} />
        </section>
      </main>
    </div>
  );
}
