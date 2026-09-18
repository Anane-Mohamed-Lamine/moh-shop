import { useContext, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import Button from '../ui/Button';

function ProductOptions({ product }) {
  const { dispatch } = useContext(ProductContext);

  const sizes = product?.sizes || [];
  const colors = product?.colors || [];
  const stock = product?.stock ?? 0;
  const isOutOfStock = stock === 0;

  const [selectedSize, setSelectedSize] = useState(sizes.length > 0 ? sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(colors.length > 0 ? colors[0] : null);
  const [quantity, setQuantity] = useState(isOutOfStock ? 0 : 1);
  const [feedback, setFeedback] = useState(null);

  const handleDecrease = () => {
    if (isOutOfStock) return;
    setQuantity((prev) => Math.max(1, prev - 1));
    setFeedback(null);
  };

  const handleIncrease = () => {
    if (isOutOfStock) return;
    setQuantity((prev) => Math.min(stock, prev + 1));
    setFeedback(null);
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    setFeedback(null);
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setFeedback(null);
  };

  const isAddToCartDisabled =
    isOutOfStock ||
    quantity < 1 ||
    quantity > stock ||
    (sizes.length > 0 && selectedSize === null) ||
    (colors.length > 0 && selectedColor === null);

  const handleAddToCart = () => {
    if (isAddToCartDisabled) return;

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        selectedSize,
        selectedColor,
        quantity,
      },
    });

    setFeedback('Added to cart successfully.');
  };

  return (
    <div className="flex flex-col gap-7 border-t border-border pt-7">
      {/* Size Selector */}
      {sizes.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-ink">Size</span>
            {selectedSize !== null && (
              <span className="text-xs text-muted">Selected: {selectedSize}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Select size">
            {sizes.map((size) => {
              const isSelected = size === selectedSize;
              return (
                <button
                  key={size}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Size ${size}`}
                  disabled={isOutOfStock}
                  onClick={() => handleSelectSize(size)}
                  className={`flex h-11 min-w-[2.75rem] items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none ${
                    isSelected
                      ? 'border-primary bg-primary text-white'
                      : 'border-border text-ink hover:border-ink'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {colors.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-ink">Color</span>
            {selectedColor !== null && (
              <span className="text-xs text-muted">Selected: {selectedColor}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Select color">
            {colors.map((color) => {
              const isSelected = color === selectedColor;
              return (
                <button
                  key={color}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Color ${color}`}
                  disabled={isOutOfStock}
                  onClick={() => handleSelectColor(color)}
                  className={`flex h-11 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none ${
                    isSelected
                      ? 'border-primary bg-primary text-white'
                      : 'border-border text-ink hover:border-ink'
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <span className="mb-3 block text-sm font-medium text-ink">Quantity</span>

        {isOutOfStock ? (
          <p className="text-sm font-medium text-error">
            This product is currently out of stock.
          </p>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-md border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40 disabled:pointer-events-none"
              >
                −
              </button>
              <span className="flex h-11 w-12 items-center justify-center text-sm font-medium text-ink">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={handleIncrease}
                disabled={quantity >= stock}
                className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40 disabled:pointer-events-none"
              >
                +
              </button>
            </div>
            <span className="text-xs text-muted">{stock} available</span>
          </div>
        )}
      </div>

      {/* Add to Cart */}
      <Button
        type="button"
        variant="primary"
        size="lg"
        disabled={isAddToCartDisabled}
        onClick={handleAddToCart}
        className="w-full"
      >
        {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
      </Button>

      {feedback && (
        <p role="status" className="-mt-3 text-sm font-medium text-success">
          {feedback}
        </p>
      )}
    </div>
  );
}

export default ProductOptions;