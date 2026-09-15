import Button from './Button';

export default function TimetableCard({ entry, subject, onEdit, onDelete }) {
  if (!subject) return null;
  return (
    <div className="card p-3.5 flex items-center gap-3">
      <span className="w-1.5 self-stretch rounded-full shrink-0" style={{ background: subject.color }} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{subject.name}</p>
        <p className="text-xs text-ink-muted truncate">
          {entry.start} – {entry.end} · {subject.room} · {subject.teacher}
        </p>
      </div>
      <div className="flex gap-1 shrink-0">
        <Button size="sm" variant="ghost" onClick={onEdit}>Edit</Button>
        <Button size="sm" variant="ghost" className="text-crit" onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
}
