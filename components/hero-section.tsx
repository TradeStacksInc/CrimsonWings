"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Clock, Heart } from "lucide-react"

interface HeroSectionProps {
  onEnter: () => void
}

export function HeroSection({ onEnter }: HeroSectionProps) {
  const [currentMetric, setCurrentMetric] = useState(0)

  const metrics = [
    { label: "Avg Delivery Time", value: "23 min", icon: Clock },
    { label: "Units Delivered", value: "12,541", icon: Heart },
    { label: "Hospitals Served", value: "181", icon: Zap },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-red-950 dark:via-gray-900 dark:to-red-950 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 dark:bg-red-800 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300 dark:bg-red-700 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">CrimsonWings</h1>
          </div>
        </div>

        {/* Mission Statement */}
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Delivering Lifesaving Blood, <span className="text-red-600 dark:text-red-400">Faster Than Traffic</span>
        </h2>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Revolutionary drone technology connecting blood banks to hospitals across Lagos, ensuring critical supplies
          reach patients when every second counts.
        </p>

        {/* Animated Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div
                key={metric.label}
                className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 ${
                  currentMetric === index
                    ? "bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-600 scale-105"
                    : "bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                }`}
              >
                <Icon
                  className={`w-8 h-8 mx-auto mb-3 ${
                    currentMetric === index ? "text-red-600" : "text-gray-600 dark:text-gray-400"
                  }`}
                />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
              </div>
            )
          })}
        </div>

        {/* Hero Image */}
        <div className="relative w-full max-w-2xl mx-auto mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-full opacity-20 animate-pulse"></div>
          <img
            src="/images/hero-medical-drone.jpg"
            alt="CrimsonWings Medical Drone"
            className="relative z-10 w-full rounded-2xl shadow-xl"
          />
        </div>

        {/* CTA Button */}
        <Button
          onClick={onEnter}
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-xl group transition-all duration-300 transform hover:scale-105"
        >
          Enter Dashboard
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Partnership */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            In Partnership with Lagos State Blood Transfusion Services
          </p>
        </div>
      </div>
    </div>
  )
}
