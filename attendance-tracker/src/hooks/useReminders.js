import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useTodayClasses } from './useTodayClasses';
import { subjectSummary } from '../utils/attendance';
import { addDays, formatShort } from '../utils/date';

// Designed so browser Notification API could be layered on top later (rule #11) —
// this hook only decides *what* to notify about; delivery stays swappable.
export function useReminders() {
  const { subjects, records, calendar, settings, notifications, pushNotification, today } = useApp();
  const todayClasses = useTodayClasses();

  useEffect(() => {
    const already = (title) => notifications.some((n) => n.title === title && n.createdAt && sameDay(n.createdAt, today));

    // Unmarked classes reminder (only classes whose scheduled time has passed, roughly end-of-day check simplified to "now")
    const unmarked = todayClasses.filter((c) => !c.holiday && !c.record?.status);
    if (unmarked.length > 0) {
      const title = "Don't forget to update today's attendance";
      if (!already(title)) {
        pushNotification({
          kind: 'reminder',
          title,
          body: `${unmarked.length} class${unmarked.length > 1 ? 'es' : ''} still unmarked today.`,
        });
      }
    }

    // Low attendance warnings
    subjects.forEach((s) => {
      const summary = subjectSummary(s.id, records, settings.threshold);
      if (summary.percentage !== null && summary.percentage < settings.threshold) {
        const title = `Low attendance — ${s.name}`;
        if (!already(title)) {
          pushNotification({
            kind: 'warning',
            title,
            body: `${Math.round(summary.percentage)}%. Attend the next ${summary.toReach} class${summary.toReach === 1 ? '' : 'es'} to reach ${settings.threshold}%.`,
          });
        }
      }
    });

    // Upcoming tests/exams/events within 3 days
    calendar
      .filter((c) => c.type !== 'holiday' && c.date >= today && c.date <= addDays(today, 3))
      .forEach((c) => {
        const title = `Upcoming ${c.type}: ${c.name}`;
        if (!already(title)) {
          pushNotification({ kind: c.type === 'event' ? 'event' : 'test', title, body: `On ${formatShort(c.date)}` });
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today]);
}

function sameDay(timestamp, todayISO) {
  const d = new Date(timestamp);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}` === todayISO;
}
