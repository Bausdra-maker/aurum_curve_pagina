import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { StoreShell, toStoreUser } from '@/components/store-shell'
import { Toaster } from '@/components/ui/sonner'
import { getSession } from '@/lib/session'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Aurum Curve · Indumentaria mayorista premium',
  description:
    'Aurum Curve es una marca de indumentaria mayorista premium. Recorré el catálogo, reservá stock y coordiná retiro o envío para tu local.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6f0e4',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()
  return (
    <html lang="es-AR" className={`${inter.variable} ${cormorant.variable} bg-background`}>
      <body className="antialiased">
        <StoreShell user={toStoreUser(session?.user)}>{children}</StoreShell>
        <Toaster theme="light" position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
