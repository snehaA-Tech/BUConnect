import { useApp } from '../context/AppContext';
import NotificationCard from '../components/NotificationCard';
import Button from '../components/Button';

export default function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl">Notifications</h1>
          <p className="text-sm text-ink-muted mt-1">{unread} unread</p>
        </div>
        {unread > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllNotificationsRead}>Mark all as read</Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="card p-8 text-center text-sm text-ink-muted">
          You're all caught up. Reminders about unmarked classes, low attendance, and upcoming tests will show up here.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((n) => (
            <NotificationCard key={n.id} notification={n} onRead={markNotificationRead} />
          ))}
        </div>
      )}
    </div>
  );
}
