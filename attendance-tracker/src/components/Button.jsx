const variants = {
  primary: 'bg-cobalt-500 text-white hover:bg-cobalt-600 active:scale-[0.98]',
  ghost: 'bg-transparent text-ink dark:text-paper hover:bg-ink/5 dark:hover:bg-white/10',
  outline: 'bg-transparent border border-ink/15 dark:border-white/15 text-ink dark:text-paper hover:bg-ink/5 dark:hover:bg-white/10',
  danger: 'bg-crit text-white hover:opacity-90',
  safe: 'bg-safe text-white hover:opacity-90',
  warn: 'bg-warn text-white hover:opacity-90',
};

const sizes = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
};

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl font-medium transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
