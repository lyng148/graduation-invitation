'use client'

import { useState, useRef, useEffect } from 'react'
import { Envelope } from '@/components/envelope'
import { InvitationCard } from '@/components/invitation-card'
import { Volume2, VolumeX, Music } from 'lucide-react'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Prefetch card image immediately in background so it displays with 0ms delay on open
    const img = new Image()
    img.src = '/invitation-base.webp'
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    }
  }

  // Tự động phát nhạc khi người dùng bấm mở phong bì thư
  const handleEnvelopeOpen = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    }
    setIsOpen(true)
  }

  return (
    <main className="fixed inset-0 w-screen h-screen h-[100dvh] w-[100dvw] overflow-hidden flex items-center justify-center select-none">
      {/* NÚT BẬT / TẮT NHẠC Ở GÓC TRÊN BÊN TRÁI */}
      <div className="fixed top-3 left-3 sm:top-5 sm:left-6 z-50 pointer-events-auto">
        <button
          type="button"
          onClick={toggleMusic}
          title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
          className="group flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-[#fffaf2]/90 hover:bg-white text-[#171712] border border-[#dfd2c2] shadow-md hover:shadow-xl transition-all duration-200 active:scale-95 backdrop-blur-md cursor-pointer"
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
              isPlaying
                ? 'bg-[#9f2b31] text-white animate-pulse'
                : 'bg-neutral-200 text-neutral-600'
            }`}
          >
            {isPlaying ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </div>
          <span className="text-xs font-semibold pr-1 hidden xs:inline-block sm:inline-block">
            {isPlaying ? 'Nhạc nền: Bật' : 'Nhạc nền: Tắt'}
          </span>
        </button>
      </div>

      {/* Tệp nhạc nền theme-song.mp3 */}
      <audio ref={audioRef} src="/audio/theme-song.mp3" loop preload="auto" />

      {/* Main Content */}
      {!isOpen ? (
        <Envelope onOpen={handleEnvelopeOpen} />
      ) : (
        <div className="w-full h-full flex items-center justify-center overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          <InvitationCard />
        </div>
      )}
    </main>
  )
}
