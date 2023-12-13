import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/NavBar'
import './globals.css'
import Send from '@/components/Input'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
        <Navbar/>
        {children}
        <Send/>
        </body>
    </html>
  )
}
