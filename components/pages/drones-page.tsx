"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plane, Battery, MapPin, Clock, Search, Filter, Plus } from "lucide-react"

interface DronesPageProps {
  isDisasterMode: boolean
}

const droneData = [
  {
    id: "CW-001",
    name: "Crimson Eagle",
    status: "in-flight",
    battery: 85,
    location: "En route to LUTH",
    cargo: "O+ Blood (4 units)",
    lastMaintenance: "2024-01-15",
    flightTime: "23 min",
    destination: "Lagos University Teaching Hospital",
    speed: "45 km/h",
    altitude: "120m",
  },
  {
    id: "CW-002",
    name: "Life Saver",
    status: "charging",
    battery: 100,
    location: "Victoria Island Hub",
    cargo: "Empty",
    lastMaintenance: "2024-01-10",
    flightTime: "0 min",
    destination: "Standby",
    speed: "0 km/h",
    altitude: "0m",
  },
  {
    id: "CW-003",
    name: "Swift Wing",
    status: "in-flight",
    battery: 67,
    location: "En route to NOH",
    cargo: "A- Blood (2 units)",
    lastMaintenance: "2024-01-12",
    flightTime: "18 min",
    destination: "National Orthopedic Hospital",
    speed: "42 km/h",
    altitude: "115m",
  },
  {
    id: "CW-004",
    name: "Red Cross",
    status: "maintenance",
    battery: 0,
    location: "Ikeja Hub",
    cargo: "Empty",
    lastMaintenance: "2024-01-20",
    flightTime: "0 min",
    destination: "Maintenance Bay",
    speed: "0 km/h",
    altitude: "0m",
  },
  {
    id: "CW-005",
    name: "Guardian",
    status: "available",
    battery: 95,
    location: "Surulere Hub",
    cargo: "Empty",
    lastMaintenance: "2024-01-08",
    flightTime: "0 min",
    destination: "Standby",
    speed: "0 km/h",
    altitude: "0m",
  },
  {
    id: "CW-006",
    name: "Phoenix",
    status: "in-flight",
    battery: 72,
    location: "En route to GGH",
    cargo: "B+ Blood (6 units)",
    lastMaintenance: "2024-01-14",
    flightTime: "31 min",
    destination: "Gbagada General Hospital",
    speed: "38 km/h",
    altitude: "125m",
  },
]

export function DronesPage({ isDisasterMode }: DronesPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [drones, setDrones] = useState(droneData)

  const filteredDrones = drones.filter((drone) => {
    const matchesSearch =
      drone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drone.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || drone.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-flight":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "charging":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "maintenance":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getBatteryColor = (battery: number) => {
    if (battery > 70) return "text-green-600"
    if (battery > 30) return "text-yellow-600"
    return "text-red-600"
  }

  const statusCounts = {
    total: drones.length,
    inFlight: drones.filter((d) => d.status === "in-flight").length,
    available: drones.filter((d) => d.status === "available").length,
    charging: drones.filter((d) => d.status === "charging").length,
    maintenance: drones.filter((d) => d.status === "maintenance").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Drone Fleet Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor and manage your drone fleet operations</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Drone
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Drones</p>
                <p className="text-2xl font-bold">{statusCounts.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">In Flight</p>
                <p className="text-2xl font-bold text-blue-600">{statusCounts.inFlight}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.available}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Charging</p>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.charging}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Maintenance</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts.maintenance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search drones by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-flight">In Flight</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="charging">Charging</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Drones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrones.map((drone) => (
          <Card
            key={drone.id}
            className={`${isDisasterMode && drone.status === "in-flight" ? "border-red-500 animate-pulse" : ""}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{drone.name}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{drone.id}</p>
                </div>
                <Badge className={`${getStatusColor(drone.status)}`}>{drone.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Drone Image */}
              {drone.status === "in-flight" ? (
                <div className="relative h-40 w-full overflow-hidden rounded-md">
                  <img
                    src="/images/medical-drone-delivery.jpg"
                    alt={`${drone.name} in flight`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative h-40 w-full overflow-hidden rounded-md">
                  <img src="/images/drone-image.jpg" alt={`${drone.name}`} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Battery */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Battery className={`w-4 h-4 ${getBatteryColor(drone.battery)}`} />
                  <span className="text-sm">Battery</span>
                </div>
                <span className={`font-semibold ${getBatteryColor(drone.battery)}`}>{drone.battery}%</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-sm">{drone.location}</span>
              </div>

              {/* Cargo */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
                <span className="text-sm">{drone.cargo}</span>
              </div>

              {/* Flight Time */}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Flight time: {drone.flightTime}</span>
              </div>

              {/* Additional Info for In-Flight Drones */}
              {drone.status === "in-flight" && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-xs text-blue-800 dark:text-blue-200 mb-1">
                    <strong>Destination:</strong> {drone.destination}
                  </p>
                  <p className="text-xs text-blue-800 dark:text-blue-200 mb-1">
                    <strong>Speed:</strong> {drone.speed}
                  </p>
                  <p className="text-xs text-blue-800 dark:text-blue-200">
                    <strong>Altitude:</strong> {drone.altitude}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                {drone.status === "available" && (
                  <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                    Assign Mission
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
