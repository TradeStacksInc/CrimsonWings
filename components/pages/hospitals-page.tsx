"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, MapPin, Phone, Clock, Search, Plus, Users } from "lucide-react"

interface HospitalsPageProps {
  isDisasterMode: boolean
}

const hospitalData = [
  {
    id: "HOSP-001",
    name: "Lagos University Teaching Hospital",
    address: "Idi-Araba, Surulere, Lagos",
    phone: "+234 1 234 5678",
    emergencyContact: "Dr. Adebayo Okafor",
    capacity: 850,
    currentPatients: 720,
    bloodBank: true,
    lastDelivery: "2 hours ago",
    totalDeliveries: 145,
    status: "active",
    coordinates: { lat: 6.5244, lng: 3.3792 },
    departments: ["Emergency", "Surgery", "ICU", "Pediatrics"],
  },
  {
    id: "HOSP-002",
    name: "National Orthopedic Hospital",
    address: "Igbobi, Lagos",
    phone: "+234 1 234 5679",
    emergencyContact: "Dr. Funmi Adeyemi",
    capacity: 400,
    currentPatients: 320,
    bloodBank: false,
    lastDelivery: "45 minutes ago",
    totalDeliveries: 89,
    status: "active",
    coordinates: { lat: 6.5244, lng: 3.3792 },
    departments: ["Orthopedics", "Surgery", "Rehabilitation"],
  },
  {
    id: "HOSP-003",
    name: "Lagos State University Teaching Hospital",
    address: "Ikeja, Lagos",
    phone: "+234 1 234 5680",
    emergencyContact: "Dr. Kemi Ogundimu",
    capacity: 600,
    currentPatients: 480,
    bloodBank: true,
    lastDelivery: "1 hour ago",
    totalDeliveries: 203,
    status: "active",
    coordinates: { lat: 6.5244, lng: 3.3792 },
    departments: ["Emergency", "Surgery", "ICU", "Maternity"],
  },
  {
    id: "HOSP-004",
    name: "Gbagada General Hospital",
    address: "Gbagada, Lagos",
    phone: "+234 1 234 5681",
    emergencyContact: "Dr. Tunde Bakare",
    capacity: 300,
    currentPatients: 250,
    bloodBank: false,
    lastDelivery: "3 hours ago",
    totalDeliveries: 67,
    status: "active",
    coordinates: { lat: 6.5244, lng: 3.3792 },
    departments: ["General Medicine", "Surgery", "Emergency"],
  },
  {
    id: "HOSP-005",
    name: "Ikorodu General Hospital",
    address: "Ikorodu, Lagos",
    phone: "+234 1 234 5682",
    emergencyContact: "Dr. Bola Adesanya",
    capacity: 250,
    currentPatients: 180,
    bloodBank: false,
    lastDelivery: "6 hours ago",
    totalDeliveries: 34,
    status: "active",
    coordinates: { lat: 6.5244, lng: 3.3792 },
    departments: ["General Medicine", "Pediatrics", "Emergency"],
  },
  {
    id: "HOSP-006",
    name: "Lagos Island Maternity Hospital",
    address: "Lagos Island, Lagos",
    phone: "+234 1 234 5683",
    emergencyContact: "Dr. Aisha Mohammed",
    capacity: 150,
    currentPatients: 120,
    bloodBank: false,
    lastDelivery: "4 hours ago",
    totalDeliveries: 78,
    status: "active",
    coordinates: { lat: 6.5244, lng: 3.3792 },
    departments: ["Maternity", "Neonatal", "Gynecology"],
  },
]

export function HospitalsPage({ isDisasterMode }: HospitalsPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [hospitals] = useState(hospitalData)

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getOccupancyColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100
    if (percentage > 90) return "text-red-600"
    if (percentage > 75) return "text-yellow-600"
    return "text-green-600"
  }

  const totalStats = {
    totalHospitals: hospitals.length,
    totalCapacity: hospitals.reduce((sum, h) => sum + h.capacity, 0),
    totalPatients: hospitals.reduce((sum, h) => sum + h.currentPatients, 0),
    totalDeliveries: hospitals.reduce((sum, h) => sum + h.totalDeliveries, 0),
    withBloodBank: hospitals.filter((h) => h.bloodBank).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hospital Network</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage partner hospitals and delivery locations</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Hospital
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Hospitals</p>
                <p className="text-2xl font-bold">{totalStats.totalHospitals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Capacity</p>
                <p className="text-2xl font-bold text-blue-600">{totalStats.totalCapacity.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Current Patients</p>
                <p className="text-2xl font-bold text-green-600">{totalStats.totalPatients.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-red-600 rounded"></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Deliveries</p>
                <p className="text-2xl font-bold text-red-600">{totalStats.totalDeliveries}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-purple-600 rounded"></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">With Blood Bank</p>
                <p className="text-2xl font-bold text-purple-600">{totalStats.withBloodBank}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search hospitals by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Hospitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.id} className={`${isDisasterMode ? "border-red-500" : ""}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{hospital.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {hospital.address}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {hospital.status}
                  </Badge>
                  {hospital.bloodBank && (
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                      Blood Bank
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{hospital.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">Contact: {hospital.emergencyContact}</span>
                </div>
              </div>

              {/* Capacity */}
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Capacity</span>
                  <span
                    className={`text-sm font-semibold ${getOccupancyColor(hospital.currentPatients, hospital.capacity)}`}
                  >
                    {hospital.currentPatients}/{hospital.capacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(hospital.currentPatients / hospital.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Departments */}
              <div>
                <p className="text-sm font-medium mb-2">Departments</p>
                <div className="flex flex-wrap gap-1">
                  {hospital.departments.map((dept) => (
                    <Badge key={dept} variant="outline" className="text-xs">
                      {dept}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Delivery Stats */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span>Last delivery: {hospital.lastDelivery}</span>
                </div>
                <span className="font-semibold text-red-600">{hospital.totalDeliveries} total deliveries</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                  Send Delivery
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
