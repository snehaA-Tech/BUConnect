export default function Input({ label, id, className = '', ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <label htmlFor={inputId} className="block">
      {label && <span className="block text-xs font-medium text-ink-muted mb-1.5">{label}</span>}
      <input
        id={inputId}
        className={`w-full rounded-lg border border-ink/10 dark:border-white/10 bg-white dark:bg-ink px-3 py-2 text-sm text-ink dark:text-paper placeholder:text-ink-muted/60 focus:border-cobalt-500 outline-none transition-colors ${className}`}
        {...props}
      />
    </label>
  );
}
