import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import * as THREE from 'three'
import './About.css'

/* ─── Team Data ──────────────────────────────────────────────────── */
const team = [
  {
    num: '01',
    firstName: 'VIJAY',
    lastName: 'KUMAR',
    name: 'Vijay Kumar',
    role: 'Founder',
    photo: '/vijay.png',
    bio: 'Founder - Drives the core idea and vision of the startup, leads innovation and product development, makes strategic decisions, builds partnerships, and guides the team toward achieving the organization\'s goals and long-term impact.',
    doodleTop: 'founder',
    doodleStamp: 'true\nvision',
    doodleScript: 'Founder & Visionary'
  },
  {
    num: '02',
    firstName: 'SIMRAN',
    lastName: 'MATHUR',
    name: 'Simran Mathur',
    role: 'Co-Founder',
    photo: '/simran.png',
    bio: 'Oversees day-to-day operations, manages laboratory and product development, leads marketing and brand development, supports strategic decisions, represents the startup at events and platforms, coordinates teams, and drives execution, growth, and innovation.',
    doodleTop: 'visionary',
    doodleStamp: 'true\nnorth',
    doodleScript: 'Growth & Science'
  },
  {
    num: '03',
    firstName: 'KANISHK',
    lastName: 'SHARMA',
    name: 'Kanishk Sharma',
    role: 'CTO',
    photo: '/kanishk.png',
    bio: 'CTO - Leads the startup\'s technical vision, 3D designing, modelling, prototyping, engineering, and product development. Oversees technical decisions, drives innovation, and ensures efficient, scalable solutions aligned with the startup\'s vision and goals.',
    doodleTop: 'tech guru',
    doodleStamp: 'code &\nscale',
    doodleScript: 'Engineering Lead'
  },
  {
    num: '04',
    firstName: 'ANURAG',
    lastName: 'KUMAR',
    name: 'Anurag Kumar',
    role: 'Laboratory Editor',
    photo: '/anurag.png',
    bio: 'Laboratory Editor - Manages laboratory activities, conducts experiments, handles materials and equipment, maintains lab records and protocols, supports product testing and development, and ensures smooth, organized, and efficient execution of laboratory processes.',
    doodleTop: 'lab editor',
    doodleStamp: 'lab\nrecords',
    doodleScript: 'Lab Management'
  },
  {
    num: '05',
    firstName: 'GAURI',
    lastName: 'DUBEY',
    name: 'Gauri Dubey',
    role: '3D Design & Representation Associate',
    photo: '/gauri.png',
    bio: '3D Design & Representation Associate - Looks after 3D designing and modelling, supports prototype development, represents the startup at events and contributes to technical and outreach initiatives.',
    doodleTop: '3D design',
    doodleStamp: 'model\n& build',
    doodleScript: '3D & Outreach'
  },
  {
    num: '06',
    firstName: 'ANANYA',
    lastName: 'IYER',
    name: 'Ananya Iyer',
    role: 'Researcher',
    bio: 'Researcher - Conducts scientific research, experiments, data analysis, and product validation; explores emerging technologies, supports laboratory activities, evaluates performance, documents findings, and contributes to evidence-based innovation and continuous improvement of the startup\'s products and solutions.',
    doodleTop: 'research',
    doodleStamp: 'data\n& science',
    doodleScript: 'Research & Analysis'
  },
]

/* ─── Events & Wins Data ─────────────────────────────────────────── */
const events = [
  {
    id: 1,
    shortTitle: 'Blueprint 3.0',
    badge: 'Shortlisted · Final Round',
    title: 'Blueprint 3.0',
    subtitle: 'IIT Delhi',
    description: 'Shortlisted for the final round at Blueprint 3.0, IIT Delhi — one of India\'s most competitive startup innovation platforms.',
    images: ['/event-blueprint.jpeg'],
  },
  {
    id: 2,
    shortTitle: 'IDE Bootcamp',
    badge: 'Winner',
    title: 'IDE Bootcamp 2026',
    subtitle: 'Vadodara',
    description: 'Won the IDE Bootcamp 2026 in Vadodara, showcasing our living air purification technology to a panel of top industry judges.',
    images: ['/event-ide-1.jpeg', '/event-ide-2.jpeg'],
  },
  {
    id: 3,
    shortTitle: 'Yukti 2025',
    badge: 'Shortlisted · Final Round',
    title: 'Yukti Innovation Challenge 2025',
    subtitle: 'National Level',
    description: 'Shortlisted for the Yukti Innovation Challenge 2025 final round — a national innovation competition backed by MoE\'s Innovation Cell.',
    images: ['/event-yukti.jpeg'],
  },
  {
    id: 4,
    shortTitle: 'World Health Summit',
    badge: 'Global Representation',
    title: 'World Health Summit',
    subtitle: 'Regional Meet 2025',
    description: 'Represented at the World Health Summit Regional Meet 2025, where we connected directly with President Axel Radlach Pries — a landmark moment for our global vision.',
    images: ['/event-health-summit.jpeg'],
  },
  {
    id: 5,
    shortTitle: 'BITS Nexus',
    badge: 'Best Innovation Award',
    title: 'BITS BioCyTiH Nexus',
    subtitle: 'Pitching Segment',
    description: 'Awarded Best Innovation Award and received a cash prize at the BITS BioCyTiH Nexus pitching segment, validating our biotech approach.',
    images: ['/event-bits.jpeg'],
  },
  {
    id: 6,
    shortTitle: 'Environment Day',
    badge: 'Outreach & Impact',
    title: 'World Environment Day',
    subtitle: 'Plantation & Awareness Drive',
    description: 'Organized an outreach campaign on World Environment Day — planted trees, distributed seeds, raised awareness about our product, and connected with government officials.',
    images: ['/event-plantation-1.jpeg', '/event-plantation-2.jpeg', '/event-plantation-3.jpeg'],
  },
]

/* ─── Doodle SVGs ────────────────────────────────────────────────── */
function DoodleZigzag() {
  return (
    <svg width="52" height="40" viewBox="0 0 52 40" fill="none" stroke="#4E7C5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2,8 14,2 26,8 38,2 50,8" />
      <polyline points="2,20 14,14 26,20 38,14 50,20" />
      <polyline points="2,32 14,26 26,32 38,26 50,32" />
    </svg>
  )
}

function DoodleSpiral() {
  return (
    <svg width="36" height="44" viewBox="0 0 36 44" fill="none" stroke="#4E7C5D" strokeWidth="1.8" strokeLinecap="round">
      <path d="M18 2 C30 2 34 10 34 18 C34 30 24 38 14 34 C6 30 4 20 10 14 C14 10 22 12 22 18 C22 22 18 24 16 22" />
    </svg>
  )
}

function DoodleStar() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4E7C5D" strokeWidth="1.8" strokeLinecap="round">
      <line x1="12" y1="2"  x2="12" y2="22" />
      <line x1="2"  y1="12" x2="22" y2="12" />
      <line x1="5"  y1="5"  x2="19" y2="19" />
      <line x1="19" y1="5"  x2="5"  y2="19" />
    </svg>
  )
}

function DoodlePin() {
  return (
    <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
      <circle cx="8" cy="7" r="6" fill="#7AD39B" opacity="0.9" />
      <line x1="8" y1="13" x2="8" y2="22" stroke="#4E7C5D" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  )
}

function DoodleRays() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" stroke="#4E7C5D" strokeWidth="1.8" strokeLinecap="round">
      <line x1="14" y1="18" x2="14" y2="4" />
      <line x1="6" y1="17" x2="2" y2="9" />
      <line x1="22" y1="17" x2="26" y2="9" />
    </svg>
  )
}

function DoodleSpring() {
  return (
    <svg width="28" height="58" viewBox="0 0 28 58" fill="none" stroke="#4E7C5D" strokeWidth="2" strokeLinecap="round">
      <path d="M4 4 Q24 8 18 18 Q6 24 16 32 Q24 38 12 44 Q4 48 14 54" />
    </svg>
  )
}

/* ─── Silhouette placeholder icon ────────────────────────────────── */
function PersonIcon() {
  return (
    <svg
      className="photo-placeholder-icon"
      width="48" height="64"
      viewBox="0 0 48 64"
      fill="currentColor"
    >
      <circle cx="24" cy="18" r="12" />
      <path d="M4 60 C4 42 44 42 44 60" />
    </svg>
  )
}

/* ─── Photo Card ─────────────────────────────────────────────────── */
function PhotoCard({ num, name, role, photo, className, onClick }) {
  return (
    <div className={`photo-card ${className}`} data-num={num} onClick={onClick} role="button" tabIndex={0}>
      <div className="photo-card-img">
        {photo
          ? <img src={photo} alt={name} className="photo-card-real-img" />
          : <PersonIcon />
        }
      </div>
      <div className="photo-card-name">
        {name}
        <div className="photo-card-role">{role}</div>
      </div>
    </div>
  )
}

/* ─── Profile Spotlight Modal ────────────────────────────────────── */
function ProfileModal({ member, onClose, onNext, onPrev }) {
  const touchStartRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, onNext, onPrev])

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartRef.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartRef.current
    if (dx > 45) {
      onPrev() // Swipe right -> previous
    } else if (dx < -45) {
      onNext() // Swipe left -> next
    }
    touchStartRef.current = null
  }

  if (!member) return null

  return ReactDOM.createPortal(
    <div className="profile-modal-overlay" onClick={onClose}>
      <div
        className="profile-modal-board"
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Header Row */}
        <div className="modal-header-row">
          <div className="modal-number">{member.num}/</div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Modal Main Content Layout */}
        <div className="modal-body-grid">
          {/* Left: Info */}
          <div className="modal-info-col">
            <h2 className="modal-person-name">
              <span className="modal-name-first">{member.firstName}</span>
              <span className="modal-name-last">{member.lastName}</span>
            </h2>

            <div className="modal-person-role">
              {member.role}
            </div>

            <p className="modal-person-bio">
              {member.bio}
            </p>

            <div className="modal-nav-row">
              <button className="modal-nav-arrow-btn" onClick={onPrev} title="Previous team member" aria-label="Previous team member">
                ←
              </button>
              <button className="modal-nav-arrow-btn" onClick={onNext} title="Next team member" aria-label="Next team member">
                →
              </button>
            </div>
          </div>

          {/* Right: Featured Tilted Photo with Doodles */}
          <div className="modal-photo-col">
            {/* Doodle: Top ray & word */}
            <div className="modal-doodle-top">
              <span className="doodle-handwritten">{member.doodleTop}</span>
              <DoodleRays />
            </div>

            {/* Doodle: Squiggly spring */}
            <div className="modal-doodle-spring">
              <DoodleSpring />
            </div>

            {/* Main Polaroid Photo */}
            <div className="modal-polaroid-frame">
              <div className="modal-polaroid-img-box">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="modal-polaroid-real-img" />
                ) : (
                  <div className="modal-polaroid-placeholder">
                    <PersonIcon />
                  </div>
                )}
              </div>
              
              {/* Handwritten script on bottom of photo */}
              <div className="modal-polaroid-script">
                {member.doodleScript}
              </div>
            </div>

            {/* Doodle: True North / oval stamp */}
            <div className="modal-doodle-stamp">
              <div className="stamp-oval">
                {member.doodleStamp.split('\n').map((line, idx) => (
                  <span key={idx}>{line}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="modal-footer-bar">
          <span className="modal-footer-label">SWIPE OR TAP TO BROWSE</span>
          <span className="modal-footer-arrow">↔</span>
        </div>
      </div>
    </div>
  , document.getElementById('modal-root'))
}

/* ─── Page Component ─────────────────────────────────────────────── */
export default function About() {
  const [selectedMember, setSelectedMember] = useState(null)

  /* Events showcase state */
  const [activeEventIdx, setActiveEventIdx] = useState(0)
  const [activeImgIdx, setActiveImgIdx] = useState(0)
  const [popupOpen, setPopupOpen] = useState(false)
  const [popupImgIdx, setPopupImgIdx] = useState(0)
  const eventsCanvasRef = useRef(null)
  const eventsSectionRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const eventsTouchRef = useRef(null)
  const popupTouchRef = useRef(null)

  const handleEventTouchStart = (e) => {
    eventsTouchRef.current = e.touches[0].clientX
  }

  const handleEventTouchEnd = (e) => {
    if (eventsTouchRef.current === null) return
    const dx = e.changedTouches[0].clientX - eventsTouchRef.current
    if (dx > 40) {
      setActiveEventIdx(i => (i - 1 + events.length) % events.length)
    } else if (dx < -40) {
      setActiveEventIdx(i => (i + 1) % events.length)
    }
    eventsTouchRef.current = null
  }

  const handlePopupTouchStart = (e) => {
    popupTouchRef.current = e.touches[0].clientX
  }

  const handlePopupTouchEnd = (e) => {
    if (popupTouchRef.current === null) return
    const dx = e.changedTouches[0].clientX - popupTouchRef.current
    const ev = events[activeEventIdx]
    if (Math.abs(dx) > 40 && ev && ev.images.length > 1) {
      if (dx > 40) {
        setPopupImgIdx(i => (i - 1 + ev.images.length) % ev.images.length)
      } else {
        setPopupImgIdx(i => (i + 1) % ev.images.length)
      }
    }
    popupTouchRef.current = null
  }

  /* Scroll-reveal hook */
  const revealRefs = useRef([])
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    revealRefs.current.forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const addReveal = i => el => { revealRefs.current[i] = el }

  /* Three.js particle background for Events section */
  useEffect(() => {
    const container = eventsCanvasRef.current
    if (!container) return
    const w = container.offsetWidth
    const h = container.offsetHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.z = 8
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;'
    container.appendChild(renderer.domElement)

    const count = 350
    const pos = new Float32Array(count * 3)
    const vel = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.003,
      y: Math.random() * 0.005 + 0.001,
    }))
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 28
      pos[i*3+1] = (Math.random() - 0.5) * 16
      pos[i*3+2] = (Math.random() - 0.5) * 6
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({ color: 0x7ad39b, size: 0.07, transparent: true, opacity: 0.35, depthWrite: false })
    const pts = new THREE.Points(geo, mat)
    scene.add(pts)

    let mx = 0, my = 0
    const onMouse = e => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = -(e.clientY / window.innerHeight - 0.5) * 2 }
    window.addEventListener('mousemove', onMouse)

    let raf
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const a = pts.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        a[i*3]   += vel[i].x
        a[i*3+1] += vel[i].y
        if (a[i*3+1] > 8) { a[i*3+1] = -8; a[i*3] = (Math.random() - 0.5) * 28 }
      }
      pts.geometry.attributes.position.needsUpdate = true
      camera.position.x += (mx * 0.4 - camera.position.x) * 0.015
      camera.position.y += (my * 0.25 - camera.position.y) * 0.015
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      const nw = container.offsetWidth, nh = container.offsetHeight
      camera.aspect = nw / nh; camera.updateProjectionMatrix(); renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      geo.dispose(); mat.dispose(); renderer.dispose()
    }
  }, [])

  /* Auto-advance image when event has multiple photos */
  useEffect(() => {
    setActiveImgIdx(0)
  }, [activeEventIdx])

  useEffect(() => {
    const ev = events[activeEventIdx]
    if (!ev || ev.images.length <= 1) return
    const t = setInterval(() => setActiveImgIdx(i => (i + 1) % ev.images.length), 2800)
    return () => clearInterval(t)
  }, [activeEventIdx])

  /* Auto-slideshow: cycle events every 2s (2000ms), pauses on hover */
  useEffect(() => {
    if (isHovered) return
    const t = setInterval(() => {
      setActiveEventIdx(i => (i + 1) % events.length)
    }, 2000)
    return () => clearInterval(t)
  }, [isHovered])

  const handleNextMember = () => {
    if (!selectedMember) return
    const currentIndex = team.findIndex(m => m.num === selectedMember.num)
    const nextIndex = (currentIndex + 1) % team.length
    setSelectedMember(team[nextIndex])
  }

  const handlePrevMember = () => {
    if (!selectedMember) return
    const currentIndex = team.findIndex(m => m.num === selectedMember.num)
    const prevIndex = (currentIndex - 1 + team.length) % team.length
    setSelectedMember(team[prevIndex])
  }

  return (
    <div className="about-page page-enter">

      <div className="about-layout">
        {/* ── Left ── */}
        <div className="about-left">
          <h1 className="about-heading reveal" ref={addReveal(0)}>
            <span className="about-heading-italic">Our</span>
            <span className="about-heading-bold">PEOPLE</span>
          </h1>

          <p className="about-body reveal reveal-delay-1" ref={addReveal(1)}>
            We build brands that matter by putting people first.
            We are a collision of different minds on a single mission:
            to leave things better than we found them.
          </p>

          <div
            className="about-meet-row reveal reveal-delay-2"
            ref={addReveal(2)}
            onClick={() => setSelectedMember(team[0])}
            role="button"
            tabIndex={0}
          >
            <span className="about-meet-label">Meet the Team</span>
            <span className="about-meet-arrow">→</span>
          </div>
        </div>

        {/* ── Right — scattered cards ── */}
        <div className="about-right">
          {/* Doodles */}
          <div className="doodle doodle-zigzag"><DoodleZigzag /></div>
          <div className="doodle doodle-spiral"><DoodleSpiral /></div>
          <div className="doodle doodle-star"><DoodleStar /></div>
          <div className="doodle doodle-pin"><DoodlePin /></div>

          {/* 6 photo cards */}
          {team.map((person, idx) => (
            <PhotoCard
              key={person.num}
              {...person}
              className={`card-0${idx + 1}`}
              onClick={() => setSelectedMember(person)}
            />
          ))}
        </div>
      </div>

      {/* ── Spotlight / Detail Pop-up Modal ── */}
      {selectedMember && (
        <ProfileModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onNext={handleNextMember}
          onPrev={handlePrevMember}
        />
      )}

      {/* ── EVENTS & WINS — 3D FAN CAROUSEL ── */}
      <section
        className="ev-section"
        ref={eventsSectionRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Three.js particle bg */}
        <div className="events-canvas-wrap" ref={eventsCanvasRef} />

        <div className="ev-content">

          {/* Centered Header */}
          <div className="ev-header">
            <p className="ev-eyebrow">OUR JOURNEY</p>
            <h2 className="ev-headline">Events &amp; Wins</h2>
            <p className="ev-subtext">From startup competitions to global stages — here's where UdRah showed up, stood out, and took home recognition.</p>
          </div>

          {/* Pill tabs — one per event */}
          <div className="ev-pills">
            {events.map((ev, i) => (
              <button
                key={ev.id}
                className={`ev-pill${i === activeEventIdx ? ' active' : ''}`}
                onClick={() => setActiveEventIdx(i)}
              >
                {ev.shortTitle}
              </button>
            ))}
          </div>

          {/* 3D Fan Carousel with Touch Swipe */}
          <div
            className="ev-carousel-wrap"
            onTouchStart={handleEventTouchStart}
            onTouchEnd={handleEventTouchEnd}
          >
            {events.map((ev, i) => {
              let pos = i - activeEventIdx
              if (pos > events.length / 2)  pos -= events.length
              if (pos < -events.length / 2) pos += events.length
              if (Math.abs(pos) > 2) return null
              return (
                <div
                  key={ev.id}
                  className="ev-card"
                  data-pos={String(pos)}
                  onClick={() => {
                    if (pos !== 0) { setActiveEventIdx(i) }
                    else { setPopupOpen(true); setPopupImgIdx(activeImgIdx) }
                  }}
                >
                  <img src={ev.images[0]} alt={ev.title} className="ev-card-img" />
                  {pos === 0 && (
                    <div className="ev-card-info">
                      <span className="ev-card-badge">{ev.badge}</span>
                      <h3 className="ev-card-title">{ev.title}</h3>
                      <p className="ev-card-sub">{ev.subtitle}</p>
                    </div>
                  )}
                  {pos !== 0 && (
                    <div className="ev-card-side-overlay">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="white" opacity="0.55">
                        <polygon points="8 5 19 12 8 19 8 5"/>
                      </svg>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Bottom nav arrows */}
          <div className="ev-bottom-nav">
            <button className="ev-nav-btn" onClick={() => setActiveEventIdx(i => (i - 1 + events.length) % events.length)} aria-label="Previous event">←</button>
            <button className="ev-nav-btn" onClick={() => setActiveEventIdx(i => (i + 1) % events.length)} aria-label="Next event">→</button>
          </div>

        </div>
      </section>

      {/* ── Events Popup Lightbox ── */}
      {popupOpen && ReactDOM.createPortal(
        <div className="events-popup-overlay" onClick={() => setPopupOpen(false)}>
          <div className="events-popup-inner" onClick={e => e.stopPropagation()}>
            <button className="events-popup-close" onClick={() => setPopupOpen(false)}>✕</button>
            <div
              className="events-popup-img-wrap"
              onTouchStart={handlePopupTouchStart}
              onTouchEnd={handlePopupTouchEnd}
            >
              <img
                src={events[activeEventIdx].images[popupImgIdx]}
                alt={events[activeEventIdx].title}
                className="events-popup-img"
              />
              {events[activeEventIdx].images.length > 1 && (
                <>
                  <button className="events-popup-nav prev" onClick={() => setPopupImgIdx(i => (i - 1 + events[activeEventIdx].images.length) % events[activeEventIdx].images.length)}>←</button>
                  <button className="events-popup-nav next" onClick={() => setPopupImgIdx(i => (i + 1) % events[activeEventIdx].images.length)}>→</button>
                </>
              )}
            </div>
            <div className="events-popup-info">
              <p className="events-popup-badge">{events[activeEventIdx].badge}</p>
              <h3 className="events-popup-title">{events[activeEventIdx].title}</h3>
              <p className="events-popup-sub">{events[activeEventIdx].subtitle}</p>
              {events[activeEventIdx].images.length > 1 && (
                <p className="events-popup-counter">{popupImgIdx + 1} / {events[activeEventIdx].images.length}</p>
              )}
            </div>
          </div>
        </div>,
        document.getElementById('modal-root')
      )}

    </div>
  )
}
