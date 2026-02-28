import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";

const PRICE_FILTERS = [
  { id: "discounted", label: "Discounted items" },
  { id: "under50", label: "Under €50" },
  { id: "50-100", label: "€50 – €100" },
  { id: "over100", label: "Over €100" },
];

function matchesPriceFilter(product, filterId) {
  switch (filterId) {
    case "discounted":
      return product.originalPrice != null && product.originalPrice > product.price;
    case "under50":
      return product.price < 50;
    case "50-100":
      return product.price >= 50 && product.price <= 100;
    case "over100":
      return product.price > 100;
    default:
      return false;
  }
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "az", label: "Alphabetical (A–Z)" },
  { value: "za", label: "Alphabetical (Z–A)" },
  { value: "priceLow", label: "Price (Low to High)" },
  { value: "priceHigh", label: "Price (High to Low)" },
];

function sortProducts(list, sortBy) {
  const arr = [...list];
  switch (sortBy) {
    case "az":
      return arr.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    case "za":
      return arr.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    case "priceLow":
      return arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    case "priceHigh":
      return arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    default:
      return arr;
  }
}

export default function Home() {
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPriceFilters, setSelectedPriceFilters] = useState([]);
  const [sortBy, setSortBy] = useState("featured");

  const colors = useMemo(
    () => [...new Set(products.map((p) => p.color))].sort(),
    []
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const colorMatch =
        selectedColors.length === 0 ||
        selectedColors.includes(product.color);
      const priceMatch =
        selectedPriceFilters.length === 0 ||
        selectedPriceFilters.some((id) => matchesPriceFilter(product, id));
      return colorMatch && priceMatch;
    });
  }, [selectedColors, selectedPriceFilters]);

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortBy),
    [filteredProducts, sortBy]
  );

  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const canLoadMore = visibleCount < sortedProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 20, sortedProducts.length));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setVisibleCount(20);
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) => {
      const next = prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color];
      setVisibleCount(20);
      return next;
    });
  };

  const togglePriceFilter = (id) => {
    setSelectedPriceFilters((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      setVisibleCount(20);
      return next;
    });
  };

  return (
    <>
      <section className="plp-page">
        <div className="plp-inner">
          <div className="plp-meta-bar">
            <span className="plp-product-count">
              {visibleProducts.length} out of {sortedProducts.length} products displayed
            </span>
            <div className="plp-sort">
              <span>Sort by</span>
              <select value={sortBy} onChange={handleSortChange}>
                {SORT_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="plp-content">
            <aside className="plp-filters">
              <h3 className="plp-filters-title">Filter</h3>

              <div className="plp-filter-group">
                <span className="plp-filter-label">Color</span>
                <div className="plp-checkbox-list">
                  {colors.map((color) => (
                    <label key={color} className="plp-checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleColor(color)}
                      />
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <div className="plp-filter-group">
                <span className="plp-filter-label">Price</span>
                <div className="plp-checkbox-list">
                  {PRICE_FILTERS.map(({ id, label }) => (
                    <label key={id} className="plp-checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedPriceFilters.includes(id)}
                        onChange={() => togglePriceFilter(id)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            <div>
              <div className="product-grid">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="plp-load-more">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={!canLoadMore}
                  className={!canLoadMore ? "plp-load-more--inactive" : ""}
                >
                  {canLoadMore ? "Load more products" : "That's it for now!"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}