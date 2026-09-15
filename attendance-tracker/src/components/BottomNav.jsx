import { NavLink } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/attendance', label: 'Mark', icon: '✅' },
  { to: '/calendar', label: 'Calendar', icon: '📆' },
  { to: '/analytics', label: 'Stats', icon: '📊' },
  { to: '/profile', label: 'Profile', icon: '👤' },
];

export default function BottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/90 dark:bg-ink-soft/90 backdrop-blur border-t border-ink/5 dark:border-white/5 pb-[env(safe-area-inset-bottom)]"
      aria-label="Primary"
    >
      <div className="grid grid-cols-5">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium ${
                isActive ? 'text-cobalt-500' : 'text-ink-muted'
              }`
            }
          >
            <span className="text-lg leading-none" aria-hidden="true">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
