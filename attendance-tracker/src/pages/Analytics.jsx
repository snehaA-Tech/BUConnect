import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { overallSummary, subjectSummary, monthlyBreakdown } from '../utils/attendance';
import { MonthlyBarChart, TrendLineChart, SubjectPieChart, PresentAbsentBarChart } from '../components/AttendanceChart';
import ProgressRing from '../components/ProgressRing';

export default function Analytics() {
  const { subjects, records, settings } = useApp();
  const overall = overallSummary(records, settings.threshold);

  const subjectSummaries = subjects.map((s) => ({ subject: s, ...subjectSummary(s.id, records, settings.threshold) }));

  const monthlyData = useMemo(() => {
    return monthlyBreakdown(records).map((m) => ({
      label: new Date(m.month + '-01').toLocaleDateString('en-US', { month: 'short' }),
      present: m.present,
      absent: m.absent,
    }));
  }, [records]);

  const trendData = useMemo(() => {
    return monthlyBreakdown(records).map((m) => ({
      label: new Date(m.month + '-01').toLocaleDateString('en-US', { month: 'short' }),
      percentage: Math.round((m.present / (m.present + m.absent)) * 100),
    }));
  }, [records]);

  const pieData = subjectSummaries
    .filter((s) => s.percentage !== null)
    .map((s) => ({ name: s.subject.name, value: Math.round(s.percentage), color: s.subject.color }));

  const barData = subjectSummaries.map((s) => ({ name: s.subject.name, present: s.attended, absent: s.missed }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display font-bold text-2xl">Analytics</h1>
        <p className="text-sm text-ink-muted mt-1">Your attendance at a glance</p>
      </div>

      <div className="card p-5 flex flex-col sm:flex-row items-center gap-6">
        <ProgressRing percentage={overall.percentage} state={overall.state} size={130} label="Overall" />
        <div className="grid grid-cols-2 gap-4 flex-1 w-full">
          <Stat label="Classes attended" value={overall.attended} />
          <Stat label="Classes missed" value={overall.missed} />
          <Stat label="To reach 75%" value={overall.toReach} hint="more classes to attend" />
          <Stat label="Can still miss" value={overall.canMiss === Infinity ? '∞' : overall.canMiss} hint="and stay above 75%" />
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-display font-semibold mb-3">Monthly attendance</h2>
        {monthlyData.length > 0 ? <MonthlyBarChart data={monthlyData} /> : <Empty />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <h2 className="font-display font-semibold mb-3">Attendance trend</h2>
          {trendData.length > 0 ? <TrendLineChart data={trendData} /> : <Empty />}
        </div>
        <div className="card p-5">
          <h2 className="font-display font-semibold mb-3">Subject-wise %</h2>
          {pieData.length > 0 ? <SubjectPieChart data={pieData} /> : <Empty />}
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-display font-semibold mb-3">Present vs Absent by subject</h2>
        {barData.length > 0 ? <PresentAbsentBarChart data={barData} /> : <Empty />}
      </div>

      <div>
        <h2 className="font-display font-semibold mb-3">Smart predictions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subjectSummaries.map((s) => (
            <div key={s.subjectId} className="card p-4">
              <p className="font-medium text-sm">{s.subject.name}</p>
              {s.percentage === null ? (
                <p className="text-xs text-ink-muted mt-1">No classes marked yet.</p>
              ) : (
                <p className="text-xs text-ink-muted mt-1">
                  Your attendance is <strong className="text-ink dark:text-paper">{Math.round(s.percentage)}%</strong>.{' '}
                  {s.state === 'crit' || s.state === 'warn'
                    ? `Attend the next ${s.toReach} class${s.toReach === 1 ? '' : 'es'} to reach ${settings.threshold}%.`
                    : `You can miss ${s.canMiss === Infinity ? 'unlimited' : s.canMiss} more and remain above ${settings.threshold}%.`}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, hint }) {
  return (
    <div>
      <p className="font-display font-bold text-xl">{value}</p>
      <p className="text-xs text-ink-muted">{label}</p>
      {hint && <p className="text-[10px] text-ink-muted/70">{hint}</p>}
    </div>
  );
}

function Empty() {
  return <p className="text-sm text-ink-muted py-8 text-center">Not enough data yet.</p>;
}
