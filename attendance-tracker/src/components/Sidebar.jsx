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
    <aside className="hidden md:flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r border-line bg-paper-card px-4 py-6">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="flex h-9 w-9 items-center justify-center rounded-control border border-gold/50 bg-maroon text-white shadow-sm font-display text-xs font-bold">BU</div>
        <span className="flex flex-col leading-tight">
          <span className="font-display font-bold text-base text-maroon-deep">BUConnect</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Attendance Tracker</span>
        </span>
      </div>
      <nav className="flex flex-col gap-1">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#F0DCC7] text-maroon-deep shadow-sm ring-1 ring-maroon/10'
                  : 'text-ink-muted hover:bg-paper hover:text-maroon-deep'
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
