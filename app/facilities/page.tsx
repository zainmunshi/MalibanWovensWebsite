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

/* ── Facility Data ─────────────────────────────────────────────────── */
interface Facility {
  id: string
  code: string
  name: string
  type: string
  role: string
  stats: { label: string; value: string }[]
  highlights: string[]
  image: string | null
  // SVG pin position (% of viewBox 0 0 400 800)
  px: number
  py: number
  color: string
}

const FACILITIES: Facility[] = [
  {
    id: 'ho',
    code: 'HO',
    name: 'Head Office',
    type: 'Corporate HQ',
    role: 'Colombo — Commercial, merchandising, and leadership hub. Central coordination for all 7 operational locations.',
    stats: [
      { label: 'Est.', value: '1974' },
      { label: 'Group', value: 'EAM Maliban' },
      { label: 'Function', value: 'Corporate' },
    ],
    highlights: ['Managing Director & Directors', 'Merchandising team', 'Finance & HR', 'Innovation & Development'],
    image: null,
    px: 76.2, py: 456.5,
    color: '#2563eb',
  },
  {
    id: 'dk',
    code: 'DK',
    name: 'Dehiattakandiya',
    type: 'Manufacturing Hub',
    role: 'Primary manufacturing hub in the North Central Province — high-volume woven bottoms production with full sewing and finishing lines.',
    stats: [
      { label: 'Capacity', value: '~3,240/day' },
      { label: 'Focus', value: 'Woven Bottoms' },
      { label: 'Type', value: 'Full CMT' },
    ],
    highlights: ['High-volume woven bottoms', 'Full sewing & finishing lines', 'Integrated quality control', 'Digital production tracking'],
    image: null,
    px: 232.2, py: 318.5,
    color: '#1a5c38',
  },
  {
    id: 'ig',
    code: 'IG',
    name: 'Ingiriya',
    type: 'Manufacturing Hub',
    role: 'Sabaragamuwa Province manufacturing hub specialising in casual woven bottoms and chinos across the Gap Inc. and PVH programmes.',
    stats: [
      { label: 'Capacity', value: '~2,890/day' },
      { label: 'Focus', value: 'Casuals & Chinos' },
      { label: 'Type', value: 'Full CMT' },
    ],
    highlights: ['Casual woven bottoms', 'Chino & cargo production', 'Semi-formal range', 'Buyer: Gap Inc. & PVH'],
    image: null,
    px: 128.7, py: 483.4,
    color: '#1a5c38',
  },
  {
    id: 'bg',
    code: 'BG',
    name: 'Balangoda',
    type: 'Manufacturing Hub',
    role: 'Sabaragamuwa Province hub for tailored and constructed garments — blazers, suiting, and semi-formal woven bottoms.',
    stats: [
      { label: 'Capacity', value: '~2,560/day' },
      { label: 'Focus', value: 'Tailored & Suiting' },
      { label: 'Type', value: 'Full CMT' },
    ],
    highlights: ['Blazer & suiting production', 'Tailored & constructed garments', '4.8M unit annual capacity', 'Precision pressing & finishing'],
    image: null,
    px: 189.1, py: 496.6,
    color: '#1a5c38',
  },
  {
    id: 'nl',
    code: 'NL',
    name: 'Nalanda',
    type: 'Sewing Specialist',
    role: 'Central Province sewing specialist facility — dedicated to high-precision sewing operations for woven bottoms programmes.',
    stats: [
      { label: 'Province', value: 'Central' },
      { label: 'Focus', value: 'Sewing' },
      { label: 'Type', value: 'Specialist' },
    ],
    highlights: ['High-precision sewing lines', 'Woven bottoms specialist', 'Lean production layout', 'Skilled workforce'],
    image: null,
    px: 163.3, py: 365.0,
    color: '#7c3aed',
  },
  {
    id: 'pm',
    code: 'PM',
    name: 'Pelmadulla',
    type: 'Sewing Specialist',
    role: 'Sabaragamuwa Province sewing specialist — focused on structured garment assembly and jacket plant support operations.',
    stats: [
      { label: 'Province', value: 'Sabaragamuwa' },
      { label: 'Focus', value: 'Structured Sewing' },
      { label: 'Type', value: 'Specialist' },
    ],
    highlights: ['Structured garment assembly', 'Jacket plant support', 'Men\'s & women\'s capability', 'Automated pressing'],
    image: null,
    px: 182.3, py: 486.1,
    color: '#7c3aed',
  },
  {
    id: 'pd',
    code: 'PD',
    name: 'Padiyathalawa',
    type: 'Carton Production',
    role: 'Uva Province carton production centre — in-house packaging manufacturing supporting the full Maliban Wovens supply chain.',
    stats: [
      { label: 'Province', value: 'Uva' },
      { label: 'Focus', value: 'Packaging' },
      { label: 'Type', value: 'Carton Production' },
    ],
    highlights: ['In-house carton manufacturing', 'Full supply chain packaging', 'Cost & lead-time control', 'Custom packaging capability'],
    image: null,
    px: 235.7, py: 436.9,
    color: '#d97706',
  },
]

const LEGEND = [
  { color: '#1a5c38', label: 'Manufacturing Hub' },
  { color: '#7c3aed', label: 'Sewing Specialist' },
  { color: '#d97706', label: 'Carton Production' },
  { color: '#2563eb', label: 'Head Office' },
]

/* ── Sri Lanka Map SVG ─────────────────────────────────────────────── */
// Simplified but recognisable outline path
const SL_PATH = `M 97.6,30.4 L 96.3,30.5 L 94.9,30.5 L 93.6,30.6 L 92.3,30.6 L 90.9,30.6 L 89.6,30.7 L 88.2,30.7 L 86.9,30.7 L 85.6,30.7 L 84.2,30.8 L 82.9,30.9 L 81.5,31.0 L 80.2,31.2 L 78.9,31.4 L 77.5,31.6 L 76.2,31.9 L 74.9,32.2 L 73.5,32.6 L 72.2,33.1 L 70.9,33.7 L 69.7,34.3 L 68.4,34.9 L 67.1,35.6 L 65.8,36.1 L 64.5,36.7 L 63.2,37.1 L 61.9,37.6 L 60.7,38.0 L 59.5,38.4 L 58.5,38.8 L 57.6,39.4 L 56.9,40.1 L 56.4,40.9 L 55.8,41.8 L 55.2,42.6 L 54.5,43.3 L 53.7,43.9 L 52.8,44.4 L 51.9,44.9 L 51.0,45.4 L 50.3,46.1 L 49.7,46.9 L 49.1,47.8 L 48.4,48.5 L 47.7,49.2 L 46.8,49.9 L 45.9,50.5 L 45.1,51.2 L 44.4,52.0 L 43.8,53.0 L 43.4,54.1 L 43.1,55.3 L 42.9,56.5 L 42.7,57.8 L 42.6,59.1 L 42.6,60.4 L 42.5,61.7 L 42.6,62.9 L 42.8,64.1 L 43.2,65.0 L 43.8,65.7 L 44.6,66.2 L 45.6,66.6 L 46.7,66.8 L 47.9,66.9 L 49.1,66.9 L 50.3,66.7 L 51.3,66.4 L 52.3,65.9 L 53.2,65.3 L 54.0,64.5 L 54.9,63.9 L 55.9,63.3 L 56.9,62.9 L 58.1,62.5 L 59.3,62.4 L 60.5,62.2 L 61.8,62.2 L 63.2,62.1 L 64.5,62.1 L 65.8,62.1 L 67.2,62.1 L 68.5,62.1 L 69.8,62.1 L 71.2,62.1 L 72.5,62.2 L 73.7,62.3 L 74.8,62.6 L 75.7,63.0 L 76.5,63.7 L 77.0,64.5 L 77.4,65.5 L 77.6,66.7 L 77.7,67.9 L 77.8,69.2 L 77.8,70.5 L 77.8,71.8 L 77.9,73.1 L 77.9,74.5 L 77.9,75.8 L 78.0,77.1 L 78.3,78.2 L 78.7,79.3 L 79.3,80.1 L 80.0,80.8 L 80.9,81.3 L 81.9,81.8 L 82.7,82.4 L 83.4,83.1 L 84.0,84.0 L 84.3,85.0 L 84.6,86.1 L 84.7,87.3 L 84.8,88.6 L 84.8,89.9 L 84.9,91.2 L 84.9,92.5 L 84.9,93.9 L 84.9,95.2 L 84.9,96.5 L 84.9,97.9 L 84.9,99.2 L 84.9,100.5 L 84.8,101.8 L 84.6,103.0 L 84.2,104.0 L 83.7,104.8 L 82.9,105.5 L 82.0,105.9 L 80.9,106.2 L 79.7,106.4 L 78.5,106.5 L 77.2,106.6 L 76.0,106.8 L 75.0,107.1 L 74.3,107.4 L 74.0,107.8 L 74.0,108.2 L 74.3,108.7 L 74.9,109.1 L 75.7,109.5 L 76.6,109.8 L 77.7,110.1 L 78.8,110.3 L 80.0,110.4 L 81.3,110.5 L 82.6,110.5 L 83.9,110.6 L 85.2,110.6 L 86.4,110.8 L 87.5,111.0 L 88.5,111.5 L 89.2,112.1 L 89.7,113.0 L 90.1,114.0 L 90.3,115.2 L 90.4,116.4 L 90.5,117.7 L 90.5,119.0 L 90.6,120.3 L 90.6,121.6 L 90.6,122.9 L 90.6,124.3 L 90.5,125.6 L 90.4,126.8 L 90.2,128.1 L 89.9,129.2 L 89.5,130.4 L 89.0,131.5 L 88.6,132.7 L 88.3,133.9 L 87.9,135.1 L 87.6,136.4 L 87.4,137.7 L 87.1,139.0 L 86.8,140.3 L 86.4,141.7 L 85.8,143.0 L 85.1,144.2 L 84.3,145.4 L 83.4,146.3 L 82.4,147.1 L 81.2,147.7 L 80.0,148.1 L 78.8,148.3 L 77.5,148.5 L 76.2,148.6 L 74.8,148.6 L 73.5,148.7 L 72.2,148.7 L 70.8,148.7 L 69.5,148.7 L 68.2,148.6 L 66.8,148.6 L 65.5,148.4 L 64.1,148.1 L 62.8,147.6 L 61.5,147.0 L 60.2,146.3 L 59.0,145.4 L 57.8,144.5 L 56.6,143.6 L 55.4,142.6 L 54.2,141.7 L 52.9,140.8 L 51.7,140.0 L 50.4,139.4 L 49.0,138.9 L 47.7,138.4 L 46.4,138.1 L 45.1,137.7 L 43.7,137.4 L 42.4,137.1 L 41.0,136.8 L 39.7,136.6 L 38.4,136.4 L 37.0,136.3 L 35.7,136.2 L 34.5,136.2 L 33.4,136.4 L 32.5,136.8 L 31.9,137.4 L 31.7,138.1 L 31.8,138.7 L 32.2,139.3 L 32.9,139.9 L 33.9,140.3 L 35.0,140.7 L 36.2,141.1 L 37.4,141.5 L 38.7,142.0 L 40.1,142.6 L 41.4,143.1 L 42.7,143.7 L 44.0,144.3 L 45.3,145.0 L 46.5,145.7 L 47.8,146.5 L 48.9,147.4 L 50.0,148.3 L 51.1,149.4 L 52.1,150.4 L 53.1,151.5 L 54.2,152.5 L 55.3,153.4 L 56.5,154.3 L 57.7,155.1 L 58.8,155.9 L 59.8,156.8 L 60.6,157.5 L 61.3,158.3 L 61.9,159.1 L 62.4,160.1 L 62.5,161.4 L 62.5,162.7 L 62.7,164.1 L 62.9,165.4 L 63.1,166.7 L 63.1,168.1 L 63.1,169.4 L 63.1,170.7 L 63.2,172.1 L 63.5,173.1 L 64.0,174.0 L 64.6,174.9 L 64.8,176.1 L 64.9,177.4 L 65.0,178.8 L 65.1,180.1 L 65.1,181.4 L 65.3,182.8 L 65.6,184.1 L 66.1,185.5 L 66.6,186.8 L 66.9,188.1 L 67.1,189.5 L 67.2,190.8 L 67.2,192.1 L 67.2,193.5 L 67.2,194.8 L 67.2,196.1 L 67.2,197.5 L 67.2,198.8 L 67.2,200.2 L 67.2,201.5 L 67.2,202.8 L 67.2,204.2 L 67.2,205.5 L 67.2,206.8 L 66.9,208.1 L 66.5,209.4 L 65.8,210.6 L 65.1,211.9 L 64.5,213.2 L 64.1,214.5 L 63.9,215.9 L 63.4,217.0 L 62.6,218.0 L 61.5,218.7 L 60.1,219.3 L 58.9,219.8 L 57.9,220.4 L 56.9,221.0 L 56.0,221.6 L 54.8,221.9 L 53.4,221.9 L 52.1,221.9 L 50.8,221.9 L 49.4,221.9 L 48.1,221.9 L 46.7,221.9 L 45.4,221.9 L 44.2,222.0 L 43.4,222.6 L 43.1,223.6 L 42.9,224.9 L 42.8,226.2 L 42.7,227.6 L 42.9,228.9 L 43.0,230.2 L 43.1,231.6 L 43.1,232.9 L 43.1,234.3 L 43.1,235.6 L 43.1,236.9 L 43.1,238.3 L 43.1,239.6 L 43.1,240.9 L 43.1,242.3 L 43.1,243.6 L 43.1,245.0 L 43.1,246.3 L 42.9,247.6 L 42.4,248.6 L 41.7,249.6 L 41.0,250.7 L 40.5,252.0 L 40.1,253.3 L 39.6,254.6 L 39.0,255.8 L 38.1,257.0 L 37.3,258.3 L 36.7,259.7 L 36.2,261.0 L 35.8,262.3 L 35.5,263.6 L 35.1,264.8 L 34.4,265.9 L 33.3,266.6 L 32.4,267.4 L 31.8,268.2 L 31.7,269.4 L 31.7,270.7 L 31.7,272.0 L 31.7,273.4 L 31.7,274.7 L 31.7,276.0 L 31.7,277.4 L 31.6,278.7 L 31.6,280.1 L 31.7,281.4 L 32.1,282.7 L 32.5,284.1 L 32.8,285.4 L 33.0,286.7 L 33.1,288.1 L 33.2,289.4 L 33.4,290.8 L 33.5,292.1 L 33.6,293.4 L 33.8,294.8 L 33.9,296.1 L 34.2,297.4 L 34.5,298.8 L 34.9,300.1 L 35.4,301.5 L 35.9,302.8 L 36.5,304.1 L 37.0,305.5 L 37.4,306.8 L 37.8,308.1 L 38.1,309.5 L 38.4,310.8 L 38.7,312.2 L 39.1,313.5 L 39.4,314.8 L 39.8,316.2 L 40.1,317.5 L 40.4,318.8 L 40.7,320.2 L 41.0,321.5 L 41.4,322.9 L 41.9,324.2 L 42.5,325.5 L 43.3,326.9 L 43.9,328.2 L 44.4,329.5 L 44.9,330.9 L 45.2,332.2 L 45.3,333.5 L 45.4,334.9 L 45.4,336.2 L 45.4,337.6 L 45.4,338.9 L 45.4,340.2 L 45.4,341.6 L 45.4,342.9 L 45.4,344.2 L 45.4,345.6 L 45.4,346.9 L 45.4,348.3 L 45.4,349.6 L 45.4,350.9 L 45.4,352.3 L 45.3,353.6 L 45.0,354.9 L 44.7,356.3 L 44.4,357.6 L 44.4,359.0 L 44.4,360.3 L 44.5,361.6 L 44.7,363.0 L 45.0,364.3 L 45.2,365.6 L 45.4,367.0 L 45.7,368.3 L 46.2,369.6 L 46.9,370.8 L 47.4,372.1 L 47.8,373.3 L 48.0,374.7 L 48.2,376.0 L 48.5,377.3 L 48.7,378.7 L 48.9,380.0 L 49.0,381.4 L 49.2,382.7 L 49.3,384.0 L 49.6,385.4 L 49.9,386.7 L 50.2,388.0 L 50.6,389.4 L 51.0,390.7 L 51.2,392.1 L 51.4,393.4 L 51.6,394.7 L 51.7,396.1 L 51.8,397.4 L 51.8,398.7 L 51.8,400.1 L 51.8,401.4 L 51.8,402.8 L 51.8,404.1 L 51.8,405.4 L 51.8,406.8 L 51.8,408.1 L 51.8,409.4 L 51.8,410.8 L 51.8,412.1 L 51.8,413.4 L 51.5,414.6 L 51.1,415.7 L 50.7,416.7 L 50.5,417.8 L 50.7,419.1 L 51.0,420.5 L 51.3,421.8 L 51.7,423.1 L 51.9,424.5 L 52.2,425.8 L 52.5,427.2 L 52.9,428.5 L 53.3,429.8 L 53.7,431.2 L 53.9,432.5 L 54.0,433.8 L 54.1,435.2 L 54.1,436.5 L 54.1,437.9 L 54.1,439.2 L 54.1,440.5 L 54.1,441.9 L 54.1,443.2 L 54.1,444.5 L 54.1,445.9 L 54.1,447.2 L 54.1,448.6 L 54.1,449.9 L 54.0,451.2 L 53.7,452.6 L 53.2,453.9 L 52.9,455.2 L 53.0,456.6 L 53.6,457.9 L 54.3,459.2 L 54.9,460.6 L 55.3,461.9 L 55.6,463.3 L 55.9,464.6 L 56.2,465.9 L 56.4,467.3 L 56.6,468.6 L 57.0,469.9 L 57.4,471.3 L 57.7,472.6 L 57.9,474.0 L 58.3,475.3 L 58.8,476.6 L 59.5,477.9 L 60.1,479.2 L 60.6,480.4 L 61.1,481.6 L 61.5,483.0 L 62.0,484.3 L 62.6,485.7 L 63.0,487.0 L 63.5,488.3 L 63.9,489.7 L 64.3,491.0 L 64.9,492.3 L 65.5,493.7 L 66.1,495.0 L 66.6,496.4 L 67.0,497.7 L 67.4,499.0 L 67.8,500.4 L 68.2,501.7 L 68.6,503.0 L 69.1,504.4 L 69.6,505.7 L 70.1,507.1 L 70.5,508.4 L 70.7,509.7 L 70.8,511.1 L 70.8,512.4 L 70.8,513.7 L 70.8,515.1 L 70.9,516.4 L 71.0,517.8 L 71.1,519.1 L 71.3,520.4 L 71.7,521.8 L 72.3,523.1 L 73.1,524.4 L 73.7,525.8 L 74.0,527.1 L 74.3,528.4 L 74.4,529.8 L 74.8,531.1 L 75.2,532.5 L 75.7,533.8 L 76.1,535.1 L 76.6,536.4 L 77.3,537.7 L 77.9,538.9 L 78.2,540.2 L 78.4,541.5 L 78.7,542.8 L 79.1,544.2 L 79.5,545.5 L 79.7,546.8 L 79.9,548.2 L 79.9,549.5 L 80.0,550.8 L 80.2,552.2 L 80.6,553.5 L 81.2,554.9 L 81.8,556.2 L 82.4,557.5 L 83.0,558.9 L 83.7,560.2 L 84.4,561.5 L 85.3,562.9 L 86.0,564.2 L 86.9,565.6 L 87.7,566.9 L 88.4,568.2 L 89.1,569.5 L 89.8,570.8 L 90.5,571.9 L 91.3,573.0 L 92.3,574.1 L 93.4,575.2 L 94.5,576.3 L 95.6,577.6 L 96.6,578.7 L 97.7,579.8 L 99.0,580.8 L 100.3,581.7 L 101.6,582.7 L 102.9,583.6 L 104.1,584.5 L 105.3,585.2 L 106.7,585.7 L 108.0,586.0 L 108.9,586.5 L 109.5,587.4 L 109.9,588.5 L 110.6,589.4 L 111.7,590.1 L 113.0,590.7 L 114.4,591.1 L 115.7,591.4 L 117.0,591.7 L 118.4,591.9 L 119.7,592.3 L 121.0,592.6 L 122.4,593.1 L 123.7,593.7 L 125.1,594.4 L 126.4,595.0 L 127.7,595.6 L 129.1,596.0 L 130.4,596.3 L 131.8,596.6 L 133.1,596.8 L 134.4,596.9 L 135.8,597.0 L 137.1,597.0 L 138.5,597.0 L 139.7,597.4 L 140.6,598.1 L 141.5,599.2 L 142.5,600.1 L 143.8,600.6 L 145.1,600.9 L 146.5,601.0 L 147.8,601.0 L 149.2,601.0 L 150.5,601.0 L 151.8,601.0 L 153.2,601.0 L 154.5,601.0 L 155.9,601.0 L 157.2,601.0 L 158.5,601.3 L 159.9,601.8 L 161.2,602.4 L 162.6,602.5 L 163.9,602.2 L 165.2,601.6 L 166.6,600.8 L 167.9,600.1 L 169.2,599.7 L 170.6,599.3 L 171.9,598.9 L 173.3,598.6 L 174.6,598.4 L 175.9,598.2 L 177.3,597.9 L 178.5,597.4 L 179.7,596.6 L 180.8,595.9 L 182.0,595.4 L 183.2,595.0 L 184.1,594.3 L 184.9,593.3 L 185.7,592.1 L 186.7,591.2 L 188.0,590.8 L 189.3,590.5 L 190.5,589.9 L 191.6,589.0 L 192.8,587.9 L 194.0,586.8 L 195.4,586.0 L 196.7,585.5 L 198.0,585.3 L 199.4,585.3 L 200.7,585.0 L 201.9,584.4 L 203.2,583.6 L 204.4,582.9 L 205.7,582.4 L 207.1,582.0 L 208.4,581.7 L 209.6,581.3 L 210.9,580.9 L 212.1,580.7 L 213.4,580.6 L 214.8,580.6 L 216.1,580.3 L 217.4,579.9 L 218.8,579.2 L 220.1,578.4 L 221.5,577.7 L 222.8,577.0 L 224.1,576.4 L 225.5,576.0 L 226.8,575.7 L 228.2,575.6 L 229.5,575.6 L 230.8,575.6 L 232.2,575.6 L 233.5,575.6 L 234.9,575.5 L 236.2,575.4 L 237.5,575.0 L 238.8,574.4 L 239.8,573.6 L 240.6,572.6 L 241.5,571.8 L 242.6,571.3 L 243.9,571.1 L 245.2,570.8 L 246.5,570.3 L 247.5,569.6 L 248.6,569.1 L 249.6,568.6 L 250.9,568.4 L 252.3,568.0 L 253.6,567.5 L 254.9,566.8 L 256.3,566.3 L 257.6,565.9 L 259.0,565.5 L 260.3,565.2 L 261.6,564.8 L 263.0,564.3 L 264.3,564.0 L 265.6,563.7 L 267.0,563.3 L 268.2,562.8 L 269.5,562.1 L 270.6,561.3 L 271.7,560.2 L 272.7,559.2 L 273.8,558.3 L 275.0,557.7 L 276.4,557.3 L 277.7,556.7 L 279.0,556.1 L 280.4,555.4 L 281.6,554.4 L 282.3,553.2 L 283.0,552.0 L 283.6,551.2 L 284.7,550.7 L 285.9,550.1 L 287.0,549.1 L 288.2,548.1 L 289.4,547.3 L 290.8,546.6 L 292.1,545.9 L 293.4,545.0 L 294.6,543.9 L 295.4,542.7 L 296.0,541.4 L 296.6,540.3 L 297.5,539.5 L 298.8,539.1 L 300.1,538.8 L 301.5,538.5 L 302.8,538.1 L 304.1,537.5 L 305.2,536.6 L 306.3,535.5 L 307.3,534.4 L 308.5,533.5 L 309.8,532.7 L 311.0,531.8 L 312.0,530.7 L 312.9,529.6 L 313.9,528.5 L 315.0,527.7 L 316.2,526.9 L 317.5,526.1 L 318.5,525.2 L 319.3,524.1 L 320.1,522.8 L 321.0,521.8 L 322.2,521.0 L 323.4,520.1 L 324.5,519.0 L 325.6,517.8 L 326.4,516.6 L 327.1,515.4 L 327.5,514.1 L 327.8,512.7 L 327.9,511.4 L 328.1,510.1 L 328.6,509.3 L 329.5,508.6 L 330.2,508.0 L 330.6,507.0 L 330.6,505.7 L 331.0,504.6 L 331.6,503.8 L 332.3,503.0 L 333.0,502.0 L 333.5,500.7 L 334.3,499.4 L 335.0,498.0 L 335.5,496.7 L 335.6,495.4 L 335.6,494.0 L 335.6,492.7 L 335.8,491.4 L 336.2,490.2 L 336.6,488.9 L 337.3,487.8 L 338.0,487.0 L 338.7,486.1 L 339.2,485.2 L 339.5,484.0 L 340.0,482.6 L 340.5,481.3 L 341.0,480.0 L 341.4,478.8 L 341.7,477.6 L 342.0,476.3 L 342.0,475.0 L 342.0,473.6 L 342.3,472.3 L 342.9,471.2 L 343.7,470.0 L 344.3,468.9 L 344.6,467.6 L 344.6,466.3 L 344.6,464.9 L 344.6,463.6 L 344.6,462.3 L 344.7,460.9 L 345.0,459.6 L 345.4,458.2 L 346.1,456.9 L 346.6,455.6 L 346.9,454.2 L 347.0,452.9 L 347.4,451.7 L 348.0,450.5 L 348.6,449.4 L 349.0,448.2 L 349.0,446.9 L 349.0,445.5 L 349.2,444.2 L 349.3,442.9 L 349.4,441.5 L 349.4,440.2 L 349.3,438.9 L 349.0,437.5 L 348.6,436.2 L 348.2,434.8 L 347.8,433.5 L 347.7,432.2 L 347.7,430.8 L 347.7,429.5 L 347.7,428.2 L 347.7,426.8 L 347.7,425.5 L 347.7,424.1 L 347.7,422.8 L 347.7,421.5 L 347.7,420.1 L 347.7,418.8 L 347.7,417.5 L 347.7,416.1 L 347.7,414.8 L 347.7,413.4 L 347.7,412.1 L 347.7,410.8 L 347.9,409.5 L 348.3,408.3 L 348.7,407.0 L 349.0,405.8 L 349.1,404.4 L 348.9,403.2 L 348.7,401.9 L 348.5,400.7 L 348.3,399.4 L 348.1,398.1 L 347.8,396.7 L 347.4,395.4 L 347.1,394.1 L 346.8,392.7 L 346.3,391.4 L 345.6,390.0 L 345.0,388.7 L 344.5,387.4 L 344.2,386.0 L 343.9,384.7 L 343.7,383.4 L 343.4,382.0 L 343.1,380.7 L 342.8,379.3 L 342.4,378.0 L 342.0,376.7 L 341.5,375.3 L 341.2,374.0 L 340.9,372.7 L 340.5,371.3 L 340.1,370.0 L 339.8,368.7 L 339.6,367.3 L 339.6,366.0 L 339.4,364.6 L 339.1,363.3 L 338.6,362.0 L 338.2,360.6 L 337.7,359.3 L 337.4,358.0 L 337.1,356.6 L 336.6,355.3 L 336.0,353.9 L 335.3,352.6 L 334.7,351.3 L 334.0,349.9 L 333.3,348.6 L 332.4,347.3 L 331.5,346.0 L 330.7,344.8 L 329.8,343.7 L 328.9,342.4 L 328.0,341.2 L 327.2,340.0 L 326.5,338.8 L 326.0,337.5 L 325.4,336.2 L 324.6,335.1 L 323.5,334.4 L 322.3,333.8 L 321.1,333.4 L 319.9,332.9 L 318.5,332.4 L 317.2,331.8 L 315.9,331.0 L 314.5,330.0 L 313.4,328.8 L 312.6,327.5 L 312.0,326.2 L 311.7,324.9 L 311.2,323.9 L 310.3,323.3 L 309.2,322.9 L 307.9,322.2 L 307.0,321.1 L 306.6,319.8 L 306.5,318.5 L 306.5,317.2 L 306.5,315.8 L 306.5,314.5 L 306.5,313.2 L 306.4,311.8 L 305.9,310.8 L 305.1,309.9 L 304.2,309.0 L 303.3,307.9 L 302.8,306.6 L 302.3,305.4 L 302.1,304.1 L 302.1,302.8 L 302.1,301.5 L 301.6,300.7 L 300.7,300.2 L 299.5,300.1 L 298.1,300.1 L 296.9,299.7 L 295.6,299.2 L 294.4,298.4 L 293.2,297.5 L 292.2,296.6 L 291.6,295.4 L 291.1,294.1 L 290.6,292.8 L 290.2,291.4 L 289.9,290.1 L 289.7,288.8 L 289.6,287.4 L 289.4,286.1 L 289.1,284.7 L 288.7,283.4 L 288.3,282.1 L 287.8,280.7 L 287.3,279.5 L 286.6,278.6 L 285.8,277.9 L 285.1,277.1 L 284.7,276.0 L 284.4,274.7 L 284.2,273.4 L 283.6,272.0 L 283.0,270.7 L 282.5,269.4 L 282.2,268.0 L 281.7,266.7 L 281.3,265.4 L 280.9,264.0 L 280.6,262.7 L 280.3,261.3 L 280.0,260.0 L 279.7,258.7 L 279.4,257.3 L 279.1,256.0 L 279.0,254.7 L 278.9,253.3 L 278.8,252.0 L 278.7,250.6 L 278.7,249.3 L 278.5,248.0 L 278.1,246.8 L 277.5,245.6 L 276.9,244.3 L 276.4,243.0 L 276.2,241.6 L 276.0,240.3 L 275.8,238.9 L 275.5,237.6 L 275.2,236.3 L 274.9,234.9 L 274.5,233.6 L 274.0,232.3 L 273.5,230.9 L 273.0,229.6 L 272.5,228.2 L 272.3,226.9 L 271.9,225.7 L 271.3,225.0 L 270.3,224.5 L 269.3,224.0 L 268.4,223.2 L 267.6,222.4 L 266.6,222.0 L 265.3,221.9 L 264.0,221.9 L 262.6,221.9 L 261.3,221.9 L 260.0,221.9 L 258.6,221.9 L 257.5,221.5 L 256.9,220.7 L 256.6,219.6 L 256.6,218.2 L 256.6,216.9 L 256.3,215.5 L 255.7,214.2 L 255.0,212.9 L 254.5,211.5 L 254.3,210.2 L 254.3,208.9 L 254.3,207.5 L 254.3,206.2 L 254.3,204.8 L 254.1,203.5 L 253.5,202.2 L 252.6,201.0 L 251.5,199.8 L 250.6,198.5 L 249.9,197.2 L 249.2,195.8 L 248.5,194.7 L 247.5,194.0 L 246.6,193.3 L 246.0,192.4 L 245.6,191.1 L 245.2,189.8 L 244.4,188.5 L 243.4,187.7 L 242.2,187.1 L 241.3,186.6 L 240.6,185.8 L 240.1,184.6 L 239.5,183.4 L 238.8,182.1 L 238.2,180.8 L 237.7,179.4 L 237.1,178.1 L 236.5,176.8 L 235.8,175.4 L 235.1,174.1 L 234.2,173.0 L 233.2,172.4 L 231.8,172.0 L 230.5,171.6 L 229.2,170.8 L 228.0,169.6 L 226.8,168.4 L 225.8,167.1 L 224.8,165.7 L 224.0,164.4 L 223.2,163.2 L 222.6,162.1 L 221.7,161.1 L 220.9,160.0 L 220.2,159.0 L 219.6,157.7 L 218.9,156.5 L 217.6,156.0 L 216.4,155.5 L 215.2,155.0 L 214.2,154.5 L 213.3,153.8 L 212.6,153.0 L 212.2,152.1 L 211.8,151.0 L 211.5,149.8 L 211.3,148.6 L 211.0,147.4 L 210.6,146.1 L 210.2,144.9 L 209.6,143.7 L 209.1,142.5 L 208.4,141.3 L 207.8,140.1 L 207.1,138.8 L 206.4,137.6 L 205.8,136.4 L 205.2,135.2 L 204.7,134.0 L 204.2,132.8 L 203.7,131.6 L 203.3,130.4 L 202.8,129.1 L 202.3,127.9 L 201.9,126.6 L 201.5,125.2 L 201.1,123.9 L 200.7,122.6 L 200.3,121.3 L 199.9,120.0 L 199.3,118.7 L 198.7,117.4 L 198.1,116.1 L 197.3,114.8 L 196.5,113.6 L 195.8,112.4 L 195.0,111.3 L 194.2,110.2 L 193.4,109.2 L 192.6,108.2 L 191.8,107.2 L 190.9,106.2 L 189.9,105.2 L 189.0,104.2 L 188.1,103.1 L 187.3,102.1 L 186.5,101.0 L 185.7,99.9 L 184.8,98.8 L 183.9,97.7 L 182.9,96.6 L 181.9,95.5 L 180.9,94.3 L 179.8,93.2 L 178.7,92.2 L 177.5,91.3 L 176.4,90.4 L 175.4,89.5 L 174.4,88.7 L 173.5,87.8 L 172.5,86.9 L 171.5,86.0 L 170.4,85.1 L 169.4,84.2 L 168.2,83.4 L 167.1,82.6 L 166.0,81.9 L 165.0,81.2 L 163.9,80.4 L 162.8,79.6 L 161.7,78.7 L 160.6,77.8 L 159.4,76.8 L 158.2,75.8 L 156.9,74.7 L 155.7,73.7 L 154.4,72.6 L 153.1,71.6 L 151.9,70.5 L 150.6,69.5 L 149.3,68.5 L 148.1,67.5 L 146.8,66.5 L 145.5,65.6 L 144.2,64.7 L 142.9,63.7 L 141.6,62.8 L 140.3,61.9 L 139.1,60.9 L 137.8,60.0 L 136.6,58.9 L 135.3,57.9 L 134.0,56.8 L 132.7,55.6 L 131.4,54.4 L 130.1,53.2 L 128.8,52.0 L 127.6,50.8 L 126.4,49.5 L 125.3,48.3 L 124.2,47.0 L 123.2,45.7 L 122.2,44.3 L 121.3,43.0 L 120.4,41.7 L 119.5,40.4 L 118.6,39.0 L 117.7,37.7 L 116.7,36.4 L 115.8,35.1 L 114.9,33.9 L 113.9,32.9 L 112.8,32.1 L 111.7,31.5 L 110.5,31.0 L 109.2,30.7 L 107.9,30.6 L 106.6,30.4 L 105.3,30.4 L 104.0,30.3 L 102.6,30.3 L 101.3,30.3 L 100.0,30.3 L 98.6,30.3 Z`

/* ── Interactive Map Component ─────────────────────────────────────── */
function SriLankaMap({ active, onSelect }: { active: string | null; onSelect: (id: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 380 }}>
      <svg
        viewBox="0 0 380 633"
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      >
        {/* Drop shadow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="pinGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Island body */}
        <path
          d={SL_PATH}
          fill="#0f2a1a"
          stroke="rgba(26,92,56,0.6)"
          strokeWidth="1.5"
        />

        {/* Subtle inner grid texture */}
        <path
          d={SL_PATH}
          fill="url(#gridPat)"
          opacity="0.15"
        />
        <defs>
          <pattern id="gridPat" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(74,222,128,0.3)" strokeWidth="0.4" />
          </pattern>
        </defs>

        {/* Connection lines between facilities */}
        {FACILITIES.map((f, i) =>
          FACILITIES.slice(i + 1).map((f2) => {
            const dist = Math.hypot(f.px - f2.px, f.py - f2.py)
            if (dist > 180) return null
            return (
              <line
                key={`${f.id}-${f2.id}`}
                x1={f.px} y1={f.py} x2={f2.px} y2={f2.py}
                stroke="rgba(74,222,128,0.08)"
                strokeWidth="0.8"
                strokeDasharray="3 4"
              />
            )
          })
        )}

        {/* Pins */}
        {FACILITIES.map((f) => {
          const isActive = active === f.id
          const isHovered = hovered === f.id
          const scale = isActive ? 1.35 : isHovered ? 1.15 : 1

          return (
            <g
              key={f.id}
              transform={`translate(${f.px}, ${f.py})`}
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              onClick={() => onSelect(f.id)}
              onMouseEnter={() => setHovered(f.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Pulse ring when active */}
              {isActive && (
                <>
                  <circle r={18} fill="none" stroke={f.color} strokeWidth="1" opacity="0.3">
                    <animate attributeName="r" from="12" to="26" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  <circle r={13} fill="none" stroke={f.color} strokeWidth="0.8" opacity="0.2">
                    <animate attributeName="r" from="8" to="20" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.4" to="0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              {/* Pin dot */}
              <circle
                r={isActive ? 9 : isHovered ? 7 : 5.5}
                fill={f.color}
                stroke={isActive ? '#fff' : 'rgba(255,255,255,0.3)'}
                strokeWidth={isActive ? 2 : 1}
                style={{ transition: 'r 0.2s, stroke 0.2s' }}
                filter={isActive ? 'url(#pinGlow)' : undefined}
              />

              {/* Code label */}
              <text
                x={0}
                y={isActive ? -14 : -10}
                textAnchor="middle"
                fill={isActive ? '#fff' : 'rgba(255,255,255,0.6)'}
                fontSize={isActive ? 9 : 8}
                fontWeight={isActive ? 700 : 500}
                fontFamily="monospace"
                style={{ transition: 'all 0.2s', pointerEvents: 'none' }}
              >{f.code}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ── Facility Detail Panel ─────────────────────────────────────────── */
function FacilityPanel({ facility, onClose }: { facility: Facility; onClose: () => void }) {
  return (
    <div style={{
      position: 'absolute', top: 0, right: 0,
      width: '52%', height: '100%',
      background: 'rgba(4,13,26,0.96)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '0 16px 16px 0',
      padding: '40px 36px',
      overflowY: 'auto',
      animation: 'slideInPanel 0.3s cubic-bezier(0.16,1,0.3,1) both',
      backdropFilter: 'blur(20px)',
      zIndex: 10,
    }}>
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 20,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 6, color: 'rgba(255,255,255,0.5)',
          width: 32, height: 32, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
        }}
      >×</button>

      {/* Type badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 12px', borderRadius: 40, marginBottom: 20,
        background: `${facility.color}22`,
        border: `1px solid ${facility.color}44`,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: facility.color }} />
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: facility.color, fontFamily: 'monospace', textTransform: 'uppercase' }}>{facility.type}</span>
      </div>

      <h3 style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 6 }}>{facility.name}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', marginBottom: 28 }}>{facility.role}</p>

      {/* Image placeholder */}
      <div style={{
        width: '100%', height: 160, borderRadius: 10,
        background: 'rgba(255,255,255,0.04)',
        border: '1px dashed rgba(255,255,255,0.1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        marginBottom: 28, gap: 8,
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>facility photo · {facility.code.toLowerCase()}.jpg</span>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
        {facility.stats.map((s, i) => (
          <div key={i} style={{
            padding: '12px 14px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 8, textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 12 }}>Capabilities</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {facility.highlights.map((h, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', border: `1px solid ${facility.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 4l2 2L6.5 2" stroke={facility.color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{h}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Horizontal Scroll Facility Sections ───────────────────────────── */
const FACILITY_PANELS = [
  {
    id: 'washing',
    label: '01 — Washing Plant',
    title: 'Integrated Washing Capability',
    subtitle: 'Wattala & Mahiyanganaya',
    desc: 'Dedicated washing infrastructure established in 1993 — seamlessly aligned to support long-term woven bottom production across the Maliban Wovens ecosystem. Two specialised units with 250+ technical workforce members deliver 20 million units of annual output capacity.',
    stats: [
      { value: '1993', label: 'Heritage Established' },
      { value: '2', label: 'Specialised Units' },
      { value: '250+', label: 'Technical Workforce' },
      { value: '20M', label: 'Annual Unit Capacity' },
    ],
    tags: ['E-flow Nanobubble', 'G2 Ozone Treatment', 'Precision Laser Finishing', 'ZDHC MRSL Level 1', 'Solar Energy', 'In-house Chem Lab'],
    image: '/images/washing-plant.jpg',
    accent: '#2563eb',
    bg: '#040d1a',
  },
  {
    id: 'jacket',
    label: '02 — Jacket Plant',
    title: 'Jacket Plant in Operation',
    subtitle: 'Balangoda Manufacturing Hub',
    desc: 'State-of-the-art jacket production facility equipped with automated pattern sewing systems for precision and consistency. Designed for both men\'s and women\'s structured garment production at 600,000 pieces annually — with integrated automated pressing and finishing technology.',
    stats: [
      { value: '600K', label: 'Annual Capacity' },
      { value: 'Both', label: 'Men\'s & Women\'s' },
      { value: 'Auto', label: 'Pattern Sewing' },
      { value: 'Gen 4', label: 'Finishing Tech' },
    ],
    tags: ['Automated Pattern Sewing', 'Structured Garment', 'Blazers & Suiting', 'Automated Pressing', 'Precision Finishing'],
    image: '/images/jacket-plant.jpg',
    accent: '#1a5c38',
    bg: '#040d1a',
  },
  {
    id: 'bottoms',
    label: '03 — Woven Bottoms',
    title: 'Woven Bottoms Production',
    subtitle: 'Across 3 Manufacturing Hubs',
    desc: 'The core of the Maliban Wovens operation — 10.8 million pieces of annual pant production spanning cargo, formal, semi-formal, chinos, shorts, and casual wear. Three manufacturing hubs in Dehiattakandiya, Ingiriya, and Balangoda operate in coordinated synchrony with the washing plant.',
    stats: [
      { value: '10.8M', label: 'Annual Pant Output' },
      { value: '6M', label: 'Bottoms Capacity/yr' },
      { value: '3', label: 'Manufacturing Hubs' },
      { value: '55%', label: 'US Market Share' },
    ],
    tags: ['Cargo & Formal', 'Semi-formal', 'Chinos & Shorts', 'Casual Wear', 'Skirts', 'PVH · Gap · M&S'],
    image: '/images/production-floor.jpg',
    accent: '#1a5c38',
    bg: '#070f1f',
  },
  {
    id: 'tech',
    label: '04 — Technical Architecture',
    title: 'Washing, Finishing & Diagnostics',
    subtitle: 'Generation 4.0 Facility',
    desc: 'Generation 4.0 washing facility utilising advanced low-impact finishing. Capabilities include E-flow nanobubble applications, G2 Ozone treatments, and precision laser finishing. Fully equipped in-house testing and colour labs ensure precise shade control, accelerated sampling loops, and strict adherence to international physical testing standards.',
    stats: [
      { value: 'Gen 4.0', label: 'Technology Level' },
      { value: '100%', label: 'ZDHC MRSL L1' },
      { value: 'In-house', label: 'Colour Labs' },
      { value: 'Solar', label: 'Green Energy' },
    ],
    tags: ['E-flow Nanobubble', 'G2 Ozone', 'Laser Finishing', 'Centralized Chem Dosing', 'Condensate Recovery', 'Automated QA'],
    image: '/images/washing-tech.jpg',
    accent: '#7c3aed',
    bg: '#040d1a',
  },
]

function FacilityTabs() {
  const [active, setActive] = useState(0)
  const [prev, setPrev]     = useState<number | null>(null)
  const [animDir, setAnimDir] = useState<'left'|'right'>('right')
  const [animating, setAnimating] = useState(false)

  const goTo = (idx: number) => {
    if (idx === active || animating) return
    setAnimDir(idx > active ? 'right' : 'left')
    setPrev(active)
    setAnimating(true)
    setActive(idx)
    setTimeout(() => { setPrev(null); setAnimating(false) }, 420)
  }

  const panel = FACILITY_PANELS[active]

  return (
    <div style={{ background: '#040d1a' }}>
      <style>{`
        @keyframes slideInRight { from { opacity:0; transform:translateX(48px) } to { opacity:1; transform:translateX(0) } }
        @keyframes slideInLeft  { from { opacity:0; transform:translateX(-48px) } to { opacity:1; transform:translateX(0) } }
        @keyframes fadeOut      { from { opacity:1 } to { opacity:0 } }
      `}</style>

      {/* ── Sticky tab bar ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: 'rgba(4,13,26,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 40px',
          display: 'flex', alignItems: 'stretch',
          overflowX: 'auto',
        }}>
          {FACILITY_PANELS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '20px 28px',
                display: 'flex', flexDirection: 'column', gap: 4,
                borderBottom: active === i ? `2px solid ${p.accent}` : '2px solid transparent',
                transition: 'border-color 0.25s',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              <span style={{
                fontFamily: 'monospace', fontSize: 10,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: active === i ? p.accent : 'rgba(255,255,255,0.3)',
                transition: 'color 0.25s',
              }}>{String(i + 1).padStart(2,'0')}</span>
              <span style={{
                fontSize: 14, fontWeight: active === i ? 700 : 400,
                color: active === i ? '#fff' : 'rgba(255,255,255,0.45)',
                transition: 'color 0.25s, font-weight 0.25s',
              }}>{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Content panel ── */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '82vh' }}>
        <div
          key={active}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            minHeight: '82vh',
            animation: `${animDir === 'right' ? 'slideInRight' : 'slideInLeft'} 0.42s cubic-bezier(0.16,1,0.3,1) both`,
          }}
        >
          {/* Left — content */}
          <div style={{
            padding: 'clamp(48px,8vh,100px) clamp(32px,5vw,72px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            background: panel.bg,
          }}>
            {/* Eyebrow */}
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
              <div style={{ width:24, height:1, background: panel.accent }} />
              <span style={{ fontFamily:'monospace', fontSize:11, letterSpacing:'0.18em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>{panel.label}</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(28px,4vw,52px)', fontWeight:800,
              color:'#fff', letterSpacing:'-0.025em', lineHeight:1.1, marginBottom:8,
            }}>{panel.title}</h2>

            <div style={{ fontSize:13, color:panel.accent, fontWeight:600, marginBottom:24, letterSpacing:'0.04em' }}>
              {panel.subtitle}
            </div>

            <p style={{ fontSize:15, lineHeight:1.85, color:'rgba(255,255,255,0.45)', marginBottom:36, maxWidth:480 }}>
              {panel.desc}
            </p>

            {/* Stats row */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:32 }}>
              {panel.stats.map((s,j) => (
                <div key={j} style={{
                  padding:'14px 8px', textAlign:'center',
                  background:'rgba(255,255,255,0.03)',
                  border:'1px solid rgba(255,255,255,0.07)',
                  borderRadius:8,
                }}>
                  <div style={{ fontSize:20, fontWeight:800, color:panel.accent, letterSpacing:'-0.02em' }}>{s.value}</div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.35)', marginTop:4, lineHeight:1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {panel.tags.map((tag,j) => (
                <span key={j} style={{
                  padding:'5px 14px', borderRadius:40, fontSize:11,
                  background:`${panel.accent}15`,
                  border:`1px solid ${panel.accent}30`,
                  color:'rgba(255,255,255,0.5)',
                  fontFamily:'monospace', letterSpacing:'0.04em',
                }}>{tag}</span>
              ))}
            </div>

            {/* Prev / Next */}
            <div style={{ display:'flex', gap:12, marginTop:40 }}>
              <button
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                style={{
                  padding:'10px 20px', borderRadius:8, fontSize:13, fontWeight:600,
                  background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
                  color: active === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
                  cursor: active === 0 ? 'not-allowed' : 'pointer',
                  display:'flex', alignItems:'center', gap:8, transition:'all 0.2s',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Prev
              </button>
              <button
                onClick={() => goTo(active + 1)}
                disabled={active === FACILITY_PANELS.length - 1}
                style={{
                  padding:'10px 20px', borderRadius:8, fontSize:13, fontWeight:600,
                  background: panel.accent,
                  border:'none',
                  color:'#fff',
                  cursor: active === FACILITY_PANELS.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: active === FACILITY_PANELS.length - 1 ? 0.3 : 1,
                  display:'flex', alignItems:'center', gap:8, transition:'all 0.2s',
                }}
              >
                Next
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>

          {/* Right — image area */}
          <div style={{ position:'relative', overflow:'hidden', background: panel.bg, minHeight:500 }}>
            <div style={{
              position:'absolute', inset:0,
              background:`linear-gradient(120deg, ${panel.bg} 0%, transparent 50%)`,
              zIndex:1, pointerEvents:'none',
            }}/>
            {/* Placeholder — replace with <img> when photos are ready */}
            <div style={{
              position:'absolute', inset:0,
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              gap:14,
            }}>
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span style={{ fontSize:11, color:'rgba(255,255,255,0.12)', fontFamily:'monospace' }}>{panel.image}</span>
            </div>
            {/* Large faded number */}
            <div style={{
              position:'absolute', bottom:32, right:40, zIndex:2,
              fontSize:180, fontWeight:900, lineHeight:1,
              color:'rgba(255,255,255,0.03)', userSelect:'none', fontFamily:'monospace',
            }}>{String(active+1).padStart(2,'0')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}


/* ── Page ──────────────────────────────────────────────────────────── */
export default function FacilitiesPage() {
  useReveal()
  const [activePin, setActivePin] = useState<string | null>(null)
  const activeFacility = FACILITIES.find(f => f.id === activePin) || null

  return (
    <main style={{ fontFamily: 'var(--font-sans, system-ui, sans-serif)', background: '#040d1a', color: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideInPanel {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .reveal.visible { opacity: 1; transform: none; }
      `}</style>

      {/* ── HERO — Map ─────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        background: '#040d1a',
        paddingTop: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: '#1a5c38' }} />
              <span style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Operational Footprint</span>
              <div style={{ width: 32, height: 1, background: '#1a5c38' }} />
            </div>
            <h1 className="reveal" style={{
              fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 900,
              color: '#fff', letterSpacing: '-0.035em', lineHeight: 1.05,
              marginBottom: 16,
            }}>
              7 Integrated Locations<br />
              <span style={{ color: '#1a5c38' }}>Across Sri Lanka</span>
            </h1>
            <p className="reveal" style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', maxWidth: 520, margin: '0 auto' }}>
              Select a location on the map to explore each facility — its role, capacity, and capabilities within the Maliban Wovens network.
            </p>
          </div>

          {/* Map + Panel layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            alignItems: 'start',
            position: 'relative',
          }}>
            {/* Left — map */}
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
              <SriLankaMap active={activePin} onSelect={(id) => setActivePin(prev => prev === id ? null : id)} />

              {/* Legend */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
                {LEGEND.map((l, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — facility list or detail */}
            <div className="reveal" style={{ position: 'relative', minHeight: 560 }}>
              {!activeFacility ? (
                /* Default — facility index list */
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 16 }}>
                    — Select a pin to explore
                  </div>
                  {FACILITIES.map((f, i) => (
                    <div
                      key={f.id}
                      onClick={() => setActivePin(f.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        padding: '16px 20px', borderRadius: 8,
                        border: '1px solid rgba(255,255,255,0.06)',
                        background: 'rgba(255,255,255,0.02)',
                        cursor: 'pointer',
                        transition: 'background 0.2s, border-color 0.2s',
                      }}
                      onMouseEnter={e => {
                        ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                        ;(e.currentTarget as HTMLElement).style.borderColor = `${f.color}44`
                      }}
                      onMouseLeave={e => {
                        ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
                        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
                      }}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                        background: `${f.color}22`, border: `1px solid ${f.color}55`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 700, color: f.color, fontFamily: 'monospace',
                      }}>{f.code}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{f.name}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{f.type}</div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7h8M7 3l4 4-4 4" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ))}
                </div>
              ) : (
                <FacilityPanel facility={activeFacility} onClose={() => setActivePin(null)} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPACITY STRIP ─────────────────────────────────────────── */}
      <section style={{ background: '#1a5c38', padding: '32px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {[
            { value: '10.8M', label: 'Annual pant production' },
            { value: '600K', label: 'Annual jacket production' },
            { value: '20M', label: 'Washing plant capacity' },
            { value: '250+', label: 'Washing specialists' },
          ].map((s, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '0 24px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none',
            }}>
              <div style={{ fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FACILITY TABS ──────────────────────────────────────────── */}
      <section style={{ background: '#040d1a', paddingTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px 48px' }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 32, height: 1, background: '#1a5c38' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Facility Deep-Dives</span>
          </div>
          <h2 className="reveal" style={{ fontSize: 'clamp(26px, 4vw, 52px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em' }}>
            Inside the operation
          </h2>
        </div>
        <FacilityTabs />
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 40px', background: '#070f1f', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="reveal" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', marginBottom: 16 }}>
            Want to visit our facilities?
          </h2>
          <p className="reveal" style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, marginBottom: 40 }}>
            We welcome buyer visits and factory audits across all locations. Get in touch with our merchandising team to arrange a tour.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', borderRadius: 8,
              background: '#1a5c38', color: '#fff',
              fontWeight: 600, fontSize: 15, textDecoration: 'none',
              border: '1px solid rgba(74,222,128,0.3)',
            }}>
              Arrange a visit
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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