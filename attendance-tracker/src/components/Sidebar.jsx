import { NavLink } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/attendance', label: 'Attendance', icon: '✅' },
  { to: '/timetable', label: 'Timetable', icon: '🗓️' },
  { to: '/subjects', label: 'Subjects', icon: '📚' },
  { to: '/calendar', label: 'Calendar', icon: '📆' },
  { to: '/history', label: 'History', icon: '🕓' },
  { to: '/analytics', label: 'Analytics', icon: '📊' },
  { to: '/notifications', label: 'Notifications', icon: '🔔' },
  { to: '/profile', label: 'Profile', icon: '👤' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r border-ink/5 dark:border-white/5 px-4 py-6">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-cobalt-500 flex items-center justify-center text-white font-display font-bold text-sm">A</div>
        <span className="font-display font-bold text-lg">Attendly</span>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-cobalt-50 text-cobalt-600 dark:bg-cobalt-500/15 dark:text-cobalt-100'
                  : 'text-ink-muted hover:bg-ink/5 dark:hover:bg-white/5'
              }`
            }
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
