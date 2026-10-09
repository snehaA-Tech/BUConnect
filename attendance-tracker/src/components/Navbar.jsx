import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { settings, updateSettings, notifications } = useApp();
  const { profile } = useAuth();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-paper/95 px-4 py-3.5 shadow-sm backdrop-blur md:px-8 dark:border-white/10 dark:bg-ink/90">
      <div className="md:hidden flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-control border border-gold/50 bg-maroon text-[10px] font-bold text-white shadow-sm">BU</div>
        <span className="flex flex-col leading-tight">
          <span className="font-display font-bold text-sm text-maroon-deep">BUConnect</span>
          <span className="text-[9px] font-semibold uppercase tracking-wider text-ink-muted">Attendance Tracker</span>
        </span>
      </div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateSettings({ darkMode: !settings.darkMode })}
          aria-label="Toggle dark mode"
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-ink/5 dark:hover:bg-white/10 text-sm"
        >
          {settings.darkMode ? '☀️' : '🌙'}
        </button>
        <Link
          to="/notifications"
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-ink/5 dark:hover:bg-white/10 text-sm"
        >
          🔔
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-crit" aria-hidden="true" />
          )}
        </Link>
        <Link to="/profile" aria-label="Profile" className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: profile.avatarColor }}>
          {profile.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
        </Link>
      </div>
    </header>
  );
}
