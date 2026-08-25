import React, { useState, useRef, useEffect } from 'react'
import './ReelCarousel.css'

const REELS = [
  {
    id: 'DblUDh3BpYs',
    title: 'Living Algae Core',
    caption: 'Real-time biological oxygen exchange indoors 🌿',
    views: '24.8K',
    likes: '1.4K',
    author: '@udrah.industries',
    video: '/hero.mp4',
    poster: '/udrah-product.png',
    instagramUrl: 'https://www.instagram.com/udrah.industries/'
  },
  {
    id: 'DbcbmQrJ-pm',
    title: 'Mechanical Pre-Filter',
    caption: 'Precision H13 filtration capturing microscopic pollutants ✨',
    views: '19.2K',
    likes: '980',
    author: '@udrah.industries',
    video: '/hero.mp4',
    poster: '/udrah-compact.png',
    instagramUrl: 'https://www.instagram.com/udrah.industries/'
  },
  {
    id: 'DbS45LuBHyH',
    title: 'The Third Eye of Nature',
    caption: 'Unboxing the Founding Edition chamber prototype 🧪',
    views: '32.1K',
    likes: '2.8K',
    author: '@udrah.industries',
    video: '/hero.mp4',
    poster: '/udrah-pro.png',
    instagramUrl: 'https://www.instagram.com/udrah.industries/'
  },
  {
    id: 'DbKrknDo5mb',
    title: 'Smart Air Companion',
    caption: 'Real-time air quality & CO₂ sensing analytics 📊',
    views: '15.6K',
    likes: '840',
    author: '@udrah.industries',
    video: '/hero.mp4',
    poster: '/udrah-product.png',
    instagramUrl: 'https://www.instagram.com/udrah.industries/'
  },
  {
    id: 'DbDrSAsSNlb',
    title: 'Studio Macro Detail',
    caption: 'Brushed aluminum housing & ambient status ring glow ✨',
    views: '28.4K',
    likes: '1.9K',
    author: '@udrah.industries',
    video: '/hero.mp4',
    poster: '/udrah-compact.png',
    instagramUrl: 'https://www.instagram.com/udrah.industries/'
  },
  {
    id: 'DZIWj1uMFeo',
    title: 'Photosynthesis In Action',
    caption: 'Live microalgae converting CO₂ into fresh indoor oxygen 🌿',
    views: '41.2K',
    likes: '3.5K',
    author: '@udrah.industries',
    video: '/hero.mp4',
    poster: '/udrah-pro.png',
    instagramUrl: 'https://www.instagram.com/udrah.industries/'
  }
]

export default function ReelCarousel() {
  const [active, setActive] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [useIframeMode, setUseIframeMode] = useState(false)
  const videoRefs = useRef({})
  const dragStartX = useRef(null)
  const isDragging = useRef(false)
  const n = REELS.length

  const go = (dir) => {
    setActive(i => (i + dir + n) % n)
  }

  const getPos = (index) => {
    let diff = index - active
    if (diff > n / 2) diff -= n
    if (diff < -n / 2) diff += n
    return diff
  }

  // Play video on active card
  useEffect(() => {
    Object.keys(videoRefs.current).forEach((idx) => {
      const vid = videoRefs.current[idx]
      if (vid) {
        if (Number(idx) === active && isPlaying) {
          vid.play().catch(() => {})
        } else {
          vid.pause()
        }
      }
    })
  }, [active, isPlaying])

  // Drag / Swipe handlers
  const handleStart = (clientX) => {
    dragStartX.current = clientX
    isDragging.current = true
  }

  const handleEnd = (clientX) => {
    if (!isDragging.current || dragStartX.current === null) return
    const dx = clientX - dragStartX.current
    if (Math.abs(dx) > 40) {
      go(dx > 0 ? -1 : 1)
    }
    dragStartX.current = null
    isDragging.current = false
  }

  return (
    <div
      className="rc-carousel"
      onMouseDown={e => handleStart(e.clientX)}
      onMouseUp={e => handleEnd(e.clientX)}
      onTouchStart={e => handleStart(e.touches[0].clientX)}
      onTouchEnd={e => handleEnd(e.changedTouches[0].clientX)}
    >
      <div className="rc-scene">
        {REELS.map((reel, i) => {
          const pos = getPos(i)
          if (Math.abs(pos) > 1) return null

          const isCenter = pos === 0
          const cls = isCenter ? 'rc-center' : pos < 0 ? 'rc-left' : 'rc-right'

          return (
            <div
              key={reel.id}
              className={`rc-card ${cls}`}
              onClick={(e) => {
                if (!isCenter) {
                  e.stopPropagation()
                  go(pos)
                }
              }}
            >
              {useIframeMode ? (
                <iframe
                  src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={reel.title}
                  loading="lazy"
                />
              ) : (
                <div className="rc-media-wrapper">
                  <video
                    ref={el => (videoRefs.current[i] = el)}
                    className="rc-video"
                    src={reel.video}
                    poster={reel.poster}
                    autoPlay={isCenter}
                    loop
                    muted={isMuted}
                    playsInline
                  />
                  <div className="rc-video-gradient" />
                </div>
              )}

              {/* Instagram Reel Header Overlay */}
              <div className="rc-top-badge">
                <div className="rc-author-info">
                  <div className="rc-author-avatar">
                    <img src="/logo.png" alt="UDRAH" />
                  </div>
                  <span className="rc-author-handle">{reel.author}</span>
                </div>
                <a
                  href={reel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rc-ig-link"
                  onClick={e => e.stopPropagation()}
                  title="Watch on Instagram"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>

              {/* Bottom Reel Caption & Engagement */}
              <div className="rc-bottom-caption">
                <h4 className="rc-title">{reel.title}</h4>
                <p className="rc-desc">{reel.caption}</p>
                <div className="rc-stats">
                  <span>▶ {reel.views}</span>
                  <span>♥ {reel.likes}</span>
                </div>
              </div>

              {/* Center controls (Mute / Sound) */}
              {isCenter && !useIframeMode && (
                <div className="rc-center-controls">
                  <button
                    className="rc-sound-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsMuted(!isMuted)
                    }}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? '🔇' : '🔊'}
                  </button>
                </div>
              )}

              {/* Dimmed overlay on side cards with Play indicator */}
              {!isCenter && (
                <div className="rc-side-overlay">
                  <span className="rc-side-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Nav Arrow Buttons */}
      <button className="rc-nav rc-nav-prev" onClick={() => go(-1)} aria-label="Previous reel">
        ‹
      </button>
      <button className="rc-nav rc-nav-next" onClick={() => go(1)} aria-label="Next reel">
        ›
      </button>

      {/* Dot Indicators */}
      <div className="rc-dots">
        {REELS.map((_, i) => (
          <button
            key={i}
            className={`rc-dot ${i === active ? 'rc-dot-on' : ''}`}
            onClick={() => go(i - active)}
            aria-label={`Reel ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
