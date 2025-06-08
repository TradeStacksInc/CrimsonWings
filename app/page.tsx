"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Dashboard } from "@/components/dashboard"
import { HomePage } from "@/components/home-page"

export default function Home() {
  const [currentView, setCurrentView] = useState<"home" | "dashboard">("home")

  useEffect(() => {
    // Preload images
    const preloadImages = () => {
      const imageUrls = [
        "/images/medical-drone-delivery.jpg",
        "/images/drone-image.jpg",
        "/images/hero-medical-drone.jpg",
      ]

      imageUrls.forEach((url) => {
        const img = new Image()
        img.src = url
      })
    }

    preloadImages()
  }, [])

  const handleEnterDashboard = () => {
    setCurrentView("dashboard")
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        {currentView === "home" && <HomePage onEnterDashboard={handleEnterDashboard} />}
        {currentView === "dashboard" && <Dashboard />}
      </div>
    </ThemeProvider>
  )
}
