import ProductCard from './ProductCard';

function ProductGrid({ products = [], className = '' }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-24 text-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-10 w-10 text-border"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-5-5-11 11" />
        </svg>
        <p className="text-sm text-muted">No products found.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;