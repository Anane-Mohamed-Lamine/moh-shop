import { useState } from 'react';

function ImagePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-surface">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-16 w-16 text-border"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-5-5-11 11" />
      </svg>
    </div>
  );
}

function ProductGallery({ product }) {
  const images = product?.images || [];
  const hasImages = images.length > 0;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeImage = hasImages ? images[selectedIndex] : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-surface">
        {hasImages ? (
          <img
            src={activeImage}
            alt={product?.name ? `${product.name} — view ${selectedIndex + 1}` : 'Product image'}
            className="h-full w-full object-cover"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      {/* Thumbnails */}
      {hasImages && images.length > 1 && (
        <div
          role="tablist"
          aria-label="Product images"
          className="flex items-center gap-3"
        >
          {images.map((image, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={image + index}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={
                  product?.name
                    ? `Show ${product.name} image ${index + 1}`
                    : `Show image ${index + 1}`
                }
                onClick={() => setSelectedIndex(index)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? 'border-primary'
                    : 'border-transparent ring-1 ring-border hover:ring-ink'
                }`}
              >
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;