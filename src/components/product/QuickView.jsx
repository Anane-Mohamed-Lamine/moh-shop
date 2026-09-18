import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

function formatPrice(price, currency) {
  if (typeof price !== 'number') return null;
  return `${price.toLocaleString('en-US').replace(/,/g, ' ')} ${currency || ''}`.trim();
}

function QuickView({ product, isOpen, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const {
    slug,
    name,
    brand,
    price,
    oldPrice,
    currency,
    stock,
    isSale,
    rating,
    reviewCount,
    shortDescription,
    images,
  } = product;

  const isOutOfStock = stock === 0;
  const hasImage = images && images.length > 0;
  const formattedPrice = formatPrice(price, currency);
  const formattedOldPrice = isSale && oldPrice ? formatPrice(oldPrice, currency) : null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleViewProduct = () => {
    onClose();
    navigate(`/product/${slug}`);
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        className="relative grid w-full max-w-3xl grid-cols-2 gap-10 rounded-2xl bg-background p-8 shadow-2xl"
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close quick view"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Image */}
        <div className="aspect-square overflow-hidden rounded-xl border border-border bg-surface">
          {hasImage ? (
            <img
              src={images[0]}
              alt={name}
              className="h-full w-full object-cover"
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
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 pr-6">
          {(isSale || isOutOfStock) && (
            <div className="flex items-center gap-2">
              {isSale && <Badge variant="sale">Sale</Badge>}
              {isOutOfStock && <Badge variant="neutral">Out of Stock</Badge>}
            </div>
          )}

          {brand && (
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              {brand}
            </span>
          )}

          {name && (
            <h2 id="quick-view-title" className="text-2xl font-bold leading-tight text-ink">
              {name}
            </h2>
          )}

          {typeof rating === 'number' && (
            <div className="flex items-center gap-1 text-sm text-muted">
              <span aria-hidden="true" className="text-warning">★</span>
              <span>{rating.toFixed(1)}</span>
              {typeof reviewCount === 'number' && <span>({reviewCount})</span>}
            </div>
          )}

          {formattedPrice && (
            <div className="flex items-baseline gap-3">
              <span className="text-xl font-semibold text-ink">
                {formattedPrice}
              </span>
              {formattedOldPrice && (
                <span className="text-sm text-muted line-through">
                  {formattedOldPrice}
                </span>
              )}
            </div>
          )}

          {shortDescription && (
            <p className="border-t border-border pt-4 text-sm leading-relaxed text-muted">
              {shortDescription}
            </p>
          )}

          <p className={`text-sm font-medium ${isOutOfStock ? 'text-error' : 'text-success'}`}>
            {isOutOfStock ? 'Out of stock' : 'In stock'}
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={handleViewProduct}
            className="mt-2 w-full"
          >
            View Product
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuickView;