import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Orbit",
  description: "Find the cinematic connection between any two stars."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang = "en">
      <body>
        {children}
      </body>
    </html>
  )
}
