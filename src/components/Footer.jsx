import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          <Link to="/terms" className="footer-link">
            Terms &amp; Conditions
          </Link>
          <Link to="/privacy" className="footer-link">
            Privacy Policy
          </Link>
          <Link to="/contact" className="footer-link">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
