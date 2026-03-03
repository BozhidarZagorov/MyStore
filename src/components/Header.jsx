import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import logo from "/logo.png";

const CATEGORIES = [
  { cat: "watches", label: "Watches" },
  { cat: "bags", label: "Bags" },
  { cat: "shoes", label: "Shoes" },
];

export default function Header({ mobileFilters }) {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button
            className="navbar-burger"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>

          <div className="navbar-logo">
            <img src={logo} alt="" className="navbar-logo-img" />
            <span className="navbar-logo-text">MyStore</span>
          </div>
        </div>

        <div className="navbar-categories">
          {CATEGORIES.map(({ cat, label }) => (
            <NavLink
              key={cat}
              to={`/${cat}`}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link--active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `navbar-cart ${isActive ? "navbar-link--active" : ""}`
          }
        >
          Cart{totalItems > 0 ? ` (${totalItems})` : ""}
        </NavLink>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? "mobile-drawer--open" : ""}`}>
        <div className="mobile-drawer-header">
          <span>Menu</span>
          <button onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="mobile-drawer-content">
          <h4>Categories</h4>
          {CATEGORIES.map(({ cat, label }) => (
            <NavLink
              key={cat}
              to={`/${cat}`}
              onClick={() => setIsOpen(false)}
              className="mobile-link"
            >
              {label}
            </NavLink>
          ))}

          {mobileFilters && (
            <>
              <h4>Filters</h4>
              {mobileFilters}
            </>
          )}
        </div>
      </div>

      {isOpen && <div className="mobile-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
}