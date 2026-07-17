import { DIAMOND_SHAPES, COLOR_STONES } from "../data/diamondData.js";

export default function ShapePicker({ value, onChange }) {
  return (
    <select
      className="select-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Stone shape"
    >
      <optgroup label="Diamond">
        {DIAMOND_SHAPES.map((shape) => (
          <option key={shape} value={shape}>{shape}</option>
        ))}
      </optgroup>
      <optgroup label="Color Stone (round)">
        {COLOR_STONES.map((shape) => (
          <option key={shape} value={shape}>{shape}</option>
        ))}
      </optgroup>
    </select>
  );
}
