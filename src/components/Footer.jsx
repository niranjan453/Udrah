import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="inner">
        <div className="footer-grid">

          {/* Brand column */}
          <div>
            <Link to="/" style={{ display: 'inline-block', marginBottom: 16 }}>
              <img
                src="/logo.png"
                alt="UDRAH Industries"
                style={{
                  height: 48,
                  width: 'auto',
                  mixBlendMode: 'lighten',
                  filter: 'brightness(1.1)',
                }}
              />
            </Link>
            <p className="body on-dark" style={{ maxWidth: '30ch' }}>
              The third eye of nature — a living air system for the way you breathe, live, and experience your space.
            </p>
          </div>

          {/* Explore */}
          <div>
            <div className="footer-col-title">Explore</div>
            <Link className="footer-link" to="/smart-air">Smart Air</Link>
            <Link className="footer-link" to="/product">Product</Link>
            <Link className="footer-link" to="/about">About Us</Link>
          </div>

          {/* Company */}
          <div>
            <div className="footer-col-title">Company</div>
            <a className="footer-link" href="#">Press</a>
            <a className="footer-link" href="#">Careers</a>
            <a className="footer-link" href="#">Contact</a>
          </div>

          {/* Stay Connected */}
          <div>
            <div className="footer-col-title">Stay Connected</div>
            <a className="footer-link" href="#">Instagram</a>
            <a className="footer-link" href="#">LinkedIn</a>
            <a className="footer-link" href="#">Newsletter</a>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© 2026 UDRAH. Precision engineered. Naturally alive.</span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span>Privacy · Terms</span>
            <Link to="/admin" style={{ color: 'rgba(205,212,203,0.45)', textDecoration: 'none', fontSize: '0.78rem' }}>
              Admin Portal ↗
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
