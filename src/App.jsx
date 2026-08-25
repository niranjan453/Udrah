import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { trackRealSession } from './utils/adminStorage'
import Nav from './components/Nav'
import CartDrawer from './components/CartDrawer'
import WelcomeModal from './components/WelcomeModal'
import Home from './pages/Home'
import Product from './pages/Product'
import SmartAir from './pages/SmartAir'
import Reserve from './pages/Reserve'
import About from './pages/About'
import Admin from './pages/Admin/Admin'

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  // Real-time visitor route telemetry
  useEffect(() => {
    if (!isAdmin) {
      trackRealSession({
        page: location.pathname,
        event: `Navigated to ${location.pathname === '/' ? 'Homepage' : location.pathname}`
      })
    }
  }, [location.pathname, isAdmin])

  return (
    <CartProvider>
      {!isAdmin && <Nav />}
      {!isAdmin && <CartDrawer />}
      {!isAdmin && <WelcomeModal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/smart-air" element={<SmartAir />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </CartProvider>
  )
}

