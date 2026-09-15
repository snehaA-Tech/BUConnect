import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useTodayClasses } from '../hooks/useTodayClasses';
import { overallSummary, subjectSummary } from '../utils/attendance';
import { formatPretty, greeting } from '../utils/date';
import ProgressRing from '../components/ProgressRing';
import AttendanceCard from '../components/AttendanceCard';
import Badge from '../components/Badge';

export default function Dashboard() {
  const { subjects, records, calendar, settings, markAttendance, setNote, today, holidayByDate } = useApp();
  const { profile } = useAuth();
  const todayClasses = useTodayClasses();
  const overall = overallSummary(records, settings.threshold);
  const todayHoliday = holidayByDate[today];

  const completed = todayClasses.filter((c) => c.record?.status).length;
  const criticalSubjects = subjects
    .map((s) => subjectSummary(s.id, records, settings.threshold))
    .filter((s) => s.state === 'warn' || s.state === 'crit')
    .sort((a, b) => (a.percentage ?? 100) - (b.percentage ?? 100));

  const upcomingTest = calendar
    .filter((c) => c.type !== 'holiday' && c.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  const todayEvent = calendar.find((c) => c.date === today);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display font-bold text-2xl">
          {greeting()}, {profile.name.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-ink-muted mt-1">{formatPretty(today)}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 flex items-center gap-4 sm:col-span-1">
          <ProgressRing percentage={overall.percentage} state={overall.state} size={104} />
          <div>
            <p className="text-xs text-ink-muted">Overall attendance</p>
            <p className="text-xs text-ink-muted mt-1">{overall.attended} / {overall.total} classes</p>
          </div>
        </div>
        <div className="card p-5 flex flex-col justify-center">
          <p className="text-xs text-ink-muted">Today's attendance</p>
          <p className="font-display font-bold text-2xl mt-1">
            {completed} / {todayClasses.length} <span className="text-sm font-normal text-ink-muted">completed</span>
          </p>
        </div>
        <div className="card p-5 flex flex-col justify-center">
          <p className="text-xs text-ink-muted">Today's event</p>
          {todayHoliday ? (
            <Badge tone="info" className="mt-2 w-fit">Holiday — {todayHoliday.name}</Badge>
          ) : todayEvent ? (
            <p className="font-medium text-sm mt-1">{todayEvent.name}</p>
          ) : (
            <p className="text-sm text-ink-muted mt-1">Nothing scheduled</p>
          )}
        </div>
      </div>

      {criticalSubjects.length > 0 && (
        <div className="card p-4 border-l-4" style={{ borderLeftColor: '#C7402D' }}>
          <p className="font-medium text-sm flex items-center gap-1.5">⚠ Attendance warning</p>
          <div className="mt-2 flex flex-col gap-1">
            {criticalSubjects.map((s) => {
              const subject = subjects.find((sub) => sub.id === s.subjectId);
              return (
                <p key={s.subjectId} className="text-xs text-ink-muted">
                  <strong className="text-ink dark:text-paper">{subject?.name}</strong> attendance is{' '}
                  {Math.round(s.percentage)}%. Attend the next {s.toReach} class{s.toReach === 1 ? '' : 'es'} to reach {settings.threshold}%.
                </p>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold">Today's classes</h2>
          <Link to="/timetable" className="text-xs text-cobalt-500 font-medium hover:underline">Edit timetable</Link>
        </div>
        {todayClasses.length === 0 ? (
          <div className="card p-6 text-center text-sm text-ink-muted">
            No classes scheduled today. Add one in the Timetable section.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {todayClasses.map((c) => (
              <AttendanceCard
                key={c.id}
                subject={c.subject}
                time={`${c.start} – ${c.end}`}
                record={c.record}
                holiday={c.holiday}
                onMark={(status) => markAttendance(c.subjectId, today, status)}
                onNote={(note) => setNote(c.subjectId, today, note)}
              />
            ))}
          </div>
        )}
      </div>

      {upcomingTest && (
        <div className="card p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-ink-muted">Upcoming event</p>
            <p className="font-medium text-sm mt-0.5">{upcomingTest.name}</p>
          </div>
          <Badge tone="warn">{formatPretty(upcomingTest.date)}</Badge>
        </div>
      )}
    </div>
  );
}
