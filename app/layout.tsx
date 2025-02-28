import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mshauri',
  description: 'Mshauri is a digital assistant designed to help older Kenyans in Nairobi overcome language and digital literacy barriers.',
  generator: 'Mshauri',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
