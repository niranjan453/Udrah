import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import BagIcon from '../components/BagIcon'
import Footer from '../components/Footer'
import udrahProductImg from '../assets/udrah-product.png'
import specimenRocksImg from '../assets/specimen-rocks.png'
import specimenTreeImg from '../assets/specimen-tree.png'
import './Product.css'

export default function Product() {
  const { addItem } = useCart()
  const [realityMode, setRealityMode] = useState('specimen') // 'specimen' | 'cyber' | 'blueprint'
  const [activeNode, setActiveNode] = useState('algae')
  const [liveTime, setLiveTime] = useState('')
  const [oscilloscopeValues, setOscilloscopeValues] = useState([35, 60, 45, 80, 55, 90, 70])

  // Live real-time clock ticker
  useEffect(() => {
    const updateTime = () => {
      const d = new Date()
      setLiveTime(d.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Oscilloscope wave animation in blueprint mode
  useEffect(() => {
    if (realityMode === 'blueprint') {
      const interval = setInterval(() => {
        setOscilloscopeValues([
          Math.floor(20 + Math.random() * 70),
          Math.floor(40 + Math.random() * 55),
          Math.floor(30 + Math.random() * 65),
          Math.floor(50 + Math.random() * 45),
          Math.floor(25 + Math.random() * 75),
          Math.floor(60 + Math.random() * 38),
          Math.floor(35 + Math.random() * 60)
        ])
      }, 400)
      return () => clearInterval(interval)
    }
  }, [realityMode])

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
      image: udrahProductImg,
      tag: 'Batch 01 Priority'
    })
  }

  // Specimen Nodes Data
  const nodes = {
    algae: {
      id: 'algae',
      title: 'LIVING BIOLOGICAL CORE',
      tag: '01 / CORE BIO-REACTOR',
      desc: 'Active cultured Chlorella Vulgaris microalgae absorbing indoor CO₂ and generating continuous pure oxygen.',
      pos: 'top-left'
    },
    spectrum: {
      id: 'spectrum',
      title: 'PHOTONIC WAVE SPECTRUM',
      tag: '02 / PHOTOSYNTHESIS LIGHT',
      desc: 'Tunable 660nm chlorophyll-targeted wavelength matrix sustaining natural respiration indoors.',
      pos: 'top-right'
    },
    filter: {
      id: 'filter',
      title: 'MECHANICAL H13 MATRIX',
      tag: '03 / FILTRATION STAGE',
      desc: 'Graded particulate filtration capturing 99.97% of PM2.5, VOCs, dust, and microscopic allergens.',
      pos: 'mid-left'
    },
    telemetry: {
      id: 'telemetry',
      title: 'SMART SENSING ARRAY',
      tag: '04 / ENVIRONMENTAL SENSORS',
      desc: 'High-precision laser PM2.5, volatile organic compound, humidity, and CO₂ tracking in real time.',
      pos: 'bottom-right'
    }
  }

  return (
    <div className={`hud-product-root mode-${realityMode}`}>
      {/* HUD Blueprint Grid Background */}
      <div className="hud-grid-background" />

      {/* ═══════════════════════════════════════════════════════════════
          STAGE 1: "REALITY BY DESIGN" HUD SCI-FI BIOTECH INTERACTION
         ═══════════════════════════════════════════════════════════════ */}
      <section className="hud-stage">

        {/* ─── Top HUD Header Bar ─── */}
        <div className="hud-header-bar">
          <div className="hud-title-wrap">
            <div className="hud-brand-tag">
              <span>UDRAH</span>
              <span style={{ opacity: 0.4 }}>//</span>
              <span>{realityMode === 'specimen' ? 'LAB REALITY' : realityMode === 'cyber' ? 'CYBER NATURE' : 'MATRIX BLUEPRINT'}</span>
            </div>
            <h1 className="hud-main-headline">
              REALITY,<br />BY DESIGN.
              <span className="hud-headline-badge">LAB VER. 2.4</span>
            </h1>
          </div>

          {/* Center: Reality Mode Switcher */}
          <div className="hud-reality-switcher">
            <div className="hud-switcher-pill">
              <span className="hud-globe-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
              <span className="hud-switcher-label">CHANGE REALITY</span>
            </div>
            <div className="hud-mode-buttons">
              <button
                className={`hud-mode-btn ${realityMode === 'specimen' ? 'active' : ''}`}
                onClick={() => setRealityMode('specimen')}
              >
                01 SPECIMEN
              </button>
              <button
                className={`hud-mode-btn ${realityMode === 'cyber' ? 'active' : ''}`}
                onClick={() => setRealityMode('cyber')}
              >
                02 CYBER
              </button>
              <button
                className={`hud-mode-btn ${realityMode === 'blueprint' ? 'active' : ''}`}
                onClick={() => setRealityMode('blueprint')}
              >
                03 BLUEPRINT
              </button>
            </div>
          </div>

          {/* Top Right: Telemetry Readout */}
          <div className="hud-telemetry-top">
            <span>LOCAL TIME</span>
            <span className="hud-live-clock">{liveTime || '05:04:18 AM'}</span>
            <div className="hud-status-chip">
              <span className="hud-pulse-node" />
              <span>O₂ EXCHANGE: +450cc/h</span>
            </div>
          </div>
        </div>

        {/* ─── Central Specimen Showcase with Interactive HUD Callouts ─── */}
        <div className="hud-center-stage">

          {/* Orbital Depth Rings */}
          <div className="hud-orbit-ring ring-1" />
          <div className="hud-orbit-ring ring-2" />

          {/* SVG Connector Lines (Hidden on Mobile) */}
          <svg className="hud-svg-overlay" viewBox="0 0 1200 600" preserveAspectRatio="none">
            {/* Top-Left Line to Node 1 (Algae Core on Glass Chamber) */}
            <path
              className="hud-leader-line"
              d="M 240 120 L 460 120 L 576 258"
            />

            {/* Top-Right Line to Node 2 (Photonic Spectrum on Top Cap) */}
            <path
              className="hud-leader-line"
              d="M 960 130 L 740 130 L 624 216"
            />

            {/* Mid-Left Line to Node 3 (Mechanical Filter on White Chassis) */}
            <path
              className="hud-leader-line"
              d="M 260 410 L 440 410 L 568 333"
            />

            {/* Bottom-Right Line to Node 4 (Telemetry on Smart Sensor Array) */}
            <path
              className="hud-leader-line"
              d="M 940 440 L 760 440 L 628 380"
            />
          </svg>

          {/* Central Floating Specimen Island: Purifier standing on Mossy Rocks Base with Mature Tree */}
          <div className="hud-specimen-container">
            <div className="hud-floating-specimen">
              <div className="hud-specimen-composite">
                {/* Mossy Rocks Foundation */}
                <img
                  src={specimenRocksImg}
                  alt="Mossy Stone Base"
                  className="hud-composite-rocks"
                />

                {/* Big Mature Living Tree on the Right by the Rocks */}
                <img
                  src={specimenTreeImg}
                  alt="Living Bio-Tree Specimen"
                  className="hud-composite-tree"
                />

                {/* Main UDRAH Purifier Product Specimen */}
                <img
                  src={udrahProductImg}
                  alt="UDRAH Living Air Purifier"
                  className="hud-composite-purifier"
                />

                {/* Hotspot 1: Photonic Spectrum Cap (Top Lid) */}
                <button
                  type="button"
                  className={`hud-hotspot-pin pin-spectrum ${activeNode === 'spectrum' ? 'active' : ''}`}
                  onClick={() => setActiveNode('spectrum')}
                  title="Photonic Spectrum Matrix"
                >
                  <span className="pin-pulse" />
                  <span className="pin-dot" />
                </button>

                {/* Hotspot 2: Living Algae Chamber (Glass Core) */}
                <button
                  type="button"
                  className={`hud-hotspot-pin pin-algae ${activeNode === 'algae' ? 'active' : ''}`}
                  onClick={() => setActiveNode('algae')}
                  title="Biological Algae Core"
                >
                  <span className="pin-pulse" />
                  <span className="pin-dot" />
                </button>

                {/* Hotspot 3: Mechanical Filter Stage (Lower Chassis) */}
                <button
                  type="button"
                  className={`hud-hotspot-pin pin-filter ${activeNode === 'filter' ? 'active' : ''}`}
                  onClick={() => setActiveNode('filter')}
                  title="Mechanical H13 Filter"
                >
                  <span className="pin-pulse" />
                  <span className="pin-dot" />
                </button>

                {/* Hotspot 4: Smart Sensing Array (Sensor Dial) */}
                <button
                  type="button"
                  className={`hud-hotspot-pin pin-telemetry ${activeNode === 'telemetry' ? 'active' : ''}`}
                  onClick={() => setActiveNode('telemetry')}
                  title="Smart Environmental Sensors"
                >
                  <span className="pin-pulse" />
                  <span className="pin-dot" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Callout 1: Biological Core */}
          <div
            className={`hud-callout-card top-left ${activeNode === 'algae' ? 'active' : ''}`}
            onClick={() => setActiveNode('algae')}
          >
            <span className="hud-card-label">
              <span className="hud-card-pin" />
              {nodes.algae.tag}
            </span>
            <h4 className="hud-card-title">{nodes.algae.title}</h4>
            <p className="hud-card-desc">{nodes.algae.desc}</p>
          </div>

          {/* Interactive Callout 2: Photonic Spectrum */}
          <div
            className={`hud-callout-card top-right ${activeNode === 'spectrum' ? 'active' : ''}`}
            onClick={() => setActiveNode('spectrum')}
          >
            <span className="hud-card-label">
              <span className="hud-card-pin" />
              {nodes.spectrum.tag}
            </span>
            <h4 className="hud-card-title">{nodes.spectrum.title}</h4>
            <p className="hud-card-desc">{nodes.spectrum.desc}</p>
          </div>

          {/* Interactive Callout 3: Mechanical Filter */}
          <div
            className={`hud-callout-card mid-left ${activeNode === 'filter' ? 'active' : ''}`}
            onClick={() => setActiveNode('filter')}
          >
            <span className="hud-card-label">
              <span className="hud-card-pin" />
              {nodes.filter.tag}
            </span>
            <h4 className="hud-card-title">{nodes.filter.title}</h4>
            <p className="hud-card-desc">{nodes.filter.desc}</p>
          </div>

          {/* Interactive Callout 4: Environmental Telemetry */}
          <div
            className={`hud-callout-card bottom-right ${activeNode === 'telemetry' ? 'active' : ''}`}
            onClick={() => setActiveNode('telemetry')}
          >
            <span className="hud-card-label">
              <span className="hud-card-pin" />
              {nodes.telemetry.tag}
            </span>
            <h4 className="hud-card-title">{nodes.telemetry.title}</h4>
            <p className="hud-card-desc">{nodes.telemetry.desc}</p>
          </div>

          {/* Blueprint-Only Side Oscilloscope & Audio Bars */}
          {realityMode === 'blueprint' && (
            <div className="hud-blueprint-side-widgets">
              <div className="hud-telemetry-box">
                <span className="hud-card-label">AIRFLOW FREQUENCY</span>
                <div className="hud-bars-wrap">
                  {oscilloscopeValues.map((v, idx) => (
                    <div key={idx} className="hud-bar" style={{ height: `${v}%` }} />
                  ))}
                </div>
              </div>
              <div className="hud-telemetry-box">
                <span className="hud-card-label">PURITY INDEX</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: 4 }}>99.84%</div>
                <span style={{ fontSize: '0.62rem', opacity: 0.6 }}>PM2.5: 2.1 μg/m³</span>
              </div>
            </div>
          )}
        </div>

        {/* ─── Bottom HUD Bar ─── */}
        <div className="hud-bottom-bar">

          {/* Bottom Left: Core Threads of Bio-Engineering */}
          <div className="hud-box-threads">
            <div className="hud-box-header">
              <span>[CORE THREADS OF BIO-DESIGN]</span>
              <span>BATCH 01</span>
            </div>
            <div className="hud-thread-item">
              <span className="index">01.</span>
              <span>PERCEPTUAL BIOTECH INTERFACES</span>
            </div>
            <div className="hud-thread-item">
              <span className="index">02.</span>
              <span>LIVING MICROALGAE EMBODIMENT</span>
            </div>
            <div className="hud-thread-item">
              <span className="index">03.</span>
              <span>AIR PURITY TELEMETRY &amp; CO₂ SYNC</span>
            </div>
            <div className="hud-thread-item">
              <span className="index">04.</span>
              <span>PRECISION ANODIZED ALUMINUM</span>
            </div>
            <div className="hud-barcode-svg">
              <svg width="100%" height="16" viewBox="0 0 160 16" preserveAspectRatio="none">
                <rect x="0" y="0" width="3" height="16" fill="currentColor" />
                <rect x="6" y="0" width="1.5" height="16" fill="currentColor" />
                <rect x="11" y="0" width="4" height="16" fill="currentColor" />
                <rect x="18" y="0" width="2" height="16" fill="currentColor" />
                <rect x="23" y="0" width="5" height="16" fill="currentColor" />
                <rect x="31" y="0" width="2" height="16" fill="currentColor" />
                <rect x="36" y="0" width="4" height="16" fill="currentColor" />
                <rect x="43" y="0" width="1.5" height="16" fill="currentColor" />
                <rect x="48" y="0" width="6" height="16" fill="currentColor" />
                <rect x="58" y="0" width="2" height="16" fill="currentColor" />
                <rect x="64" y="0" width="3.5" height="16" fill="currentColor" />
                <rect x="71" y="0" width="1.5" height="16" fill="currentColor" />
                <rect x="76" y="0" width="5" height="16" fill="currentColor" />
                <rect x="85" y="0" width="3" height="16" fill="currentColor" />
                <rect x="91" y="0" width="2" height="16" fill="currentColor" />
                <rect x="96" y="0" width="4.5" height="16" fill="currentColor" />
                <rect x="104" y="0" width="2" height="16" fill="currentColor" />
                <rect x="110" y="0" width="6" height="16" fill="currentColor" />
                <rect x="120" y="0" width="1.5" height="16" fill="currentColor" />
                <rect x="125" y="0" width="4" height="16" fill="currentColor" />
                <rect x="132" y="0" width="2" height="16" fill="currentColor" />
                <rect x="138" y="0" width="5" height="16" fill="currentColor" />
                <rect x="146" y="0" width="2" height="16" fill="currentColor" />
                <rect x="152" y="0" width="6" height="16" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Bottom Center: Philosophy Tagline */}
          <div className="hud-bottom-center">
            <span className="hud-center-brackets">[ · · · ]</span>
            <span className="hud-center-tagline">GROUNDED. STRUCTURED. LIVING.</span>
          </div>

          {/* Bottom Right: Acquisition Card */}
          <div className="hud-box-action">
            <div className="hud-action-header">
              <span className="hud-action-badge">FOUNDING BATCH 01</span>
              <span className="hud-action-price">$580</span>
            </div>
            <p className="hud-action-copy">
              Precision engineered living biotech system with active Chlorella culture and guided companion app.
            </p>
            <button onClick={handleAddToBag} className="hud-btn-bag">
              <BagIcon size={16} color="currentColor" />
              <span>ADD TO BAG — $580</span>
            </button>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STAGE 2: TECHNICAL SPECIFICATIONS & SYSTEM BREAKDOWN
         ═══════════════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--hud-bg-card)', borderTop: '1px solid var(--hud-border)' }}>
        <div className="inner">
          <div className="eyebrow">
            <span className="eyebrow-dot" style={{ background: 'var(--hud-border-active)' }} />
            <span className="eyebrow-label">Engineering Specifications</span>
          </div>
          <h2 className="h2" style={{ marginBottom: 48 }}>Engineered like an instrument.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              {
                title: 'Living Biological Core',
                metric: 'Chlorella Culture',
                desc: 'Photobioreactor chamber absorbing CO₂ in real time and releasing oxygen via continuous photosynthesis.'
              },
              {
                title: 'Mechanical Pre-Filter',
                metric: 'Dual H13 True HEPA',
                desc: 'Captures 99.97% of particulate matter down to 0.3 microns including pollen, smoke, dust, and pet dander.'
              },
              {
                title: 'Room Coverage',
                metric: 'Up to 40 m²',
                desc: 'Engineered for bedrooms, executive studios, and creative living spaces with whisper-quiet airflow.'
              },
              {
                title: 'Telemetry Sensors',
                metric: 'Laser PM2.5 + VOC + CO₂',
                desc: 'Continuous real-time air quality indexing synced seamlessly with the UDRAH iOS & Android companion app.'
              }
            ].map((spec) => (
              <div
                key={spec.title}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--hud-border)',
                  borderRadius: 12,
                  padding: 24
                }}
              >
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.72rem', color: 'var(--hud-text-muted)', textTransform: 'uppercase' }}>
                  {spec.title}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '8px 0 10px' }}>{spec.metric}</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--hud-text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {spec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STAGE 3: BOTTOM CTA
         ═══════════════════════════════════════════════════════════════ */}
      <section className="section section-dark" style={{ textAlign: 'center' }}>
        <div className="inner" style={{ maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 className="h2" style={{ color: 'var(--bg-ivory)' }}>Claim your Founding Batch 01 Unit.</h2>
          <p className="body-lg on-dark" style={{ marginTop: 18 }}>
            Units are allocated sequentially per production cycle. Priority delivery included.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
            <button
              onClick={handleAddToBag}
              className="btn btn-primary-on-dark"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              <BagIcon size={18} color="var(--bg-dark)" />
              <span>Add to Bag — $580</span>
            </button>
            <Link to="/" className="btn btn-secondary-on-dark">
              Back to Home <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
