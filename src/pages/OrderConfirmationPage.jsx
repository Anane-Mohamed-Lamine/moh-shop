import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

function formatPrice(price, currency) {
  if (typeof price !== 'number') return null;
  return `${price.toLocaleString('en-US').replace(/,/g, ' ')} ${currency || ''}`.trim();
}

function generatePlaceholderOrderNumber() {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `MOH-${random}`;
}

function OrderConfirmationPage() {
  const location = useLocation();
  const { state } = useContext(ProductContext);
  const { cart } = state;

  const [orderNumber] = useState(generatePlaceholderOrderNumber);

  const customer = location.state?.customer;

  if (!customer) {
    return (
      <Container className="py-28">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold text-ink">
            Checkout information unavailable
          </h1>
          <p className="text-sm text-muted">
            This confirmation page is only available right after completing
            checkout. Please place an order to see your confirmation.
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

  if (cart.length === 0) {
    return (
      <Container className="py-28">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold text-ink">
            No order items found
          </h1>
          <p className="text-sm text-muted">
            Your cart is currently empty, so there's no order summary to
            display.
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
    <Container className="py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        {/* Success Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-success"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-bold tracking-tight text-ink">Order Confirmed</h1>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Thank you, {customer.fullName}. Your order has been placed and
          we're getting it ready.
        </p>

        {/* Order Reference */}
        <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface px-6 py-4">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">
            Order Reference (frontend placeholder — not a real order)
          </span>
          <p className="text-xl font-bold tracking-tight text-ink">{orderNumber}</p>
        </div>

        {/* Customer / Delivery Summary */}
        <div className="w-full rounded-xl border border-border p-6 text-left">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink">
            Delivery Details
          </h2>
          <dl className="flex flex-col gap-2.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Full Name</dt>
              <dd className="text-right font-medium text-ink">{customer.fullName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Phone</dt>
              <dd className="text-right font-medium text-ink">{customer.phone}</dd>
            </div>
            {customer.email && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Email</dt>
                <dd className="text-right font-medium text-ink">{customer.email}</dd>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Wilaya</dt>
              <dd className="text-right font-medium text-ink">{customer.wilaya}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">City</dt>
              <dd className="text-right font-medium text-ink">{customer.city}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Address</dt>
              <dd className="text-right font-medium text-ink">{customer.address}</dd>
            </div>
            {customer.notes && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Notes</dt>
                <dd className="text-right font-medium text-ink">{customer.notes}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Next Steps */}
        <div className="w-full rounded-xl border border-border p-6 text-left">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink">
            What happens next
          </h2>
          <ul className="flex flex-col gap-2 text-sm text-muted">
            <li>Our team will review and prepare your order.</li>
            <li>You'll be contacted to confirm delivery details.</li>
            <li>Your package will be shipped to the address provided at checkout.</li>
          </ul>
        </div>

        {/* Order Summary */}
        <div className="w-full rounded-xl border border-border p-6 text-left">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink">
            Order Summary
          </h2>
          <div className="flex flex-col divide-y divide-border">
            {cart.map((item) => {
              const itemSubtotal = item.product.price * item.quantity;
              return (
                <div key={item.id} className="flex items-start justify-between gap-4 py-3 first:pt-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted">
                      {item.product.brand}
                    </span>
                    <span className="text-sm font-medium text-ink">
                      {item.product.name}
                    </span>
                    <span className="text-xs text-muted">
                      {item.selectedSize && `Size: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && ' · '}
                      {item.selectedColor && `Color: ${item.selectedColor}`}
                    </span>
                    <span className="text-xs text-muted">
                      Qty: {item.quantity} × {formatPrice(item.product.price, item.product.currency)}
                    </span>
                  </div>
                  <span className="whitespace-nowrap text-sm font-semibold text-ink">
                    {formatPrice(itemSubtotal, item.product.currency)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm text-muted">
            <span>Items ({totalQuantity})</span>
            <span>{formatPrice(subtotal, currency)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-base font-semibold text-ink">
            <span>Total</span>
            <span>{formatPrice(subtotal, currency)}</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-4 flex items-center gap-4">
          <Link to="/shop">
            <Button variant="primary" size="lg">
              Continue Shopping
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default OrderConfirmationPage;