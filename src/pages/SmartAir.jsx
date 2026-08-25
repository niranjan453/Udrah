import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import BagIcon from '../components/BagIcon'
import Footer from '../components/Footer'
import './SmartAir.css'

export default function SmartAir() {
  const { addItem } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleAddToBag = () => {
    addItem({
      id: 'udrah-system-1',
      name: 'UDRAH Living Air Purifier',
      edition: 'Founding Member Edition · Batch 01',
      price: '$580',
      numericPrice: 580,
      image: '/udrah-product.png',
      tag: 'Batch 01 Priority'
    })
  }

  // 3-Way Comparison Data: Traditional vs. Indoor Trees/Plants vs. UDRAH (Our Solution)
  const comparisonData = [
    {
      feature: 'Filters Airborne Particulate (PM2.5 / PM10)',
      sub: 'Captures fine toxic dust, wildfire smoke, pollen & soot',
      traditional: { status: 'check', text: 'Traps in filter' },
      tree: { status: 'cross', text: 'Minimal passive settling' },
      udrah: { status: 'check', text: 'Dual H13 True-HEPA (99.97%)' }
    },
    {
      feature: 'Absorbs CO₂ & Generates Pure Oxygen (O₂)',
      sub: 'Prevents indoor drowsiness, brain fog & stagnant air',
      traditional: { status: 'cross', text: 'Cannot absorb CO₂' },
      tree: { status: 'warn', text: 'Slow / Needs huge space' },
      udrah: { status: 'check', text: 'Live Chlorella Photobioreactor' }
    },
    {
      feature: 'Natural Biological Respiration',
      sub: 'Restores living atmospheric balance indoors',
      traditional: { status: 'cross', text: 'Purely synthetic mechanical' },
      tree: { status: 'check', text: '100% natural biology' },
      udrah: { status: 'check', text: 'Real living microalgae core' }
    },
    {
      feature: '24/7 Respiration (No Sunlight Needed)',
      sub: 'Maintains oxygen output in closed, dark indoor rooms',
      traditional: { status: 'cross', text: 'No biological respiration' },
      tree: { status: 'cross', text: 'Emits CO₂ in dark/night' },
      udrah: { status: 'check', text: '660nm chlorophyll photonic light' }
    },
    {
      feature: 'Eliminates VOCs, Formaldehyde & Odors',
      sub: 'Destroys gaseous chemical toxins and household odors',
      traditional: { status: 'warn', text: 'Carbon saturates fast' },
      tree: { status: 'warn', text: 'Very slow bio-uptake' },
      udrah: { status: 'check', text: 'Activated carbon + Bio-absorption' }
    },
    {
      feature: 'Zero Toxic Ozone or Chemical By-Products',
      sub: 'Safe around newborns, pets & respiratory patients',
      traditional: { status: 'cross', text: 'Ionizers emit ozone' },
      tree: { status: 'check', text: 'Zero by-products' },
      udrah: { status: 'check', text: '100% natural biotics (0 Ozone)' }
    },
    {
      feature: 'Space & Maintenance Efficiency',
      sub: 'High output without soil mess, pests or large footprint',
      traditional: { status: 'check', text: 'Compact appliance' },
      tree: { status: 'cross', text: 'Needs 15+ large potted trees' },
      udrah: { status: 'check', text: '1 compact unit = 15 mature trees' }
    },
    {
      feature: 'Real-Time Air Quality & CO₂ Telemetry',
      sub: 'Laser PM2.5, VOC, humidity & companion app sync',
      traditional: { status: 'cross', text: 'Basic light or none' },
      tree: { status: 'cross', text: 'No telemetry' },
      udrah: { status: 'check', text: 'Smart App + Edge Status Halo' }
    },
    {
      feature: 'Engineered for Modern Urban Homes',
      sub: 'Tuned specifically for closed AC rooms & heavy pollution',
      traditional: { status: 'warn', text: 'Filters without oxygenating' },
      tree: { status: 'cross', text: 'Struggles in dry AC air' },
      udrah: { status: 'check', text: 'Complete air restoration' }
    }
  ]

  return (
    <div className="smartair-page">

      {/* ─── Hero Section ─── */}
      <section className="smartair-hero">
        <div className="smartair-hero-inner">
          <div className="smartair-hero-eyebrow">
            <span className="pulse-dot" />
            <span>Living Air Biotechnology</span>
          </div>

          <h1 className="smartair-hero-title">
            UDRAH vs. Trees vs. Traditional Purifiers
          </h1>

          <p className="smartair-hero-subtitle">
            We don't just filter—we restore. See how our living biological approach goes
            further than conventional appliances and natural indoor plants.
          </p>

          {/* Key Metrics Row */}
          <div className="smartair-metrics-row">
            <div className="smartair-metric-card">
              <span className="smartair-metric-val">15×</span>
              <span className="smartair-metric-label">Oxygen generating density vs. potted plants</span>
            </div>
            <div className="smartair-metric-card">
              <span className="smartair-metric-val">99.97%</span>
              <span className="smartair-metric-label">Particulate capture down to 0.3 microns</span>
            </div>
            <div className="smartair-metric-card">
              <span className="smartair-metric-val">-82%</span>
              <span className="smartair-metric-label">Indoor CO₂ concentration reduction</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The 3-Way Comparison Table Section ─── */}
      <section className="smartair-comparison-section">
        <div className="comparison-header-wrap">
          <h2 className="comparison-headline">The Side-by-Side Comparison</h2>
          <p className="comparison-lead">
            Traditional purifiers recycle dead air. Indoor plants lack airflow throughput.
            UDRAH marries mechanical precision with living nature.
          </p>
        </div>

        <div className="comparison-table-wrapper">
          <table className="smartair-table">
            <thead>
              <tr>
                <th className="col-feature">Feature / Capability</th>
                <th className="col-traditional">Traditional Purifier</th>
                <th className="col-tree">Mature Indoor Tree</th>
                <th className="col-udrah th-udrah">
                  <div className="udrah-col-header">
                    <span className="udrah-brand-name">UDRAH</span>
                    <span className="our-solution-badge">Our Solution</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx}>
                  {/* Feature description */}
                  <td>
                    <span className="feature-title">{row.feature}</span>
                    <span className="feature-sub">{row.sub}</span>
                  </td>

                  {/* Traditional Purifier */}
                  <td className="col-traditional">
                    <div className="status-pill">
                      {row.traditional.status === 'check' && (
                        <span className="status-icon-check">✓</span>
                      )}
                      {row.traditional.status === 'cross' && (
                        <span className="status-icon-cross">✕</span>
                      )}
                      {row.traditional.status === 'warn' && (
                        <span className="status-icon-warn">!</span>
                      )}
                      <span>{row.traditional.text}</span>
                    </div>
                  </td>

                  {/* Tree / Houseplant */}
                  <td className="col-tree">
                    <div className="status-pill">
                      {row.tree.status === 'check' && (
                        <span className="status-icon-check">✓</span>
                      )}
                      {row.tree.status === 'cross' && (
                        <span className="status-icon-cross">✕</span>
                      )}
                      {row.tree.status === 'warn' && (
                        <span className="status-icon-warn">!</span>
                      )}
                      <span>{row.tree.text}</span>
                    </div>
                  </td>

                  {/* UDRAH (Our Solution) */}
                  <td className="col-udrah td-udrah-cell">
                    <div className="udrah-cell-highlight">
                      <span className="udrah-check-icon">✓</span>
                      <span>{row.udrah.text}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Deep Dive Triad Cards ─── */}
      <section className="smartair-deepdive-section">
        <div className="inner">
          <div className="deepdive-grid">

            {/* 1. Traditional Purifiers */}
            <div className="deepdive-card">
              <div>
                <span className="deepdive-tag">01 · Traditional Purifiers</span>
                <h3>The Trap of "Clean" But Dead Air</h3>
                <p>
                  Conventional HEPA purifiers filter dust particles, but they cannot absorb CO₂ or generate oxygen.
                  In closed, air-conditioned rooms, trapped CO₂ levels climb to 1,500+ ppm, leading to afternoon fatigue,
                  brain fog, poor REM sleep, and stuffy indoor syndrome.
                </p>
              </div>
              <div className="deepdive-footer-note">
                Result: Traps particles, but air remains biologically stagnant.
              </div>
            </div>

            {/* 2. Indoor Plants / Trees */}
            <div className="deepdive-card">
              <div>
                <span className="deepdive-tag">02 · Natural Trees &amp; Plants</span>
                <h3>The Indoor Scale Bottleneck</h3>
                <p>
                  Houseplants are wonderful, but passive leaves lack motorized airflow. To oxygenate a typical
                  40m² bedroom, you would need over 15 large potted trees with direct sunlight. At night, most plants
                  reverse respiration, consuming oxygen and releasing carbon dioxide back into your room.
                </p>
              </div>
              <div className="deepdive-footer-note">
                Result: Natural, but insufficient throughput for indoor scale.
              </div>
            </div>

            {/* 3. UDRAH Living Air */}
            <div className="deepdive-card card-highlight">
              <div>
                <span className="deepdive-tag">03 · The UDRAH Solution</span>
                <h3>High-Density Photobioreactor</h3>
                <p>
                  UDRAH culture contains billions of active Chlorella microalgae cells in a micro-engineered chamber.
                  Paired with targeted 660nm photonic illumination and dual-stage H13 filtration, UDRAH captures 99.97%
                  of toxic pollutants while actively producing living oxygen 24/7.
                </p>
              </div>
              <div className="deepdive-footer-note" style={{ color: 'var(--green)' }}>
                Result: 99.97% clean air + active living oxygen regeneration.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="smartair-cta-section">
        <div className="smartair-cta-inner">
          <h2>Breathe Differently with UDRAH</h2>
          <p>
            Experience the world's first living air ecosystem for modern indoor spaces.
            Founding Edition Batch 01 reservations are now open.
          </p>
          <div className="smartair-cta-actions">
            <button
              onClick={handleAddToBag}
              className="btn btn-primary-on-dark"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              <BagIcon size={18} color="var(--bg-dark)" />
              <span>Add to Bag — $580</span>
            </button>
            <Link to="/product" className="btn btn-secondary-on-dark">
              Explore 3D Product Interface <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
