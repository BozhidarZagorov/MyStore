import { createContext, useContext, useMemo, useState } from "react";
import { useToast } from "../context/ToastContext";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const { showToast } = useToast();

  const addToCart = (product) => {
    if (!product) return;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const removeOneFromCart = (productId) => {
    setItems((prev) => prev.map((item) => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0));
  };

  const AddOneToCart = (productId) => {
    setItems((prev) => prev.map((item) => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const clearCart = () => {
    setItems([]);
    showToast("Products bought");
  }

  const value = useMemo(() => {
    const totalItems = items.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * (item.quantity || 0),
      0
    );

    return {
      items,
      addToCart,
      removeFromCart,
      removeOneFromCart,
      AddOneToCart,
      clearCart,
      totalItems,
      subtotal,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

