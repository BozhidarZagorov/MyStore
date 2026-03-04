import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";
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
  const drawerRef = useRef(null);

  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  // Touch Start
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
    drawerRef.current.style.transition = "none";
  };

  // Touch Move
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;

    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;

    if (diff < 0) {
      drawerRef.current.style.transform = `translateX(${diff}px)`;
    }
  };

  // Touch End
  const handleTouchEnd = () => {
    isDragging.current = false;
    drawerRef.current.style.transition = "transform 0.3s ease";

    const diff = currentX.current - startX.current;

    // close on 80px
    if (diff < -80) {
      drawerRef.current.style.transform = "translateX(-100%)";
      setTimeout(() => setIsOpen(false), 300);
    } else {
      drawerRef.current.style.transform = "translateX(0)";
    }
  };

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
            `navbar-cart navbar-link ${isActive ? "navbar-link--active" : ""}`
          }
        >
          Cart{totalItems > 0 ? ` (${totalItems})` : ""}
        </NavLink>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <div
            ref={drawerRef}
            className="mobile-drawer mobile-drawer--open"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="mobile-drawer-header">
              <span>Categories</span>
            </div>

            <div className="mobile-drawer-content"> 
              {CATEGORIES.map(({ cat, label }) => (
                <NavLink
                  key={cat}
                  to={`/${cat}`}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `mobile-link ${isActive ? "mobile-link--active" : ""}`
                  }
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

          <div
            className="mobile-overlay"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </>
  );
}