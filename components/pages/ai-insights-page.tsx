"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, MapPin, Clock, CheckCircle, BarChart3, Target, Zap } from "lucide-react"

interface AIInsightsPageProps {
  isDisasterMode: boolean
}

const insights = [
  {
    id: "insight1",
    category: "demand-prediction",
    title: "O+ Blood Demand Surge Predicted",
    description: "AI models predict 45% increase in O+ blood requests in Ikeja area over next 6 hours",
    confidence: 92,
    impact: "high",
    timeframe: "Next 6 hours",
    recommendation: "Preposition 20 additional O+ units to Ikeja Hub",
    status: "active",
    createdAt: "2024-01-20 14:30",
  },
  {
    id: "insight2",
    category: "route-optimization",
    title: "Traffic Pattern Analysis",
    description: "Lagos-Ibadan expressway congestion will affect delivery times by 35%",
    confidence: 88,
    impact: "medium",
    timeframe: "Next 4 hours",
    recommendation: "Reroute drones via alternative flight paths",
    status: "implemented",
    createdAt: "2024-01-20 13:45",
  },
  {
    id: "insight3",
    category: "inventory-optimization",
    title: "AB- Blood Shortage Alert",
    description: "Critical shortage of AB- blood detected across 3 hubs",
    confidence: 96,
    impact: "critical",
    timeframe: "Immediate",
    recommendation: "Emergency procurement from Lagos State Blood Bank",
    status: "pending",
    createdAt: "2024-01-20 14:45",
  },
  {
    id: "insight4",
    category: "efficiency",
    title: "Batch Delivery Opportunity",
    description: "5 nearby requests can be combined for 40% efficiency improvement",
    confidence: 84,
    impact: "medium",
    timeframe: "Next 2 hours",
    recommendation: "Group deliveries to Victoria Island area",
    status: "active",
    createdAt: "2024-01-20 14:15",
  },
]

const performanceMetrics = [
  { label: "Prediction Accuracy", value: 94, trend: "+2.3%" },
  { label: "Route Optimization", value: 87, trend: "+5.1%" },
  { label: "Demand Forecasting", value: 91, trend: "+1.8%" },
  { label: "Inventory Optimization", value: 89, trend: "+3.2%" },
]

export function AIInsightsPage({ isDisasterMode }: AIInsightsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [implementedInsights, setImplementedInsights] = useState<Set<string>>(new Set())

  const categories = [
    { value: "all", label: "All Insights" },
    { value: "demand-prediction", label: "Demand Prediction" },
    { value: "route-optimization", label: "Route Optimization" },
    { value: "inventory-optimization", label: "Inventory" },
    { value: "efficiency", label: "Efficiency" },
  ]

  const filteredInsights =
    selectedCategory === "all" ? insights : insights.filter((insight) => insight.category === selectedCategory)

  const getImpactColor = (impact: string) => {
    switch (impact) {
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
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "implemented":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "demand-prediction":
        return <TrendingUp className="w-4 h-4" />
      case "route-optimization":
        return <MapPin className="w-4 h-4" />
      case "inventory-optimization":
        return <BarChart3 className="w-4 h-4" />
      case "efficiency":
        return <Target className="w-4 h-4" />
      default:
        return <Brain className="w-4 h-4" />
    }
  }

  const handleImplement = (insightId: string) => {
    setImplementedInsights((prev) => new Set([...prev, insightId]))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Insights & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Machine learning powered insights for optimal operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            <Zap className="w-4 h-4 mr-1" />
            Real-time ML
          </Badge>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                <span className="text-xs text-green-600 font-medium">{metric.trend}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Progress value={metric.value} className="h-2" />
                </div>
                <span className="text-lg font-bold">{metric.value}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className={selectedCategory === category.value ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <div className="space-y-4">
        {filteredInsights.map((insight) => {
          const isImplemented = implementedInsights.has(insight.id)

          return (
            <Card
              key={insight.id}
              className={`${isDisasterMode && insight.impact === "critical" ? "border-red-500 animate-pulse" : ""}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                      {getCategoryIcon(insight.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{insight.title}</h3>
                        <Badge className={`${getImpactColor(insight.impact)}`}>{insight.impact}</Badge>
                        <Badge className={`${getStatusColor(insight.status)}`}>{insight.status}</Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{insight.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confidence</p>
                          <div className="flex items-center gap-2">
                            <Progress value={insight.confidence} className="h-2 flex-1" />
                            <span className="text-sm font-semibold">{insight.confidence}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timeframe</p>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">{insight.timeframe}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Created</p>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{insight.createdAt}</span>
                        </div>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg mb-4">
                        <p className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-1">
                          Recommended Action:
                        </p>
                        <p className="text-sm text-purple-800 dark:text-purple-200">{insight.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Category: {insight.category.replace("-", " ")}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {insight.status === "active" && !isImplemented && (
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleImplement(insight.id)}
                      >
                        Implement
                      </Button>
                    )}
                    {isImplemented && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Implemented</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* AI Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Recent Predictions vs Actual</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Blood Demand Accuracy</span>
                  <span className="text-sm font-semibold text-green-600">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Delivery Time Prediction</span>
                  <span className="text-sm font-semibold text-green-600">91.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Inventory Optimization</span>
                  <span className="text-sm font-semibold text-green-600">89.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Route Efficiency</span>
                  <span className="text-sm font-semibold text-green-600">87.3%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Model Training Status</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Demand Prediction Model</span>
                    <span>Training...</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Route Optimization Model</span>
                    <span>Complete</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Inventory Model</span>
                    <span>Complete</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
