import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "/logo.png";

const CATEGORIES = [
  { cat: "watches", label: "Watches" },
  { cat: "bags", label: "Bags" },
  { cat: "shoes", label: "Shoes" },
];

export default function Header() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-logo" aria-label="MyStore">
        <img src={logo} alt="" className="navbar-logo-img" />
        <span className="navbar-logo-text">MyStore</span>
      </div>
      <div className="navbar-categories">
        {CATEGORIES.map(({ cat, label }) => (
          <NavLink
            key={cat}
            to={`/${cat}`}
            className={({ isActive }) =>
              `navbar-link ${isActive ? "navbar-link--active" : ""}`
            }
            end={false}
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
  );
}