'use client'

import { useState } from 'react'

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 6,
  padding: '13px 16px',
  fontSize: 14,
  color: '#ffffff',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: 9,
  letterSpacing: '0.12em',
  color: 'rgba(255,255,255,0.35)',
  textTransform: 'uppercase' as const,
  marginBottom: 8,
}

export default function ContactForm() {
  const [focused, setFocused] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Wire up email functionality here later
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{
        padding: '80px 24px 80px 72px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }} className="cta-right">
        <div style={{
          width: 56, height: 56,
          background: 'rgba(66,132,178,0.15)',
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 24,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4284b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 24, letterSpacing: '-0.02em',
          color: '#ffffff', marginBottom: 12,
        }}>
          Message received
        </h3>
        <p style={{
          fontSize: 14, color: 'rgba(255,255,255,0.4)',
          lineHeight: 1.7, maxWidth: 320,
        }}>
          Our merchandising team will be in touch within one business day.
        </p>
      </div>
    )
  }

  return (
    <div style={{
      padding: '80px 24px 80px 72px',
    }} className="cta-right">
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 9,
        letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)',
        textTransform: 'uppercase', marginBottom: 32,
      }}>
        Send an enquiry
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Name + Company row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>Full name</label>
            <input
              type="text"
              required
              placeholder="Jane Smith"
              style={{
                ...inputStyle,
                borderColor: focused === 'name' ? '#4284b2' : 'rgba(255,255,255,0.1)',
              }}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
            />
          </div>
          <div>
            <label style={labelStyle}>Company</label>
            <input
              type="text"
              required
              placeholder="Brand / Retailer"
              style={{
                ...inputStyle,
                borderColor: focused === 'company' ? '#4284b2' : 'rgba(255,255,255,0.1)',
              }}
              onFocus={() => setFocused('company')}
              onBlur={() => setFocused(null)}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email address</label>
          <input
            type="email"
            required
            placeholder="jane@yourbrand.com"
            style={{
              ...inputStyle,
              borderColor: focused === 'email' ? '#4284b2' : 'rgba(255,255,255,0.1)',
            }}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
          />
        </div>

        {/* Product interest */}
        <div>
          <label style={labelStyle}>Product interest</label>
          <select
            style={{
              ...inputStyle,
              borderColor: focused === 'product' ? '#4284b2' : 'rgba(255,255,255,0.1)',
              cursor: 'pointer',
            }}
            onFocus={() => setFocused('product')}
            onBlur={() => setFocused(null)}
          >
            <option value="" style={{ background: '#0f2137' }}>Select a category</option>
            <option value="woven-bottoms" style={{ background: '#0f2137' }}>Woven Bottoms &amp; Casuals</option>
            <option value="tailored" style={{ background: '#0f2137' }}>Tailored &amp; Constructed Garments</option>
            <option value="both" style={{ background: '#0f2137' }}>Both categories</option>
            <option value="other" style={{ background: '#0f2137' }}>Other / Not sure yet</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label style={labelStyle}>Message</label>
          <textarea
            rows={4}
            placeholder="Tell us about your volumes, lead time requirements, and any certifications needed..."
            style={{
              ...inputStyle,
              resize: 'vertical',
              borderColor: focused === 'message' ? '#4284b2' : 'rgba(255,255,255,0.1)',
              lineHeight: 1.6,
            }}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={{
            background: '#4284b2',
            color: '#ffffff',
            border: 'none',
            borderRadius: 6,
            padding: '15px 32px',
            fontSize: 13,
            fontWeight: 700,
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.02em',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'background 0.2s, transform 0.15s',
            alignSelf: 'flex-start',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = '#3a73a0'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = '#4284b2'
            ;(e.currentTarget as HTMLElement).style.transform = 'none'
          }}
        >
          Send Enquiry
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 9,
          letterSpacing: '0.06em', color: 'rgba(255,255,255,0.2)',
          textTransform: 'uppercase',
        }}>
          We respond within one business day
        </p>

      </form>
    </div>
  )
}