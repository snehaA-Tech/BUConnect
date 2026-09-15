import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { dayNameFromISO, timeToMinutes } from '../utils/date';

/**
 * Returns today's classes generated automatically from the timetable (rule #17.1),
 * each enriched with its subject, any existing attendance record, and holiday status.
 */
export function useClassesForDate(dateISO) {
  const { timetable, subjects, recordFor, holidayByDate } = useApp();

  return useMemo(() => {
    const dayName = dayNameFromISO(dateISO);
    const holiday = holidayByDate[dateISO];
    const subjectById = Object.fromEntries(subjects.map((s) => [s.id, s]));

    return timetable
      .filter((t) => t.day === dayName && subjectById[t.subjectId])
      .map((t) => ({
        ...t,
        subject: subjectById[t.subjectId],
        record: recordFor[`${t.subjectId}__${dateISO}`],
        holiday,
      }))
      .sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
  }, [timetable, subjects, recordFor, holidayByDate, dateISO]);
}

export function useTodayClasses() {
  const { today } = useApp();
  return useClassesForDate(today);
}
