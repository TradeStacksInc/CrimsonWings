"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, AlertTriangle, MapPin, Clock, CheckCircle } from "lucide-react"

interface AIRecommendationsProps {
  isDisasterMode: boolean
}

const recommendations = [
  {
    id: "rec1",
    type: "demand",
    priority: "high",
    title: "High O+ Demand in Ikeja",
    description: "Predicted 40% increase in O+ requests in next 2 hours",
    action: "Redistribute 15 units from Surulere Hub",
    confidence: 87,
    timeframe: "2 hours",
    icon: TrendingUp,
  },
  {
    id: "rec2",
    type: "shortage",
    priority: "critical",
    title: "Low AB- in Surulere",
    description: "Only 2 units remaining, below safety threshold",
    action: "Emergency restock from Victoria Island Hub",
    confidence: 95,
    timeframe: "30 minutes",
    icon: AlertTriangle,
  },
  {
    id: "rec3",
    type: "optimization",
    priority: "medium",
    title: "Reassign Drone #4 to Mainland Hub",
    description: "Route optimization suggests 23% faster delivery times",
    action: "Update drone assignment protocol",
    confidence: 73,
    timeframe: "1 hour",
    icon: MapPin,
  },
  {
    id: "rec4",
    type: "maintenance",
    priority: "low",
    title: "Scheduled Maintenance Window",
    description: "Optimal time for Hub 2 maintenance: 2:00-4:00 AM",
    action: "Schedule maintenance during low-demand period",
    confidence: 91,
    timeframe: "6 hours",
    icon: Clock,
  },
  {
    id: "rec5",
    type: "efficiency",
    priority: "medium",
    title: "Batch Delivery Opportunity",
    description: "Combine 3 nearby requests for 35% efficiency gain",
    action: "Group deliveries to Mainland area",
    confidence: 82,
    timeframe: "45 minutes",
    icon: CheckCircle,
  },
]

export function AIRecommendations({ isDisasterMode }: AIRecommendationsProps) {
  const [currentRecommendations, setCurrentRecommendations] = useState(recommendations)
  const [implementedIds, setImplementedIds] = useState<Set<string>>(new Set())
  const [newRecommendation, setNewRecommendation] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new recommendations appearing
      if (Math.random() > 0.7) {
        const newRec = {
          id: `rec${Date.now()}`,
          type: "alert",
          priority: isDisasterMode ? "critical" : "medium",
          title: isDisasterMode ? "Emergency Blood Request" : "Traffic Delay Alert",
          description: isDisasterMode
            ? "Mass casualty event reported - immediate blood supply needed"
            : "Heavy traffic on Lagos-Ibadan expressway affecting delivery times",
          action: isDisasterMode ? "Activate all available drones immediately" : "Reroute drones via alternative paths",
          confidence: 98,
          timeframe: "immediate",
          icon: AlertTriangle,
        }

        setNewRecommendation(newRec.id)
        setCurrentRecommendations((prev) => [newRec, ...prev.slice(0, 4)])

        setTimeout(() => setNewRecommendation(null), 3000)
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [isDisasterMode])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "demand":
        return "text-blue-600"
      case "shortage":
        return "text-red-600"
      case "optimization":
        return "text-purple-600"
      case "maintenance":
        return "text-gray-600"
      case "efficiency":
        return "text-green-600"
      case "alert":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  const handleImplement = (id: string) => {
    setImplementedIds((prev) => new Set([...prev, id]))
    setTimeout(() => {
      setCurrentRecommendations((prev) => prev.filter((rec) => rec.id !== id))
      setImplementedIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }, 2000)
  }

  return (
    <Card className={`h-[400px] ${isDisasterMode ? "border-red-500 bg-red-50 dark:bg-red-950" : ""}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Recommendations
          </CardTitle>
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            ML Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 overflow-y-auto max-h-64">
        {currentRecommendations.map((rec) => {
          const Icon = rec.icon
          const isImplemented = implementedIds.has(rec.id)
          const isNew = newRecommendation === rec.id

          return (
            <div
              key={rec.id}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                isNew
                  ? "border-blue-300 bg-blue-50 dark:bg-blue-900/20 animate-pulse"
                  : isImplemented
                    ? "border-green-300 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              } ${isDisasterMode && rec.priority === "critical" ? "border-red-500 animate-pulse" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getTypeColor(rec.type)} bg-opacity-10`}>
                  <Icon className={`w-4 h-4 ${getTypeColor(rec.type)}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{rec.title}</h4>
                    <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>{rec.priority}</Badge>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{rec.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-gray-500">
                      Confidence: {rec.confidence}% • {rec.timeframe}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{rec.action}</p>

                    {!isImplemented ? (
                      <Button
                        size="sm"
                        onClick={() => handleImplement(rec.id)}
                        className="bg-purple-600 hover:bg-purple-700 text-xs"
                      >
                        Implement
                      </Button>
                    ) : (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs">Implemented</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
