# Attendly — Smart Attendance Tracker

A fully functional frontend prototype for a college attendance tracking app, built with React + Vite + Tailwind CSS. Runs entirely on local storage (no backend needed) but is structured so a real API can be dropped in later.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173). On first run you'll land on the login screen — enter any email/password (it's a mock auth flow) or use "Create an account" to set your own profile. The app seeds itself with sample subjects, a weekly timetable, some calendar events, and ~3 weeks of attendance history so every page has something to show.

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## What's implemented

- **Dashboard** — today's classes, overall %, today's calendar event, low-attendance warnings
- **Attendance** — one-click Present / Absent / Day Off marking for any date, with a confirmation dialog before changing an already-marked entry, plus per-entry notes
- **Timetable** — add/edit/delete weekly recurring classes per day, drives what shows up automatically on the Dashboard and Attendance pages
- **Subjects** — add/edit/delete subjects with live-calculated attendance %, 75% threshold warnings (safe/warning/critical states)
- **Calendar** — holidays, tests, exams, assignments, events; holidays automatically suppress attendance requirements for that day
- **History** — full attendance log, filterable by subject / status / month
- **Analytics** — Recharts-powered monthly bar chart, trend line, subject-wise pie chart, present-vs-absent breakdown, and plain-language predictions ("attend the next N classes to reach 75%")
- **Notifications** — auto-generated reminders for unmarked classes, low attendance, and upcoming calendar events (structured so browser Notifications could be layered on top later)
- **Profile / Settings** — editable profile, dark mode, adjustable attendance threshold, reset-to-sample-data

## Architecture notes (for future backend + React Native migration)

- `src/utils/` — pure calculation functions (attendance %, predictions, date helpers). No browser or React dependencies, safe to reuse anywhere.
- `src/services/storage.js` — the only place that talks to `localStorage`. Swap its internals for real `fetch`/API calls without touching any component.
- `src/context/` — global state (`AppContext` for app data, `AuthContext` for the mock auth). Components never touch storage directly, only these contexts.
- `src/hooks/` — `useTodayClasses` derives a day's schedule from the timetable + holiday calendar; `useReminders` generates notification content.
- `src/components/` vs `src/pages/` — small reusable UI pieces vs. route-level screens, kept separate so components can be reused if you build a React Native shell later.
- No component reaches into `window`/`document` except the dark-mode class toggle in `AppContext` and the storage service — everything else is portable.

## Tech stack

React 18 · Vite · Tailwind CSS · React Router v6 · Recharts
