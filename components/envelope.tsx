'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'

interface EnvelopeProps {
  onOpen: () => void
}

type Stage = 'closed' | 'opening-flap' | 'sliding-paper' | 'unfolding'

export function Envelope({ onOpen }: EnvelopeProps) {
  const [stage, setStage] = useState<Stage>('closed')

  const fireConfetti = () => {
    const count = 180
    const defaults = {
      origin: { y: 0.6 },
      colors: ['#ec3f48', '#9f2b31', '#e8b13d', '#4f8c59', '#fffaf2'],
    }

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      })
    }

    fire(0.25, { spread: 26, startVelocity: 55 })
    fire(0.2, { spread: 60 })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45 })
  }

  const handleEnvelopeClick = () => {
    if (stage !== 'closed') return

    // Bước 1: Mở bung nắp phong bì (0ms - 850ms)
    setStage('opening-flap')

    // Bước 2: Tờ giấy trắng từ từ trượt lòi ra khỏi bao thư (850ms - 1950ms)
    setTimeout(() => {
      setStage('sliding-paper')
    }, 850)

    // Bước 3: Bắn pháo hoa và chuyển mượt sang thiệp tương tác (1950ms)
    setTimeout(() => {
      setStage('unfolding')
      fireConfetti()
    }, 1950)

    // Bước 4: Mở ngay thiệp tương tác đầy đủ tính năng (không bị đứng hình hay chờ load)
    setTimeout(() => {
      onOpen()
    }, 2100)
  }

  const isFlapOpen = stage !== 'closed'
  const isPaperSliding = stage === 'sliding-paper' || stage === 'unfolding'
  const isUnfolding = stage === 'unfolding'

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full p-4 overflow-hidden select-none">
      {/* 3D ENVELOPE WRAPPER */}
      <div
        onClick={handleEnvelopeClick}
        className={`group relative cursor-pointer perspective-1000 z-20 w-[320px] sm:w-[420px] md:w-[460px] aspect-[4/3] transition-all duration-1400 ${
          isUnfolding ? 'scale-110 opacity-0 pointer-events-none' : 'hover:scale-[1.02] active:scale-[0.99]'
        }`}
      >
        {/* Main Envelope Body */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#6e0d07] to-[#4a0703] border-2 border-[#e8b13d]/60 shadow-[0_25px_60px_rgba(23,23,18,0.25),0_10px_25px_rgba(110,13,7,0.3)] overflow-visible flex flex-col justify-end p-5">

          {/* ================= TỜ GIẤY TRẮNG (SLIDES OUT & UNFOLDS) ================= */}
          <div
            className={`absolute left-6 right-6 top-6 h-[80%] rounded-xl transition-all duration-1400 ease-out z-15 ${
              isPaperSliding
                ? '-translate-y-[62%] sm:-translate-y-[68%] shadow-[0_20px_40px_rgba(0,0,0,0.35)] scale-[1.02]'
                : 'translate-y-2 opacity-0'
            }`}
          >
            {/* White / Cream Paper Sheet */}
            <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#fffefc] via-[#fffdf9] to-[#fbf5ea] border border-[#dfd2c2] shadow-md p-4 flex flex-col justify-between overflow-hidden">
              {/* Paper Fold Crease Line */}
              <div className="absolute top-1/2 left-0 right-0 h-px border-b border-dashed border-[#dfd2c2]/80" />

              {/* Decorative Corner Ornaments */}
              <div className="absolute top-2 left-2 text-[10px] text-[#e8b13d] opacity-60">✤</div>
              <div className="absolute top-2 right-2 text-[10px] text-[#e8b13d] opacity-60">✤</div>
              <div className="absolute bottom-2 left-2 text-[10px] text-[#e8b13d] opacity-60">✤</div>
              <div className="absolute bottom-2 right-2 text-[10px] text-[#e8b13d] opacity-60">✤</div>

              {/* Top Half of Folded Letter */}
              <div className="text-center pt-2">
                <div className="text-[10px] sm:text-xs tracking-[0.25em] font-bold text-[#9f2b31] uppercase">
                  ✦ THƯ MỜI ✦
                </div>
                <div className="text-base sm:text-lg font-bold text-[#171712] mt-1 font-sans">
                  Lễ Tốt Nghiệp
                </div>
              </div>

              {/* Bottom Half of Folded Letter */}
              <div className="text-center pb-2">
                <div className="inline-block px-3 py-1 rounded-full bg-[#fbf4e9] border border-[#dfd2c2] text-[10px] sm:text-xs font-semibold text-[#625a50]">
                  26 . 09 . 2026 • ĐHBK Hà Nội
                </div>
              </div>
            </div>
          </div>

          {/* Envelope Pocket Body (Front Folds) */}
          <div className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden">
            {/* Left triangle fold */}
            <div
              className="absolute left-0 bottom-0 top-0 w-1/2 bg-gradient-to-r from-[#7a100a] to-[#590a05] border-t border-[#e8b13d]/20"
              style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}
            />
            {/* Right triangle fold */}
            <div
              className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-[#7a100a] to-[#590a05] border-t border-[#e8b13d]/20"
              style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
            />
            {/* Bottom triangle fold */}
            <div
              className="absolute left-0 right-0 bottom-0 h-[65%] bg-gradient-to-t from-[#4f0804] to-[#6b0d07] border-t border-[#e8b13d]/30"
              style={{ clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)' }}
            />
          </div>

          {/* Front Envelope Details / Gold text banner */}
          <div className="relative z-25 text-center pb-2 pointer-events-none">
            <div className="text-[11px] sm:text-xs tracking-[0.25em] font-bold text-[#e8b13d] uppercase">
              ✦ TRÂN TRỌNG KÍNH MỜI ✦
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#fffaf2] tracking-normal mt-1 drop-shadow-sm font-sans">
              LỄ TỐT NGHIỆP
            </div>
          </div>

          {/* TOP FLAP (Khớp chính xác với đường thẳng viền trên, không lẹm cạnh bo tròn 18px) */}
          <div
            className={`absolute left-0 right-0 top-0 h-[62%] origin-top transition-all duration-1200 ease-in-out pointer-events-none transform-style-3d ${
              isFlapOpen ? 'rotate-x-180 z-5 opacity-90' : 'rotate-x-0 z-30 opacity-100'
            }`}
            style={{
              clipPath: 'polygon(18px 0, calc(100% - 18px) 0, 50% 100%)',
              backgroundColor: '#87130b',
              backgroundImage: 'linear-gradient(180deg, #96160d 0%, #690c05 100%)',
            }}
          />

          {/* LUXURY MINIMALIST WAX SEAL (Tan biến mượt mà 800ms) */}
          <div
            className={`absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-800 pointer-events-none ${
              isFlapOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#f2be5c] via-[#d6982c] to-[#966311] border-2 border-[#fffaf2]/80 shadow-[0_6px_20px_rgba(23,23,18,0.45),inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#805009] bg-gradient-to-br from-[#d99c31] to-[#a86e14] flex items-center justify-center shadow-inner">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#f2be5c]/60 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#f2be5c]/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
