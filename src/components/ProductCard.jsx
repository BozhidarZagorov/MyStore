export default function ProductCard({ product }) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <article className="product-card">
      <div className="product-card-image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-card-image"
        />
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{product.title}</h3>
        {product.description && (
          <p className="product-card-description">{product.description}</p>
        )}
        <div className="product-card-pricing">
          {hasDiscount && (
            <>
              <span className="product-price-original">
                €{product.originalPrice.toFixed(2)}
              </span>
              <span className="product-price-badge">-{discountPercent}%</span>
            </>
          )}
        </div>
        <div className="product-price-current">
           €{product.price.toFixed(2)}
        </div>
        <div className="product-card-meta">
          <span className="product-rating">
            {"★".repeat(Math.round(product.rating || 4))}{" "}
          </span>
        </div>
        <button
          className="product-add-to-cart"
          onClick={() => alert("Product added to cart")}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}