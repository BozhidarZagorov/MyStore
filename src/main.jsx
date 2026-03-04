import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './Styles/styles.css'
import './Styles/cart.css'
import './Styles/footer.css'
import './Styles/header.css'
import './Styles/home.css'
import './Styles/legal.css'
import './Styles/plp.css'
import './Styles/productCard.css'
import './Styles/toast.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
