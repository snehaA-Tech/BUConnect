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
    <div className="flex flex-col gap-7">
      <header className="relative overflow-hidden rounded-panel border border-line bg-paper-card px-5 py-6 shadow-card sm:px-7 sm:py-7">
        <div className="absolute right-7 top-6 hidden items-center gap-2 sm:flex" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-gold" />
          <span className="h-2 w-2 rounded-full bg-teal" />
          <span className="h-2.5 w-2.5 rounded-full bg-maroon" />
        </div>
        <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-teal-deep">
          <span className="h-px w-7 bg-gold" />
          Attendance Dashboard
        </div>
        <h1 className="font-display text-2xl font-bold leading-tight text-maroon-deep sm:text-3xl">
          {greeting()}, {profile.name.split(' ')[0]} 👋
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
          Track your attendance and stay ahead of shortages.
        </p>
        <p className="mt-4 text-xs font-semibold tracking-wide text-ink-muted">{formatPretty(today)}</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card relative flex items-center gap-4 overflow-hidden border-t-[3px] border-t-gold p-5 sm:col-span-2 lg:col-span-1">
          <div className="absolute right-4 top-4 h-8 w-8 rounded-full bg-warn-bg" aria-hidden="true" />
          <ProgressRing percentage={overall.percentage} state={overall.state} size={96} />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Overall attendance</p>
            <p className="mt-2 text-sm font-semibold text-ink">{overall.attended} / {overall.total}</p>
            <p className="text-xs text-ink-muted">classes attended</p>
          </div>
        </div>
        <div className="card relative flex flex-col justify-center overflow-hidden border-t-[3px] border-t-teal p-5">
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-control border border-teal/20 bg-safe-bg text-teal-deep" aria-hidden="true">✓</div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Today's attendance</p>
          <p className="mt-2 font-display text-2xl font-bold text-teal-deep">
            {completed} / {todayClasses.length} <span className="text-sm font-normal text-ink-muted">completed</span>
          </p>
        </div>
        <div className="card relative flex flex-col justify-center overflow-hidden border-t-[3px] border-t-maroon p-5">
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-control border border-maroon/15 bg-[#F0DCC7] text-maroon-deep" aria-hidden="true">✦</div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">Today's event</p>
          {todayHoliday ? (
            <Badge tone="info" className="mt-3 w-fit">Holiday — {todayHoliday.name}</Badge>
          ) : todayEvent ? (
            <p className="mt-2 text-sm font-semibold text-maroon-deep">{todayEvent.name}</p>
          ) : (
            <p className="mt-2 text-sm text-ink-muted">Nothing scheduled</p>
          )}
        </div>
      </div>

      {criticalSubjects.length > 0 && (
        <div className="relative overflow-hidden rounded-panel border border-gold/50 border-l-4 border-l-gold bg-warn-bg p-5 shadow-card sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-gold/40 bg-paper-card text-gold" aria-hidden="true">⚠</span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-ink">Attendance warning</p>
              <div className="mt-3 flex flex-col gap-2">
            {criticalSubjects.map((s) => {
              const subject = subjects.find((sub) => sub.id === s.subjectId);
              return (
                <p key={s.subjectId} className="text-xs leading-relaxed text-ink-muted sm:text-sm">
                  <strong className="text-ink dark:text-paper">{subject?.name}</strong> attendance is{' '}
                  {Math.round(s.percentage)}%. Attend the next {s.toReach} class{s.toReach === 1 ? '' : 'es'} to reach {settings.threshold}%.
                </p>
              );
            })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-deep">Your schedule</p>
            <h2 className="mt-1 font-display text-xl font-bold text-maroon-deep">Today's classes</h2>
          </div>
          <Link to="/timetable" className="rounded-control border border-line bg-paper-card px-3 py-2 text-xs font-semibold text-maroon hover:border-maroon/40 hover:bg-white">Edit timetable</Link>
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
          <div className="card flex items-center justify-between gap-4 border-l-4 border-l-maroon p-5 sm:p-6">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-maroon/15 bg-[#F0DCC7] text-maroon-deep" aria-hidden="true">✦</span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-teal-deep">Upcoming event</p>
              <p className="mt-1 text-sm font-semibold text-ink">{upcomingTest.name}</p>
            </div>
          </div>
          <Badge tone="warn" className="shrink-0 px-3 py-1.5">{formatPretty(upcomingTest.date)}</Badge>
        </div>
      )}
    </div>
  );
}
