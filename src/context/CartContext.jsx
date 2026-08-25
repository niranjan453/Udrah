import React, { createContext, useContext, useState, useEffect } from 'react'
import { trackRealSession } from '../utils/adminStorage'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState([
    {
      id: 'udrah-system-1',
      name: 'UDRAH Living Air Purifier',
      edition: 'Founding Member Edition',
      price: '$580',
      numericPrice: 580,
      quantity: 1,
      image: '/logo.png',
      tag: 'Batch 01 Priority'
    }
  ])

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + (item.numericPrice * item.quantity), 0)

  // Track initial cart state on mount
  useEffect(() => {
    trackRealSession({ cartItems: items, event: 'Initialized Bag' })
  }, [])

  const openCart = () => {
    setIsOpen(true)
    trackRealSession({ event: 'Opened Bag Drawer', cartItems: items })
  }
  const closeCart = () => setIsOpen(false)
  const toggleCart = () => setIsOpen(prev => !prev)

  const updateQuantity = (id, delta) => {
    setItems(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQty }
        }
        return item
      })
      trackRealSession({ event: `Updated Bag quantity`, cartItems: updated })
      return updated
    })
  }

  const removeItem = (id) => {
    setItems(prev => {
      const updated = prev.filter(item => item.id !== id)
      trackRealSession({ event: `Removed item from bag`, cartItems: updated })
      return updated
    })
  }

  const addItem = (item) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      let updated
      if (existing) {
        updated = prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      } else {
        updated = [...prev, { ...item, quantity: 1 }]
      }
      trackRealSession({ event: `Added ${item.name} to bag`, cartItems: updated })
      return updated
    })
    setIsOpen(true)
  }

  // Prevent background scroll when cart drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <CartContext.Provider value={{
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      items,
      totalCount,
      subtotal,
      updateQuantity,
      removeItem,
      addItem
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
