// TEMPORARY DEV FILE — visual QA for the design system only.
// This is NOT a real application page and will be deleted once
// real pages (HomePage, ShopPage, etc.) exist.

import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';


const COLOR_SWATCHES = [
  ['primary', 'bg-primary'],
  ['background', 'bg-background border border-border'],
  ['surface', 'bg-surface'],
  ['ink', 'bg-ink'],
  ['muted', 'bg-muted'],
  ['border', 'bg-border'],
  ['accent', 'bg-accent'],
  ['success', 'bg-success'],
  ['error', 'bg-error'],
  ['warning', 'bg-warning'],
];

function DesignSystemPreview() {
  return (
    <div className="py-16">
      <Container className="flex flex-col gap-16">

        <section>
          <h2 className="mb-6">Colors</h2>
          <div className="grid grid-cols-5 gap-4">
            {COLOR_SWATCHES.map(([name, cls]) => (
              <div key={name} className="flex flex-col gap-2">
                <div className={`h-16 rounded-md ${cls}`} />
                <span className="text-sm text-muted">{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6">Typography</h2>
          <div className="flex flex-col gap-4">
            <p className="text-display">Display Heading</p>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <p className="text-base text-ink">
              Body text — the default paragraph style used across the store.
            </p>
            <p className="text-sm text-muted">Small / muted text for secondary information.</p>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              Label text
            </span>
          </div>
        </section>

        <section>
          <h2 className="mb-6">Buttons</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Shop Now</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Remove</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </section>

        <section>
          <h2 className="mb-6">Inputs</h2>
          <div className="max-w-sm flex flex-col gap-4">
            <Input id="email" label="Email address" placeholder="you@example.com" />
            <Input id="disabled" label="Disabled field" placeholder="Can't type here" disabled />
          </div>
        </section>

        <section>
          <h2 className="mb-6">Badges</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="new">New</Badge>
            <Badge variant="sale">Sale</Badge>
            <Badge variant="bestSeller">Best Seller</Badge>
            <Badge variant="limited">Limited</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>
        </section>

      </Container>
    </div>
  );
}

export default DesignSystemPreview;