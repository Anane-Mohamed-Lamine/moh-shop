import { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Container from '../ui/Container';
import { ProductContext } from '../../context/ProductContext';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Sneakers', to: '/shop?category=sneakers' },
  { label: 'Running', to: '/shop?category=running' },
  { label: 'Shoes', to: '/shop?category=shoes' },
];

function SearchIcon() {
  return (
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
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CartIcon() {
  return (
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function Header() {
  const { state } = useContext(ProductContext);
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const location = useLocation();
  const currentSearchParams = new URLSearchParams(location.search);
  const currentCategory = currentSearchParams.get('category');

  // NavLink's built-in isActive only compares pathname, so every
  // /shop?category=... link would appear active simultaneously.
  // We determine active state manually per item instead.
  const isNavItemActive = (item) => {
    if (item.to === '/') {
      return location.pathname === '/';
    }

    const [itemPath, itemQuery] = item.to.split('?');
    if (location.pathname !== itemPath) return false;

    if (!itemQuery) {
      // Plain "/shop" link — active only when there is no category filter.
      return !currentCategory;
    }

    const itemCategory = new URLSearchParams(itemQuery).get('category');
    return currentCategory === itemCategory;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container>
        <div className="flex h-20 items-center justify-between gap-10">
          {/* Brand */}
          <Link
            to="/"
            className="shrink-0 text-2xl font-extrabold tracking-tight text-ink transition-opacity hover:opacity-80"
          >
            MOH<span className="text-accent">.</span>
          </Link>

          {/* Main Navigation */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {NAV_ITEMS.map((item) => {
                const active = isNavItemActive(item);
                return (
                  <li key={item.label}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={`relative py-1 text-sm font-medium transition-colors hover:text-ink ${
                        active ? 'text-ink' : 'text-muted'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute -bottom-[1px] left-0 h-[2px] w-full bg-ink" />
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <SearchIcon />
            </button>

            <Link
              to="/cart"
              aria-label="View cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <CartIcon />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white ring-2 ring-background">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;