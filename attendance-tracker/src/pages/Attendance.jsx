import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useClassesForDate } from '../hooks/useTodayClasses';
import { formatPretty, todayISO } from '../utils/date';
import AttendanceCard from '../components/AttendanceCard';
import Input from '../components/Input';

export default function Attendance() {
  const { markAttendance, setNote } = useApp();
  const [date, setDate] = useState(todayISO());
  const classes = useClassesForDate(date);

  const completed = classes.filter((c) => c.record?.status || c.holiday).length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl">Mark attendance</h1>
          <p className="text-sm text-ink-muted mt-1">{formatPretty(date)}</p>
        </div>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-44" />
      </div>

      <p className="text-xs text-ink-muted -mt-2">{completed} / {classes.length} classes accounted for</p>

      {classes.length === 0 ? (
        <div className="card p-8 text-center text-sm text-ink-muted">
          No classes scheduled on this day according to your timetable.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {classes.map((c) => (
            <AttendanceCard
              key={c.id}
              subject={c.subject}
              time={`${c.start} – ${c.end}`}
              record={c.record}
              holiday={c.holiday}
              onMark={(status) => markAttendance(c.subjectId, date, status)}
              onNote={(note) => setNote(c.subjectId, date, note)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
