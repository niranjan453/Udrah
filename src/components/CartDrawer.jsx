import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartIcon from './CartIcon'
import './CartDrawer.css'

export default function CartDrawer() {
  const { isOpen, closeCart, items, totalCount, subtotal, updateQuantity, removeItem } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeCart])

  const handleCheckout = () => {
    closeCart()
    navigate('/reserve')
  }

  return (
    <div className={`cart-drawer-root ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      {/* Backdrop */}
      <div className="cart-backdrop" onClick={closeCart} />

      {/* Drawer Container */}
      <aside className="cart-panel" role="dialog" aria-label="Shopping Bag">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <CartIcon size={24} color="var(--green)" />
            <span>Your Bag</span>
            {totalCount > 0 && <span className="cart-header-count">({totalCount})</span>}
          </div>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Close bag">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                <CartIcon size={56} color="rgba(205,212,203,0.3)" />
              </div>
              <h3>Your bag is empty</h3>
              <p>Explore the living biotech air purification system and reserve your unit.</p>
              <button
                className="btn btn-primary-on-dark"
                onClick={() => { closeCart(); navigate('/product') }}
                style={{ marginTop: 20 }}
              >
                Explore Product
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-preview">
                    <div className="cart-item-circle-glow" />
                    <img src="/logo.png" alt="UDRAH" className="cart-item-img" />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <h4 className="cart-item-title">{item.name}</h4>
                      <span className="cart-item-tag">{item.tag}</span>
                    </div>
                    <p className="cart-item-edition">{item.edition}</p>
                    <div className="cart-item-bottom">
                      <div className="cart-quantity-stepper">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="cart-item-price">
                        ${item.numericPrice * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Founding Member Perks */}
              <div className="cart-perks-box">
                <div className="cart-perk-item">
                  <span className="cart-perk-dot" />
                  <span>Founding pricing locked for life of unit</span>
                </div>
                <div className="cart-perk-item">
                  <span className="cart-perk-dot" />
                  <span>Early access to Smart Air companion app</span>
                </div>
                <div className="cart-perk-item">
                  <span className="cart-perk-dot" />
                  <span>No payment charged until production dispatch</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal-row">
              <span className="cart-subtotal-label">Estimated Total</span>
              <span className="cart-subtotal-value">${subtotal}</span>
            </div>
            <p className="cart-tax-notice">
              Taxes and delivery calculated upon batch confirmation.
            </p>
            <button
              className="btn btn-primary-on-dark cart-checkout-btn"
              onClick={handleCheckout}
            >
              <span>Proceed to Reserve</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
