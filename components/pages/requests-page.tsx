"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Clock, AlertTriangle, CheckCircle, Search, Filter, Plus, User } from "lucide-react"

interface RequestsPageProps {
  isDisasterMode: boolean
}

const requestData = [
  {
    id: "REQ-001",
    hospital: "Lagos University Teaching Hospital",
    bloodType: "O+",
    quantity: 4,
    urgency: "critical",
    timeLeft: 15,
    status: "pending",
    requestedBy: "Dr. Adebayo Okafor",
    patientId: "PT-12345",
    reason: "Emergency surgery",
    createdAt: "2024-01-20 14:30",
    estimatedDelivery: "2024-01-20 15:00",
  },
  {
    id: "REQ-002",
    hospital: "National Orthopedic Hospital",
    bloodType: "A-",
    quantity: 2,
    urgency: "high",
    timeLeft: 45,
    status: "assigned",
    requestedBy: "Dr. Funmi Adeyemi",
    patientId: "PT-12346",
    reason: "Orthopedic surgery",
    createdAt: "2024-01-20 13:45",
    estimatedDelivery: "2024-01-20 15:15",
    assignedDrone: "CW-002",
  },
  {
    id: "REQ-003",
    hospital: "Gbagada General Hospital",
    bloodType: "B+",
    quantity: 6,
    urgency: "medium",
    timeLeft: 120,
    status: "pending",
    requestedBy: "Dr. Tunde Bakare",
    patientId: "PT-12347",
    reason: "Blood transfusion",
    createdAt: "2024-01-20 12:30",
    estimatedDelivery: "2024-01-20 16:30",
  },
  {
    id: "REQ-004",
    hospital: "Lagos State University Teaching Hospital",
    bloodType: "AB+",
    quantity: 1,
    urgency: "high",
    timeLeft: 30,
    status: "in-transit",
    requestedBy: "Dr. Kemi Ogundimu",
    patientId: "PT-12348",
    reason: "Emergency transfusion",
    createdAt: "2024-01-20 14:00",
    estimatedDelivery: "2024-01-20 14:45",
    assignedDrone: "CW-001",
    progress: 65,
  },
  {
    id: "REQ-005",
    hospital: "Ikorodu General Hospital",
    bloodType: "O-",
    quantity: 3,
    urgency: "critical",
    timeLeft: 8,
    status: "pending",
    requestedBy: "Dr. Bola Adesanya",
    patientId: "PT-12349",
    reason: "Trauma surgery",
    createdAt: "2024-01-20 14:45",
    estimatedDelivery: "2024-01-20 15:05",
  },
  {
    id: "REQ-006",
    hospital: "Lagos Island Maternity Hospital",
    bloodType: "A+",
    quantity: 2,
    urgency: "medium",
    timeLeft: 90,
    status: "completed",
    requestedBy: "Dr. Aisha Mohammed",
    patientId: "PT-12350",
    reason: "Postpartum hemorrhage",
    createdAt: "2024-01-20 11:30",
    estimatedDelivery: "2024-01-20 13:30",
    completedAt: "2024-01-20 13:25",
    assignedDrone: "CW-003",
  },
]

export function RequestsPage({ isDisasterMode }: RequestsPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [requests, setRequests] = useState(requestData)

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests((prev) =>
        prev.map((req) => ({
          ...req,
          timeLeft:
            req.status === "pending" || req.status === "assigned" ? Math.max(0, req.timeLeft - 1) : req.timeLeft,
        })),
      )
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesUrgency = urgencyFilter === "all" || request.urgency === urgencyFilter
    return matchesSearch && matchesStatus && matchesUrgency
  })

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "assigned":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in-transit":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "assigned":
        return <AlertTriangle className="w-4 h-4" />
      case "in-transit":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const formatTimeLeft = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const statusCounts = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    assigned: requests.filter((r) => r.status === "assigned").length,
    inTransit: requests.filter((r) => r.status === "in-transit").length,
    completed: requests.filter((r) => r.status === "completed").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blood Requests</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor and manage all blood delivery requests</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Requests</p>
                <p className="text-2xl font-bold">{statusCounts.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-gray-600">{statusCounts.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Assigned</p>
                <p className="text-2xl font-bold text-blue-600">{statusCounts.assigned}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">In Transit</p>
                <p className="text-2xl font-bold text-purple-600">{statusCounts.inTransit}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.completed}</p>
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
                  placeholder="Search requests by ID, hospital, or doctor..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-transit">In Transit</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-48">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card
            key={request.id}
            className={`${isDisasterMode && request.urgency === "critical" ? "border-red-500 animate-pulse" : ""}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{request.id}</h3>
                    <Badge className={`${getUrgencyColor(request.urgency)}`}>{request.urgency}</Badge>
                    <Badge className={`${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1">{request.status}</span>
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{request.hospital}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600 mb-1">{request.bloodType}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{request.quantity} units</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium">Requested by</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{request.requestedBy}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium">Patient ID</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{request.patientId}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium">Created</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{request.createdAt}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
                <p className="text-sm">
                  <strong>Reason:</strong> {request.reason}
                </p>
              </div>

              {request.status === "in-transit" && request.progress && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Delivery Progress</span>
                    <span>{request.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${request.progress}%` }}
                    ></div>
                  </div>
                  {request.assignedDrone && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Assigned to: {request.assignedDrone}
                    </p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {request.status !== "completed" && (
                    <div
                      className={`text-sm font-medium ${
                        request.timeLeft < 30 ? "text-red-600" : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {request.timeLeft < 30 && <AlertTriangle className="w-4 h-4 inline mr-1" />}
                      {formatTimeLeft(request.timeLeft)} remaining
                    </div>
                  )}
                  {request.completedAt && (
                    <div className="text-sm text-green-600">Completed: {request.completedAt}</div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {request.status === "pending" && (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Assign Drone
                    </Button>
                  )}
                  {request.status === "assigned" && (
                    <Button size="sm" variant="outline">
                      Track Delivery
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
