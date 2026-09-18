import { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import QuickView from './QuickView';

function formatPrice(price, currency) {
  return `${price.toLocaleString('en-US').replace(/,/g, ' ')} ${currency}`;
}

function ProductCard({ product, className = '' }) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  if (!product) return null;

  const {
    slug,
    name,
    brand,
    price,
    oldPrice,
    currency,
    stock,
    isNew,
    isSale,
    isBestSeller,
    rating,
    reviewCount,
    images,
  } = product;

  const isOutOfStock = stock === 0;
  const hasImage = images && images.length > 0;

  let badge = null;
  if (isSale) badge = { variant: 'sale', label: 'Sale' };
  else if (isNew) badge = { variant: 'new', label: 'New' };
  else if (isBestSeller) badge = { variant: 'bestSeller', label: 'Best Seller' };

  const handleQuickViewOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const handleQuickViewClose = () => {
    setIsQuickViewOpen(false);
  };

  return (
    <div className={`group relative ${className}`}>
      {/* Image area (navigable) */}
      <div className="relative">
        <Link to={`/product/${slug}`} className="block">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-surface transition-shadow duration-200 group-hover:shadow-md">
            {hasImage ? (
              <img
                src={images[0]}
                alt={name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-12 w-12 text-border"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-5-5-11 11" />
                </svg>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
              {isOutOfStock && <Badge variant="neutral">Out of Stock</Badge>}
            </div>
          </div>
        </Link>

        {/* Quick View trigger */}
        <button
          type="button"
          onClick={handleQuickViewOpen}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink opacity-0 shadow-md transition-all duration-200 hover:bg-surface focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick View
        </button>
      </div>

      {/* Info (navigable) */}
      <Link to={`/product/${slug}`} className="block">
        <div className="mt-4 flex flex-col gap-1.5">
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            {brand}
          </span>

          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
            {name}
          </h3>

          {typeof rating === 'number' && (
            <div className="flex items-center gap-1 text-xs text-muted">
              <span aria-hidden="true" className="text-warning">★</span>
              <span>{rating.toFixed(1)}</span>
              {typeof reviewCount === 'number' && <span>({reviewCount})</span>}
            </div>
          )}

          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="text-sm font-semibold text-ink">
              {formatPrice(price, currency)}
            </span>
            {isSale && oldPrice && (
              <span className="text-xs text-muted line-through">
                {formatPrice(oldPrice, currency)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <QuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={handleQuickViewClose}
      />
    </div>
  );
}

export default ProductCard;