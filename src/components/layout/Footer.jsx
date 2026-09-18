import { Link } from 'react-router-dom';
import Container from '../ui/Container';

const SHOP_LINKS = [
  { label: 'Shop', to: '/shop' },
  { label: 'Sneakers', to: '/shop?category=sneakers' },
  { label: 'Running', to: '/shop?category=running' },
  { label: 'Shoes', to: '/shop?category=shoes' },
  { label: 'New Arrivals', to: '/shop?sort=newest' },
];

const INFO_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Shipping & Delivery', to: '/shipping' },
  { label: 'Exchange Policy', to: '/exchange-policy' },
  { label: 'FAQ', to: '/faq' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5" aria-hidden="true">
        <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5" aria-hidden="true">
        <path d="M14 3v10.5a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M14 3c0 2.5 2 4.5 4.5 4.5" />
      </svg>
    ),
  },
];

function FooterHeading({ children }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-wider text-ink mb-5">
      {children}
    </h3>
  );
}

function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <Container>
        <div className="grid grid-cols-4 gap-12 py-20">
          <div>
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-ink">
              MOH<span className="text-accent">.</span> SHOP
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Modern sneakers, running shoes, and everyday footwear, curated
              for people who care about how they move.
            </p>

            <ul className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Shop links">
            <FooterHeading>Shop</FooterHeading>
            <ul className="flex flex-col gap-3.5">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Information links">
            <FooterHeading>Information</FooterHeading>
            <ul className="flex flex-col gap-3.5">
              {INFO_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <FooterHeading>Customer Service</FooterHeading>
            <ul className="flex flex-col gap-3.5 text-sm text-muted">
              <li>Support: +213 XX XX XX XX</li>
              <li>Email: support@example.com</li>
              <li>Delivery across Algeria, 2–5 business days</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border py-6">
          <p className="text-xs text-muted">
            © 2026 MOH SHOP. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-xs text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;