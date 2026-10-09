const variants = {
  primary: 'bg-maroon text-white shadow-sm hover:bg-maroon-deep hover:shadow-card active:scale-[0.98]',
  ghost: 'bg-transparent text-ink dark:text-paper hover:bg-paper dark:hover:bg-white/10',
  outline: 'bg-white border border-line text-ink dark:text-paper hover:border-maroon/35 hover:bg-paper-card dark:hover:bg-white/10',
  danger: 'bg-crit text-white shadow-sm hover:bg-maroon-deep hover:shadow-card',
  safe: 'bg-safe text-white shadow-sm hover:opacity-90 hover:shadow-card',
  warn: 'bg-warn text-ink shadow-sm hover:opacity-90 hover:shadow-card',
};

const sizes = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
};

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-control font-semibold transition-all duration-150 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
