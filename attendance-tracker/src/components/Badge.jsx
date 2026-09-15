const styles = {
  safe: 'bg-safe-bg text-safe dark:bg-safe/15 dark:text-emerald-300',
  warn: 'bg-warn-bg text-warn dark:bg-warn/15 dark:text-amber-300',
  crit: 'bg-crit-bg text-crit dark:bg-crit/15 dark:text-red-300',
  none: 'bg-ink/5 text-ink-muted dark:bg-white/10',
  info: 'bg-cobalt-50 text-cobalt-600 dark:bg-cobalt-500/15 dark:text-cobalt-100',
};

export default function Badge({ tone = 'none', children, className = '' }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${styles[tone]} ${className}`}>
      {children}
    </span>
  );
}
