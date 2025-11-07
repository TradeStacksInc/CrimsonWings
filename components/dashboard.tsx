"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { DroneMap } from "@/components/drone-map"
import { HospitalRequests } from "@/components/hospital-requests"
import { HubInventory } from "@/components/hub-inventory"
import { AIRecommendations } from "@/components/ai-recommendations"
import { OrderModal } from "@/components/order-modal"
import { Footer } from "@/components/footer"
import { DronesPage } from "@/components/pages/drones-page"
import { HospitalsPage } from "@/components/pages/hospitals-page"
import { RequestsPage } from "@/components/pages/requests-page"
import { InventoryPage } from "@/components/pages/inventory-page"
import { AIInsightsPage } from "@/components/pages/ai-insights-page"
import { SettingsPage } from "@/components/pages/settings-page"

export function Dashboard() {
  const [isDisasterMode, setIsDisasterMode] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [activePage, setActivePage] = useState("dashboard")

  // Get page title based on active page
  const getPageTitle = () => {
    switch (activePage) {
      case "drones":
        return "Drones | CrimsonWings"
      case "hospitals":
        return "Hospitals | CrimsonWings"
      case "requests":
        return "Requests | CrimsonWings"
      case "inventory":
        return "Inventory | CrimsonWings"
      case "ai-insights":
        return "AI Insights | CrimsonWings"
      case "settings":
        return "Settings | CrimsonWings"
      default:
        return "Dashboard | CrimsonWings"
    }
  }

  useEffect(() => {
    // Update document title when page changes
    document.title = getPageTitle()
  }, [activePage])

  const renderPageContent = () => {
    switch (activePage) {
      case "drones":
        return <DronesPage isDisasterMode={isDisasterMode} />
      case "hospitals":
        return <HospitalsPage isDisasterMode={isDisasterMode} />
      case "requests":
        return <RequestsPage isDisasterMode={isDisasterMode} />
      case "inventory":
        return <InventoryPage isDisasterMode={isDisasterMode} />
      case "ai-insights":
        return <AIInsightsPage isDisasterMode={isDisasterMode} />
      case "settings":
        return <SettingsPage isDisasterMode={isDisasterMode} />
      default:
        return (
          <div className="grid grid-cols-1 gap-6">
            {/* Live Drone Tracker Map */}
            <div>
              <DroneMap isDisasterMode={isDisasterMode} selectedRequest={selectedRequest} />
            </div>

            {/* Incoming Hospital Requests */}
            <div>
              <HospitalRequests
                isDisasterMode={isDisasterMode}
                onSelectRequest={setSelectedRequest}
                selectedRequest={selectedRequest}
              />
            </div>

            {/* Hub Inventory Stats */}
            <div>
              <HubInventory isDisasterMode={isDisasterMode} />
            </div>

            {/* AI Recommendations Panel */}
            <div>
              <AIRecommendations isDisasterMode={isDisasterMode} />
            </div>
          </div>
        )
    }
  }

  return (
    <div
      className={`min-h-screen ${isDisasterMode ? "bg-red-950" : "bg-background"} transition-colors duration-300 flex flex-col`}
    >
      {/* Disaster Mode Banner */}
      {isDisasterMode && (
        <div className="bg-red-600 text-white px-4 py-2 text-center font-semibold animate-pulse">
          🚨 DISASTER MODE ACTIVATED - CRITICAL BLOOD SHORTAGE ALERT 🚨
        </div>
      )}

      <div className="flex">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />

        <div className="flex-1 flex flex-col">
          <TopBar
            isDisasterMode={isDisasterMode}
            onToggleDisasterMode={() => setIsDisasterMode(!isDisasterMode)}
            onOpenOrderModal={() => setIsOrderModalOpen(true)}
          />

          <main className="flex-1 p-6">{renderPageContent()}</main>
        </div>
      </div>

      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      <Footer />
    </div>
  )
}
