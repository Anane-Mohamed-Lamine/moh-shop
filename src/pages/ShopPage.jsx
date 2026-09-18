import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../data/products';
import Container from '../components/ui/Container';
import ProductGrid from '../components/product/ProductGrid';

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'sneakers', label: 'Sneakers' },
  { value: 'running', label: 'Running' },
  { value: 'shoes', label: 'Shoes' },
];

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

const VALID_CATEGORIES = CATEGORY_OPTIONS.map((c) => c.value);

function sortProducts(list, sortOption) {
  const sorted = [...list];

  switch (sortOption) {
    case 'popularity':
      return sorted.sort((a, b) => {
        if (a.isBestSeller === b.isBestSeller) return b.rating - a.rating;
        return a.isBestSeller ? -1 : 1;
      });
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => {
        if (a.isNew === b.isNew) return 0;
        return a.isNew ? -1 : 1;
      });
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
}

function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState('popularity');

  const rawCategory = searchParams.get('category');
  const activeCategory = VALID_CATEGORIES.includes(rawCategory) ? rawCategory : 'all';

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.category === activeCategory);

  const displayedProducts = sortProducts(filteredProducts, sortOption);

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <Container className="py-12">
      {/* Page Heading */}
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Shop</h1>
        <p className="text-sm text-muted">
          Browse our full collection of sneakers, running shoes, and
          everyday footwear.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-8 flex items-center justify-between border-b border-border pb-6">
        {/* Category Filter */}
        <div className="flex items-center gap-1 rounded-full bg-surface p-1" role="group" aria-label="Filter by category">
          {CATEGORY_OPTIONS.map((option) => {
            const isActive = option.value === activeCategory;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleCategoryChange(option.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Sort Control */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm font-medium text-ink">
            Sort by
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded-md border border-border bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Count */}
      <p className="mb-8 text-sm text-muted">
        {displayedProducts.length}{' '}
        {displayedProducts.length === 1 ? 'product' : 'products'}
      </p>

      {/* Product Grid */}
      <ProductGrid products={displayedProducts} />
    </Container>
  );
}

export default ShopPage;