import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://graduation.ringo.io.vn'),
  title: 'Lễ tốt nghiệp | Thư mời',
  description:
    'Trân trọng kính mời bạn đến tham dự Lễ Tốt Nghiệp tại Hội trường C2 - ĐHBK Hà Nội vào Thứ Bảy, 26/09/2026 (9:00 - 11:00).',
  openGraph: {
    title: 'Lễ tốt nghiệp | Thư mời',
    description:
      'Trân trọng kính mời bạn đến tham dự Lễ Tốt Nghiệp tại Hội trường C2 - ĐHBK Hà Nội vào Thứ Bảy, 26/09/2026 (9:00 - 11:00).',
    url: 'https://graduation.ringo.io.vn',
    siteName: 'Lễ tốt nghiệp',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Thư mời Lễ Tốt Nghiệp',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lễ tốt nghiệp | Thư mời',
    description:
      'Trân trọng kính mời bạn đến tham dự Lễ Tốt Nghiệp tại Hội trường C2 - ĐHBK Hà Nội vào Thứ Bảy, 26/09/2026.',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="preload"
          as="image"
          href="/invitation-base.webp"
          type="image/webp"
        />
      </head>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  )
}

