import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, totalItems, subtotal, removeFromCart, clearCart, removeOneFromCart, AddOneToCart } = useCart();
  const isEmpty = items.length === 0;

  return (
    <section className="plp-page">
      <div className="plp-inner">
        <h1 className="plp-category-title">Cart</h1>
        {isEmpty ? (
          <p className="plp-category-description">
            Your cart is empty. Add items from the product listings to get started.
          </p>
        ) : (
          <>
            <p className="plp-category-description">
              You have {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart.
            </p>

            <div className="cart-layout">
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image-wrap">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="cart-item-image"
                      />
                    </div>
                    <div className="cart-item-info">
                      <h2 className="cart-item-title">{item.title}</h2>
                      <p className="cart-item-description">{item.description}</p>
                      <div className="cart-item-meta">
                        <span className="cart-item-quantity">
                          Qty: {item.quantity}
                        </span>
                        <span className="cart-item-price">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                        <div className="cart-item-quantity-controls">
                          <button
                            type="button"
                            className="cart-item-remove-one"
                            onClick={() => removeOneFromCart(item.id)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            className="cart-item-add-one"
                            onClick={() => AddOneToCart(item.id)}
                          >
                            +
                          </button>
                        </div>
                      <button
                        type="button"
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove all
                      </button>
                      
                    </div>
                  </div>
                ))}
              </div>

              <aside className="cart-summary">
                <h2 className="cart-summary-title">Order summary</h2>
                <div className="cart-summary-row">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="cart-summary-row cart-summary-total">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  className="cart-summary-clear"
                  onClick={clearCart}
                >
                  Checkout {/* Clear cart */}
                </button>
              </aside>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
