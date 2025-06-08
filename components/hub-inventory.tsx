"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Package, Thermometer, AlertTriangle, TrendingUp } from "lucide-react"

interface HubInventoryProps {
  isDisasterMode: boolean
}

const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

const initialHubs = [
  {
    id: "hub1",
    name: "Victoria Island Hub",
    capacity: 100,
    temperature: 4.2,
    status: "optimal",
    inventory: {
      "O+": 45,
      "O-": 12,
      "A+": 38,
      "A-": 8,
      "B+": 22,
      "B-": 6,
      "AB+": 15,
      "AB-": 4,
    },
  },
  {
    id: "hub2",
    name: "Ikeja Hub",
    capacity: 80,
    temperature: 3.8,
    status: "low-stock",
    inventory: {
      "O+": 25,
      "O-": 3,
      "A+": 18,
      "A-": 2,
      "B+": 12,
      "B-": 1,
      "AB+": 8,
      "AB-": 1,
    },
  },
  {
    id: "hub3",
    name: "Surulere Hub",
    capacity: 120,
    temperature: 4.1,
    status: "optimal",
    inventory: {
      "O+": 55,
      "O-": 18,
      "A+": 42,
      "A-": 12,
      "B+": 28,
      "B-": 8,
      "AB+": 18,
      "AB-": 6,
    },
  },
  {
    id: "hub4",
    name: "Mainland Hub",
    capacity: 60,
    temperature: 4.5,
    status: "critical",
    inventory: {
      "O+": 8,
      "O-": 1,
      "A+": 5,
      "A-": 0,
      "B+": 3,
      "B-": 0,
      "AB+": 2,
      "AB-": 0,
    },
  },
  {
    id: "hub5",
    name: "Lekki Hub",
    capacity: 90,
    temperature: 4.0,
    status: "restocking",
    inventory: {
      "O+": 35,
      "O-": 8,
      "A+": 28,
      "A-": 6,
      "B+": 18,
      "B-": 4,
      "AB+": 12,
      "AB-": 3,
    },
  },
]

export function HubInventory({ isDisasterMode }: HubInventoryProps) {
  const [hubs, setHubs] = useState(initialHubs)
  const [animatingHubs, setAnimatingHubs] = useState<Set<string>>(new Set())

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate restocking animation
      const hubToRestock = hubs.find((h) => h.status === "restocking")
      if (hubToRestock) {
        setAnimatingHubs((prev) => new Set([...prev, hubToRestock.id]))

        setTimeout(() => {
          setHubs((prev) =>
            prev.map((hub) =>
              hub.id === hubToRestock.id
                ? {
                    ...hub,
                    inventory: Object.fromEntries(
                      Object.entries(hub.inventory).map(([type, count]) => [
                        type,
                        Math.min(hub.capacity / 8, count + Math.floor(Math.random() * 3)),
                      ]),
                    ),
                  }
                : hub,
            ),
          )
          setAnimatingHubs((prev) => {
            const newSet = new Set(prev)
            newSet.delete(hubToRestock.id)
            return newSet
          })
        }, 2000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [hubs])

  const getTotalUnits = (inventory: Record<string, number>) => {
    return Object.values(inventory).reduce((sum, count) => sum + count, 0)
  }

  const getCapacityPercentage = (inventory: Record<string, number>, capacity: number) => {
    return (getTotalUnits(inventory) / capacity) * 100
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-green-100 text-green-800 border-green-200"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "restocking":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTemperatureStatus = (temp: number) => {
    if (temp < 2 || temp > 6) return "text-red-600"
    if (temp < 3 || temp > 5) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <Card className={`h-[450px] ${isDisasterMode ? "border-red-500 bg-red-50 dark:bg-red-950" : ""}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Hub Inventory Status
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-80">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hubs.map((hub) => {
            const totalUnits = getTotalUnits(hub.inventory)
            const capacityPercentage = getCapacityPercentage(hub.inventory, hub.capacity)
            const isAnimating = animatingHubs.has(hub.id)

            return (
              <div
                key={hub.id}
                className={`p-4 rounded-lg border transition-all ${
                  isAnimating
                    ? "border-blue-300 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700"
                } ${isDisasterMode && hub.status === "critical" ? "animate-pulse border-red-500" : ""}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{hub.name}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getStatusColor(hub.status)}`}>{hub.status}</Badge>
                    {hub.status === "critical" && <AlertTriangle className="w-4 h-4 text-red-600" />}
                    {isAnimating && <TrendingUp className="w-4 h-4 text-blue-600 animate-pulse" />}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {totalUnits}/{hub.capacity} units
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className={`w-4 h-4 ${getTemperatureStatus(hub.temperature)}`} />
                    <span className={`text-sm ${getTemperatureStatus(hub.temperature)}`}>{hub.temperature}°C</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Capacity</span>
                    <span>{Math.round(capacityPercentage)}%</span>
                  </div>
                  <Progress value={capacityPercentage} className={`h-2 ${isAnimating ? "animate-pulse" : ""}`} />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {bloodTypes.map((type) => (
                    <div
                      key={type}
                      className={`text-center p-2 rounded border ${
                        hub.inventory[type] === 0
                          ? "bg-red-50 border-red-200 text-red-800"
                          : hub.inventory[type] < 5
                            ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                            : "bg-green-50 border-green-200 text-green-800"
                      }`}
                    >
                      <div className="text-xs font-medium">{type}</div>
                      <div className={`text-sm font-bold ${isAnimating ? "animate-pulse" : ""}`}>
                        {hub.inventory[type]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
