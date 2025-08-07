import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Valdo Prosecco - The Gold Standard of Prosecco',
  description: 'Experience the gold standard of Prosecco since 1926. Crafted with passion in the heart of Valdobbiadene.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Elfsight Instagram Feed Script */}
        <script 
          src="https://static.elfsight.com/platform/platform.js" 
          async 
          defer
        />
      </head>
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
