import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";

const COLOR_MAP = {
  black: "#111827",
  white: "#f9fafb",
  gray: "#6b7280",
  silver: "#9ca3af",
  charcoal: "#374151",
  navy: "#1e3a5f",
  blue: "#2563eb",
  indigo: "#4f46e5",
  purple: "#7c3aed",
  red: "#dc2626",
  brown: "#92400e",
  neutral: "#a8a29e",
  green: "#16a34a",
};

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

  const removeColor = (color) => {
    setSelectedColors((prev) => prev.filter((c) => c !== color));
    setVisibleCount(20);
  };

  const removePriceFilter = (id) => {
    setSelectedPriceFilters((prev) => prev.filter((f) => f !== id));
    setVisibleCount(20);
  };

  const getPriceFilterLabel = (id) =>
    PRICE_FILTERS.find((f) => f.id === id)?.label ?? id;

  const activeFilterTags = [
    ...selectedColors.map((color) => ({
      key: `color-${color}`,
      label: color.charAt(0).toUpperCase() + color.slice(1),
      onRemove: () => removeColor(color),
    })),
    ...selectedPriceFilters.map((id) => ({
      key: `price-${id}`,
      label: getPriceFilterLabel(id),
      onRemove: () => removePriceFilter(id),
    })),
  ];

  return (
    <>
      <section className="plp-page">
        <div className="plp-inner">
          <div className="plp-meta-bar">
            <div className="plp-active-filters">
              {activeFilterTags.map(({ key, label, onRemove }) => (
                <span key={key} className="plp-filter-tag">
                  {label}
                  <button
                    type="button"
                    className="plp-filter-tag-remove"
                    onClick={onRemove}
                    aria-label={`Remove ${label} filter`}
                  >
                    <span className="plp-filter-tag-remove-icon" aria-hidden>×</span>
                  </button>
                </span>
              ))}
            </div>
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
                <div className="plp-color-swatches">
                  {colors.map((color) => {
                    const isSelected = selectedColors.includes(color);
                    return (
                      <button
                        key={color}
                        type="button"
                        className={`plp-color-swatch ${isSelected ? "plp-color-swatch--selected" : ""}`}
                        onClick={() => toggleColor(color)}
                        style={{ "--swatch-color": COLOR_MAP[color] ?? "#6b7280" }}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                        aria-pressed={isSelected}
                      />
                    );
                  })}
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