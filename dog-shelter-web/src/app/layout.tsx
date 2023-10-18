'use client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ResponsiveAppBar from "@/components/AppBar";
import {ThemeProvider} from "@mui/material"
import {theme} from "@/theme"
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ThemeProvider theme={theme}>
    <html lang="en">
      <body className={inter.className}>
      <ResponsiveAppBar/>
      {children}
      </body>
    </html></ThemeProvider>
  )
}
