import React from 'react';

// Bands similar to credit score gauges
const RANGES = [
  { label: 'Poor', from: 300, to: 550, color: '#ef4444' },
  { label: 'Fair', from: 550, to: 650, color: '#f59e0b' },
  { label: 'Good', from: 650, to: 750, color: '#eab308' },
  { label: 'Excellent', from: 750, to: 900, color: '#22c55e' },
];

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export default function Speedometer({ value, min = 300, max = 900, subBands, showInnerBand = false }) {
  const score = clamp(value, min, max);

  // Draw on TOP semicircle from left (180°) to right (0°)
  const startAngle = 180; // leftmost
  const endAngle = 0; // rightmost

  // Map value linearly onto 180°..0°
  const angleFor = (v) => 180 - 180 * ((v - min) / (max - min));

  const cx = 130, cy = 130, r = 110; // viewBox 260x160

  // Standard polar with Y inverted (SVG screen space) so 90° is UP
  const polar = (radius, angle) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy - radius * Math.sin(rad) };
  };

  const arcPath = (radius, a0, a1) => {
    const p0 = polar(radius, a0);
    const p1 = polar(radius, a1);
    // For top-half clockwise movement (a1 < a0), use sweep=1
    const sweep = a1 < a0 ? 1 : 0;
    const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
    return `M ${p0.x} ${p0.y} A ${radius} ${radius} 0 ${large} ${sweep} ${p1.x} ${p1.y}`;
  };

  // Filled ring segment between two radii and angles (top arc)
  const sectorPath = (rOuter, rInner, a0, a1) => {
    const p0o = polar(rOuter, a0);
    const p1o = polar(rOuter, a1);
    const p1i = polar(rInner, a1);
    const p0i = polar(rInner, a0);
    const sweep = a1 < a0 ? 1 : 0;
    const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
    const sweepOpp = sweep ? 0 : 1;
    return `M ${p0o.x} ${p0o.y} A ${rOuter} ${rOuter} 0 ${large} ${sweep} ${p1o.x} ${p1o.y} L ${p1i.x} ${p1i.y} A ${rInner} ${rInner} 0 ${large} ${sweepOpp} ${p0i.x} ${p0i.y} Z`;
  };

  const needleAngle = angleFor(score);
  const tip = polar(r - 20, needleAngle);

  // Inner presentation radii
  const innerGap = 22; // spacing between colored band and inner area
  const rInnerRingOuter = r - 8;
  const rInnerRingInner = r - innerGap;
  const rBase = 50; // inner blue base radius

  const band = RANGES.find((b) => score >= b.from && score <= b.to) || RANGES[0];

  const ticks = [300, 500, 600, 700, 800, 900];
  const majorTicks = new Set([600, 700]);

  // Stroke widths and colors tuned for contrast
  const trackStroke = 18;
  const rangeStroke = 18;
  const rRangeOuter = r;
  const rRangeInner = r - rangeStroke;
  const rGapOuter = rRangeInner - 2;
  const rGapInner = rRangeInner - 8; // thin white divider like reference

  // Default sub-bands for the inner segmented ring (approximation of reference)
  const SUB_BANDS = subBands ?? [
    { from: 650, to: 699, color: '#f59e0b', label: '650-699' },
    { from: 700, to: 749, color: '#facc15', label: '700-749' },
    { from: 750, to: 799, color: '#a3e635', label: '750-799' },
    { from: 800, to: 900, color: '#22c55e', label: '> 800' },
  ];
  const renderInnerBand = showInnerBand && (Array.isArray(subBands) ? subBands.length > 0 : true);

  // Major outer colored ranges to mirror the reference (red/orange to ~700, then greens)
  const MAJOR = [
    { key: 'low', from: 300, to: 700, color: '#e0583e' }, // red/orange
    { key: 'mid', from: 700, to: 800, color: '#8ccf47' }, // light green
    { key: 'high', from: 800, to: 900, color: '#2ea44f' }, // darker green
  ];

  return (
    <div className="text-gray-800 dark:text-gray-100">
      <svg viewBox="0 0 260 160" width="100%" height="160" role="img" aria-label={`Reputation ${Math.round(score)}`}>
        {/* Bottom inner blue base semicircle */}
        <path d={`M ${cx - rBase} ${cy} A ${rBase} ${rBase} 0 0 1 ${cx + rBase} ${cy} L ${cx - rBase} ${cy} Z`} fill="#3b82f6" opacity="0.95" />

        {/* Background track (top half) */}
        <path d={arcPath(r, startAngle, endAngle)} stroke="#e5e7eb" strokeWidth={trackStroke} fill="none" strokeLinecap="round" opacity="0.65" />

        {/* Colored ranges as a semi-circle ring */}
        {MAJOR.map((rng) => (
          <path
            key={rng.key}
            d={sectorPath(rRangeOuter, rRangeInner, angleFor(rng.from), angleFor(rng.to))}
            fill={rng.color}
          />
        ))}

        {/* Thin white inner divider ring */}
        <path d={sectorPath(rGapOuter, rGapInner, startAngle, endAngle)} fill="#ffffff" opacity="0.95" />

        {/* Inner segmented band with labels (optional) */}
        {renderInnerBand && SUB_BANDS.map((sb) => (
          <g key={`${sb.from}-${sb.to}`}>
            <path
              d={sectorPath(rInnerRingOuter, rInnerRingInner, angleFor(sb.from), angleFor(sb.to))}
              fill={sb.color}
              opacity="0.9"
            />
            {(() => {
              const mid = (sb.from + sb.to) / 2;
              const p = polar((rInnerRingOuter + rInnerRingInner) / 2, angleFor(mid));
              return (
                <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize="9" fill="#111827" fontWeight="700">
                  {sb.label}
                </text>
              );
            })()}
          </g>
        ))}

        {/* Tick marks + labels */}
        {ticks.map((t) => {
          const a = angleFor(t);
          const isMajor = majorTicks.has(t);
          const p0 = polar(r - 2, a);
          const p1 = polar(r - (isMajor ? 20 : 12), a);
          // Pull labels inward to avoid clipping near edges
          const lbl = polar(r + (isMajor ? 14 : 12), a);
          return (
            <g key={t}>
              <line x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke="#64748b" strokeWidth={isMajor ? 3 : 2} strokeLinecap="round" />
              <text x={lbl.x} y={lbl.y} textAnchor="middle" fontSize="11" fontWeight={isMajor ? 700 : 600} fill="currentColor">{t}</text>
            </g>
          );
        })}

        {/* Needle */}
        {/* white halo under needle for contrast */}
        <line x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="#ffffff" strokeWidth="7" strokeLinecap="round" opacity="0.9" />
        <line x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="6" fill="#ffffff" stroke="#3b82f6" />

  {/* Big score inside blue base - pushed down to avoid overlap with needle */}
  <text x={cx} y={cy + 34} textAnchor="middle" fontSize="36" fontWeight="900" fill="#ffffff">{Math.round(score)}</text>
  {/* Band label below number - spaced accordingly */}
  <text x={cx} y={cy + 52} textAnchor="middle" fontSize="11" fill={band.color}>{band.label}</text>
      </svg>
    </div>
  );
}
