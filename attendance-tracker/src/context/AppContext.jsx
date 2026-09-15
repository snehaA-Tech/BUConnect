import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { loadState, saveState } from '../services/storage';
import { seedSubjects, seedTimetable, seedCalendar, seedRecords } from '../data/seed';
import { todayISO } from '../utils/date';
import { ATTENDANCE_THRESHOLD_DEFAULT } from '../utils/attendance';

const AppContext = createContext(null);

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const initialState = {
  subjects: loadState('subjects', seedSubjects),
  timetable: loadState('timetable', seedTimetable),
  calendar: loadState('calendar', seedCalendar),
  records: loadState('records', seedRecords),
  notifications: loadState('notifications', []),
  settings: loadState('settings', { threshold: ATTENDANCE_THRESHOLD_DEFAULT, darkMode: false }),
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_SUBJECT':
      return { ...state, subjects: [...state.subjects, { id: uid('sub'), ...action.payload }] };
    case 'EDIT_SUBJECT':
      return {
        ...state,
        subjects: state.subjects.map((s) => (s.id === action.payload.id ? { ...s, ...action.payload } : s)),
      };
    case 'DELETE_SUBJECT':
      return {
        ...state,
        subjects: state.subjects.filter((s) => s.id !== action.payload),
        timetable: state.timetable.filter((t) => t.subjectId !== action.payload),
        records: state.records.filter((r) => r.subjectId !== action.payload),
      };

    case 'ADD_TIMETABLE_ENTRY':
      return { ...state, timetable: [...state.timetable, { id: uid('tt'), ...action.payload }] };
    case 'EDIT_TIMETABLE_ENTRY':
      return {
        ...state,
        timetable: state.timetable.map((t) => (t.id === action.payload.id ? { ...t, ...action.payload } : t)),
      };
    case 'DELETE_TIMETABLE_ENTRY':
      return { ...state, timetable: state.timetable.filter((t) => t.id !== action.payload) };

    case 'ADD_CALENDAR_EVENT':
      return { ...state, calendar: [...state.calendar, { id: uid('cal'), ...action.payload }] };
    case 'DELETE_CALENDAR_EVENT':
      return { ...state, calendar: state.calendar.filter((c) => c.id !== action.payload) };

    case 'MARK_ATTENDANCE': {
      const { subjectId, date, status, note } = action.payload;
      const existingIdx = state.records.findIndex((r) => r.subjectId === subjectId && r.date === date);
      const records = [...state.records];
      if (existingIdx >= 0) {
        records[existingIdx] = { ...records[existingIdx], status, note: note ?? records[existingIdx].note };
      } else {
        records.push({ id: uid('rec'), subjectId, date, status, note: note || '', markedAt: date });
      }
      return { ...state, records };
    }
    case 'SET_NOTE': {
      const { subjectId, date, note } = action.payload;
      return {
        ...state,
        records: state.records.map((r) => (r.subjectId === subjectId && r.date === date ? { ...r, note } : r)),
      };
    }

    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [{ id: uid('ntf'), read: false, createdAt: Date.now(), ...action.payload }, ...state.notifications].slice(0, 50) };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) => (n.id === action.payload ? { ...n, read: true } : n)),
      };
    case 'MARK_ALL_NOTIFICATIONS_READ':
      return { ...state, notifications: state.notifications.map((n) => ({ ...n, read: true })) };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case 'RESET_DEMO_DATA':
      return {
        subjects: seedSubjects,
        timetable: seedTimetable,
        calendar: seedCalendar,
        records: seedRecords,
        notifications: [],
        settings: state.settings,
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => saveState('subjects', state.subjects), [state.subjects]);
  useEffect(() => saveState('timetable', state.timetable), [state.timetable]);
  useEffect(() => saveState('calendar', state.calendar), [state.calendar]);
  useEffect(() => saveState('records', state.records), [state.records]);
  useEffect(() => saveState('notifications', state.notifications), [state.notifications]);
  useEffect(() => saveState('settings', state.settings), [state.settings]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', !!state.settings.darkMode);
  }, [state.settings.darkMode]);

  const actions = useMemo(
    () => ({
      addSubject: (payload) => dispatch({ type: 'ADD_SUBJECT', payload }),
      editSubject: (payload) => dispatch({ type: 'EDIT_SUBJECT', payload }),
      deleteSubject: (id) => dispatch({ type: 'DELETE_SUBJECT', payload: id }),

      addTimetableEntry: (payload) => dispatch({ type: 'ADD_TIMETABLE_ENTRY', payload }),
      editTimetableEntry: (payload) => dispatch({ type: 'EDIT_TIMETABLE_ENTRY', payload }),
      deleteTimetableEntry: (id) => dispatch({ type: 'DELETE_TIMETABLE_ENTRY', payload: id }),

      addCalendarEvent: (payload) => dispatch({ type: 'ADD_CALENDAR_EVENT', payload }),
      deleteCalendarEvent: (id) => dispatch({ type: 'DELETE_CALENDAR_EVENT', payload: id }),

      markAttendance: (subjectId, date, status, note) =>
        dispatch({ type: 'MARK_ATTENDANCE', payload: { subjectId, date, status, note } }),
      setNote: (subjectId, date, note) => dispatch({ type: 'SET_NOTE', payload: { subjectId, date, note } }),

      pushNotification: (payload) => dispatch({ type: 'ADD_NOTIFICATION', payload }),
      markNotificationRead: (id) => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id }),
      markAllNotificationsRead: () => dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' }),

      updateSettings: (payload) => dispatch({ type: 'UPDATE_SETTINGS', payload }),
      resetDemoData: () => dispatch({ type: 'RESET_DEMO_DATA' }),
    }),
    []
  );

  // Holiday lookup helper — calendar events of type "holiday" suppress attendance requirements (rule #6).
  const holidayByDate = useMemo(() => {
    const map = {};
    state.calendar.filter((c) => c.type === 'holiday').forEach((c) => (map[c.date] = c));
    return map;
  }, [state.calendar]);

  const recordFor = useMemo(() => {
    const map = {};
    state.records.forEach((r) => (map[`${r.subjectId}__${r.date}`] = r));
    return map;
  }, [state.records]);

  const value = { ...state, ...actions, holidayByDate, recordFor, today: todayISO() };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
