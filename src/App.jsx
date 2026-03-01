import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Navigate to="/watches" replace />} />
              <Route path="/watches" element={<Home category="watches" />} />
              <Route path="/bags" element={<Home category="bags" />} />
              <Route path="/shoes" element={<Home category="shoes" />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;