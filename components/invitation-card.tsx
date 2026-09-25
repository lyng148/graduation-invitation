'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, ExternalLink, Check, Sparkles } from 'lucide-react'

export function InvitationCard() {
  const [copiedTime, setCopiedTime] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Google Maps link pointing specifically to Hội trường C2 - ĐHBK Hà Nội
  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=H%E1%BB%99i+tr%C6%B0%E1%BB%9Dng+C2+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+B%C3%A1ch+khoa+H%C3%A0+N%E1%BB%99i'

  // Google Calendar event creation URL for Saturday 26/09/2026 09:00 - 11:00 (UTC+7)
  const googleCalendarUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE&text=L%E1%BB%85+T%E1%BB%91t+Nghi%E1%BB%87p+-+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+B%C3%A1ch+Khoa+H%C3%A0+N%E1%BB%99i&dates=20260926T020000Z%2F20260926T040000Z&details=Tr%C3%A2n+tr%E1%BB%8Dng+k%C3%ADnh+m%E1%BB%9Di+b%E1%BA%A1n+%C4%91%E1%BA%BFn+tham+d%E1%BB%B1+v%C3%A0+ch%E1%BB%A5p+%E1%BA%A3nh+k%E1%BB%B7+ni%E1%BB%87m+t%E1%BA%A1i+L%E1%BB%85+T%E1%BB%91t+Nghi%E1%BB%87p%21&location=H%E1%BB%99i+tr%C6%B0%E1%BB%9Dng+C2%2C+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+B%C3%A1ch+Khoa+H%C3%A0+N%E1%BB%99i%2C+1+%C4%90%E1%BA%A1i+C%E1%BB%93+Vi%E1%BB%87t%2C+H%C3%A0+N%E1%BB%99i'

  const handleTimeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard?.writeText('9:00 - 11:00, Thứ Bảy ngày 26/09/2026 tại Hội trường C2 - ĐHBK Hà Nội')
    setCopiedTime(true)
    showToast('📋 Đã sao chép thời gian & địa điểm!')
    setTimeout(() => setCopiedTime(false), 2500)
  }

  const handleDateClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    showToast('📅 Đang mở Google Calendar...')
    window.open(googleCalendarUrl, '_blank')
  }

  const handleLocationClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    showToast('📍 Đang mở Google Maps chỉ đường...')
    window.open(googleMapsUrl, '_blank')
  }

  return (
    <div className="relative flex items-center justify-center w-full h-full max-h-screen overflow-hidden p-2 sm:p-3 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 z-50 animate-bounce bg-[#171712]/95 text-[#e8b13d] border border-[#e8b13d]/40 px-4 py-2 rounded-full shadow-2xl backdrop-blur-md text-xs sm:text-sm font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#e8b13d] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ACTION BUTTONS (DOCK TO LEFT SIDE) */}
      <div className="fixed left-3 sm:left-6 md:left-8 bottom-4 sm:bottom-6 md:top-1/2 md:-translate-y-1/2 z-40 flex flex-col gap-2.5 sm:gap-3 pointer-events-auto animate-in fade-in slide-in-from-left-4 duration-500">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Chỉ đường tới Hội trường C2 - ĐHBK Hà Nội"
          className="group flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#9f2b31] hover:bg-[#851e24] text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all active:scale-95 border border-[#fffaf2]/20 backdrop-blur-md"
        >
          <MapPin className="w-4 h-4 shrink-0 text-white" />
          <span className="whitespace-nowrap">Chỉ đường</span>
        </a>

        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Lưu sự kiện vào Google Calendar"
          className="group flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#fffaf2]/95 hover:bg-white text-[#171712] border border-[#dfd2c2] font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 backdrop-blur-md"
        >
          <Calendar className="w-4 h-4 shrink-0 text-[#9f2b31]" />
          <span className="whitespace-nowrap">Lưu vào lịch</span>
        </a>
      </div>

      {/* Main Card Container (Strictly fits inside viewport without scrolling) */}
      <div className="relative h-[94dvh] max-h-[94dvh] max-w-[94dvw] aspect-[3875/5462] w-auto rounded-2xl shadow-[0_20px_50px_rgba(23,23,18,0.25),0_4px_20px_rgba(110,13,7,0.18)] overflow-hidden border border-[#dfd2c2] bg-[#3D0400] shrink-0">
        {/* Base Canva Image (No date/time/location) */}
        <picture className="w-full h-full block">
          <source srcSet="/invitation-base.webp" type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/invitation-base.png"
            alt="Lễ tốt nghiệp - Thư mời"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover select-none pointer-events-none block"
          />
        </picture>

        {/* ================= INTERACTIVE OVERLAY ================= */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* DATE & TIME CAPSULE PILL
              Coordinates measured from original Canva:
              Top: 79.5%, Height: 7.1%, Left: 2.1%, Width: 95.8%
          */}
          <div
            className="absolute flex items-stretch pointer-events-auto shadow-lg transition-transform duration-200"
            style={{
              top: '79.5%',
              left: '2.1%',
              width: '95.8%',
              height: '7.1%',
            }}
          >
            {/* LEFT PILL: TIME (9:00 - 11:00) */}
            <button
              type="button"
              onClick={handleTimeClick}
              title="Bấm để sao chép thời gian"
              className="group relative flex items-center justify-center gap-1 sm:gap-2 bg-white text-[#6E0D07] font-bold rounded-l-full border-[2px] sm:border-[3px] border-[#6E0D07] border-r-0 hover:bg-red-50 active:scale-[0.98] transition-all cursor-pointer px-1.5 sm:px-2.5 text-center"
              style={{ width: '38.2%' }}
            >
              {copiedTime ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
              ) : (
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-[#6E0D07] flex items-center justify-center shrink-0">
                  <Clock className="w-2 h-2 sm:w-3 sm:h-3 text-[#6E0D07]" />
                </div>
              )}
              <span className="text-[10px] sm:text-sm md:text-base font-black tracking-tight whitespace-nowrap">
                9:00- 11:00
              </span>

              {/* Hover Tooltip */}
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#171712] text-[#fffaf2] text-[10px] py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
                {copiedTime ? 'Đã sao chép!' : 'Sao chép giờ'}
              </span>
            </button>

            {/* RIGHT PILL: DATE (Thứ bảy 26/09/2026) */}
            <button
              type="button"
              onClick={handleDateClick}
              title="Bấm để lưu vào Google Calendar"
              className="group relative flex items-center justify-center gap-1 sm:gap-2 bg-[#6E0D07] text-white font-bold rounded-r-full border-[2px] sm:border-[3px] border-white hover:bg-[#85120a] active:scale-[0.98] transition-all cursor-pointer px-1.5 sm:px-3 text-center"
              style={{ width: '61.8%' }}
            >
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-white shrink-0" />
              <span className="text-[10px] sm:text-sm md:text-base font-bold tracking-tight whitespace-nowrap">
                Thứ bảy 26/09/2026
              </span>

              {/* Hover Tooltip */}
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#171712] text-[#e8b13d] text-[10px] py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md flex items-center gap-1">
                <ExternalLink className="w-2.5 h-2.5" />
                Lưu lịch
              </span>
            </button>
          </div>

          {/* LOCATION BADGE
              Coordinates measured from Canva:
              Y: ~92.2% - 96.5%, Center X
              Color: #F6EEAF (Warm golden ivory)
          */}
          <div
            className="absolute left-0 right-0 flex items-center justify-center pointer-events-auto"
            style={{
              top: '92.5%',
              height: '4.8%',
            }}
          >
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLocationClick}
              title="Bấm để mở Google Maps chỉ đường"
              className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 py-0.5 px-2.5 sm:px-3.5 rounded-full transition-all duration-300 hover:bg-black/30 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {/* Outer Pulsing Glow */}
              <span className="absolute inset-0 rounded-full bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xs" />

              {/* Location Icon */}
              <div className="relative flex items-center justify-center">
                <div className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 rounded-full border border-[#F6EEAF] flex items-center justify-center bg-[#3D0400]">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#F6EEAF]" />
                </div>
              </div>

              {/* Location Text */}
              <span
                className="text-[11px] sm:text-base md:text-lg font-extrabold uppercase tracking-[0.14em] drop-shadow-sm group-hover:underline decoration-[#F6EEAF] underline-offset-4"
                style={{ color: '#F6EEAF' }}
              >
                C2 – ĐHBK HÀ NỘI
              </span>

              {/* Hover Tooltip */}
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#171712] text-[#e8b13d] text-[10px] py-0.5 px-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-[#e8b13d]/30 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#e8b13d]" />
                Chỉ đường
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
