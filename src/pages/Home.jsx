import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import BagIcon from '../components/BagIcon'
import Footer from '../components/Footer'
import ReelCarousel from '../components/ReelCarousel'
import useReveal from '../hooks/useReveal'
import './Home.css'

export default function Home() {
  const pageRef = useReveal()
  const { addItem } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleAddToBag = () => {
    addItem({
      id: 'udrah-system-1',
      name: 'UDRAH Living Air Purifier',
      edition: 'Founding Member Edition',
      price: '$580',
      numericPrice: 580,
      image: '/logo.png',
      tag: 'Batch 01 Priority'
    })
  }

  return (
    <main ref={pageRef} className="page-enter">

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero">
        {/* Fallback background in case video hasn't loaded yet */}
        <div className="hero-fallback" />

        {/* Background video */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" />
        <div className="hero-noise" />

        <div className="hero-content">
          <div className="eyebrow hero-eyebrow fade-in delay-0">
            <span className="eyebrow-dot" />
            <span className="eyebrow-label">Living Air Technology</span>
          </div>

          <h1 className="hero-headline fade-in delay-1">
            The Third Eye<br />of Nature
          </h1>

          <p className="hero-copy fade-in delay-2">
            Meet UDRAH — the world's first living air system that purifies air
            and increases oxygen indoors. Not just a purifier. A living, breathing ecosystem.
          </p>

          <div className="hero-actions fade-in delay-3">
            <Link to="/product" className="hero-btn">
              Explore Product <span className="hero-btn-arrow">→</span>
            </Link>
            <button onClick={handleAddToBag} className="hero-btn" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <BagIcon size={18} color="currentColor" /> Add to Bag
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll-cue" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ═══════════ PRODUCT + REELS ═══════════ */}
      <section className="section product-reels-section" id="how-it-works">
        <div className="inner">

          {/* Section header */}
          <div className="eyebrow reveal" style={{ marginBottom: 48 }}>
            <span className="eyebrow-dot" style={{ background: 'var(--sage)' }} />
            <span className="eyebrow-label dim">Living Air Technology</span>
          </div>

          {/* ── Top row: product card LEFT + reels RIGHT ── */}
          <div className="product-reels-layout">

            {/* LEFT: Product Card */}
            <div className="product-card-left reveal">
              <div className="prod-card prod-card-hero">
                <div className="prod-hero-img-wrap">
                  <img src="/udrah-product.png" alt="UDRAH Pro System" className="prod-hero-img" />
                </div>
                <div className="prod-card-body">
                  <p className="prod-card-tag">FOR MODERN SPACES</p>
                  <h3 className="prod-card-title">UDRAH Pro System</h3>
                  <p className="prod-card-sub">Complete living air purification</p>
                  <div className="prod-card-rating">
                    {'★★★★★'} <span>(116)</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                    <Link to="/product" className="prod-card-btn" style={{ flex: 1, textAlign: 'center' }}>Explore →</Link>
                    <button 
                      onClick={handleAddToBag}
                      className="prod-card-btn"
                      style={{ 
                        flex: 1, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: 6, 
                        background: 'var(--green)', 
                        color: 'var(--bg-dark)',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <BagIcon size={16} color="var(--bg-dark)" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: 3D Instagram Reel Carousel */}
            <div className="reels-wrap reveal reveal-delay-1">
              <ReelCarousel />
            </div>

          </div>


          {/* ── Full-width bottom row: Purify / Live / Breathe ── */}
          <div className="grid-3 reveal" style={{ marginTop: 64 }}>
            <div>
              <span className="tech-index">01</span>
              <h3 className="h3" style={{ margin: '20px 0 14px' }}>Purify</h3>
              <p className="body">
                Advanced purification designed to remove airborne pollutants,
                engineered with precision at every stage of airflow.
              </p>
            </div>
            <div>
              <span className="tech-index">02</span>
              <h3 className="h3" style={{ margin: '20px 0 14px' }}>Live</h3>
              <p className="body">
                A living microalgae system forms the biological core of UDRAH —
                visibly alive, quietly at work inside its chamber.
              </p>
            </div>
            <div>
              <span className="tech-index">03</span>
              <h3 className="h3" style={{ margin: '20px 0 14px' }}>Breathe</h3>
              <p className="body">
                Through photosynthesis, the living system absorbs carbon dioxide
                and produces oxygen, in real time, indoors.
              </p>
            </div>
          </div>

          <div className="reveal prod-closing" style={{ marginTop: 48 }}>
            <p className="h3" style={{ fontWeight: 600 }}>
              Engineered for your space. Inspired by nature.
            </p>
            <Link to="/product" className="btn btn-secondary">
              Explore the Product <span className="btn-arrow">→</span>
            </Link>
          </div>

        </div>
      </section>


      {/* ═══════════ FLOWLINE ═══════════ */}
      <svg className="flowline" viewBox="0 0 1280 64" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="flowGradHome" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#7AD39B" stopOpacity="0" />
            <stop offset="50%"  stopColor="#4E7C5D" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#7AD39B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path style={{ stroke: 'url(#flowGradHome)' }}
          d="M0,32 C 220,8 340,56 640,32 C 940,8 1060,56 1280,32" />
        <circle className="pulse" r="3"
          style={{ offsetPath: "path('M0,32 C 220,8 340,56 640,32 C 940,8 1060,56 1280,32')" }} />
      </svg>



      {/* ═══════════ WHY UDRAH (merged) ═══════════ */}
      <section className="section section-stone" id="why-udrah">
        <div className="inner">

          {/* Header */}
          <div className="eyebrow reveal" style={{ justifyContent: 'center', marginBottom: 16 }}>
            <span className="eyebrow-dot" style={{ background: 'var(--sage)' }} />
            <span className="eyebrow-label dim">Why UDRAH</span>
          </div>
          <h2 className="h2 reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            Built at the intersection of<br />engineering and biology.
          </h2>

          {/* Benefits grid */}
          <div className="benefits-grid">
            {[
              {
                num: '01',
                title: 'Biological Purification',
                body: 'Living microalgae actively absorbs CO₂ and pollutants — not just capturing them, but biologically processing them in real time.',
              },
              {
                num: '02',
                title: 'Oxygen Enrichment',
                body: 'Through natural photosynthesis, UDRAH produces oxygen indoors — enriching the air quality of your space continuously.',
              },
              {
                num: '03',
                title: 'Smart Air Intelligence',
                body: 'Integrated sensors monitor particulate matter, CO₂, humidity and temperature, adapting the system to your environment automatically.',
              },
              {
                num: '04',
                title: 'Precision Engineered',
                body: 'Every mechanical component exists to keep the living core in its ideal condition — hardware in service of biology.',
              },
            ].map((b, i) => (
              <div key={b.num} className={`benefit-card reveal reveal-delay-${i % 2}`}>
                <span className="tech-index" style={{ color: 'var(--sage)', fontSize: '0.9rem' }}>{b.num}</span>
                <h3 className="h3" style={{ margin: '20px 0 14px', fontSize: '1.35rem' }}>{b.title}</h3>
                <p className="body">{b.body}</p>
              </div>
            ))}
          </div>

          {/* Brand story + quote — side by side below the grid */}
          <div className="grid-2 about-teaser reveal" style={{ alignItems: 'center', marginTop: 72 }}>
            <div>
              <p className="body-lg" style={{ marginTop: 0 }}>
                UDRAH exists because purification alone was never the whole
                answer. We design at the meeting point of precision hardware and
                living systems — so the air in your space isn't just filtered,
                it's actively renewed.
              </p>
              <Link to="/about" className="btn btn-secondary" style={{ marginTop: 36 }}>
                About Us <span className="btn-arrow">→</span>
              </Link>
            </div>

            <div className="panel reveal reveal-delay-1" style={{ padding: '48px 44px' }}>
              <p className="h3" style={{ fontWeight: 500, lineHeight: 1.3 }}>
                "Precision on the outside.<br />Life on the inside."
              </p>
              <div className="divider" style={{ margin: '32px 0' }} />
              <p className="body">
                The principle behind every decision we make — from the geometry
                of the chamber to the culture of algae living inside it.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ═══════════ CTA ═══════════ */}
      <section className="section section-dark cta-section">
        <div className="cta-bg" aria-hidden="true" />
        <div className="inner cta-inner reveal">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="eyebrow-dot" />
            <span className="eyebrow-label">Living Air Technology</span>
          </div>
          <h2 className="display" style={{ color: 'var(--bg-ivory)', textAlign: 'center' }}>
            Breathe Differently.
          </h2>
          <p className="body-lg on-dark cta-copy">
            UDRAH brings advanced air purification and living microalgae
            technology into one beautifully engineered system.
          </p>
          <div className="cta-actions">
            <button onClick={handleAddToBag} className="btn btn-primary-on-dark" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <BagIcon size={18} color="var(--bg-dark)" />
              <span>Add to Bag — $580</span>
            </button>
            <Link to="/product" className="btn btn-secondary-on-dark">
              Explore UDRAH <span className="btn-arrow">→</span>
            </Link>
          </div>
          <p className="label cta-tagline">Precision engineered. Naturally alive.</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
