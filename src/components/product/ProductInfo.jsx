import Badge from '../ui/Badge';

function formatPrice(price, currency) {
  if (typeof price !== 'number') return null;
  return `${price.toLocaleString('en-US').replace(/,/g, ' ')} ${currency || ''}`.trim();
}

function ProductInfo({ product }) {
  if (!product) return null;

  const {
    brand,
    name,
    rating,
    reviewCount,
    price,
    oldPrice,
    currency,
    isSale,
    isNew,
    isBestSeller,
    stock,
    shortDescription,
  } = product;

  const isOutOfStock = stock === 0;
  const formattedPrice = formatPrice(price, currency);
  const formattedOldPrice = isSale && oldPrice ? formatPrice(oldPrice, currency) : null;

  let badge = null;
  if (isSale) badge = { variant: 'sale', label: 'Sale' };
  else if (isNew) badge = { variant: 'new', label: 'New' };
  else if (isBestSeller) badge = { variant: 'bestSeller', label: 'Best Seller' };

  return (
    <div className="flex flex-col gap-5">
      {/* Badges */}
      {(badge || isOutOfStock) && (
        <div className="flex items-center gap-2">
          {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
          {isOutOfStock && <Badge variant="neutral">Out of Stock</Badge>}
        </div>
      )}

      {/* Brand */}
      {brand && (
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {brand}
        </span>
      )}

      {/* Name */}
      {name && (
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-ink">
          {name}
        </h1>
      )}

      {/* Rating */}
      {typeof rating === 'number' && (
        <div className="flex items-center gap-1 text-sm text-muted">
          <span aria-hidden="true" className="text-warning">★</span>
          <span>{rating.toFixed(1)}</span>
          {typeof reviewCount === 'number' && (
            <span>
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </div>
      )}

      {/* Price */}
      {formattedPrice && (
        <div className="flex items-baseline gap-3 border-t border-border pt-5">
          <span className="text-2xl font-semibold text-ink">
            {formattedPrice}
          </span>
          {formattedOldPrice && (
            <span className="text-base text-muted line-through">
              {formattedOldPrice}
            </span>
          )}
        </div>
      )}

      {/* Short description */}
      {shortDescription && (
        <p className="text-sm leading-relaxed text-muted">
          {shortDescription}
        </p>
      )}

      {/* Stock status */}
      <p className={`text-sm font-medium ${isOutOfStock ? 'text-error' : 'text-success'}`}>
        {isOutOfStock ? 'Out of stock' : 'In stock'}
      </p>
    </div>
  );
}

export default ProductInfo;