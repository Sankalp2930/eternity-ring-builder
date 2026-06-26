import { buildComparisonTable } from "../utils/calculations.js";

export default function ComparisonTable({ config }) {
  const rows = buildComparisonTable(config);
  const currentSize = String(config.ringSize);

  return (
    <div className="comparison-table-wrap">
      <h3 className="section-title">Size Comparison <span className="section-sub">US 4 – 10</span></h3>
      <div className="table-scroll">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Inner Circ.</th>
              <th>Stones</th>
              <th>Total CTW</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.size} className={row.size === currentSize ? "current-row" : ""}>
                <td className="size-cell">
                  {row.size === currentSize && <span className="current-marker">▶ </span>}
                  {row.size}
                </td>
                <td>{row.innerCirc.toFixed(1)} mm</td>
                <td>{row.stoneCount === 0 ? "—" : row.stoneCount}</td>
                <td className={row.size === currentSize ? "accent-text" : ""}>
                  {row.stoneCount === 0
                    ? "—"
                    : config.predictionMode === "smooth"
                    ? row.totalCTW.toFixed(3)
                    : row.totalCTW.toFixed(2)
                  } ct
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
