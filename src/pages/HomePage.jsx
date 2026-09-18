import { Link } from 'react-router-dom';
import { products } from '../data/products';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ProductGrid from '../components/product/ProductGrid';

const CATEGORIES = [
  {
    name: 'Sneakers',
    description: 'Everyday streetwear silhouettes.',
    to: '/shop?category=sneakers',
    image: '/images/urban-runner-black.jpg',
  },
  {
    name: 'Running',
    description: 'Performance built for distance.',
    to: '/shop?category=running',
    image: '/images/velocity-runner-grey.jpg',
  },
  {
    name: 'Shoes',
    description: 'Refined footwear for every day.',
    to: '/shop?category=shoes',
    image: '/images/heritage-loafer-brown.jpg',
  },
];

function SectionHeader({ eyebrow, title }) {
  return (
    <div className="mb-12 flex items-end justify-between">
      <div>
        {eyebrow && (
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-ink">{title}</h2>
      </div>
    </div>
  );
}

function HomePage() {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      {/* A. Hero Section */}
      <section className="border-b border-border bg-surface">
        <Container>
          <div className="grid grid-cols-2 items-center gap-16 py-28">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                New Season
              </span>
              <h1 className="text-display">
                Step into your next favorite pair.
              </h1>
              <p className="max-w-md text-base leading-relaxed text-muted">
                Modern sneakers, running shoes, and everyday footwear,
                curated for people who care about how they move.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Link to="/shop">
                  <Button variant="primary" size="lg">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/shop?category=sneakers">
                  <Button variant="outline" size="lg">
                    Explore Sneakers
                  </Button>
                </Link>
              </div>
            </div>

            <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              <img
                src="/images/urban-runner-black.jpg"
                alt="Urban Runner sneaker"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* B. Category Section */}
      <section className="py-24">
        <Container>
          <SectionHeader eyebrow="Discover" title="Shop by Category" />
          <div className="grid grid-cols-3 gap-8">
            {CATEGORIES.map((category) => (
              <Link
                key={category.name}
                to={category.to}
                className="group flex flex-col gap-4 rounded-xl border border-border p-6 transition-all duration-200 hover:border-ink hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-surface">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-accent">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* C. Featured / Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="border-t border-border py-24">
          <Container>
            <SectionHeader eyebrow="Fan Favorites" title="Best Sellers" />
            <ProductGrid products={bestSellers} />
          </Container>
        </section>
      )}

      {/* D. New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="border-t border-border py-24">
          <Container>
            <SectionHeader eyebrow="Just Dropped" title="New Arrivals" />
            <ProductGrid products={newArrivals} />
          </Container>
        </section>
      )}

      {/* E. Promotional Section */}
      <section className="bg-primary py-24">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white">
              Refresh your rotation this season.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/70">
              New styles are landing every week. Find the pair that fits
              your pace and your style.
            </p>
            <Link to="/shop" className="pt-2">
              <Button variant="secondary" size="lg">
                Browse the Collection
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* F. Brand / Trust Section */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                Quality First
              </h3>
              <p className="max-w-[16rem] text-sm leading-relaxed text-muted">
                Every pair is selected for durability and everyday comfort,
                not just looks.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                Delivery Across Algeria
              </h3>
              <p className="max-w-[16rem] text-sm leading-relaxed text-muted">
                We ship to wilayas across the country so you can shop from
                wherever you are.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                Easy Exchanges
              </h3>
              <p className="max-w-[16rem] text-sm leading-relaxed text-muted">
                Not the right fit? We make exchanging your size straightforward.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default HomePage;