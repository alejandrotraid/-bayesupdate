interface TimelinePoint {
  label: string;
  probability: number;
}

const VIEW_WIDTH = 340;
const VIEW_HEIGHT = 100;
const TOP_MARGIN = 10;
const BOTTOM_MARGIN = 16;

function toCoords(points: TimelinePoint[]) {
  const usableHeight = VIEW_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN;
  return points.map((point, index) => {
    const x =
      points.length === 1
        ? 0
        : (index / (points.length - 1)) * VIEW_WIDTH;
    const y = TOP_MARGIN + usableHeight * (1 - point.probability / 100);
    return { x, y };
  });
}

export function Timeline({ points }: { points: TimelinePoint[] }) {
  const coords = toCoords(points);
  const linePath = coords
    .map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`)
    .join(" ");
  const areaPath = `${linePath} L${VIEW_WIDTH},${VIEW_HEIGHT} L0,${VIEW_HEIGHT} Z`;

  return (
    <svg
      width="100%"
      height="100"
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      preserveAspectRatio="none"
      className="block"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-bar)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent-bar)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#lineGrad)" stroke="none" />
      <path
        d={linePath}
        fill="none"
        stroke="var(--accent-bar)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {coords.map((c, i) => (
        <circle
          key={i}
          cx={c.x}
          cy={c.y}
          r="4"
          fill={i === coords.length - 1 ? "var(--accent)" : "var(--accent-bar)"}
        />
      ))}
      <text x="0" y="98" fontSize="10" fill="var(--text-muted)">
        {points[0]?.label}
      </text>
      <text x={VIEW_WIDTH - 30} y="98" fontSize="10" fill="var(--text-muted)">
        Today
      </text>
    </svg>
  );
}
