"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Plane, Navigation, Zap } from "lucide-react"

interface DroneMapProps {
  isDisasterMode: boolean
  selectedRequest: string | null
}

const droneHubs = [
  { id: "hub1", name: "Victoria Island Hub", x: 20, y: 30, active: 3, total: 5 },
  { id: "hub2", name: "Ikeja Hub", x: 40, y: 20, active: 2, total: 4 },
  { id: "hub3", name: "Surulere Hub", x: 60, y: 40, active: 4, total: 6 },
  { id: "hub4", name: "Mainland Hub", x: 30, y: 60, active: 1, total: 3 },
  { id: "hub5", name: "Lekki Hub", x: 80, y: 50, active: 3, total: 5 },
]

const hospitals = [
  { id: "hosp1", name: "Lagos University Teaching Hospital", x: 45, y: 35 },
  { id: "hosp2", name: "National Orthopedic Hospital", x: 25, y: 45 },
  { id: "hosp3", name: "Lagos State University Teaching Hospital", x: 65, y: 25 },
  { id: "hosp4", name: "Gbagada General Hospital", x: 35, y: 55 },
  { id: "hosp5", name: "Ikorodu General Hospital", x: 15, y: 70 },
]

const activeDrones = [
  { id: "drone1", fromHub: "hub1", toHospital: "hosp1", progress: 0.3, bloodType: "O+" },
  { id: "drone2", fromHub: "hub2", toHospital: "hosp3", progress: 0.7, bloodType: "A-" },
  { id: "drone3", fromHub: "hub3", toHospital: "hosp2", progress: 0.5, bloodType: "B+" },
  { id: "drone4", fromHub: "hub4", toHospital: "hosp4", progress: 0.2, bloodType: "AB+" },
  { id: "drone5", fromHub: "hub5", toHospital: "hosp5", progress: 0.8, bloodType: "O-" },
]

export function DroneMap({ isDisasterMode, selectedRequest }: DroneMapProps) {
  const [dronePositions, setDronePositions] = useState(activeDrones)
  const [selectedPin, setSelectedPin] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setDronePositions((prev) =>
        prev.map((drone) => ({
          ...drone,
          progress: drone.progress >= 1 ? 0.1 : drone.progress + 0.02,
        })),
      )
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const getDronePosition = (drone: (typeof activeDrones)[0]) => {
    const hub = droneHubs.find((h) => h.id === drone.fromHub)
    const hospital = hospitals.find((h) => h.id === drone.toHospital)

    if (!hub || !hospital) return { x: 0, y: 0 }

    const x = hub.x + (hospital.x - hub.x) * drone.progress
    const y = hub.y + (hospital.y - hub.y) * drone.progress

    return { x, y }
  }

  return (
    <Card className={`h-[600px] ${isDisasterMode ? "border-red-500 bg-red-50 dark:bg-red-950" : ""}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Live Drone Tracker
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {dronePositions.length} Active
            </Badge>
            {isDisasterMode && (
              <Badge variant="destructive" className="animate-pulse">
                Emergency Mode
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 opacity-50"></div>

          {/* Lagos Outline */}
          <div className="absolute inset-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg opacity-30"></div>

          {/* Drone Hubs */}
          {droneHubs.map((hub) => (
            <div
              key={hub.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
              onClick={() => setSelectedPin(hub.id)}
            >
              <div
                className={`w-4 h-4 rounded-full ${
                  isDisasterMode ? "bg-red-600" : "bg-blue-600"
                } border-2 border-white shadow-lg group-hover:scale-125 transition-transform`}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {hub.name}
                    <br />
                    {hub.active}/{hub.total} drones
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Hospitals */}
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${hospital.x}%`, top: `${hospital.y}%` }}
              onClick={() => setSelectedPin(hospital.id)}
            >
              <MapPin
                className={`w-6 h-6 ${
                  isDisasterMode ? "text-red-600" : "text-green-600"
                } group-hover:scale-125 transition-transform`}
              />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">{hospital.name}</div>
              </div>
            </div>
          ))}

          {/* Flight Paths */}
          {dronePositions.map((drone) => {
            const hub = droneHubs.find((h) => h.id === drone.fromHub)
            const hospital = hospitals.find((h) => h.id === drone.toHospital)

            if (!hub || !hospital) return null

            return (
              <svg
                key={`path-${drone.id}`}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <line
                  x1={`${hub.x}%`}
                  y1={`${hub.y}%`}
                  x2={`${hospital.x}%`}
                  y2={`${hospital.y}%`}
                  stroke={isDisasterMode ? "#dc2626" : "#3b82f6"}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              </svg>
            )
          })}

          {/* Active Drones */}
          {dronePositions.map((drone) => {
            const position = getDronePosition(drone)
            return (
              <div
                key={drone.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  zIndex: 10,
                }}
              >
                <div className={`p-1 rounded-full ${isDisasterMode ? "bg-red-600" : "bg-yellow-500"} animate-pulse`}>
                  <Plane className="w-3 h-3 text-white" />
                </div>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Drone {drone.id.slice(-1)}
                    <br />
                    Carrying: {drone.bloodType}
                    <br />
                    Progress: {Math.round(drone.progress * 100)}%
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Map Controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-xs">Hubs</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-xs">Hospitals</span>
            </div>
            <div className="flex items-center gap-1">
              <Plane className="w-4 h-4 text-yellow-500" />
              <span className="text-xs">Active Drones</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Zap className="w-4 h-4 mr-1" />
            Real-time
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
