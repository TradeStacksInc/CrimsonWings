"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Package, Thermometer, AlertTriangle, TrendingUp, Plus, RefreshCw } from "lucide-react"

interface InventoryPageProps {
  isDisasterMode: boolean
}

const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

const hubData = [
  {
    id: "hub1",
    name: "Victoria Island Hub",
    location: "Victoria Island, Lagos",
    capacity: 100,
    temperature: 4.2,
    status: "optimal",
    lastRestocked: "2024-01-20 08:00",
    manager: "Dr. Emeka Okafor",
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
    location: "Ikeja, Lagos",
    capacity: 80,
    temperature: 3.8,
    status: "low-stock",
    lastRestocked: "2024-01-19 14:30",
    manager: "Dr. Funmi Adeyemi",
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
    location: "Surulere, Lagos",
    capacity: 120,
    temperature: 4.1,
    status: "optimal",
    lastRestocked: "2024-01-20 06:00",
    manager: "Dr. Kemi Ogundimu",
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
    location: "Mainland, Lagos",
    capacity: 60,
    temperature: 4.5,
    status: "critical",
    lastRestocked: "2024-01-18 16:00",
    manager: "Dr. Tunde Bakare",
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
    location: "Lekki, Lagos",
    capacity: 90,
    temperature: 4.0,
    status: "restocking",
    lastRestocked: "2024-01-20 10:00",
    manager: "Dr. Bola Adesanya",
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

export function InventoryPage({ isDisasterMode }: InventoryPageProps) {
  const [hubs, setHubs] = useState(hubData)
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

  // Calculate overall stats
  const totalStats = {
    totalCapacity: hubs.reduce((sum, hub) => sum + hub.capacity, 0),
    totalUnits: hubs.reduce((sum, hub) => sum + getTotalUnits(hub.inventory), 0),
    criticalHubs: hubs.filter((hub) => hub.status === "critical").length,
    lowStockHubs: hubs.filter((hub) => hub.status === "low-stock").length,
  }

  // Calculate blood type totals
  const bloodTypeTotals = bloodTypes.reduce(
    (acc, type) => {
      acc[type] = hubs.reduce((sum, hub) => sum + hub.inventory[type], 0)
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inventory Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor blood inventory across all hubs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Request Restock
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Capacity</p>
                <p className="text-2xl font-bold">{totalStats.totalCapacity}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-red-600 rounded"></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Units</p>
                <p className="text-2xl font-bold text-red-600">{totalStats.totalUnits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Critical Hubs</p>
                <p className="text-2xl font-bold text-red-600">{totalStats.criticalHubs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-yellow-500 rounded"></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{totalStats.lowStockHubs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blood Type Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Blood Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {bloodTypes.map((type) => (
              <div key={type} className="text-center p-4 border rounded-lg">
                <div className="text-lg font-bold text-red-600 mb-1">{type}</div>
                <div className="text-2xl font-bold">{bloodTypeTotals[type]}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">units</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hub Details */}
      <div className="space-y-6">
        {hubs.map((hub) => {
          const totalUnits = getTotalUnits(hub.inventory)
          const capacityPercentage = getCapacityPercentage(hub.inventory, hub.capacity)
          const isAnimating = animatingHubs.has(hub.id)

          return (
            <Card
              key={hub.id}
              className={`${isDisasterMode && hub.status === "critical" ? "border-red-500 animate-pulse" : ""}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{hub.name}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-400">{hub.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(hub.status)}`}>{hub.status}</Badge>
                    {hub.status === "critical" && <AlertTriangle className="w-5 h-5 text-red-600" />}
                    {isAnimating && <TrendingUp className="w-5 h-5 text-blue-600 animate-pulse" />}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hub Info */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Manager</p>
                    <p className="font-medium">{hub.manager}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Capacity</p>
                    <p className="font-medium">
                      {totalUnits}/{hub.capacity} units
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Temperature</p>
                    <p className={`font-medium ${getTemperatureStatus(hub.temperature)}`}>
                      <Thermometer className="w-4 h-4 inline mr-1" />
                      {hub.temperature}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Restocked</p>
                    <p className="font-medium">{hub.lastRestocked}</p>
                  </div>
                </div>

                {/* Capacity Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Capacity Utilization</span>
                    <span>{Math.round(capacityPercentage)}%</span>
                  </div>
                  <Progress value={capacityPercentage} className={`h-3 ${isAnimating ? "animate-pulse" : ""}`} />
                </div>

                {/* Blood Type Inventory */}
                <div>
                  <h4 className="font-semibold mb-3">Blood Type Inventory</h4>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {bloodTypes.map((type) => (
                      <div
                        key={type}
                        className={`text-center p-3 rounded-lg border ${
                          hub.inventory[type] === 0
                            ? "bg-red-50 border-red-200 text-red-800"
                            : hub.inventory[type] < 5
                              ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                              : "bg-green-50 border-green-200 text-green-800"
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">{type}</div>
                        <div className={`text-lg font-bold ${isAnimating ? "animate-pulse" : ""}`}>
                          {hub.inventory[type]}
                        </div>
                        <div className="text-xs">units</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    Request Restock
                  </Button>
                  {hub.status === "critical" && (
                    <Button size="sm" variant="destructive">
                      Emergency Restock
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
