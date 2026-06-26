import { getDimensions } from "../utils/calculations.js";

export default function StoneSizeReference({ shape, perStoneCarat }) {
  const dims = getDimensions(shape, perStoneCarat);
  const isRound = dims.length === 1;

  return (
    <div className="stone-size-ref">
      <span className="size-ref-label">{shape}</span>
      <span className="size-ref-value">
        {isRound
          ? `${dims[0].toFixed(2)} mm ⌀`
          : `${dims[0].toFixed(2)} × ${dims[1].toFixed(2)} mm`}
      </span>
      <span className="size-ref-note">estimated stone dimensions</span>
    </div>
  );
}
