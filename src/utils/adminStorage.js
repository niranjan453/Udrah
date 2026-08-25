// UDRAH Admin Storage & Real Visitor Tracking Engine

export const AUTHORIZED_ADMIN_EMAILS = [
  'shahrukhyt01@gmail.com',
  'udrahindustries@gmail.com',
  'pgosai575@gmail.com'
]

const STORAGE_KEYS = {
  ORDERS: 'udrah_admin_orders_v2',
  PRODUCTS: 'udrah_admin_products_v2',
  CUSTOMERS: 'udrah_admin_customers_v2',
  SESSIONS: 'udrah_admin_sessions_v2',
  AUTH: 'udrah_admin_auth_user'
}

// Initial default real catalog
const DEFAULT_PRODUCTS = [
  {
    id: 'prod-001',
    title: 'UDRAH Living Air Purifier',
    subtitle: 'Founding Member Edition with Live Microalgae Chamber',
    status: 'Active',
    inventory: '14 in stock (Batch 01)',
    inventoryCount: 14,
    variants: 1,
    category: 'Biotech Hardware',
    price: 580,
    salesChannels: 'Online store, Mobile App',
    image: '/udrah-product.png',
    sku: 'UDR-BIO-01',
    vendor: 'UDRAH Lab'
  },
  {
    id: 'prod-002',
    title: 'UDRAH Pro System',
    subtitle: 'High-capacity dual chamber for modern commercial spaces',
    status: 'Active',
    inventory: '8 in stock',
    inventoryCount: 8,
    variants: 2,
    category: 'Biotech Hardware',
    price: 1250,
    salesChannels: 'Online store',
    image: '/udrah-product.png',
    sku: 'UDR-PRO-02',
    vendor: 'UDRAH Lab'
  },
  {
    id: 'prod-003',
    title: 'Living Algae Culture Flask (30-Day Cycle)',
    subtitle: 'Purified Spirulina-Chlorella biomass culture nutrient pack',
    status: 'Active',
    inventory: '142 in stock',
    inventoryCount: 142,
    variants: 3,
    category: 'Biomass & Refills',
    price: 35,
    salesChannels: 'Online store, Subscription',
    image: '/logo.png',
    sku: 'UDR-ALG-30D',
    vendor: 'UDRAH Bio'
  },
  {
    id: 'prod-004',
    title: 'Multi-layer HEPA-Bio Particulate Filter',
    subtitle: 'Grade H13 mechanical purification pre-filter',
    status: 'Active',
    inventory: '86 in stock',
    inventoryCount: 86,
    variants: 1,
    category: 'Filters',
    price: 48,
    salesChannels: 'Online store',
    image: '/logo.png',
    sku: 'UDR-FLT-H13',
    vendor: 'UDRAH Bio'
  }
]

// Helper to safely read from localStorage
function getStored(key, fallback) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch (e) {
    return fallback
  }
}

// Helper to safely write to localStorage
function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    // Trigger storage event for same window listeners
    window.dispatchEvent(new Event('udrah_storage_updated'))
  } catch (e) {
    console.error('Storage error:', e)
  }
}

export const ADMIN_PASSWORD = '1403'

// ─── AUTHENTICATION ─────────────────────────────────────────────
export function getAuthenticatedAdmin() {
  const user = getStored(STORAGE_KEYS.AUTH, null)
  if (user && AUTHORIZED_ADMIN_EMAILS.includes(user.email.toLowerCase().trim())) {
    return user
  }
  return null
}

export function loginAdmin(email, password = '') {
  const normalizedEmail = (email || '').toLowerCase().trim()
  const trimmedPassword = (password || '').trim()
  
  // 1. Verify authorized admin email
  if (!AUTHORIZED_ADMIN_EMAILS.includes(normalizedEmail)) {
    return {
      success: false,
      message: `Access Denied: "${email}" is not an authorized administrator. Only designated team emails can access this portal.`
    }
  }

  // 2. Verify password (must be 1403)
  if (trimmedPassword !== ADMIN_PASSWORD) {
    return {
      success: false,
      message: `Incorrect password for "${email}". Please enter the correct admin password.`
    }
  }

  const user = {
    email: normalizedEmail,
    role: 'Super Administrator',
    loginTime: new Date().toISOString(),
    name: normalizedEmail.split('@')[0].toUpperCase()
  }

  setStored(STORAGE_KEYS.AUTH, user)
  return { success: true, user }
}

export function logoutAdmin() {
  localStorage.removeItem(STORAGE_KEYS.AUTH)
  window.dispatchEvent(new Event('udrah_storage_updated'))
}

// ─── REAL VISITOR SESSIONS ──────────────────────────────────────
function getSessionId() {
  let sessId = sessionStorage.getItem('udrah_visitor_session_id')
  if (!sessId) {
    sessId = 'SESS-' + Math.floor(100000 + Math.random() * 900000)
    sessionStorage.setItem('udrah_visitor_session_id', sessId)
  }
  return sessId
}

function detectDevice() {
  const ua = navigator.userAgent || ''
  let os = 'Unknown OS'
  if (ua.indexOf('Win') !== -1) os = 'Windows'
  if (ua.indexOf('Mac') !== -1) os = 'macOS'
  if (ua.indexOf('Linux') !== -1) os = 'Linux'
  if (ua.indexOf('Android') !== -1) os = 'Android'
  if (ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1) os = 'iOS'

  let browser = 'Browser'
  if (ua.indexOf('Chrome') !== -1) browser = 'Chrome'
  if (ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1) browser = 'Safari'
  if (ua.indexOf('Firefox') !== -1) browser = 'Firefox'
  if (ua.indexOf('Edg') !== -1) browser = 'Edge'

  const screenRes = `${window.screen.width}x${window.screen.height}`
  return `${os} · ${browser} (${screenRes})`
}

// Track every real page view, input, and bag action
export function trackRealSession({ page, email, cartItems, event, name, city }) {
  const sessId = getSessionId()
  const sessions = getAdminSessions()
  const now = new Date()
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  let currentSess = sessions.find(s => s.id === sessId)

  if (!currentSess) {
    currentSess = {
      id: sessId,
      visitorIp: 'Local / Web Client',
      location: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Current Region',
      device: detectDevice(),
      currentPage: page || window.location.pathname || '/',
      firstSeen: timeStr,
      lastActive: timeStr,
      lastActiveTimestamp: Date.now(),
      referrer: document.referrer ? new URL(document.referrer).hostname : 'Direct URL',
      cartItems: cartItems || [],
      cartValue: 0,
      cartStatus: 'Browsing Site',
      email: email || null,
      customerName: name || null,
      city: city || null,
      isOnline: true,
      lastEvent: event || 'Visited Website',
      history: [event || 'Visited Website']
    }
  }

  // Update existing session
  if (page) currentSess.currentPage = page
  if (email) currentSess.email = email
  if (name) currentSess.customerName = name
  if (city) currentSess.city = city
  if (event) {
    currentSess.lastEvent = event
    currentSess.history = [event, ...(currentSess.history || [])].slice(0, 10)
  }
  if (cartItems) {
    currentSess.cartItems = cartItems
    currentSess.cartValue = cartItems.reduce(
      (sum, item) => sum + (item.numericPrice || 580) * (item.quantity || 1),
      0
    )
    currentSess.cartStatus = cartItems.length > 0 ? `${cartItems.length} item(s) in Bag` : 'Bag Empty'
  }
  
  currentSess.lastActive = timeStr
  currentSess.lastActiveTimestamp = Date.now()
  currentSess.isOnline = true

  // Keep list sorted by newest activity
  const updatedSessions = [currentSess, ...sessions.filter(s => s.id !== sessId)]
  setStored(STORAGE_KEYS.SESSIONS, updatedSessions)
}

// ─── GETTERS & SETTERS ───────────────────────────────────────────
export function getAdminOrders() {
  return getStored(STORAGE_KEYS.ORDERS, [])
}

export function getAdminProducts() {
  return getStored(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS)
}

export function getAdminCustomers() {
  return getStored(STORAGE_KEYS.CUSTOMERS, [])
}

export function getAdminSessions() {
  const sessions = getStored(STORAGE_KEYS.SESSIONS, [])
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
  // Mark offline if no activity for > 5 min
  return sessions.map(s => ({
    ...s,
    isOnline: s.lastActiveTimestamp ? s.lastActiveTimestamp > fiveMinutesAgo : s.isOnline
  }))
}

// Record a real reservation from /reserve
export function recordReservation({ name, email, city, units }) {
  const currentOrders = getAdminOrders()
  const currentCustomers = getAdminCustomers()

  const unitCount = parseInt(units) || 1
  const orderTotal = unitCount * 580
  const orderId = `ORD-${1000 + currentOrders.length + 1}`
  const now = new Date()
  const dateFormatted = `${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`

  const newOrder = {
    id: orderId,
    customerName: name || 'Valued Member',
    email: email || 'unspecified@email.com',
    city: city || 'Global Delivery',
    units: `${unitCount} Unit${unitCount > 1 ? 's' : ''} (${units || 'Founding Edition'})`,
    amount: orderTotal,
    items: [{ name: 'UDRAH Living Air Purifier (Founding Member Edition)', qty: unitCount, price: 580 }],
    status: 'Confirmed',
    paymentStatus: 'Reserved (No Charge Today)',
    date: dateFormatted,
    channel: 'Online Store',
    notes: 'Submitted via reservation form on website.'
  }

  // Save order
  const updatedOrders = [newOrder, ...currentOrders]
  setStored(STORAGE_KEYS.ORDERS, updatedOrders)

  // Save or update customer
  const normalizedEmail = (email || '').toLowerCase().trim()
  const existingIdx = currentCustomers.findIndex(c => c.email.toLowerCase().trim() === normalizedEmail)
  let updatedCustomers = [...currentCustomers]

  if (existingIdx >= 0) {
    updatedCustomers[existingIdx] = {
      ...updatedCustomers[existingIdx],
      name: name || updatedCustomers[existingIdx].name,
      city: city || updatedCustomers[existingIdx].city,
      totalOrders: (updatedCustomers[existingIdx].totalOrders || 0) + unitCount,
      totalSpent: (updatedCustomers[existingIdx].totalSpent || 0) + orderTotal,
      lastActive: 'Just now (Reserved)',
      status: 'Founding Member'
    }
  } else {
    updatedCustomers.unshift({
      id: `CUST-00${currentCustomers.length + 1}`,
      name: name || 'New Member',
      email: email,
      city: city || 'Global',
      totalOrders: unitCount,
      totalSpent: orderTotal,
      lastActive: 'Just now (Reserved)',
      status: 'Founding Member',
      subscribed: true
    })
  }
  setStored(STORAGE_KEYS.CUSTOMERS, updatedCustomers)

  // Update session tracking
  trackRealSession({
    event: `Reserved ${unitCount} unit(s) (#${orderId}) - $${orderTotal}`,
    email,
    name,
    city
  })

  return newOrder
}

// ─── CRUD OPERATIONS ─────────────────────────────────────────────
export function saveProducts(products) {
  setStored(STORAGE_KEYS.PRODUCTS, products)
}

export function addProduct(product) {
  const products = getAdminProducts()
  const newProd = {
    id: `prod-${Date.now().toString().slice(-4)}`,
    title: product.title || 'New Product',
    subtitle: product.subtitle || '',
    status: product.status || 'Active',
    inventory: `${product.inventoryCount || 0} in stock`,
    inventoryCount: Number(product.inventoryCount) || 0,
    variants: Number(product.variants) || 1,
    category: product.category || 'Biotech Hardware',
    price: Number(product.price) || 0,
    salesChannels: 'Online store',
    image: product.image || '/udrah-product.png',
    sku: product.sku || `UDR-${Math.floor(100 + Math.random() * 900)}`,
    vendor: 'UDRAH Lab'
  }
  const updated = [newProd, ...products]
  saveProducts(updated)
  return updated
}

export function updateProduct(id, updates) {
  const products = getAdminProducts()
  const updated = products.map(p => p.id === id ? { ...p, ...updates } : p)
  saveProducts(updated)
  return updated
}

export function deleteProducts(ids) {
  const products = getAdminProducts()
  const updated = products.filter(p => !ids.includes(p.id))
  saveProducts(updated)
  return updated
}

export function updateOrderStatus(orderId, status) {
  const orders = getAdminOrders()
  const updated = orders.map(o => o.id === orderId ? { ...o, status } : o)
  setStored(STORAGE_KEYS.ORDERS, updated)
  return updated
}

export function clearAdminSessions() {
  localStorage.removeItem(STORAGE_KEYS.SESSIONS)
  trackRealSession({ event: 'Admin Session Logs Reset' })
  window.dispatchEvent(new Event('udrah_storage_updated'))
}
