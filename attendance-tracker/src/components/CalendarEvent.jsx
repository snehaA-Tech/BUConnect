import Badge from './Badge';
import Button from './Button';
import { formatPretty } from '../utils/date';

const TYPE_TONE = {
  holiday: 'info',
  test: 'warn',
  exam: 'crit',
  event: 'safe',
  assignment: 'warn',
  vacation: 'info',
  other: 'none',
};

export default function CalendarEvent({ event, onDelete }) {
  return (
    <div className="card p-3.5 flex items-center gap-3">
      <div className="flex flex-col items-center justify-center w-12 shrink-0 rounded-lg bg-ink/5 dark:bg-white/10 py-1.5">
        <span className="text-[10px] uppercase text-ink-muted leading-none">
          {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}
        </span>
        <span className="font-display font-bold text-lg leading-none mt-0.5">
          {new Date(event.date + 'T00:00:00').getDate()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm truncate">{event.name}</p>
          <Badge tone={TYPE_TONE[event.type] || 'none'}>{event.type}</Badge>
        </div>
        {event.description && <p className="text-xs text-ink-muted truncate mt-0.5">{event.description}</p>}
        <p className="text-[11px] text-ink-muted mt-0.5">{formatPretty(event.date)}</p>
      </div>
      {onDelete && (
        <Button size="sm" variant="ghost" className="text-crit shrink-0" onClick={onDelete}>
          Delete
        </Button>
      )}
    </div>
  );
}
