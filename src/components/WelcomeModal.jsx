import React, { useState, useEffect } from 'react'
import { recordReservation, trackRealSession } from '../utils/adminStorage'
import './WelcomeModal.css'

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    units: '1'
  })

  useEffect(() => {
    // Check if the user has already submitted or dismissed the welcome modal in this session
    const hasSeen = sessionStorage.getItem('udrah_welcome_modal_shown')
    if (!hasSeen) {
      // Show modal smoothly 800ms after site load
      const timer = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem('udrah_welcome_modal_shown', 'true')
        trackRealSession({ event: 'Welcome Details Modal Displayed' })
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    trackRealSession({ event: 'Dismissed Welcome Details Modal' })
  }

  const handleInputChange = (field, value) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    trackRealSession({
      email: updated.email,
      name: updated.name,
      city: updated.city,
      event: `Typing in Welcome Details (${field})`
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return

    // Record into admin storage
    recordReservation(formData)
    setSubmitted(true)

    // Automatically close after brief success confirmation
    setTimeout(() => {
      setIsOpen(false)
    }, 2400)
  }

  if (!isOpen) return null

  return (
    <div className="welcome-modal-overlay" role="dialog" aria-modal="true">
      <div className="welcome-modal-backdrop" onClick={handleClose} />

      <div className="welcome-modal-card">
        <button className="welcome-modal-close" onClick={handleClose} aria-label="Close modal">
          ✕
        </button>

        {!submitted ? (
          <>
            <div className="welcome-modal-header">
              <div className="welcome-badge">
                <span className="welcome-badge-dot" />
                <span>Founding Access · Batch 01</span>
              </div>
              <h2 className="welcome-modal-title">Welcome to UDRAH</h2>
              <p className="welcome-modal-sub">
                Enter your details to lock in founding pricing ($580), receive early companion app access, and reserve your production cycle place.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="welcome-modal-form">
              <div className="welcome-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Elena Rostova"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className="welcome-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div className="welcome-form-row">
                <div className="welcome-form-group">
                  <label>City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>

                <div className="welcome-form-group">
                  <label>Units Interested In</label>
                  <select
                    value={formData.units}
                    onChange={(e) => handleInputChange('units', e.target.value)}
                  >
                    <option value="1">1 Unit (Standard Home)</option>
                    <option value="2">2 Units (Home &amp; Studio)</option>
                    <option value="3">3+ Units (Commercial)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary-on-dark welcome-submit-btn">
                <span>Enter &amp; Reserve Place</span>
                <span className="btn-arrow">→</span>
              </button>

              <div className="welcome-modal-footer-note">
                <p>No upfront charge today · We notify you before batch dispatch.</p>
                <button type="button" className="welcome-skip-btn" onClick={handleClose}>
                  Explore site as guest →
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="welcome-success-state">
            <div className="welcome-success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7AD39B" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3>You're on the priority list!</h3>
            <p>
              Thank you, <strong>{formData.name}</strong>. Your founding reservation has been recorded.
            </p>
            <span className="welcome-redirect-hint">Entering UDRAH website...</span>
          </div>
        )}
      </div>
    </div>
  )
}
