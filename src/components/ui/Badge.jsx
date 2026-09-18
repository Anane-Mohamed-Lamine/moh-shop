const VARIANT_STYLES = {
  new: 'bg-primary text-white',
  sale: 'bg-accent text-white',
  bestSeller: 'bg-warning text-white',
  limited: 'bg-ink text-white',
  neutral: 'bg-surface text-ink border border-border',
};

function Badge({ variant = 'neutral', children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${VARIANT_STYLES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;