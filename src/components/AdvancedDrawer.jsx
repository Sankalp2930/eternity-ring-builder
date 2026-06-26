import { useState } from "react";
import { DEFAULTS } from "../data/diamondData.js";

export default function AdvancedDrawer({ config, onChange }) {
  const [open, setOpen] = useState(false);

  function update(field, value) {
    onChange({ ...config, [field]: value });
  }

  return (
    <div className="advanced-drawer">
      <button className="drawer-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{open ? "▲" : "▼"}</span> Advanced Settings
      </button>
      {open && (
        <div className="drawer-body">
          <div className="adv-row">
            <label>
              Seating Offset
              <span className="adv-hint">Stone center distance from inner wall (mm)</span>
            </label>
            <div className="adv-input-row">
              <input
                type="range"
                min="0.5" max="5.0" step="0.1"
                value={config.seatingOffsetMm}
                onChange={(e) => update("seatingOffsetMm", parseFloat(e.target.value))}
              />
              <span className="adv-val">{config.seatingOffsetMm.toFixed(1)} mm</span>
              <button className="reset-btn" onClick={() => update("seatingOffsetMm", DEFAULTS.seatingOffsetMm)} title="Reset">↺</button>
            </div>
          </div>

          <div className="adv-row">
            <label>
              Gap Between Stones
              <span className="adv-hint">0 = channel/shared-prong (mm)</span>
            </label>
            <div className="adv-input-row">
              <input
                type="range"
                min="0" max="1.0" step="0.05"
                value={config.gapMm}
                onChange={(e) => update("gapMm", parseFloat(e.target.value))}
              />
              <span className="adv-val">{config.gapMm.toFixed(2)} mm</span>
              <button className="reset-btn" onClick={() => update("gapMm", DEFAULTS.gapMm)} title="Reset">↺</button>
            </div>
          </div>

          <div className="adv-row">
            <label>
              Prediction Mode
              <span className="adv-hint">How CTW is calculated across ring sizes</span>
            </label>
            <div className="mode-toggle">
              <button
                className={`mode-btn${config.predictionMode === "realistic" ? " active" : ""}`}
                onClick={() => update("predictionMode", "realistic")}
              >
                Realistic
                <span className="mode-sub">Discrete stone count</span>
              </button>
              <button
                className={`mode-btn${config.predictionMode === "smooth" ? " active" : ""}`}
                onClick={() => update("predictionMode", "smooth")}
              >
                Smooth Estimate
                <span className="mode-sub">Linear scale (quoting)</span>
              </button>
            </div>
          </div>

          <button className="reset-all-btn" onClick={() =>
            onChange({
              ...config,
              seatingOffsetMm: DEFAULTS.seatingOffsetMm,
              gapMm: DEFAULTS.gapMm,
              predictionMode: DEFAULTS.predictionMode,
            })
          }>
            Reset All to Defaults
          </button>
        </div>
      )}
    </div>
  );
}
