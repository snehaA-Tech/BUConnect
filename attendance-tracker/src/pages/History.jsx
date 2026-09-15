import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatShort } from '../utils/date';
import Select from '../components/Select';
import Badge from '../components/Badge';

const STATUS_META = {
  present: { label: 'Present', tone: 'safe' },
  absent: { label: 'Absent', tone: 'crit' },
  dayoff: { label: 'Day Off', tone: 'info' },
};

export default function History() {
  const { subjects, records } = useApp();
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');

  const subjectById = Object.fromEntries(subjects.map((s) => [s.id, s]));

  const months = useMemo(() => {
    const set = new Set(records.map((r) => r.date.slice(0, 7)));
    return [...set].sort().reverse();
  }, [records]);

  const filtered = useMemo(() => {
    return [...records]
      .filter((r) => subjectFilter === 'all' || r.subjectId === subjectFilter)
      .filter((r) => statusFilter === 'all' || r.status === statusFilter)
      .filter((r) => monthFilter === 'all' || r.date.slice(0, 7) === monthFilter)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [records, subjectFilter, statusFilter, monthFilter]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display font-bold text-2xl">Attendance history</h1>
        <p className="text-sm text-ink-muted mt-1">{filtered.length} records</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Select label="Subject" value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
          <option value="all">All subjects</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </Select>
        <Select label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="dayoff">Day Off</option>
        </Select>
        <Select label="Month" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)}>
          <option value="all">All months</option>
          {months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </Select>
      </div>

      <div className="card overflow-hidden">
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-ink-muted">No records match these filters.</p>
        ) : (
          <div className="divide-y divide-ink/5 dark:divide-white/5">
            {filtered.map((r) => (
              <div key={r.id} className="flex items-center gap-3 px-4 py-3">
                <span className="text-xs text-ink-muted w-14 shrink-0">{formatShort(r.date)}</span>
                <span className="text-sm font-medium flex-1 min-w-0 truncate">{subjectById[r.subjectId]?.name || 'Unknown'}</span>
                <Badge tone={STATUS_META[r.status]?.tone || 'none'}>{STATUS_META[r.status]?.label || r.status}</Badge>
                <span className="text-xs text-ink-muted italic hidden sm:block max-w-[35%] truncate">
                  {r.note || '—'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
