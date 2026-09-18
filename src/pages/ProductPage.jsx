import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductOptions from '../components/product/ProductOptions';

function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-6 py-32 text-center">
        <h1 className="text-2xl font-bold text-ink">Product not found</h1>
        <p className="text-sm text-muted">
          We couldn't find the product you're looking for. It may have been
          removed or the link may be incorrect.
        </p>
        <Link
          to="/shop"
          className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-black"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-container px-6 py-12 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-10">
        <ol className="flex items-center gap-2 text-sm text-muted">
          <li>
            <Link to="/" className="transition-colors hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">/</li>
          <li>
            <Link to="/shop" className="transition-colors hover:text-ink">
              Shop
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">/</li>
          <li aria-current="page" className="font-medium text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-2 gap-16">
        <ProductGallery product={product} />

        <div className="flex flex-col gap-8">
          <ProductInfo product={product} />
          <ProductOptions product={product} />
        </div>
      </div>

      {/* Product Details Section */}
      <section className="mt-24 border-t border-border pt-14">
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-ink">Product Details</h2>
            <p className="text-sm leading-relaxed text-muted">
              {product.description}
            </p>

            {product.tags && product.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-border p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Specifications
            </h3>
            <dl className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Brand</dt>
                <dd className="font-medium text-ink">{product.brand}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Category</dt>
                <dd className="font-medium capitalize text-ink">{product.category}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Shipping / Trust Section */}
      <section className="mt-14 border-t border-border pt-14">
        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Delivery
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              We deliver across Algeria. Delivery times may vary depending
              on your wilaya.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Exchanges
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              If the fit isn't right, we make exchanging your size
              straightforward.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Quality
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Every product is selected with attention to comfort,
              durability, and everyday wear.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Shop */}
      <div className="mt-14 border-t border-border pt-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          ← Back to Shop
        </Link>
      </div>
    </div>
  );
}

export default ProductPage;