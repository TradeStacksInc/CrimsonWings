"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, AlertTriangle, CheckCircle, FileText } from "lucide-react"

interface HospitalRequestsProps {
  isDisasterMode: boolean
  onSelectRequest: (id: string) => void
  selectedRequest: string | null
}

const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

const initialRequests = [
  {
    id: "req1",
    hospital: "Lagos University Teaching Hospital",
    bloodType: "O+",
    quantity: 4,
    urgency: "critical",
    timeLeft: 15,
    status: "pending",
  },
  {
    id: "req2",
    hospital: "National Orthopedic Hospital",
    bloodType: "A-",
    quantity: 2,
    urgency: "high",
    timeLeft: 45,
    status: "assigned",
  },
  {
    id: "req3",
    hospital: "Gbagada General Hospital",
    bloodType: "B+",
    quantity: 6,
    urgency: "medium",
    timeLeft: 120,
    status: "pending",
  },
  {
    id: "req4",
    hospital: "Lagos State University Teaching Hospital",
    bloodType: "AB+",
    quantity: 1,
    urgency: "high",
    timeLeft: 30,
    status: "in-transit",
  },
  {
    id: "req5",
    hospital: "Ikorodu General Hospital",
    bloodType: "O-",
    quantity: 3,
    urgency: "critical",
    timeLeft: 8,
    status: "pending",
  },
]

export function HospitalRequests({ isDisasterMode, onSelectRequest, selectedRequest }: HospitalRequestsProps) {
  const [requests, setRequests] = useState(initialRequests)

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests((prev) =>
        prev.map((req) => ({
          ...req,
          timeLeft: Math.max(0, req.timeLeft - 1),
        })),
      )
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
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

  return (
    <Card className={`h-[400px] ${isDisasterMode ? "border-red-500 bg-red-50 dark:bg-red-950" : ""}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Hospital Requests
          </CardTitle>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {requests.filter((r) => r.status === "pending").length} Pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 overflow-y-auto max-h-64">
        {requests.map((request) => (
          <div
            key={request.id}
            className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
              selectedRequest === request.id
                ? "border-red-300 bg-red-50 dark:bg-red-900/20"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            } ${isDisasterMode && request.urgency === "critical" ? "animate-pulse border-red-500" : ""}`}
            onClick={() => onSelectRequest(request.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{request.hospital}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {request.bloodType}
                  </Badge>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{request.quantity} units</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge className={`text-xs ${getUrgencyColor(request.urgency)}`}>{request.urgency}</Badge>
                <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                  {getStatusIcon(request.status)}
                  {request.status}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div
                className={`text-sm font-medium ${
                  request.timeLeft < 30 ? "text-red-600" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {request.timeLeft < 30 && <AlertTriangle className="w-4 h-4 inline mr-1" />}
                {formatTimeLeft(request.timeLeft)} remaining
              </div>

              {request.status === "pending" && (
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-xs">
                  Assign Drone
                </Button>
              )}
            </div>

            {/* Progress bar for in-transit requests */}
            {request.status === "in-transit" && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">ETA: 12 minutes</div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
