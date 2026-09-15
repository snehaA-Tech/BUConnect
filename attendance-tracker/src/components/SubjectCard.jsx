import Badge from './Badge';
import Button from './Button';

const STATE_LABEL = { safe: 'On track', warn: 'Warning', crit: 'Critical', none: 'No data' };
const STATE_TONE = { safe: 'safe', warn: 'warn', crit: 'crit', none: 'none' };

export default function SubjectCard({ subject, summary, onEdit, onDelete }) {
  return (
    <div className="card p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ background: subject.color }} aria-hidden="true" />
          <div>
            <p className="font-display font-semibold">{subject.name}</p>
            <p className="text-xs text-ink-muted">
              {subject.code} · {subject.teacher} · {subject.room}
            </p>
          </div>
        </div>
        <Badge tone={STATE_TONE[summary.state]}>{STATE_LABEL[summary.state]}</Badge>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="font-display font-bold text-2xl">
            {summary.percentage === null ? '—' : `${Math.round(summary.percentage)}%`}
          </p>
          <p className="text-xs text-ink-muted">
            {summary.attended} attended · {summary.missed} missed · {summary.total} held
          </p>
        </div>
        <div className="text-right text-xs text-ink-muted max-w-[55%]">
          {summary.state === 'crit' || summary.state === 'warn' ? (
            <p>Attend next <strong className="text-ink dark:text-paper">{summary.toReach}</strong> to reach 75%</p>
          ) : summary.percentage !== null ? (
            <p>Can miss <strong className="text-ink dark:text-paper">{summary.canMiss}</strong> and stay above 75%</p>
          ) : (
            <p>No classes marked yet</p>
          )}
        </div>
      </div>

      <div className="w-full h-1.5 rounded-full bg-ink/5 dark:bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(100, summary.percentage || 0)}%`,
            background: summary.state === 'crit' ? '#C7402D' : summary.state === 'warn' ? '#C77D0A' : '#1B8A5A',
          }}
        />
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button size="sm" variant="ghost" onClick={onEdit}>Edit</Button>
        <Button size="sm" variant="ghost" className="text-crit" onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
}
