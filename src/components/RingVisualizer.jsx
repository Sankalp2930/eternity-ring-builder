import { getDimensions, getSeatCircumference } from "../utils/calculations.js";

const SVG_SIZE = 320;
const CX = SVG_SIZE / 2;
const CY = SVG_SIZE / 2;

// Scale factor: mm → svg units. The seating ring outer edge fits in ~(SVG_SIZE*0.42) radius.
function getRadii(seatCircMm, offsetMm) {
  const seatRadiusMm = seatCircMm / (2 * Math.PI);
  const innerRadiusMm = seatRadiusMm - offsetMm;
  const outerRadiusMm = seatRadiusMm + 4; // band width approximation

  // Map so that seatRadius = SVG_SIZE * 0.36
  const scale = (SVG_SIZE * 0.36) / seatRadiusMm;
  return {
    inner: innerRadiusMm * scale,
    seat: seatRadiusMm * scale,
    outer: outerRadiusMm * scale,
    scale,
  };
}

// Stone shape renderer — returns JSX for a stone centered at (0,0)
function StoneShape({ shape, w, h, orientation, stoneIndex }) {
  // w = visual width in svg units, h = visual height
  const [sw, sh] = orientation === "east-west" ? [w, h] : [h, w];
  switch (shape) {
    case "Round":
      return <ellipse cx="0" cy="0" rx={sw / 2} ry={sw / 2} />;
    case "Princess":
    case "Cushion":
    case "Asscher":
      return <rect x={-sw / 2} y={-sh / 2} width={sw} height={sh} rx={shape === "Cushion" ? sw * 0.18 : shape === "Asscher" ? sw * 0.12 : 0} />;
    case "Emerald":
    case "Radiant":
      return (
        <polygon points={`
          ${-sw/2 + sh*0.2},${-sh/2}
          ${sw/2 - sh*0.2},${-sh/2}
          ${sw/2},${-sh/2 + sh*0.2}
          ${sw/2},${sh/2 - sh*0.2}
          ${sw/2 - sh*0.2},${sh/2}
          ${-sw/2 + sh*0.2},${sh/2}
          ${-sw/2},${sh/2 - sh*0.2}
          ${-sw/2},${-sh/2 + sh*0.2}
        `} />
      );
    case "Oval":
      return <ellipse cx="0" cy="0" rx={sw / 2} ry={sh / 2} />;
    case "Marquise":
      return <ellipse cx="0" cy="0" rx={sw / 2} ry={sh / 2} />;
    case "Pear": {
      // Always draw with long axis (w) along x: tip at +x, round end at −x.
      // North-south: rotate so tip is radial. Alternate −90°/+90° each stone so tips
      // interlock with adjacent rounds — classic compact alternating pear setting.
      const rx = w / 2, ry = h / 2;
      const d = `M ${rx},0 C ${0.4*rx},${-0.7*ry} ${-0.2*rx},${-ry} ${-0.4*rx},${-ry} C ${-0.9*rx},${-ry} ${-rx},${-0.6*ry} ${-rx},0 C ${-rx},${0.6*ry} ${-0.9*rx},${ry} ${-0.4*rx},${ry} C ${-0.2*rx},${ry} ${0.4*rx},${0.7*ry} ${rx},0 Z`;
      if (orientation === "north-south") {
        const flip = stoneIndex % 2 === 0 ? -90 : 90;
        return <g transform={`rotate(${flip})`}><path d={d} /></g>;
      }
      return <path d={d} />;
    }
    default:
      return <ellipse cx="0" cy="0" rx={sw / 2} ry={sh / 2} />;
  }
}

export default function RingVisualizer({ config, stoneCount, seatCircMm }) {
  const { shape, perStoneCarat, coverage, orientation, seatingOffsetMm } = config;
  const { inner, seat, outer, scale } = getRadii(seatCircMm, seatingOffsetMm);

  const dims = getDimensions(shape, perStoneCarat);
  // Stone visual size in SVG units (scale from mm)
  const stoneL = dims[0] * scale * 0.92; // slight visual shrink for legibility
  const stoneW = (dims[1] ?? dims[0]) * scale * 0.92;

  // Coverage arc: center gap at bottom (270° = bottom for a ring viewed from above)
  const arcSpanDeg = coverage * 360;
  const startAngle = -90 - arcSpanDeg / 2; // top of ring = -90°

  const stones = [];
  if (stoneCount > 0 && stoneCount <= 200) {
    for (let i = 0; i < stoneCount; i++) {
      const angleDeg = startAngle + (arcSpanDeg / stoneCount) * (i + 0.5);
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = CX + seat * Math.cos(angleRad);
      const y = CY + seat * Math.sin(angleRad);
      // Rotate stone to follow the ring tangent
      const tangentDeg = angleDeg + 90;
      stones.push({ x, y, rotate: tangentDeg, key: i });
    }
  }

  // Arc path for band
  function describeArc(cx, cy, r, startDeg, endDeg) {
    const start = ((startDeg - 90) * Math.PI) / 180;
    const end = ((endDeg - 90) * Math.PI) / 180;
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    const sx = cx + r * Math.cos(start);
    const sy = cy + r * Math.sin(start);
    const ex = cx + r * Math.cos(end);
    const ey = cy + r * Math.sin(end);
    if (Math.abs(endDeg - startDeg) >= 360) {
      return `M${cx + r},${cy} A${r},${r} 0 1 1 ${cx + r - 0.001},${cy} Z`;
    }
    return `M${sx},${sy} A${r},${r} 0 ${largeArc} 1 ${ex},${ey}`;
  }

  const bandStart = 0;
  const bandEnd = arcSpanDeg;

  return (
    <svg
      viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
      className="ring-visualizer"
      aria-label="Top-down ring visualization"
    >
      {/* Outer glow ring */}
      <circle cx={CX} cy={CY} r={outer + 2} fill="none" stroke="#C9A22722" strokeWidth={4} />

      {/* Band background */}
      {coverage >= 1.0 ? (
        <>
          <circle cx={CX} cy={CY} r={outer} fill="#2a2510" stroke="#C9A22755" strokeWidth={1} />
          <circle cx={CX} cy={CY} r={inner} fill="#0f0f0f" />
        </>
      ) : (
        <>
          {/* Partial band arc (outer) */}
          <path
            d={describeArc(CX, CY, outer, bandStart, bandEnd)}
            fill="none" stroke="#C9A22755" strokeWidth={outer - inner}
            strokeLinecap="round"
          />
          {/* Dashed guide for empty region */}
          <circle cx={CX} cy={CY} r={seat} fill="none" stroke="#C9A22720" strokeWidth={1} strokeDasharray="4 4" />
        </>
      )}

      {/* Stones */}
      {stones.map(({ x, y, rotate, key }) => (
        <g key={key} transform={`translate(${x},${y}) rotate(${rotate})`}>
          <StoneShape
            shape={shape}
            w={stoneL}
            h={stoneW}
            orientation={orientation}
            stoneIndex={key}
          />
        </g>
      ))}

      {/* Inner hole */}
      <circle cx={CX} cy={CY} r={inner} fill="#0f0f0f" />
      <circle cx={CX} cy={CY} r={inner} fill="none" stroke="#C9A22733" strokeWidth={1} />
    </svg>
  );
}
