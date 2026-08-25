import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AUTHORIZED_ADMIN_EMAILS,
  getAuthenticatedAdmin,
  loginAdmin,
  logoutAdmin,
  getAdminOrders,
  getAdminProducts,
  getAdminCustomers,
  getAdminSessions,
  addProduct,
  updateProduct,
  deleteProducts,
  updateOrderStatus,
  recordReservation,
  clearAdminSessions
} from '../../utils/adminStorage'
import './Admin.css'

export default function Admin() {
  const navigate = useNavigate()
  
  // Auth state
  const [currentUser, setCurrentUser] = useState(() => getAuthenticatedAdmin())
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState(null)

  // Navigation tabs
  const [activeTab, setActiveTab] = useState('live') // 'live' | 'orders' | 'products' | 'customers' | 'analytics'
  const [productFilter, setProductFilter] = useState('all') // 'all' | 'active' | 'draft' | 'archived'
  const [orderFilter, setOrderFilter] = useState('all')

  // Datasets
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])
  const [sessions, setSessions] = useState([])

  // Selection & modal state
  const [selectedProductIds, setSelectedProductIds] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  // New product form
  const [newProduct, setNewProduct] = useState({
    title: '',
    subtitle: '',
    price: 580,
    inventoryCount: 10,
    category: 'Biotech Hardware',
    status: 'Active',
    sku: ''
  })

  const [isRefreshing, setIsRefreshing] = useState(false)

  // Load datasets
  const refreshData = () => {
    setProducts(getAdminProducts())
    setOrders(getAdminOrders())
    setCustomers(getAdminCustomers())
    setSessions(getAdminSessions())
  }

  const handleManualRefresh = () => {
    setIsRefreshing(true)
    refreshData()
    showToast('✓ Live data refreshed')
    setTimeout(() => setIsRefreshing(false), 600)
  }

  const handleResetLogs = () => {
    clearAdminSessions()
    refreshData()
    showToast('Visitor logs cleared & reset')
  }

  useEffect(() => {
    refreshData()

    // Real-time synchronization: listen to storage updates across tabs & window
    const handleStorageUpdate = () => refreshData()
    window.addEventListener('udrah_storage_updated', handleStorageUpdate)
    window.addEventListener('storage', handleStorageUpdate)

    // Polling fallback every 2.5 seconds for instant live visitors
    const interval = setInterval(() => {
      refreshData()
    }, 2500)

    return () => {
      window.removeEventListener('udrah_storage_updated', handleStorageUpdate)
      window.removeEventListener('storage', handleStorageUpdate)
      clearInterval(interval)
    }
  }, [])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3200)
  }

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setLoginError(null)

    const result = loginAdmin(loginEmail, loginPassword)
    if (result.success) {
      setCurrentUser(result.user)
      showToast(`Welcome, ${result.user.email}`)
      refreshData()
    } else {
      setLoginError(result.message)
    }
  }

  const handleQuickSelectEmail = (email) => {
    setLoginEmail(email)
    setLoginPassword('')
    setLoginError(null)
  }

  const handleLogout = () => {
    logoutAdmin()
    setCurrentUser(null)
    showToast('Signed out of Admin Portal')
  }

  // Bulk Product Actions
  const handleSelectAllProducts = (e) => {
    if (e.target.checked) {
      setSelectedProductIds(filteredProducts.map(p => p.id))
    } else {
      setSelectedProductIds([])
    }
  }

  const handleToggleProductSelect = (id) => {
    setSelectedProductIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleBulkStatusChange = (status) => {
    let updated = products
    selectedProductIds.forEach(id => {
      updated = updateProduct(id, { status })
    })
    setProducts(updated)
    setSelectedProductIds([])
    showToast(`Updated ${selectedProductIds.length} products to ${status}`)
  }

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedProductIds.length} selected product(s)?`)) {
      const updated = deleteProducts(selectedProductIds)
      setProducts(updated)
      setSelectedProductIds([])
      showToast(`Deleted selected products`)
    }
  }

  const handleCreateProduct = (e) => {
    e.preventDefault()
    if (!newProduct.title) return
    const updated = addProduct(newProduct)
    setProducts(updated)
    setShowAddProductModal(false)
    setNewProduct({
      title: '',
      subtitle: '',
      price: 580,
      inventoryCount: 10,
      category: 'Biotech Hardware',
      status: 'Active',
      sku: ''
    })
    showToast(`Product "${newProduct.title}" created successfully`)
  }

  const handleOrderStatusChange = (orderId, newStatus) => {
    const updated = updateOrderStatus(orderId, newStatus)
    setOrders(updated)
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
    showToast(`Order #${orderId} marked as ${newStatus}`)
  }

  // Create sample test order to test live sync
  const handleCreateSampleOrder = () => {
    const demoNames = ['Alexander Wright', 'Claire Delacroix', 'Kaito Tanaka', 'Samantha Brooks']
    const demoCities = ['San Francisco, CA', 'Paris, France', 'Tokyo, Japan', 'New York, NY']
    const randomIdx = Math.floor(Math.random() * demoNames.length)

    recordReservation({
      name: demoNames[randomIdx],
      email: `${demoNames[randomIdx].toLowerCase().replace(' ', '.')}@example.com`,
      city: demoCities[randomIdx],
      units: '1'
    })
    refreshData()
    showToast('Live test reservation generated & logged!')
  }

  // Export Customers CSV
  const handleExportCSV = () => {
    if (customers.length === 0) {
      showToast('No customer leads to export yet')
      return
    }
    const headers = ['Customer ID', 'Name', 'Email', 'City', 'Total Reservations', 'Total Spent ($)', 'Status', 'Last Active']
    const rows = customers.map(c => [
      c.id,
      `"${c.name}"`,
      c.email,
      `"${c.city}"`,
      c.totalOrders,
      c.totalSpent,
      c.status,
      `"${c.lastActive}"`
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `udrah_leads_${new Date().toISOString().slice(0,10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Customer Leads CSV exported')
  }

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesTab =
      productFilter === 'all' ? true :
      p.status.toLowerCase() === productFilter.toLowerCase()
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  })

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesTab =
      orderFilter === 'all' ? true :
      o.status.toLowerCase() === orderFilter.toLowerCase()
    const matchesSearch =
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  // ═════════════════════════════════════════════════════════════════
  // AUTHENTICATION GATE SCREEN (IF NOT LOGGED IN)
  // ═════════════════════════════════════════════════════════════════
  if (!currentUser) {
    return (
      <div className="shopify-login-root">
        {toastMessage && (
          <div className="shopify-toast">
            <span className="toast-dot" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="shopify-login-card">
          <div className="login-header">
            <div className="login-brand-logo">
              <svg viewBox="0 0 100 100" className="shopify-bag-mark" width="36" height="36">
                <path d="M30 35 L40 18 L60 18 L70 35 Z" fill="#95BF47" />
                <path d="M22 35 L78 35 L70 85 L30 85 Z" fill="#95BF47" opacity="0.9" />
                <path d="M48 24 L52 24 L56 50 L44 50 Z" fill="#ffffff" opacity="0.4" />
              </svg>
              <div>
                <h2>UDRAH Industries</h2>
                <span className="login-sub">Admin Security Portal</span>
              </div>
            </div>
            <p className="login-desc">
              Restricted area. Please authenticate with an authorized administrative email address to view real-time visitor activity, customer leads, and order reservations.
            </p>
          </div>

          {loginError && (
            <div className="login-error-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d82c0d" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="form-group">
              <label>Administrator Email</label>
              <input
                type="email"
                placeholder="name@example.com"
                required
                value={loginEmail}
                onChange={(e) => { setLoginEmail(e.target.value); setLoginError(null); }}
              />
            </div>

            <div className="form-group">
              <label>Security Key / Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-shopify-primary btn-login-submit">
              Access Admin Panel →
            </button>
          </form>

          {/* Authorized Admin Quick Select */}
          <div className="authorized-emails-box">
            <span className="auth-hint-label">Authorized Team Accounts:</span>
            <div className="auth-email-pills">
              {AUTHORIZED_ADMIN_EMAILS.map((email) => (
                <button
                  key={email}
                  type="button"
                  className="auth-email-btn"
                  onClick={() => handleQuickSelectEmail(email)}
                >
                  <span className="auth-lock-dot" />
                  {email}
                </button>
              ))}
            </div>
          </div>

          <div className="login-footer">
            <Link to="/" className="login-back-link">
              ← Return to UDRAH Online Store
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ═════════════════════════════════════════════════════════════════
  // AUTHENTICATED ADMIN DASHBOARD
  // ═════════════════════════════════════════════════════════════════
  const liveCount = sessions.filter(s => s.isOnline).length
  const totalReservationsValue = orders.reduce((s, o) => s + (o.amount || 0), 0)

  return (
    <div className="shopify-admin-root">

      {/* ─── TOAST NOTIFICATION ─── */}
      {toastMessage && (
        <div className="shopify-toast">
          <span className="toast-dot" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── TOP BLACK SHOPIFY BAR ─── */}
      <header className="shopify-topbar">
        <div className="topbar-left">
          <Link to="/admin" className="shopify-brand-logo">
            <svg viewBox="0 0 100 100" className="shopify-bag-mark" width="24" height="24">
              <path d="M30 35 L40 18 L60 18 L70 35 Z" fill="#95BF47" />
              <path d="M22 35 L78 35 L70 85 L30 85 Z" fill="#95BF47" opacity="0.9" />
              <path d="M48 24 L52 24 L56 50 L44 50 Z" fill="#ffffff" opacity="0.4" />
            </svg>
            <span className="shopify-brand-text">UDRAH <span>Admin</span></span>
          </Link>
        </div>

        <div className="topbar-center">
          <div className="topbar-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search products, orders, live visitors, emails... (⌘K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-shortcut">⌘ K</span>
          </div>
        </div>

        <div className="topbar-right">
          {/* Real-time active indicator */}
          <div className="topbar-live-badge" onClick={() => setActiveTab('live')} title="Click to view live visitors">
            <span className="pulse-circle" />
            <span>{liveCount} Live Now</span>
          </div>

          <Link to="/" className="topbar-store-link" title="Open consumer website">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>View Online Store</span>
          </Link>

          <div className="topbar-profile" title={`Logged in as ${currentUser.email}`}>
            <span className="profile-store-name">{currentUser.email}</span>
            <div className="profile-avatar">{currentUser.name.slice(0, 2)}</div>
            <button className="btn-logout" onClick={handleLogout} title="Sign Out">
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN ADMIN CONTAINER: SIDEBAR + CONTENT ─── */}
      <div className="shopify-layout">

        {/* ─── LEFT SIDEBAR ─── */}
        <aside className="shopify-sidebar">
          <div className="sidebar-group">
            
            {/* Core Feature: Real-time Live Visitors & Carts Tracker */}
            <button
              className={`sidebar-nav-item sidebar-live-item ${activeTab === 'live' ? 'active' : ''}`}
              onClick={() => setActiveTab('live')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>Live Visitors &amp; Bags</span>
              <span className="sidebar-live-tag">LIVE</span>
            </button>

            <button
              className={`sidebar-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>Orders &amp; Reservations</span>
              {orders.length > 0 && <span className="sidebar-count">{orders.length}</span>}
            </button>

            <div className="sidebar-nav-section">
              <button
                className={`sidebar-nav-item ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                <span>Products</span>
              </button>

              {activeTab === 'products' && (
                <div className="sidebar-sub-nav">
                  <span className="sidebar-sub-item active">Collections</span>
                  <span className="sidebar-sub-item">Inventory</span>
                  <span className="sidebar-sub-item">Purchase orders</span>
                  <span className="sidebar-sub-item">Transfers</span>
                </div>
              )}
            </div>

            <button
              className={`sidebar-nav-item ${activeTab === 'customers' ? 'active' : ''}`}
              onClick={() => setActiveTab('customers')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Customers &amp; Leads</span>
              {customers.length > 0 && <span className="sidebar-count">{customers.length}</span>}
            </button>

            <button
              className={`sidebar-nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <span>Analytics &amp; Funnel</span>
            </button>
          </div>

          <div className="sidebar-section-divider" />

          {/* Sales Channels */}
          <div className="sidebar-header-label">
            <span>Sales Channels</span>
          </div>

          <div className="sidebar-group">
            <Link to="/" className="sidebar-nav-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>Online Store</span>
            </Link>
          </div>
        </aside>

        {/* ─── MAIN CONTENT AREA ─── */}
        <main className="shopify-main-content">

          {/* ═══════════════════════════════════════════════════════════
              VIEW 1: REAL-TIME LIVE VISITORS & BAGS MONITOR
             ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'live' && (
            <div className="shopify-view-live">
              <div className="view-header">
                <div>
                  <h1 className="view-title">Real-Time Visitors &amp; Live Bags</h1>
                  <p className="view-subtitle">
                    Real data captured from visitors browsing pages, typing emails, and adding products to their bag.
                  </p>
                </div>
                <div className="view-actions">
                  <span className="live-pulse-tag">
                    <span className="pulse-dot" /> Auto-syncing live
                  </span>
                  <button className="btn-shopify-secondary" onClick={handleCreateSampleOrder}>
                    + Test Live Order
                  </button>
                  <button
                    className={`btn-shopify-primary btn-refresh-action ${isRefreshing ? 'btn-refreshing' : ''}`}
                    onClick={handleManualRefresh}
                    disabled={isRefreshing}
                  >
                    <svg
                      className={`refresh-spin-icon ${isRefreshing ? 'spin' : ''}`}
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="23 4 23 10 17 10" />
                      <polyline points="1 20 1 14 7 14" />
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                    </svg>
                    <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
                  </button>
                </div>
              </div>

              {/* Real-time stats summary */}
              <div className="live-stats-row">
                <div className="live-stat-card">
                  <span className="live-stat-label">Active Visitors</span>
                  <span className="live-stat-val" style={{ color: '#95BF47' }}>{liveCount}</span>
                  <span className="live-stat-sub">Real sessions active</span>
                </div>
                <div className="live-stat-card">
                  <span className="live-stat-label">Bags with Products</span>
                  <span className="live-stat-val">
                    {sessions.filter(s => s.cartItems && s.cartItems.length > 0).length}
                  </span>
                  <span className="live-stat-sub">Units waiting in cart</span>
                </div>
                <div className="live-stat-card">
                  <span className="live-stat-label">Captured Leads / Emails</span>
                  <span className="live-stat-val">{customers.length}</span>
                  <span className="live-stat-sub">From reserve form</span>
                </div>
                <div className="live-stat-card">
                  <span className="live-stat-label">Confirmed Reservations</span>
                  <span className="live-stat-val">${totalReservationsValue.toLocaleString()}</span>
                  <span className="live-stat-sub">{orders.length} orders total</span>
                </div>
              </div>

              {/* Sessions Table */}
              <div className="shopify-card" style={{ marginTop: 24 }}>
                <div className="card-header-simple">
                  <h3>Real Visitor Sessions &amp; Bag Activity</h3>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <span className="badge-count">{sessions.length} tracked</span>
                    <button className="btn-row-action" onClick={handleResetLogs} title="Clear history and restart tracking">
                      Reset Logs
                    </button>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="shopify-table">
                    <thead>
                      <tr>
                        <th>Live Status</th>
                        <th>Session ID / Location</th>
                        <th>Identified Email / Lead</th>
                        <th>Current Page</th>
                        <th>What's in Their Bag</th>
                        <th>Bag Total</th>
                        <th>Device / Browser</th>
                        <th>Last Action</th>
                        <th>Contact Lead</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="empty-table-cell">
                            No visitor sessions logged yet. Browse pages on the site to see real data appear instantly!
                          </td>
                        </tr>
                      ) : (
                        sessions.map((sess) => (
                          <tr key={sess.id}>
                            <td>
                              <span className={`live-status-pill ${sess.isOnline ? 'online' : 'idle'}`}>
                                {sess.isOnline ? '● Active' : '○ Left'}
                              </span>
                            </td>
                            <td>
                              <div className="visitor-meta">
                                <strong>{sess.location}</strong>
                                <span className="visitor-ip">{sess.id}</span>
                              </div>
                            </td>
                            <td>
                              {sess.email ? (
                                <div className="visitor-email-tag">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                  </svg>
                                  <span>{sess.email}</span>
                                </div>
                              ) : (
                                <span className="anonymous-tag">Anonymous Visitor</span>
                              )}
                            </td>
                            <td>
                              <code className="page-pill">{sess.currentPage}</code>
                            </td>
                            <td>
                              {sess.cartItems && sess.cartItems.length > 0 ? (
                                <div className="cart-items-preview">
                                  {sess.cartItems.map((it, idx) => (
                                    <div key={idx} className="cart-preview-item">
                                      <span className="qty-tag">{it.qty || it.quantity || 1}x</span>
                                      <span className="item-name">{it.name}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-muted">Empty Bag</span>
                              )}
                            </td>
                            <td>
                              {sess.cartValue > 0 ? (
                                <strong>${sess.cartValue}</strong>
                              ) : (
                                <span className="text-muted">$0</span>
                              )}
                            </td>
                            <td>
                              <span className="device-text">{sess.device}</span>
                            </td>
                            <td>
                              <span className="event-pill">{sess.lastEvent}</span>
                            </td>
                            <td>
                              {sess.email ? (
                                <a
                                  href={`mailto:${sess.email}?subject=Your UDRAH Living Air Reservation`}
                                  className="btn-row-action"
                                >
                                  Email Lead
                                </a>
                              ) : (
                                <span className="text-muted">—</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              VIEW 2: ORDERS & RESERVATIONS
             ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'orders' && (
            <div className="shopify-view-orders">
              <div className="view-header">
                <div>
                  <h1 className="view-title">Orders &amp; Reservations</h1>
                  <p className="view-subtitle">Real reservations submitted through the /reserve form.</p>
                </div>
                <div className="view-actions">
                  <button className="btn-shopify-secondary" onClick={handleExportCSV}>Export Orders</button>
                  <Link to="/reserve" className="btn-shopify-primary">+ Submit Reservation Form</Link>
                </div>
              </div>

              <div className="shopify-card">
                <div className="card-tabs-header">
                  <div className="card-tabs">
                    <button className={`tab-btn ${orderFilter === 'all' ? 'active' : ''}`} onClick={() => setOrderFilter('all')}>
                      All ({orders.length})
                    </button>
                    <button className={`tab-btn ${orderFilter === 'confirmed' ? 'active' : ''}`} onClick={() => setOrderFilter('confirmed')}>
                      Confirmed
                    </button>
                    <button className={`tab-btn ${orderFilter === 'processing' ? 'active' : ''}`} onClick={() => setOrderFilter('processing')}>
                      Processing
                    </button>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="shopify-table">
                    <thead>
                      <tr>
                        <th>Order #</th>
                        <th>Date &amp; Time</th>
                        <th>Customer Name</th>
                        <th>Email Address</th>
                        <th>Delivery City</th>
                        <th>Units</th>
                        <th>Status</th>
                        <th>Total ($)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="empty-table-cell">
                            No reservations yet. Go to <Link to="/reserve">/reserve</Link> to submit your first real reservation!
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((ord) => (
                          <tr key={ord.id} onClick={() => setSelectedOrder(ord)} style={{ cursor: 'pointer' }}>
                            <td>
                              <strong className="order-id-link">{ord.id}</strong>
                            </td>
                            <td>{ord.date}</td>
                            <td>
                              <strong>{ord.customerName}</strong>
                            </td>
                            <td>
                              <a href={`mailto:${ord.email}`} onClick={e => e.stopPropagation()} className="order-email-link">
                                {ord.email}
                              </a>
                            </td>
                            <td>{ord.city}</td>
                            <td>{ord.units}</td>
                            <td>
                              <span className={`status-pill pill-${ord.status.toLowerCase()}`}>
                                {ord.status}
                              </span>
                            </td>
                            <td>
                              <strong>${ord.amount}</strong>
                            </td>
                            <td>
                              <button
                                className="btn-row-action"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleOrderStatusChange(ord.id, ord.status === 'Confirmed' ? 'Processing' : 'Confirmed')
                                }}
                              >
                                {ord.status === 'Confirmed' ? 'Mark Processing' : 'Confirm'}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              VIEW 3: PRODUCTS VIEW (SHOPIFY REPLICA)
             ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'products' && (
            <div className="shopify-view-products">
              <div className="view-header">
                <h1 className="view-title">Products</h1>
                <div className="view-actions">
                  <button className="btn-shopify-secondary" onClick={() => showToast('Catalog exported')}>Export</button>
                  <button className="btn-shopify-primary" onClick={() => setShowAddProductModal(true)}>
                    Add product
                  </button>
                </div>
              </div>

              {/* KPI Metrics */}
              <div className="shopify-metrics-card">
                <div className="metric-col">
                  <span className="metric-label">Product by sell through rate</span>
                  <span className="metric-val">84.2% <span className="metric-tag-green">↑ High Velocity</span></span>
                </div>
                <div className="metric-divider" />
                <div className="metric-col">
                  <span className="metric-label">Batch 01 Units Remaining</span>
                  <span className="metric-val">14 units in Batch 01</span>
                </div>
                <div className="metric-divider" />
                <div className="metric-col">
                  <span className="metric-label">Catalog Value</span>
                  <span className="metric-val">4 Active Product SKUs</span>
                </div>
              </div>

              <div className="shopify-card">
                <div className="card-tabs-header">
                  <div className="card-tabs">
                    <button className={`tab-btn ${productFilter === 'all' ? 'active' : ''}`} onClick={() => setProductFilter('all')}>
                      All ({products.length})
                    </button>
                    <button className={`tab-btn ${productFilter === 'active' ? 'active' : ''}`} onClick={() => setProductFilter('active')}>
                      Active
                    </button>
                    <button className={`tab-btn ${productFilter === 'draft' ? 'active' : ''}`} onClick={() => setProductFilter('draft')}>
                      Draft
                    </button>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="shopify-table">
                    <thead>
                      <tr>
                        <th style={{ width: 44 }}>
                          <input
                            type="checkbox"
                            checked={selectedProductIds.length > 0 && selectedProductIds.length === filteredProducts.length}
                            onChange={handleSelectAllProducts}
                          />
                        </th>
                        <th style={{ width: 60 }}></th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Inventory</th>
                        <th>Variants</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sales Channel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => {
                        const isSelected = selectedProductIds.includes(p.id)
                        return (
                          <tr key={p.id} className={isSelected ? 'row-selected' : ''}>
                            <td>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleToggleProductSelect(p.id)}
                              />
                            </td>
                            <td>
                              <div className="product-thumb-box">
                                <img src={p.image || '/logo.png'} alt={p.title} />
                              </div>
                            </td>
                            <td>
                              <div className="product-title-wrap">
                                <span className="product-name">{p.title}</span>
                                {p.subtitle && <span className="product-sub">{p.subtitle}</span>}
                              </div>
                            </td>
                            <td>
                              <span className={`status-pill pill-${p.status.toLowerCase()}`}>
                                {p.status}
                              </span>
                            </td>
                            <td>
                              <span className="inventory-text">{p.inventory}</span>
                            </td>
                            <td>{p.variants || 1}</td>
                            <td>
                              <strong>${p.price}</strong>
                            </td>
                            <td>{p.category}</td>
                            <td className="channel-cell">{p.salesChannels}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {selectedProductIds.length > 0 && (
                  <div className="floating-bulk-bar">
                    <span className="bulk-count">{selectedProductIds.length} selected</span>
                    <button className="bulk-btn" onClick={() => handleBulkStatusChange('Active')}>Set as active</button>
                    <button className="bulk-btn" onClick={() => handleBulkStatusChange('Draft')}>Set as draft</button>
                    <button className="bulk-btn bulk-btn-danger" onClick={handleBulkDelete}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              VIEW 4: CUSTOMERS & LEADS DIRECTORY
             ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'customers' && (
            <div className="shopify-view-customers">
              <div className="view-header">
                <div>
                  <h1 className="view-title">Captured Customers &amp; Leads</h1>
                  <p className="view-subtitle">Real emails and names submitted through the website reservation form.</p>
                </div>
                <div className="view-actions">
                  <button className="btn-shopify-primary" onClick={handleExportCSV}>Export Leads (CSV)</button>
                </div>
              </div>

              <div className="shopify-card">
                <div className="table-responsive">
                  <table className="shopify-table">
                    <thead>
                      <tr>
                        <th>Customer ID</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Location</th>
                        <th>Units Reserved</th>
                        <th>Total Value</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="empty-table-cell">
                            No customer leads yet. Go to <Link to="/reserve">/reserve</Link> to test entering an email.
                          </td>
                        </tr>
                      ) : (
                        customers.map((c) => (
                          <tr key={c.id}>
                            <td><code>{c.id}</code></td>
                            <td><strong>{c.name}</strong></td>
                            <td>
                              <a href={`mailto:${c.email}`} className="order-email-link">{c.email}</a>
                            </td>
                            <td>{c.city}</td>
                            <td>{c.totalOrders} units</td>
                            <td><strong>${c.totalSpent}</strong></td>
                            <td>
                              <span className="customer-status-pill">{c.status}</span>
                            </td>
                            <td>
                              <a
                                href={`mailto:${c.email}?subject=Your UDRAH Living Air Inquiry`}
                                className="btn-row-action"
                              >
                                Send Email
                              </a>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              VIEW 5: ANALYTICS
             ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'analytics' && (
            <div className="shopify-view-analytics">
              <div className="view-header">
                <div>
                  <h1 className="view-title">Store Overview &amp; Analytics</h1>
                  <p className="view-subtitle">Real conversion analytics from website sessions.</p>
                </div>
              </div>

              <div className="analytics-kpi-grid">
                <div className="analytics-kpi-card">
                  <span className="kpi-title">Total Reservation Pipeline</span>
                  <span className="kpi-value">${totalReservationsValue.toLocaleString()}</span>
                  <span className="kpi-change positive">From {orders.length} real orders</span>
                </div>
                <div className="analytics-kpi-card">
                  <span className="kpi-title">Active Live Sessions</span>
                  <span className="kpi-value">{sessions.length}</span>
                  <span className="kpi-change positive">{liveCount} active right now</span>
                </div>
                <div className="analytics-kpi-card">
                  <span className="kpi-title">Customer Leads Captured</span>
                  <span className="kpi-value">{customers.length}</span>
                  <span className="kpi-change positive">100% verified emails</span>
                </div>
                <div className="analytics-kpi-card">
                  <span className="kpi-title">Avg. Reservation Value</span>
                  <span className="kpi-value">
                    ${orders.length > 0 ? Math.round(totalReservationsValue / orders.length) : 580}
                  </span>
                  <span className="kpi-change positive">Founding Edition</span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ─── MODAL: ADD PRODUCT ─── */}
      {showAddProductModal && (
        <div className="shopify-modal-backdrop" onClick={() => setShowAddProductModal(false)}>
          <div className="shopify-modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button className="modal-close-btn" onClick={() => setShowAddProductModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateProduct} className="modal-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="e.g. UDRAH Living Air Purifier"
                  required
                  value={newProduct.title}
                  onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Description / Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Founding Member Edition with Live Microalgae Chamber"
                  value={newProduct.subtitle}
                  onChange={e => setNewProduct({ ...newProduct, subtitle: e.target.value })}
                />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  />
                </div>
                <div className="form-group">
                  <label>Inventory Units</label>
                  <input
                    type="number"
                    value={newProduct.inventoryCount}
                    onChange={e => setNewProduct({ ...newProduct, inventoryCount: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-shopify-secondary" onClick={() => setShowAddProductModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-shopify-primary">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: ORDER DETAILS ─── */}
      {selectedOrder && (
        <div className="shopify-modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="shopify-modal-card order-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3>Reservation Details — {selectedOrder.id}</h3>
                <span className="text-muted">{selectedOrder.date}</span>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>
            <div className="order-modal-body">
              <div className="order-customer-box">
                <h4>Customer Information</h4>
                <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                <p><strong>Email:</strong> <a href={`mailto:${selectedOrder.email}`}>{selectedOrder.email}</a></p>
                <p><strong>Location:</strong> {selectedOrder.city}</p>
              </div>
              <div className="order-items-box">
                <h4>Reserved Items</h4>
                <div className="order-item-line">
                  <span>UDRAH Living Air Purifier (Founding Edition)</span>
                  <strong>{selectedOrder.units} — ${selectedOrder.amount}</strong>
                </div>
              </div>
              <div className="order-status-actions">
                <label>Update Status:</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleOrderStatusChange(selectedOrder.id, e.target.value)}
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Waitlist">Waitlist</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-shopify-primary" onClick={() => setSelectedOrder(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
