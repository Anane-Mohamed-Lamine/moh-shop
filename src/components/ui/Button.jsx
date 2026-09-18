const VARIANT_STYLES = {
  primary: 'bg-primary text-white hover:bg-black focus-visible:ring-primary shadow-sm',
  secondary: 'bg-surface text-ink hover:bg-border focus-visible:ring-primary',
  outline: 'bg-transparent text-ink border border-border hover:border-primary focus-visible:ring-primary',
  ghost: 'bg-transparent text-ink hover:bg-surface focus-visible:ring-primary',
  destructive: 'bg-error text-white hover:bg-red-700 focus-visible:ring-error shadow-sm',
};

const SIZE_STYLES = {
  sm: 'text-sm px-3 py-2',
  md: 'text-sm px-5 py-3',
  lg: 'text-base px-6 py-3.5',
};

function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;