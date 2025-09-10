import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pratham Form Creator',
  description: 'Dynamic form field creator for educational systems',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}