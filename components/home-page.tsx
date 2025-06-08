"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Plane,
  Building2,
  FileText,
  Package,
  Brain,
  ArrowRight,
  Clock,
  Shield,
  BarChart3,
  Zap,
  Globe,
  CheckCircle,
  Users,
  ChevronDown,
} from "lucide-react"

export function HomePage({ onEnterDashboard }: { onEnterDashboard: () => void }) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-red-950 dark:via-gray-900 dark:to-red-950 py-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 dark:bg-red-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300 dark:bg-red-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">CrimsonWings</h1>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                AI-Powered <span className="text-red-600 dark:text-red-400">Blood Delivery</span> via Drones
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                Revolutionary drone technology connecting blood banks to hospitals across Lagos, ensuring critical
                supplies reach patients when every second counts.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button
                  onClick={onEnterDashboard}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-xl group transition-all duration-300"
                >
                  Enter Dashboard
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg rounded-xl border-gray-300 dark:border-gray-700"
                  onClick={() => {
                    const platformSection = document.getElementById("platform-overview")
                    platformSection?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Explore Platform
                  <ChevronDown className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-full opacity-20 animate-pulse"></div>
                <img
                  src="/images/hero-medical-drone.jpg"
                  alt="CrimsonWings Medical Drone"
                  className="relative z-10 w-full h-full object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 rounded-xl p-3 shadow-lg border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Average Delivery</p>
                      <p className="text-lg font-bold">23 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Plane className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">5 Hubs</p>
                    <p className="text-gray-600 dark:text-gray-400">Strategically Located</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">12,541+</p>
                    <p className="text-gray-600 dark:text-gray-400">Units Delivered</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">181</p>
                    <p className="text-gray-600 dark:text-gray-400">Partner Hospitals</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section id="platform-overview" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Platform Overview</Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Comprehensive Blood Delivery Ecosystem
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              CrimsonWings integrates advanced drone technology, AI intelligence, and medical logistics to create a
              seamless blood delivery system that saves lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dashboard & Mission Control */}
            <Card className="border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Dashboard & Mission Control</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Real-time operations center with comprehensive monitoring, alerts, and multi-language support.
                </p>
                <Button variant="outline" className="w-full justify-between" onClick={() => toggleSection("dashboard")}>
                  Learn More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeSection === "dashboard" ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </Button>

                {activeSection === "dashboard" && (
                  <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400 border-t pt-4 border-gray-200 dark:border-gray-800">
                    <p>• Live system status and performance metrics</p>
                    <p>• Emergency alerts and disaster mode protocols</p>
                    <p>• Multi-language support (English, Yoruba, Igbo, Hausa)</p>
                    <p>• Real-time KPIs and delivery tracking</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Drone Fleet Management */}
            <Card className="border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <Plane className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Drone Fleet Management</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  GPS-enabled tracking, battery management, and AI-powered route optimization for the entire drone
                  fleet.
                </p>
                <Button variant="outline" className="w-full justify-between" onClick={() => toggleSection("drones")}>
                  Learn More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${activeSection === "drones" ? "rotate-180" : "rotate-0"}`}
                  />
                </Button>

                {activeSection === "drones" && (
                  <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400 border-t pt-4 border-gray-200 dark:border-gray-800">
                    <p>• Real-time tracking of all active drones</p>
                    <p>• Automated battery monitoring and charging schedules</p>
                    <p>• Temperature-controlled payload systems (2-6°C)</p>
                    <p>• Predictive maintenance and safety protocols</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hospital Network Integration */}
            <Card className="border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hospital Network Integration</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Seamless connection with 181+ hospitals, capacity monitoring, and emergency contact management.
                </p>
                <Button variant="outline" className="w-full justify-between" onClick={() => toggleSection("hospitals")}>
                  Learn More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeSection === "hospitals" ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </Button>

                {activeSection === "hospitals" && (
                  <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400 border-t pt-4 border-gray-200 dark:border-gray-800">
                    <p>• Network of 181+ registered hospitals across Lagos</p>
                    <p>• Real-time bed occupancy and patient load tracking</p>
                    <p>• 24/7 medical staff contact directory</p>
                    <p>• Complete audit trail of all blood deliveries</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Blood Request Management */}
            <Card className="border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Blood Request Management</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Instant ordering, smart matching, and priority queue management for all blood requests.
                </p>
                <Button variant="outline" className="w-full justify-between" onClick={() => toggleSection("requests")}>
                  Learn More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeSection === "requests" ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </Button>

                {activeSection === "requests" && (
                  <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400 border-t pt-4 border-gray-200 dark:border-gray-800">
                    <p>• One-click blood requests with urgency classification</p>
                    <p>• AI-powered blood type and location matching</p>
                    <p>• Critical, high, medium, and low urgency processing</p>
                    <p>• Digital receipt and quality verification</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Inventory Management System */}
            <Card className="border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Inventory Management</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Multi-hub inventory tracking, blood type management, and temperature-controlled storage.
                </p>
                <Button variant="outline" className="w-full justify-between" onClick={() => toggleSection("inventory")}>
                  Learn More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeSection === "inventory" ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </Button>

                {activeSection === "inventory" && (
                  <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400 border-t pt-4 border-gray-200 dark:border-gray-800">
                    <p>• 5 strategic hubs across Lagos with complete inventory tracking</p>
                    <p>• All blood types (O+, O-, A+, A-, B+, B-, AB+, AB-) managed</p>
                    <p>• Predictive restocking and cross-hub transfers</p>
                    <p>• Temperature monitoring with alert systems</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI-Powered Intelligence */}
            <Card className="border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI-Powered Intelligence</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Machine learning capabilities for demand prediction, route optimization, and predictive analytics.
                </p>
                <Button variant="outline" className="w-full justify-between" onClick={() => toggleSection("ai")}>
                  Learn More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${activeSection === "ai" ? "rotate-180" : "rotate-0"}`}
                  />
                </Button>

                {activeSection === "ai" && (
                  <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400 border-t pt-4 border-gray-200 dark:border-gray-800">
                    <p>• 94% accuracy in forecasting blood requirements</p>
                    <p>• 87% efficiency improvement in delivery routes</p>
                    <p>• Real-time Lagos traffic pattern integration</p>
                    <p>• Continuous system improvement recommendations</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Process</Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">How CrimsonWings Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our streamlined process ensures blood reaches patients quickly and safely, reducing delivery times by up
              to 80% compared to traditional methods.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-red-200 dark:bg-red-900"></div>

            {/* Step 1 */}
            <div className="relative z-10 mb-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-center md:text-right">
                  <Badge className="mb-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Step 1</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Hospital Request</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Medical staff submit blood requests through the platform, specifying blood type, quantity, and
                    urgency level.
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center z-20 mx-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <img
                    src="/images/medical-drone-delivery.jpg"
                    alt="Hospital Request"
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 mb-16">
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0 text-center md:text-left">
                  <Badge className="mb-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Step 2</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">AI Processing</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our AI system matches the request with the nearest available blood supply and selects the optimal
                    drone and route.
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center z-20 mx-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="md:w-1/2 md:pr-12">
                  <img src="/images/drone-image.jpg" alt="AI Processing" className="rounded-lg shadow-lg w-full" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 mb-16">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 text-center md:text-right">
                  <Badge className="mb-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Step 3</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Drone Dispatch</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Temperature-controlled drones are loaded with the requested blood units and automatically dispatched
                    to the hospital.
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center z-20 mx-4">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <img
                    src="/images/hero-medical-drone.jpg"
                    alt="Drone Dispatch"
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0 text-center md:text-left">
                  <Badge className="mb-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Step 4</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Hospital Delivery</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Drones arrive at designated landing zones where medical staff receive the blood and confirm delivery
                    digitally.
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center z-20 mx-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="md:w-1/2 md:pr-12">
                  <img src="/images/drone-image.jpg" alt="Hospital Delivery" className="rounded-lg shadow-lg w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Features</Badge>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Key Platform Capabilities</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              CrimsonWings combines cutting-edge technologies to create a comprehensive blood delivery ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <Clock className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Rapid Response</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Average delivery time of just 23 minutes, with critical deliveries prioritized for even faster
                  response.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <Shield className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Safety & Compliance</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  End-to-end encryption, regulatory compliance, and comprehensive safety protocols for all operations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <Zap className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Disaster Mode</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Special protocols for mass casualty events, with automated resource allocation and priority routing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <Globe className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Multi-Language Support</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Interface available in English, Yoruba, Igbo, and Hausa to serve diverse medical staff.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Role-Based Access</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Customized interfaces for operations managers, medical directors, logistics coordinators, and hospital
                  staff.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <BarChart3 className="w-8 h-8 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Advanced Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive reporting on delivery performance, inventory management, and medical impact metrics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Blood Delivery?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join the revolution in medical logistics and help save lives with CrimsonWings' AI-powered drone delivery
            platform.
          </p>
          <Button
            onClick={onEnterDashboard}
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl"
          >
            Enter Dashboard
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">CrimsonWings</span>
            </div>
            <div className="flex gap-6">
              <Button variant="ghost" size="sm">
                About
              </Button>
              <Button variant="ghost" size="sm">
                Contact
              </Button>
              <Button variant="ghost" size="sm">
                Privacy
              </Button>
              <Button variant="ghost" size="sm">
                Terms
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 CrimsonWings. All rights reserved.</p>
            <p className="mt-2">In Partnership with Lagos State Blood Transfusion Services</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
