const styles = {
  safe: 'border border-teal/20 bg-safe-bg text-teal-deep dark:bg-safe/15 dark:text-emerald-300',
  warn: 'border border-gold/30 bg-warn-bg text-ink dark:bg-warn/15 dark:text-amber-300',
  crit: 'border border-maroon/20 bg-crit-bg text-maroon-deep dark:bg-crit/15 dark:text-red-300',
  none: 'border border-line bg-paper text-ink-muted dark:bg-white/10',
  info: 'border border-maroon/15 bg-[#F0DCC7] text-maroon-deep dark:bg-cobalt-500/15 dark:text-cobalt-100',
};

export default function Badge({ tone = 'none', children, className = '' }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${styles[tone]} ${className}`}>
      {children}
    </span>
  );
}
