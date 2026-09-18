import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

function formatPrice(price, currency) {
  if (typeof price !== 'number') return null;
  return `${price.toLocaleString('en-US').replace(/,/g, ' ')} ${currency || ''}`.trim();
}

function CartItemImage({ product }) {
  const hasImage = product?.images && product.images.length > 0;

  return (
    <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface">
      {hasImage ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-8 w-8 text-border"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-5-5-11 11" />
        </svg>
      )}
    </div>
  );
}

function CartPage() {
  const { state, dispatch } = useContext(ProductContext);
  const { cart } = state;

  const handleDecrease = (item) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { cartItemId: item.id, quantity: Math.max(1, item.quantity - 1) },
    });
  };

  const handleIncrease = (item) => {
    const maxQuantity = item.product.stock;
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { cartItemId: item.id, quantity: Math.min(maxQuantity, item.quantity + 1) },
    });
  };

  const handleRemove = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { cartItemId: item.id } });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  if (cart.length === 0) {
    return (
      <Container className="py-28">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-7 w-7 text-muted"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-ink">Your cart is empty</h1>
          <p className="text-sm text-muted">
            Looks like you haven't added anything yet. Explore the shop to
            find your next pair.
          </p>
          <Link to="/shop" className="mt-2">
            <Button variant="primary" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const currency = cart[0]?.product?.currency;

  return (
    <Container className="py-12">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Your Cart</h1>
        <button
          type="button"
          onClick={handleClearCart}
          className="text-sm font-medium text-muted transition-colors hover:text-error"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="col-span-2 flex flex-col divide-y divide-border">
          {cart.map((item) => {
            const itemSubtotal = item.product.price * item.quantity;
            const atMaxStock = item.quantity >= item.product.stock;

            return (
              <div key={item.id} className="flex items-center gap-6 py-6 first:pt-0">
                <CartItemImage product={item.product} />

                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted">
                    {item.product.brand}
                  </span>
                  <h3 className="text-sm font-semibold text-ink">
                    {item.product.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                  </div>
                  <span className="mt-1 text-sm font-medium text-ink">
                    {formatPrice(item.product.price, item.product.currency)}
                  </span>
                </div>

                {/* Quantity Stepper */}
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center rounded-md border border-border">
                    <button
                      type="button"
                      aria-label={`Decrease quantity for ${item.product.name}`}
                      onClick={() => handleDecrease(item)}
                      disabled={item.quantity <= 1}
                      className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40 disabled:pointer-events-none"
                    >
                      −
                    </button>
                    <span className="flex h-9 w-10 items-center justify-center text-sm font-medium text-ink">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity for ${item.product.name}`}
                      onClick={() => handleIncrease(item)}
                      disabled={atMaxStock}
                      className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40 disabled:pointer-events-none"
                    >
                      +
                    </button>
                  </div>
                  {atMaxStock && (
                    <span className="text-[11px] text-muted">Max stock reached</span>
                  )}
                </div>

                {/* Subtotal */}
                <span className="w-24 text-right text-sm font-semibold text-ink">
                  {formatPrice(itemSubtotal, item.product.currency)}
                </span>

                {/* Remove */}
                <button
                  type="button"
                  aria-label={`Remove ${item.product.name} from cart`}
                  onClick={() => handleRemove(item)}
                  className="rounded-md p-1.5 text-muted transition-colors hover:bg-surface hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className="flex h-fit flex-col gap-4 rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-ink">Order Summary</h2>

          <div className="flex items-center justify-between text-sm text-muted">
            <span>Items ({totalQuantity})</span>
            <span>{formatPrice(subtotal, currency)}</span>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4 text-base font-semibold text-ink">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal, currency)}</span>
          </div>

          <Link to="/checkout" className="mt-2">
            <Button variant="primary" size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </Link>

          <Link
            to="/shop"
            className="text-center text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default CartPage;