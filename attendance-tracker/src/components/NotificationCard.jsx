const ICONS = {
  reminder: '🕐',
  warning: '⚠️',
  test: '📝',
  event: '📅',
  info: 'ℹ️',
};

export default function NotificationCard({ notification, onRead }) {
  return (
    <button
      onClick={() => !notification.read && onRead(notification.id)}
      className={`w-full text-left card p-3.5 flex items-start gap-3 transition-colors ${
        notification.read ? 'opacity-60' : ''
      }`}
    >
      <span className="text-lg leading-none mt-0.5">{ICONS[notification.kind] || 'ℹ️'}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{notification.title}</p>
        {notification.body && <p className="text-xs text-ink-muted mt-0.5">{notification.body}</p>}
      </div>
      {!notification.read && <span className="w-2 h-2 rounded-full bg-cobalt-500 mt-1.5 shrink-0" aria-label="Unread" />}
    </button>
  );
}
