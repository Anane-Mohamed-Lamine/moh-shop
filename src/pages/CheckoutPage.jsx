import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

function formatPrice(price, currency) {
  if (typeof price !== 'number') return null;
  return `${price.toLocaleString('en-US').replace(/,/g, ' ')} ${currency || ''}`.trim();
}

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  email: '',
  wilaya: '',
  city: '',
  address: '',
  notes: '',
};

const REQUIRED_FIELDS = ['fullName', 'phone', 'wilaya', 'city', 'address'];

function CheckoutPage() {
  const { state } = useContext(ProductContext);
  const { cart } = state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    REQUIRED_FIELDS.forEach((field) => {
      if (!formData[field] || !formData[field].trim()) {
        newErrors[field] = 'This field is required.';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) return;

    const isValid = validate();
    if (!isValid) return;

    navigate('/order-confirmation', {
      state: {
        customer: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          wilaya: formData.wilaya,
          city: formData.city,
          address: formData.address,
          notes: formData.notes,
        },
      },
    });
  };

  if (cart.length === 0) {
    return (
      <Container className="py-28">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold text-ink">
            Your cart is empty
          </h1>
          <p className="text-sm text-muted">
            Add some products to your cart before proceeding to checkout.
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
        <h1 className="text-3xl font-bold tracking-tight text-ink">Checkout</h1>
        <Link
          to="/cart"
          className="text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          ← Back to Cart
        </Link>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="col-span-2 flex flex-col gap-12">
            {/* Customer Information */}
            <section className="flex flex-col gap-5">
              <h2 className="text-lg font-semibold text-ink">
                Customer Information
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 flex flex-col gap-1">
                  <Input
                    id="fullName"
                    label="Full Name"
                    value={formData.fullName}
                    onChange={handleChange('fullName')}
                    placeholder="Your full name"
                  />
                  {errors.fullName && (
                    <span className="text-xs text-error">{errors.fullName}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Input
                    id="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    placeholder="0X XX XX XX XX"
                  />
                  {errors.phone && (
                    <span className="text-xs text-error">{errors.phone}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Input
                    id="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </section>

            {/* Delivery Information */}
            <section className="flex flex-col gap-5">
              <h2 className="text-lg font-semibold text-ink">
                Delivery Information
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <Input
                    id="wilaya"
                    label="Wilaya"
                    value={formData.wilaya}
                    onChange={handleChange('wilaya')}
                    placeholder="e.g. Algiers"
                  />
                  {errors.wilaya && (
                    <span className="text-xs text-error">{errors.wilaya}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Input
                    id="city"
                    label="City"
                    value={formData.city}
                    onChange={handleChange('city')}
                    placeholder="e.g. Bab Ezzouar"
                  />
                  {errors.city && (
                    <span className="text-xs text-error">{errors.city}</span>
                  )}
                </div>

                <div className="col-span-2 flex flex-col gap-1">
                  <Input
                    id="address"
                    label="Full Delivery Address"
                    value={formData.address}
                    onChange={handleChange('address')}
                    placeholder="Street, building, apartment..."
                  />
                  {errors.address && (
                    <span className="text-xs text-error">{errors.address}</span>
                  )}
                </div>

                <div className="col-span-2 flex flex-col gap-1.5">
                  <label htmlFor="notes" className="text-sm font-medium text-ink">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={handleChange('notes')}
                    placeholder="Delivery instructions, landmark, etc. (optional)"
                    rows={3}
                    className="w-full rounded-md border border-border bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div className="flex h-fit flex-col gap-4 rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-ink">Order Summary</h2>

            <div className="flex flex-col divide-y divide-border">
              {cart.map((item) => {
                const itemSubtotal = item.product.price * item.quantity;
                return (
                  <div key={item.id} className="flex items-start justify-between gap-4 py-4 first:pt-0">
                    <div className="flex flex-col gap-0.5">
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

            <div className="flex items-center justify-between text-sm text-muted">
              <span>Items ({totalQuantity})</span>
              <span>{formatPrice(subtotal, currency)}</span>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4 text-base font-semibold text-ink">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal, currency)}</span>
            </div>

            <Button type="submit" variant="primary" size="lg" className="mt-2 w-full">
              Place Order
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
}

export default CheckoutPage;