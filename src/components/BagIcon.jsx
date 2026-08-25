import React from 'react'

export default function BagIcon({ className = '', size = 26, color = 'currentColor' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`bag-icon-svg ${className}`}
      aria-hidden="true"
    >
      {/* Front Panel Outline */}
      <path
        d="M 25 29 
           L 25 49 
           C 25 50.8 26.2 51.5 28.5 51.5 
           L 44.5 51.5 
           C 46 51.5 46.5 50.6 46.5 49 
           L 46.5 29"
      />

      {/* Bag Top Rim Connector Segments */}
      <path d="M 25 29 L 28.5 29" />
      <path d="M 33 29 L 38 29" />

      {/* Left and Right Handle Attachment Rings */}
      <circle cx="30.5" cy="29.5" r="2.2" />
      <circle cx="40.5" cy="29.5" r="2.2" />

      {/* Arched Bag Handle */}
      <path
        className="bag-handle"
        d="M 30.5 27.3
           L 30.5 20.5 
           C 30.5 14.8, 40.5 14.8, 40.5 20.5 
           L 40.5 27.3"
      />

      {/* 3D Side Gusset Panel on Right */}
      {/* Top creased fold of the side opening */}
      <path d="M 46.5 29.5 C 47.8 28.6 48.6 29.6 50.2 28.8" />
      {/* Side edge running down with slight perspective */}
      <path
        d="M 50.2 28.8 
           L 51.8 49.2 
           C 51.8 50.6 50.8 51.4 48.5 51.6 
           L 46.5 51.5"
      />
    </svg>
  )
}
