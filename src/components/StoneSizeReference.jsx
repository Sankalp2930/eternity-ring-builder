import { getDimensions } from "../utils/calculations.js";
import { SHAPES } from "../data/diamondData.js";

export default function StoneSizeReference({ perStoneCarat, currentShape }) {
  return (
    <div className="stone-size-ref">
      <div className="size-ref-header">
        <span className="size-ref-title">Stone Dimensions</span>
        <span className="size-ref-carat">at {perStoneCarat.toFixed(2)} ct</span>
      </div>
      <div className="size-ref-grid">
        {SHAPES.map((shape) => {
          const dims = getDimensions(shape, perStoneCarat);
          const isRound = dims.length === 1;
          const dimStr = isRound
            ? `${dims[0].toFixed(2)} mm ⌀`
            : `${dims[0].toFixed(2)} × ${dims[1].toFixed(2)} mm`;
          return (
            <div key={shape} className={`size-ref-row${shape === currentShape ? " active" : ""}`}>
              <span className="size-ref-shape">{shape}</span>
              <span className="size-ref-dim">{dimStr}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
