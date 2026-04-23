import type { Metadata } from 'next'
import { pageMeta } from '@/lib/seo'
import {
  Heart,
  ShoppingBag,
  Users,
  Shield,
  ArrowRight,
  Smartphone,
  Globe,
  Camera,
  Lock,
} from 'lucide-react'

export const metadata: Metadata = {
  title: pageMeta.careers.title,
  description: pageMeta.careers.description,
  alternates: { canonical: 'https://malibanwovens.com/careers' },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: Heart,
    title: 'Free medical insurance',
    desc: 'Comprehensive medical insurance and access to on-site health facilities for all permanent employees and their immediate families.',
  },
  {
    icon: ShoppingBag,
    title: 'Welfare shop',
    desc: 'On-site welfare shop providing essential goods at subsidised rates, making daily life a little easier for every team member.',
  },
  {
    icon: Users,
    title: 'Bereavement support',
    desc: 'Compassionate leave and dedicated support for employees navigating loss — because people come before productivity.',
  },
  {
    icon: Shield,
    title: 'Safe & transparent workplace',
    desc: 'Confidential grievance channels, regular social audits (SMETA, SLCP), and a zero-tolerance approach to workplace misconduct.',
  },
]

const GRIEVANCE_FEATURES = [
  { icon: Smartphone, label: 'Instant QR code access' },
  { icon: Lock,       label: 'Fully confidential' },
  { icon: Globe,      label: 'English, Sinhala & Tamil' },
  { icon: Camera,     label: 'Direct photo upload' },
]

const STATS = [
  { value: '50+', label: 'Years as an employer' },
  { value: '7',   label: 'Locations hiring' },
  { value: '3',   label: 'Languages supported' },
  { value: '100%', label: 'Medical coverage' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CareersPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0D1F3C] pt-32 pb-0 relative overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            {/* Left: copy */}
            <div className="pb-20">
              <p className="text-[#1D9E75] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Apparel industry jobs Sri Lanka
              </p>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.05]">
                Build something<br />
                <span className="text-[#1D9E75]">that lasts.</span>
              </h1>
              <p className="text-lg text-[#8CAEC8] leading-relaxed mb-10 max-w-lg">
                Maliban Wovens has been a trusted employer across Sri Lanka since 1974.
                We're growing — and we're looking for people who want to grow with us.
              </p>
              <a
                href="mailto:careers@malibanwovens.com"
                className="inline-flex items-center gap-2 bg-[#1D9E75] hover:bg-[#22b886] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200 text-sm"
              >
                Send your CV
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Right: stat strip — bleeds into next section */}
            <div className="grid grid-cols-2 gap-px bg-white/10 rounded-t-2xl overflow-hidden self-end">
              {STATS.map((s) => (
                <div key={s.label} className="bg-[#0B1B35] px-8 py-8">
                  <div className="text-4xl font-black text-white mb-1">{s.value}</div>
                  <div className="text-xs text-[#8CAEC8] uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <p className="text-[#1D9E75] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Why join us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0D1F3C] leading-snug">
              We take care of our people
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden">
            {BENEFITS.map((b, i) => (
              <div
                key={b.title}
                className="bg-white p-8 flex flex-col gap-5 group hover:bg-[#F7F9FC] transition-colors duration-200"
              >
                {/* Numbered + icon row */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#F0FAF5] flex items-center justify-center text-[#1D9E75] group-hover:bg-[#1D9E75] group-hover:text-white transition-colors duration-200">
                    <b.icon size={20} strokeWidth={1.75} />
                  </div>
                  <span className="text-3xl font-black text-gray-100 group-hover:text-gray-200 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-[#0D1F3C] mb-2 text-[15px]">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grievance channel ────────────────────────────────────────────────── */}
      <section className="bg-[#F7F9FC] py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <p className="text-[#1D9E75] text-xs font-bold uppercase tracking-[0.2em] mb-3">
                Workplace transparency
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0D1F3C] mb-5 leading-snug">
                Every voice is<br />heard safely.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 text-[15px]">
                We operate a fully confidential digital grievance channel — accessible
                by scanning a secure QR code, with no login required. Employees can
                submit concerns, upload photos, and receive responses in their
                preferred language.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {GRIEVANCE_FEATURES.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F0FAF5] flex items-center justify-center text-[#1D9E75] shrink-0">
                      <f.icon size={15} strokeWidth={1.75} />
                    </div>
                    <span className="text-xs font-semibold text-[#0D1F3C]">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: stylised phone mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-56">
                {/* Phone shell */}
                <div className="bg-[#0D1F3C] rounded-[2.5rem] p-2 shadow-2xl shadow-[#0D1F3C]/40">
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="bg-[#1D9E75] px-5 pt-5 pb-6">
                      <div className="text-white text-[10px] font-bold mb-1 opacity-80 uppercase tracking-widest">
                        Maliban
                      </div>
                      <div className="text-white text-sm font-bold leading-tight">
                        Confidential<br />Grievance Channel
                      </div>
                    </div>

                    {/* App body */}
                    <div className="px-4 py-5 space-y-3">
                      {/* QR placeholder */}
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-center">
                        <div className="grid grid-cols-5 gap-0.5">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-sm ${
                                [0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24,7,17,6,8,11,13,16,18].includes(i)
                                  ? 'bg-[#0D1F3C]'
                                  : 'bg-gray-100'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Input mock */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                        <div className="text-[9px] text-gray-300">Describe your concern...</div>
                      </div>

                      {/* Submit button */}
                      <div className="bg-[#1D9E75] rounded-lg py-2 text-center">
                        <span className="text-white text-[10px] font-bold">Submit securely</span>
                      </div>

                      {/* Language flags row */}
                      <div className="flex justify-center gap-2 pt-1">
                        {['EN', 'SI', 'TA'].map((lang) => (
                          <span
                            key={lang}
                            className="text-[8px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -right-6 top-12 bg-white rounded-xl shadow-lg shadow-gray-200/80 px-3 py-2 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#1D9E75] flex items-center justify-center">
                      <Lock size={9} className="text-white" />
                    </div>
                    <div>
                      <div className="text-[8px] font-bold text-[#0D1F3C]">100% Confidential</div>
                      <div className="text-[7px] text-gray-400">No login required</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA banner ────────────────────────────────────────────────── */}
      <section className="bg-[#0D1F3C] py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to join the team?
              </h2>
              <p className="text-[#8CAEC8] text-sm">
                Send your CV to{' '}
                <span className="text-white font-medium">careers@malibanwovens.com</span>
                {' '}and we'll respond within 5 working days.
              </p>
            </div>
            <a
              href="mailto:careers@malibanwovens.com"
              className="shrink-0 inline-flex items-center gap-2 bg-[#1D9E75] hover:bg-[#22b886] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200 text-sm whitespace-nowrap"
            >
              Send your CV
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}