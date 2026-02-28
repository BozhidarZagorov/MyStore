import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">MyStore</h2>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/cart" className="navbar-link">
          Cart
        </Link>
      </div>
    </nav>
  );
}