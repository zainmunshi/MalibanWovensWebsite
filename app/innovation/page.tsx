'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* ── Scroll reveal ─────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Three.js Neural Network Canvas ───────────────────────────────── */
function NeuralCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const mount = mountRef.current

    // Dynamically import Three.js
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    script.onload = () => initScene()
    document.head.appendChild(script)

    let animId: number
    let renderer: any, scene: any, camera: any
    let nodes: any[] = []
    let edges: any[] = []
    let packets: any[] = []
    let mouse = { x: 0, y: 0 }
    let frameCount = 0

    function initScene() {
      const THREE = (window as any).THREE

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      // Scene & Camera
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
      camera.position.set(0, 0, 28)

      // Fog for depth
      scene.fog = new THREE.FogExp2(0x040d1a, 0.022)

      // ── Node colours ──
      const NODE_COLORS = [0x1a5c38, 0x2d8653, 0x4ade80, 0x86efac, 0xffffff]

      // ── Create nodes ──
      const NODE_COUNT = 55
      const spread = 18

      for (let i = 0; i < NODE_COUNT; i++) {
        // Sphere geometry — vary sizes
        const size = 0.08 + Math.random() * 0.22
        const geo = new THREE.SphereGeometry(size, 12, 12)
        const col = NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)]
        const mat = new THREE.MeshBasicMaterial({ color: col })
        const mesh = new THREE.Mesh(geo, mat)

        // Distribute in a slightly flattened sphere volume
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = spread * Math.cbrt(Math.random()) // cube-root for uniform volume
        mesh.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.6,
          r * Math.cos(phi)
        )

        // Glow halo (additive sprite)
        const spriteMat = new THREE.SpriteMaterial({
          color: col,
          transparent: true,
          opacity: 0.18,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
        const sprite = new THREE.Sprite(spriteMat)
        sprite.scale.set(size * 9, size * 9, 1)
        mesh.add(sprite)

        const nodeData = {
          mesh,
          basePos: mesh.position.clone(),
          vel: new THREE.Vector3(
            (Math.random() - 0.5) * 0.003,
            (Math.random() - 0.5) * 0.003,
            (Math.random() - 0.5) * 0.002
          ),
          phase: Math.random() * Math.PI * 2,
          color: col,
          connections: [] as number[],
        }
        nodes.push(nodeData)
        scene.add(mesh)
      }

      // ── Build edges (connect nearby nodes) ──
      const MAX_DIST = 9
      const MAX_CONNECTIONS = 4
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x1a5c38,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (nodes[i].connections.length >= MAX_CONNECTIONS) break
          if (nodes[j].connections.length >= MAX_CONNECTIONS) continue
          const dist = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position)
          if (dist < MAX_DIST) {
            nodes[i].connections.push(j)
            nodes[j].connections.push(i)

            const geo = new THREE.BufferGeometry().setFromPoints([
              nodes[i].mesh.position.clone(),
              nodes[j].mesh.position.clone(),
            ])
            const line = new THREE.Line(geo, lineMat.clone())
            scene.add(line)
            edges.push({ line, i, j })
          }
        }
      }

      // ── Data packets travelling along edges ──
      function spawnPacket() {
        if (edges.length === 0) return
        const edge = edges[Math.floor(Math.random() * edges.length)]
        const spriteMat = new THREE.SpriteMaterial({
          color: Math.random() > 0.5 ? 0x4ade80 : 0x86efac,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
        const sprite = new THREE.Sprite(spriteMat)
        sprite.scale.set(0.35, 0.35, 1)
        scene.add(sprite)
        packets.push({ sprite, edge, t: 0, speed: 0.004 + Math.random() * 0.008 })
      }

      // Seed initial packets
      for (let k = 0; k < 20; k++) spawnPacket()

      // ── Resize handler ──
      function onResize() {
        if (!mount) return
        camera.aspect = mount.clientWidth / mount.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(mount.clientWidth, mount.clientHeight)
      }
      window.addEventListener('resize', onResize)

      // ── Mouse parallax ──
      function onMouseMove(e: MouseEvent) {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouseMove)

      // ── Animation loop ──
      function animate() {
        animId = requestAnimationFrame(animate)
        frameCount++
        const t = frameCount * 0.001

        // Slowly rotate the whole scene
        scene.rotation.y = t * 0.06 + mouse.x * 0.08
        scene.rotation.x = mouse.y * 0.05

        // Drift nodes gently
        nodes.forEach((n, idx) => {
          n.mesh.position.x = n.basePos.x + Math.sin(t * 0.7 + n.phase) * 0.4 + n.vel.x * frameCount * 0.3
          n.mesh.position.y = n.basePos.y + Math.cos(t * 0.5 + n.phase) * 0.3 + n.vel.y * frameCount * 0.3
          n.mesh.position.z = n.basePos.z + Math.sin(t * 0.4 + n.phase + 1) * 0.35 + n.vel.z * frameCount * 0.3

          // Wrap when drifting too far
          const maxDrift = 22
          ;['x', 'y', 'z'].forEach((ax: any) => {
            if (Math.abs(n.mesh.position[ax]) > maxDrift) {
              n.basePos[ax] *= -0.8
              n.vel[ax] *= -1
            }
          })

          // Pulse opacity
          const mat = n.mesh.material as any
          mat.opacity = 0.7 + Math.sin(t * 1.2 + n.phase) * 0.3
          mat.transparent = true
        })

        // Update edge geometry to follow nodes
        edges.forEach(({ line, i, j }) => {
          const pos = line.geometry.attributes.position
          const a = nodes[i].mesh.position
          const b = nodes[j].mesh.position
          pos.setXYZ(0, a.x, a.y, a.z)
          pos.setXYZ(1, b.x, b.y, b.z)
          pos.needsUpdate = true

          // Fade edges by distance
          const dist = a.distanceTo(b)
          ;(line.material as any).opacity = Math.max(0, 0.3 - dist * 0.018)
        })

        // Animate packets
        packets.forEach((p, idx) => {
          p.t += p.speed
          if (p.t >= 1) {
            // Recycle
            scene.remove(p.sprite)
            packets.splice(idx, 1)
            spawnPacket()
            return
          }
          const a = nodes[p.edge.i].mesh.position
          const b = nodes[p.edge.j].mesh.position
          p.sprite.position.lerpVectors(a, b, p.t)
          // Fade in/out at ends
          const fade = Math.sin(p.t * Math.PI)
          ;(p.sprite.material as any).opacity = fade * 0.9
        })

        renderer.render(scene, camera)
      }

      animate()

      // Cleanup stored refs
      ;(mount as any)._cleanup = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', onResize)
        window.removeEventListener('mousemove', onMouseMove)
        renderer.dispose()
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      }
    }

    return () => {
      ;(mount as any)._cleanup?.()
      if (document.head.contains(script)) document.head.removeChild(script)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  )
}

/* ── Terminal Readout Component ────────────────────────────────────── */
const TERMINAL_LINES = [
  { delay: 0,    type: 'sys',  text: 'MALIBAN WOVENS · INTELLIGENCE LAYER v2.1.0' },
  { delay: 300,  type: 'sys',  text: 'Initialising production network...' },
  { delay: 800,  type: 'ok',   text: 'Connected: Dehiattakandiya [DK] · 3,240 units/day' },
  { delay: 1200, type: 'ok',   text: 'Connected: Ingiriya [IG] · 2,890 units/day' },
  { delay: 1600, type: 'ok',   text: 'Connected: Balangoda [BG] · 2,560 units/day' },
  { delay: 2000, type: 'ok',   text: 'Connected: Nalanda [NL] · sewing specialist' },
  { delay: 2400, type: 'ok',   text: 'Connected: Pelmadulla [PM] · sewing specialist' },
  { delay: 2800, type: 'ok',   text: 'Connected: Padiyathalawa [PD] · carton production' },
  { delay: 3100, type: 'sys',  text: 'Loading AI quality monitoring modules...' },
  { delay: 3600, type: 'data', text: 'Annual pant output ········· 10,800,000 pcs' },
  { delay: 4000, type: 'data', text: 'Annual jacket output ········    600,000 pcs' },
  { delay: 4400, type: 'data', text: 'Washing capacity ············ 20,000,000 units/yr' },
  { delay: 4800, type: 'data', text: 'Active buyer connections ···· PVH · Gap · M&S · Eddie Bauer' },
  { delay: 5300, type: 'sys',  text: 'Running supply chain verification...' },
  { delay: 5800, type: 'ok',   text: 'GOTS · GRS · SMETA · SLCP · Higg Index · OEKO-TEX — VERIFIED' },
  { delay: 6300, type: 'sys',  text: 'Digital traceability: fabric receipt → packed garment' },
  { delay: 6800, type: 'ok',   text: 'All nodes operational. System ready.' },
  { delay: 7200, type: 'cur',  text: '' },
]

function TerminalReadout() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const termRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamically import useState — already imported, just run timers
    const timers: ReturnType<typeof setTimeout>[] = []
    TERMINAL_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
        // Auto-scroll terminal
        if (termRef.current) {
          termRef.current.scrollTop = termRef.current.scrollHeight
        }
      }, line.delay)
      timers.push(t)
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  const colorMap: Record<string, string> = {
    sys:  'rgba(255,255,255,0.35)',
    ok:   '#4ade80',
    data: '#86efac',
    cur:  '#4ade80',
  }
  const prefixMap: Record<string, string> = {
    sys:  '> ',
    ok:   '✓ ',
    data: '  ',
    cur:  '> ',
  }

  return (
    <div style={{
      background: 'rgba(4,13,26,0.85)',
      border: '1px solid rgba(74,222,128,0.2)',
      borderRadius: 10,
      overflow: 'hidden',
      backdropFilter: 'blur(16px)',
      maxWidth: 620,
      margin: '0 auto',
      fontFamily: 'var(--font-mono, "Courier New", monospace)',
    }}>
      {/* Terminal title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 16px',
        borderBottom: '1px solid rgba(74,222,128,0.12)',
        background: 'rgba(255,255,255,0.03)',
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 12, fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
          mw-intelligence — production-network
        </span>
      </div>
      {/* Terminal body */}
      <div ref={termRef} style={{
        padding: '16px 20px',
        height: 220,
        overflowY: 'auto',
        scrollbarWidth: 'none',
      }}>
        {TERMINAL_LINES.map((line, i) => (
          visibleLines.includes(i) && (
            <div key={i} style={{
              fontSize: 12,
              lineHeight: 1.8,
              color: colorMap[line.type],
              whiteSpace: 'pre',
              opacity: 1,
              animation: 'termFadeIn 0.15s ease both',
            }}>
              {line.type === 'cur' ? (
                <span>
                  {'> '}
                  <span style={{
                    display: 'inline-block',
                    width: 7, height: 13,
                    background: '#4ade80',
                    verticalAlign: 'middle',
                    animation: 'blink 1s step-end infinite',
                  }} />
                </span>
              ) : (
                <span>{prefixMap[line.type]}{line.text}</span>
              )}
            </div>
          )
        ))}
      </div>
    </div>
  )
}

/* ── Data ──────────────────────────────────────────────────────────── */
const PILLARS = [
  {
    num: '01',
    title: 'Automated Workflows',
    desc: 'Reducing manual hand-offs across the production chain. Automated BOM inputs eliminate data entry errors and compress approval cycles.',
    tag: 'Live',
  },
  {
    num: '02',
    title: 'AI-Assisted Monitoring',
    desc: 'Real-time production tracking and error detection via computer vision. Live QA dashboards surface defects before they reach finishing.',
    tag: 'Live',
  },
  {
    num: '03',
    title: 'Next-Gen ERP Systems',
    desc: 'Cloud-based, AI-integrated ERP upgrade underway — replacing siloed systems with a unified intelligence layer across all 7 locations.',
    tag: 'In Progress',
  },
  {
    num: '04',
    title: 'Digital Traceability',
    desc: 'End-to-end digital tracking from fabric receipt to packed finished garment. Every unit carries a verifiable audit trail.',
    tag: 'Live',
  },
  {
    num: '05',
    title: 'Data-Driven Operations',
    desc: 'Decisions anchored in live analytics — capacity planning, throughput optimisation, and quality KPIs updated in real time.',
    tag: 'Live',
  },
]

const STATS = [
  { value: '7', label: 'Locations connected' },
  { value: '100%', label: 'Digital traceability target' },
  { value: 'Gen 4.0', label: 'Washing technology' },
  { value: 'AI', label: 'Quality monitoring' },
]

const FUTURE = [
  {
    title: 'Centralised Washing Intelligence',
    desc: 'The NK Hub will unify all washing operations under a single digitally-managed facility — eliminating transit friction and standardising quality parameters chain-wide.',
  },
  {
    title: 'Predictive Capacity Planning',
    desc: 'Machine learning models trained on order history and production throughput to forecast bottlenecks and auto-balance workload across manufacturing hubs.',
  },
  {
    title: 'Buyer-Facing Dashboards',
    desc: 'Real-time production status, inspection outcomes and shipment tracking made available directly to brand partners — full transparency at every stage.',
  },
]

/* ── Page ──────────────────────────────────────────────────────────── */
export default function InnovationPage() {
  useReveal()

  return (
    <main style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', background: '#040d1a', color: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @keyframes termFadeIn { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        div[style*="scrollbar-width"]::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#040d1a',
      }}>
        {/* Three.js canvas */}
        <NeuralCanvas />

        {/* Dark gradient overlays so text is legible */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse 55% 70% at 50% 50%, transparent 20%, rgba(4,13,26,0.55) 60%, rgba(4,13,26,0.92) 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', zIndex: 1,
          background: 'linear-gradient(to top, #040d1a 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '20%', zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(4,13,26,0.7) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1200, margin: '0 auto',
          padding: '160px 40px 120px',
          width: '100%',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            border: '1px solid rgba(74,222,128,0.25)',
            borderRadius: 40, padding: '6px 18px',
            marginBottom: 32,
            background: 'rgba(26,92,56,0.15)',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
            <span style={{
              fontFamily: 'var(--font-mono, monospace)', fontSize: 11,
              letterSpacing: '0.18em', color: '#4ade80', textTransform: 'uppercase',
            }}>Digital Integration · Project In Progress</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(42px, 7vw, 96px)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            marginBottom: 28,
            background: 'linear-gradient(135deg, #ffffff 0%, #86efac 50%, #4ade80 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            The Intelligence<br />Layer
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 1.3vw, 16px)',
            color: 'rgba(255,255,255,0.4)',
            maxWidth: 560,
            lineHeight: 1.75,
            margin: '0 auto 32px',
          }}>
            Technology embedded into infrastructure — not added as an afterthought.
            Every machine, every floor, every decision point connected and talking.
          </p>

          {/* Terminal */}
          <div style={{ marginBottom: 40 }}>
            <TerminalReadout />
          </div>

          {/* Stat strip */}
          <div style={{
            display: 'inline-grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            overflow: 'hidden',
            backdropFilter: 'blur(12px)',
            background: 'rgba(255,255,255,0.04)',
          }}>
            {STATS.map((s, i) => (
              <div key={i} style={{
                padding: '20px 28px',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 800, color: '#4ade80', letterSpacing: '-0.02em' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>Scroll</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(74,222,128,0.5), transparent)', animation: 'pulse 2s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ── INTRO STATEMENT ───────────────────────────────────────── */}
      <section style={{ padding: '100px 40px', background: '#040d1a' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p className="reveal" style={{
            fontSize: 'clamp(22px, 3vw, 38px)',
            fontWeight: 700,
            lineHeight: 1.45,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '-0.02em',
          }}>
            Maliban Wovens is building a manufacturing ecosystem where{' '}
            <span style={{ color: '#4ade80' }}>every data point is captured</span>,{' '}
            every decision is informed, and every process is{' '}
            <span style={{ color: '#4ade80' }}>continuously optimised</span>.
          </p>
        </div>
      </section>

      {/* ── 5 PILLARS ─────────────────────────────────────────────── */}
      <section style={{ padding: '0 40px 100px', background: '#040d1a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div className="reveal" style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: '#1a5c38' }} />
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Five Pillars</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em' }}>
              How the intelligence layer works
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 2 }}>
            {PILLARS.map((p, i) => (
              <div key={i} className="reveal" style={{
                padding: '40px 36px',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 2,
                background: 'rgba(255,255,255,0.02)',
                position: 'relative',
                overflow: 'hidden',
                animationDelay: `${i * 80}ms`,
                transition: 'background 0.3s, border-color 0.3s',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(26,92,56,0.12)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,222,128,0.2)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
                }}
              >
                {/* Large faded number */}
                <span style={{
                  position: 'absolute', top: 16, right: 20,
                  fontSize: 72, fontWeight: 900,
                  color: 'rgba(255,255,255,0.04)',
                  lineHeight: 1, userSelect: 'none',
                  fontFamily: 'var(--font-mono, monospace)',
                }}>{p.num}</span>

                {/* Tag */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '4px 12px', borderRadius: 40, marginBottom: 24,
                  background: p.tag === 'Live' ? 'rgba(74,222,128,0.1)' : 'rgba(251,191,36,0.1)',
                  border: `1px solid ${p.tag === 'Live' ? 'rgba(74,222,128,0.2)' : 'rgba(251,191,36,0.2)'}`,
                }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: p.tag === 'Live' ? '#4ade80' : '#fbbf24',
                    boxShadow: p.tag === 'Live' ? '0 0 6px #4ade80' : '0 0 6px #fbbf24',
                  }} />
                  <span style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
                    color: p.tag === 'Live' ? '#4ade80' : '#fbbf24',
                    fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase',
                  }}>{p.tag}</span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12, letterSpacing: '-0.01em' }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK FEATURE ROW — TRACEABILITY ───────────────────────── */}
      <section style={{
        padding: '100px 40px',
        background: '#070f1f',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: '#1a5c38' }} />
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>End-to-End</span>
            </div>
            <h2 className="reveal" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: 24 }}>
              Digital Traceability from Fibre to Finished Garment
            </h2>
            <p className="reveal" style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', marginBottom: 36 }}>
              Every unit that passes through Maliban Wovens carries a complete, verifiable digital record —
              fabric origin, cut ticket, inspection result, wash treatment, and final QC sign-off.
              Buyers get full visibility. Auditors get complete traceability.
            </p>
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {['Fabric receipt & origin tagging', 'Cut-to-pack unit-level tracking', 'Wash & finish process logging', 'Final QC digital sign-off', 'Buyer-accessible audit trail'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    border: '1px solid rgba(74,222,128,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 2.5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual — pipeline diagram */}
          <div className="reveal">
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: 36,
            }}>
              {['Fabric Receipt', 'Cutting Floor', 'Sewing Lines', 'Washing Plant', 'Quality Control', 'Finished Goods'].map((step, i, arr) => (
                <div key={i}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: i === arr.length - 1 ? '#1a5c38' : 'rgba(74,222,128,0.1)',
                      border: `1px solid ${i === arr.length - 1 ? '#4ade80' : 'rgba(74,222,128,0.25)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700,
                      color: i === arr.length - 1 ? '#4ade80' : 'rgba(255,255,255,0.5)',
                      fontFamily: 'var(--font-mono, monospace)',
                    }}>{String(i + 1).padStart(2, '0')}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{step}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono, monospace)', marginTop: 2 }}>Digital record captured</div>
                    </div>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: '#4ade80',
                      boxShadow: '0 0 8px rgba(74,222,128,0.6)',
                    }} />
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ marginLeft: 17, width: 2, height: 12, background: 'rgba(74,222,128,0.15)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FUTURE ROADMAP ────────────────────────────────────────── */}
      <section style={{ padding: '100px 40px', background: '#040d1a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 1, background: '#1a5c38' }} />
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>What's Next</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', maxWidth: 600 }}>
              The future-ready manufacturing platform
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {FUTURE.map((f, i) => (
              <div key={i} className="reveal" style={{
                padding: '40px 36px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                animationDelay: `${i * 100}ms`,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: 'rgba(26,92,56,0.3)',
                  border: '1px solid rgba(74,222,128,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 12, letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section style={{
        padding: '100px 40px',
        background: '#070f1f',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="reveal" style={{
            fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800,
            letterSpacing: '-0.025em', marginBottom: 20,
            background: 'linear-gradient(135deg, #fff 0%, #86efac 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            A manufacturing partner built for what's next
          </h2>
          <p className="reveal" style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,0.4)', marginBottom: 48 }}>
            Discuss how Maliban Wovens' digital infrastructure supports your sourcing requirements — from traceability reporting to real-time production visibility.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 8,
              background: '#1a5c38', color: '#fff',
              fontWeight: 600, fontSize: 15, textDecoration: 'none',
              border: '1px solid rgba(74,222,128,0.3)',
              transition: 'background 0.2s',
            }}>
              Get in touch
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/capabilities" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 500, fontSize: 15, textDecoration: 'none',
            }}>
              View capabilities
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}