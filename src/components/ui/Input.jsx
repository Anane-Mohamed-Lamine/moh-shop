function Input({ label, id, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full rounded-md border border-border bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:opacity-50 disabled:bg-surface ${className}`}
        {...props}
      />
    </div>
  );
}

export default Input;