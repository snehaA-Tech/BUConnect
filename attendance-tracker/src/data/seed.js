import { todayISO, addDays } from '../utils/date';

const t0 = todayISO();

export const seedSubjects = [
  { id: 'sub-ds', name: 'Data Structures', code: 'CS201', teacher: 'Dr. Rao', room: 'C-204', color: '#2D5BFF' },
  { id: 'sub-os', name: 'Operating Systems', code: 'CS204', teacher: 'Dr. Mehta', room: 'C-108', color: '#1B8A5A' },
  { id: 'sub-dbms', name: 'DBMS', code: 'CS205', teacher: 'Prof. Iyer', room: 'C-110', color: '#C77D0A' },
  { id: 'sub-math', name: 'Mathematics III', code: 'MA201', teacher: 'Dr. Singh', room: 'A-301', color: '#8452D5' },
];

export const seedTimetable = [
  { id: 'tt-1', subjectId: 'sub-math', day: 'Monday', start: '09:00 AM', end: '10:00 AM' },
  { id: 'tt-2', subjectId: 'sub-ds', day: 'Monday', start: '10:00 AM', end: '11:00 AM' },
  { id: 'tt-3', subjectId: 'sub-os', day: 'Monday', start: '11:00 AM', end: '12:00 PM' },
  { id: 'tt-4', subjectId: 'sub-dbms', day: 'Monday', start: '02:00 PM', end: '03:00 PM' },

  { id: 'tt-5', subjectId: 'sub-ds', day: 'Tuesday', start: '09:00 AM', end: '10:00 AM' },
  { id: 'tt-6', subjectId: 'sub-dbms', day: 'Tuesday', start: '11:00 AM', end: '12:00 PM' },

  { id: 'tt-7', subjectId: 'sub-os', day: 'Wednesday', start: '09:00 AM', end: '10:00 AM' },
  { id: 'tt-8', subjectId: 'sub-math', day: 'Wednesday', start: '10:00 AM', end: '11:00 AM' },
  { id: 'tt-9', subjectId: 'sub-ds', day: 'Wednesday', start: '02:00 PM', end: '03:00 PM' },

  { id: 'tt-10', subjectId: 'sub-dbms', day: 'Thursday', start: '09:00 AM', end: '10:00 AM' },
  { id: 'tt-11', subjectId: 'sub-math', day: 'Thursday', start: '11:00 AM', end: '12:00 PM' },

  { id: 'tt-12', subjectId: 'sub-os', day: 'Friday', start: '09:00 AM', end: '10:00 AM' },
  { id: 'tt-13', subjectId: 'sub-ds', day: 'Friday', start: '10:00 AM', end: '11:00 AM' },
  { id: 'tt-14', subjectId: 'sub-dbms', day: 'Friday', start: '02:00 PM', end: '03:00 PM' },
];

export const seedCalendar = [
  { id: 'cal-1', date: '2026-08-15', name: 'Independence Day', type: 'holiday', description: 'National holiday' },
  { id: 'cal-2', date: addDays(t0, 5), name: 'Periodical Test — Mathematics', type: 'test', description: 'Syllabus: Units 1-3' },
  { id: 'cal-3', date: addDays(t0, 12), name: 'Mid-Semester Exams begin', type: 'exam', description: 'Mid-sem week' },
  { id: 'cal-4', date: addDays(t0, -2), name: 'College Cultural Fest', type: 'event', description: 'Annual fest day' },
];

// A little attendance history so the dashboard/analytics aren't empty on first run.
export const seedRecords = (() => {
  const records = [];
  const subjects = ['sub-ds', 'sub-os', 'sub-dbms', 'sub-math'];
  const pattern = ['present', 'present', 'present', 'absent', 'present', 'present', 'absent', 'present'];
  for (let i = 20; i >= 1; i--) {
    const date = addDays(t0, -i);
    subjects.forEach((subjectId, idx) => {
      if ((i + idx) % 3 === 0) return; // not every subject meets every day
      const status = pattern[(i + idx) % pattern.length];
      records.push({
        id: `rec-${date}-${subjectId}`,
        subjectId,
        date,
        status,
        note: status === 'absent' && i % 4 === 0 ? 'Feeling unwell' : '',
        markedAt: date,
      });
    });
  }
  return records;
})();
