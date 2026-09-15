export default function Select({ label, id, children, className = '', ...props }) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <label htmlFor={selectId} className="block">
      {label && <span className="block text-xs font-medium text-ink-muted mb-1.5">{label}</span>}
      <select
        id={selectId}
        className={`w-full rounded-lg border border-ink/10 dark:border-white/10 bg-white dark:bg-ink px-3 py-2 text-sm text-ink dark:text-paper focus:border-cobalt-500 outline-none transition-colors ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
