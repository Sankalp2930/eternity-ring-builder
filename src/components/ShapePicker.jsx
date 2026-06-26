import { SHAPES } from "../data/diamondData.js";

// Minimal SVG paths for each shape (top-down schematic, viewBox 0 0 40 40)
const SHAPE_SVGS = {
  Round: (
    <ellipse cx="20" cy="20" rx="14" ry="14" />
  ),
  Princess: (
    <rect x="7" y="7" width="26" height="26" />
  ),
  Emerald: (
    <>
      <polygon points="9,7 31,7 35,11 35,29 31,33 9,33 5,29 5,11" />
      <line x1="9" y1="7" x2="5" y2="11" />
      <line x1="31" y1="7" x2="35" y2="11" />
      <line x1="31" y1="33" x2="35" y2="29" />
      <line x1="9" y1="33" x2="5" y2="29" />
    </>
  ),
  Oval: (
    <ellipse cx="20" cy="20" rx="10" ry="15" />
  ),
  Cushion: (
    <rect x="7" y="7" width="26" height="26" rx="6" ry="6" />
  ),
  Asscher: (
    <>
      <polygon points="10,5 30,5 35,10 35,30 30,35 10,35 5,30 5,10" />
      <polygon points="14,9 26,9 31,14 31,26 26,31 14,31 9,26 9,14" />
    </>
  ),
  Radiant: (
    <polygon points="10,5 30,5 36,11 36,29 30,35 10,35 4,29 4,11" />
  ),
  Marquise: (
    <ellipse cx="20" cy="20" rx="16" ry="8" />
  ),
  Pear: (
    <path d="M20,5 C30,5 35,12 35,20 C35,28 28,35 20,35 C12,35 5,28 5,20 C5,12 10,5 20,5 Z" />
  ),
};

export default function ShapePicker({ value, onChange }) {
  return (
    <div className="shape-picker">
      {SHAPES.map((shape) => (
        <button
          key={shape}
          className={`shape-btn${value === shape ? " active" : ""}`}
          onClick={() => onChange(shape)}
          title={shape}
          aria-pressed={value === shape}
        >
          <svg viewBox="0 0 40 40" className="shape-icon" fill="none" stroke="currentColor" strokeWidth="2">
            {SHAPE_SVGS[shape]}
          </svg>
          <span className="shape-label">{shape}</span>
        </button>
      ))}
    </div>
  );
}
