const STATE_COLOR = {
  safe: '#1B8A5A',
  warn: '#C77D0A',
  crit: '#C7402D',
  none: '#6B6F7B',
};

// A ring styled like a class-period clock face: 12 tick marks (periods), a sweeping
// progress arc for attendance %, ticking in a subtle rotation on load.
export default function ProgressRing({ percentage, state = 'none', size = 148, label, sublabel }) {
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const pct = percentage ?? 0;
  const offset = circumference - (pct / 100) * circumference;
  const color = STATE_COLOR[state] || STATE_COLOR.none;

  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
    const inner = radius - 6;
    const outer = radius - 1;
    const cx = size / 2;
    const cy = size / 2;
    return {
      x1: cx + inner * Math.cos(angle),
      y1: cy + inner * Math.sin(angle),
      x2: cx + outer * Math.cos(angle),
      y2: cy + outer * Math.sin(angle),
    };
  });

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="10" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)' }}
        />
      </svg>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0" aria-hidden="true">
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="font-display font-bold text-2xl leading-none">
          {percentage === null || percentage === undefined ? '—' : `${Math.round(percentage)}%`}
        </span>
        {label && <span className="text-[11px] text-ink-muted mt-1">{label}</span>}
        {sublabel && <span className="text-[10px] text-ink-muted">{sublabel}</span>}
      </div>
    </div>
  );
}
