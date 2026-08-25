import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function AlgaeSphere({ className = '' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const W = el.clientWidth
    const H = el.clientHeight

    // ─── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // ─── Scene / Camera ────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.set(0, 0, 3.2)

    // ─── Lights ────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x0E5B46, 0.6)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x73E6C0, 2.5, 8)
    pointLight1.position.set(2, 2, 2)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x19A878, 1.8, 8)
    pointLight2.position.set(-2, -1, 1)
    scene.add(pointLight2)

    const rimLight = new THREE.PointLight(0x8BDDD1, 1.2, 6)
    rimLight.position.set(0, 0, -3)
    scene.add(rimLight)

    // ─── Core sphere (glass chamber) ───────────────────────────────
    const sphereGeo = new THREE.SphereGeometry(0.82, 64, 64)
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d1e17,
      metalness: 0.15,
      roughness: 0.05,
      transmission: 0.65,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85,
      envMapIntensity: 1.0,
      ior: 1.5,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    scene.add(sphere)

    // ─── Inner glow orb ────────────────────────────────────────────
    const innerGeo = new THREE.SphereGeometry(0.6, 32, 32)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0E5B46,
      transparent: true,
      opacity: 0.25,
    })
    const inner = new THREE.Mesh(innerGeo, innerMat)
    scene.add(inner)

    // ─── Outer wireframe ring ──────────────────────────────────────
    const wireGeo = new THREE.SphereGeometry(0.92, 24, 24)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x73E6C0,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    })
    scene.add(new THREE.Mesh(wireGeo, wireMat))

    // ─── Particle system (algae cells) ─────────────────────────────
    const PARTICLE_COUNT = 1800
    const positions  = new Float32Array(PARTICLE_COUNT * 3)
    const colors     = new Float32Array(PARTICLE_COUNT * 3)
    const sizes      = new Float32Array(PARTICLE_COUNT)
    const speeds     = new Float32Array(PARTICLE_COUNT)

    const palette = [
      new THREE.Color(0x73E6C0),
      new THREE.Color(0x19A878),
      new THREE.Color(0x0E5B46),
      new THREE.Color(0x8BDDD1),
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute on sphere + inside
      const r   = 0.45 + Math.random() * 0.55
      const phi = Math.acos(2 * Math.random() - 1)
      const th  = Math.random() * Math.PI * 2

      positions[i*3]   = r * Math.sin(phi) * Math.cos(th)
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(th)
      positions[i*3+2] = r * Math.cos(phi)

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i*3]   = c.r
      colors[i*3+1] = c.g
      colors[i*3+2] = c.b

      sizes[i]  = 0.5 + Math.random() * 2.5
      speeds[i] = 0.2 + Math.random() * 0.8
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
    particleGeo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))

    const particleMat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ─── Orbit rings ───────────────────────────────────────────────
    const rings = []
    const ringConfigs = [
      { radius: 1.1, tube: 0.003, color: 0x73E6C0, opacity: 0.4, tilt: 0.4, speed: 0.003 },
      { radius: 1.3, tube: 0.002, color: 0x19A878, opacity: 0.25, tilt: -0.7, speed: -0.002 },
      { radius: 1.5, tube: 0.0015, color: 0x8BDDD1, opacity: 0.15, tilt: 1.1, speed: 0.0015 },
    ]
    ringConfigs.forEach(cfg => {
      const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 8, 128)
      const mat = new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: cfg.opacity })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = cfg.tilt
      mesh.rotation.z = cfg.tilt * 0.5
      mesh.userData = { speed: cfg.speed }
      scene.add(mesh)
      rings.push(mesh)
    })

    // ─── Mouse parallax ────────────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / W - 0.5) * 2
      mouse.y = -((e.clientY - rect.top) / H - 0.5) * 2
    }
    el.addEventListener('mousemove', onMouseMove)

    // ─── Animation ─────────────────────────────────────────────────
    let frame
    const clock = new THREE.Clock()
    const animate = () => {
      frame = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Smooth mouse follow
      target.x += (mouse.x - target.x) * 0.04
      target.y += (mouse.y - target.y) * 0.04

      sphere.rotation.y = t * 0.08 + target.x * 0.3
      sphere.rotation.x = target.y * 0.2
      inner.rotation.y = -t * 0.12
      particles.rotation.y = t * 0.05 + target.x * 0.15
      particles.rotation.x = t * 0.03 + target.y * 0.1

      rings.forEach(r => {
        r.rotation.z += r.userData.speed
        r.rotation.y += r.userData.speed * 0.5
      })

      // Breathing inner glow
      inner.material.opacity = 0.2 + Math.sin(t * 1.2) * 0.08

      // Light pulsing
      pointLight1.intensity = 2.5 + Math.sin(t * 0.8) * 0.5
      pointLight2.intensity = 1.8 + Math.cos(t * 1.1) * 0.4

      renderer.render(scene, camera)
    }
    animate()

    // ─── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      const W2 = el.clientWidth
      const H2 = el.clientHeight
      camera.aspect = W2 / H2
      camera.updateProjectionMatrix()
      renderer.setSize(W2, H2)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width: '100%', height: '100%', cursor: 'crosshair' }}
    />
  )
}
