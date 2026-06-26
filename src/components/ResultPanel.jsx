import { getDimensions } from "../utils/calculations.js";

export default function ResultPanel({ config, stoneCount, totalCTW }) {
  const { shape, perStoneCarat, orientation, predictionMode } = config;
  const dims = getDimensions(shape, perStoneCarat);
  const isRound = dims.length === 1;
  const dimLabel = isRound
    ? `${dims[0].toFixed(2)} mm ⌀`
    : `${dims[0].toFixed(2)} × ${dims[1].toFixed(2)} mm`;

  const noStones = stoneCount === 0;

  return (
    <div className="result-panel">
      {noStones ? (
        <div className="no-stones-msg">
          <span className="no-stones-icon">◇</span>
          <p>No stones fit this configuration.</p>
          <p className="hint">Try a smaller stone, larger coverage, or a bigger ring size.</p>
        </div>
      ) : (
        <>
          <div className="result-grid">
            <ResultStat label="Stone Count" value={stoneCount} unit="stones" big />
            <ResultStat
              label="Total Carat Weight"
              value={predictionMode === "smooth" ? totalCTW.toFixed(3) : totalCTW.toFixed(2)}
              unit="ct"
              big
              accent
            />
            <ResultStat label="Per-Stone Size" value={dimLabel} />
            <ResultStat label="Per-Stone Weight" value={`${perStoneCarat.toFixed(2)} ct`} />
            {!isRound && (
              <ResultStat
                label="Orientation"
                value={orientation === "east-west" ? "East–West (length along band)" : "North–South (width along band)"}
              />
            )}
          </div>
          <div className="mode-badge">
            {predictionMode === "smooth" ? "~ Smooth estimate" : "Realistic (discrete)"}
          </div>
        </>
      )}
      <p className="disclaimer">
        ⚠ Estimated values only. Final carat weight depends on actual stone selection, setting style, and jeweler measurements.
      </p>
    </div>
  );
}

function ResultStat({ label, value, unit, big, accent }) {
  return (
    <div className={`result-stat${big ? " big" : ""}${accent ? " accent" : ""}`}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">
        {value}
        {unit && <span className="stat-unit"> {unit}</span>}
      </span>
    </div>
  );
}
