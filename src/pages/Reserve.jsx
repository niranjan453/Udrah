import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { recordReservation, trackRealSession } from '../utils/adminStorage'
import Footer from '../components/Footer'
import useReveal from '../hooks/useReveal'
import './Reserve.css'
import './PageHero.css'

export default function Reserve() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', city: '', units: '' })
  const pageRef = useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
    trackRealSession({ page: '/reserve', event: 'Viewing Reserve Page' })
  }, [])

  const handleInputChange = (field, val) => {
    const updated = { ...form, [field]: val }
    setForm(updated)
    trackRealSession({
      page: '/reserve',
      email: updated.email,
      name: updated.name,
      city: updated.city,
      event: `Filling Reserve Form (${field}: ${val})`
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    recordReservation(form)
    setSubmitted(true)
  }

  return (
    <main ref={pageRef} className="page-enter">

      <section className="section section-dark reserve-hero">
        <div className="page-hero-bg"><div className="page-hero-glow" /></div>
        <div className="inner reserve-grid">

          {/* Left — Copy */}
          <div className="reveal reserve-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              <span className="eyebrow-label">Reserve Yours</span>
            </div>
            <h1 className="h1" style={{ color: 'var(--bg-ivory)', maxWidth: '16ch' }}>
              Be the member.<br />Be first to breathe differently.
            </h1>
            <p className="body-lg on-dark" style={{ marginTop: 24, maxWidth: '44ch' }}>
              Founding units are produced in limited cycles. Join the list to reserve a place,
              lock in founding pricing, and get early access to the companion app before public release.
            </p>

            <div className="divider on-dark" style={{ margin: '44px 0' }} />

            <div className="reserve-benefits">
              {[
                'Founding member pricing, locked for life of the unit.',
                'Priority placement in the first production cycle.',
                'Early access to the Smart Air companion app.',
                'Direct line to the team shaping what UDRAH becomes next.',
              ].map((item, i) => (
                <div key={i} className="reserve-benefit">
                  <span className="tech-index" style={{ minWidth: 28 }}>0{i+1}</span>
                  <p className="body on-dark">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="panel-glass reserve-form-wrap reveal reveal-delay-1">
            {!submitted ? (
              <>
                <h2 className="h3" style={{ color: 'var(--bg-ivory)', marginBottom: 8 }}>Reserve your UDRAH</h2>
                <p className="body on-dark" style={{ marginBottom: 36 }}>
                  No payment required today — we'll notify you when your cycle opens.
                </p>
                <form onSubmit={handleSubmit} className="reserve-form">
                  <div className="form-field">
                    <label className="form-label" htmlFor="name">Full name</label>
                    <input className="form-input" id="name" type="text" placeholder="Your name" required
                      value={form.name} onChange={e => handleInputChange('name', e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-input" id="email" type="email" placeholder="you@example.com" required
                      value={form.email} onChange={e => handleInputChange('email', e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="city">City</label>
                    <input className="form-input" id="city" type="text" placeholder="Where should we deliver?"
                      value={form.city} onChange={e => handleInputChange('city', e.target.value)} />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="units">Units interested in</label>
                    <input className="form-input" id="units" type="text" placeholder="e.g. 1 unit, home office"
                      value={form.units} onChange={e => handleInputChange('units', e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary-on-dark" style={{ width: '100%', justifyContent: 'center' }}>
                    Reserve My Place <span className="btn-arrow">→</span>
                  </button>
                  <p className="form-footnote">
                    By reserving, you agree to be notified about UDRAH availability. No charge today.
                  </p>
                </form>
              </>
            ) : (
              <div className="form-success">
                <span className="eyebrow-dot" style={{ width: 12, height: 12, marginBottom: 24 }} />
                <h2 className="h3" style={{ color: 'var(--bg-ivory)' }}>You're on the list.</h2>
                <p className="body on-dark" style={{ marginTop: 14 }}>
                  Thank you for reserving your UDRAH. We'll be in touch as your production cycle approaches.
                </p>
                <Link to="/" className="btn btn-secondary-on-dark" style={{ marginTop: 32 }}>
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Flowline */}
      <svg className="flowline" viewBox="0 0 1280 64" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="flowR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7AD39B" stopOpacity="0" />
            <stop offset="50%" stopColor="#4E7C5D" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#7AD39B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path style={{ stroke: 'url(#flowR)' }} d="M0,32 C 220,8 340,56 640,32 C 940,8 1060,56 1280,32" />
        <circle className="pulse" r="3" style={{ offsetPath: "path('M0,32 C 220,8 340,56 640,32 C 940,8 1060,56 1280,32')" }} />
      </svg>

      {/* FAQ */}
      <section className="section">
        <div className="inner">
          <div className="eyebrow reveal">
            <span className="eyebrow-dot" style={{ background: 'var(--sage)' }} />
            <span className="eyebrow-label dim">Questions</span>
          </div>
          <h2 className="h2 reveal" style={{ marginBottom: 56 }}>Before you reserve.</h2>
          <div className="reveal">
            {[
              { q: 'Is payment required to reserve?', a: 'No. Reserving your place costs nothing today — you\'ll be notified before your production cycle opens.' },
              { q: 'How long does the algae chamber last?', a: 'The living culture is maintained through a guided care cycle in the companion app — full details ship with your unit.' },
              { q: 'When does the first cycle ship?', a: 'Founding members will be notified with exact timing as production dates are confirmed.' },
            ].map(({ q, a }) => (
              <React.Fragment key={q}>
                <div className="divider" />
                <div style={{ padding: '28px 0' }}>
                  <h3 className="h3" style={{ fontSize: '1.15rem' }}>{q}</h3>
                  <p className="body" style={{ marginTop: 10, maxWidth: '58ch' }}>{a}</p>
                </div>
              </React.Fragment>
            ))}
            <div className="divider" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
