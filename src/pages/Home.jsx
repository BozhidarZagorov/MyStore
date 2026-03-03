import { useState, useMemo, useEffect} from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";

function getProductCategory(product) {
  const img = (product.image || "").toLowerCase();
  if (img.includes("watch")) return "watches";
  if (img.includes("bag")) return "bags";
  if (img.includes("shoes")) return "shoes";
  return null;
}

const CATEGORY_INFO = {
  watches: {
    title: "Watches",
    description:
      "Discover our collection of timeless watches, from minimal classics to smart timepieces.",
  },
  bags: {
    title: "Bags",
    description:
      "Functional and stylish bags for every occasion—travel, everyday, or professional use.",
  },
  shoes: {
    title: "Shoes",
    description:
      "Comfortable and versatile footwear for daily wear and active lifestyles.",
  },
};

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

export default function Home({ category = "watches" }) {
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPriceFilters, setSelectedPriceFilters] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryProducts = useMemo(
    () => products.filter((p) => getProductCategory(p) === category),
    [category]
  );

  const minPrice = useMemo(
    () => Math.min(...categoryProducts.map(p => p.price ?? 0)),
    [categoryProducts]
  );

  const maxPrice = useMemo(
    () => Math.max(...categoryProducts.map(p => p.price ?? 0)),
    [categoryProducts]
  );

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  // Change when another category is selected
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const colors = useMemo(
    () => [...new Set(categoryProducts.map((p) => p.color))].sort(),
    [categoryProducts]
  );

  const filteredProducts = useMemo(() => {
  return categoryProducts.filter(product => {
    const colorMatch =
      selectedColors.length === 0 ||
      selectedColors.includes(product.color);

    const rangeMatch =
      (product.price ?? 0) >= priceRange[0] &&
      (product.price ?? 0) <= priceRange[1];

    const priceFilterMatch =
      selectedPriceFilters.length === 0 ||
      selectedPriceFilters.some(filterId =>
        matchesPriceFilter(product, filterId)
      );

    return colorMatch && rangeMatch && priceFilterMatch;
  });
}, [categoryProducts, selectedColors, priceRange, selectedPriceFilters]);

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

  const info = CATEGORY_INFO[category] ?? CATEGORY_INFO.watches;


  const filterContent = (
  <>
    <div className="plp-filter-group">
      <span className="plp-filter-label">Color</span>
      <div className="plp-color-swatches">
        {colors.map((color) => {
          const isSelected = selectedColors.includes(color);
          return (
            <button
              key={color}
              type="button"
              className={`plp-color-swatch ${
                isSelected ? "plp-color-swatch--selected" : ""
              }`}
              onClick={() => toggleColor(color)}
              style={{ "--swatch-color": COLOR_MAP[color] ?? "#6b7280" }}
            />
          );
        })}
      </div>
    </div>

  <div className="plp-filter-group">
    <span className="plp-filter-label">Price</span>
    <div className="plp-price-slider">
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={priceRange[0]}
        onChange={(e) => {
          const newMin = Number(e.target.value);
          setPriceRange([
            Math.min(newMin, priceRange[1]), // never allow min > max
            priceRange[1],
          ]);
        }}
      />

      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        value={priceRange[1]}
        onChange={(e) => {
          const newMax = Number(e.target.value);
          setPriceRange([
            priceRange[0],
            Math.max(newMax, priceRange[0]), // never allow max < min
          ]);
        }}
      />
        <div className="plp-price-values">
          <span>€{priceRange[0]}</span> - <span>€{priceRange[1]}</span>
        </div>
    </div>
  </div>
  <div className="plp-filter-group">
  <div className="plp-discount-filter">
    <label className="plp-checkbox">
      <input
        type="checkbox"
        checked={selectedPriceFilters.includes("discounted")}
        onChange={() => togglePriceFilter("discounted")}
      />
      <span className="plp-checkbox-custom" />
      <span>Discounted items</span>
    </label>
  </div>
</div>
  </>
);

  return (
    <>
      <section className="plp-page">
        <header className="plp-category-header">
          <h1 className="plp-category-title">{info.title}</h1>
          <p className="plp-category-description">{info.description}</p>
        </header>
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
            <div className="plp-sort-mobile-filters-wrapper">
              <button
                type="button"
                className="plp-filter-burger-btn"
                onClick={() => setIsFilterOpen((prev) => !prev)}
              >
                {isFilterOpen ? "Close Filters" : "Show Filters"}
              </button>
              {isFilterOpen && (
                <div className="plp-filter-mobile-drawer">
                  {filterContent}
                </div>
              )}
            </div>
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
            </span>        
          </div>

          <div className="plp-content">
            <aside className="plp-filters">
              <h3 className="plp-filters-title">Filter</h3>
              {filterContent}
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