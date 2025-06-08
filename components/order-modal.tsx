"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Clock, AlertTriangle, CheckCircle } from "lucide-react"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
}

const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]
const urgencyLevels = [
  { value: "critical", label: "Critical (0-15 min)", color: "bg-red-100 text-red-800" },
  { value: "high", label: "High (15-60 min)", color: "bg-orange-100 text-orange-800" },
  { value: "medium", label: "Medium (1-4 hours)", color: "bg-yellow-100 text-yellow-800" },
  { value: "low", label: "Low (4+ hours)", color: "bg-green-100 text-green-800" },
]

const hospitals = [
  "Lagos University Teaching Hospital",
  "National Orthopedic Hospital",
  "Lagos State University Teaching Hospital",
  "Gbagada General Hospital",
  "Ikorodu General Hospital",
  "Lagos Island Maternity Hospital",
  "Mainland Hospital",
  "General Hospital Ikeja",
]

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [formData, setFormData] = useState({
    bloodType: "",
    quantity: "",
    hospital: "",
    urgency: "",
    notes: "",
    patientId: "",
    requestedBy: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({
        bloodType: "",
        quantity: "",
        hospital: "",
        urgency: "",
        notes: "",
        patientId: "",
        requestedBy: "",
      })
    }, 3000)
  }

  const getEstimatedDelivery = () => {
    if (!formData.urgency || !formData.hospital) return null

    const baseTime =
      {
        critical: 15,
        high: 30,
        medium: 60,
        low: 120,
      }[formData.urgency] || 60

    return baseTime + Math.floor(Math.random() * 10)
  }

  const estimatedTime = getEstimatedDelivery()

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Order Placed Successfully!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your blood order has been received and a drone has been assigned.
            </p>
            <Badge className="bg-green-100 text-green-800">
              Order ID: CW-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </Badge>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Estimated delivery: {estimatedTime} minutes
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-600" />
            Place Blood Order
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Blood Type */}
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type *</Label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, bloodType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  {bloodTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (units) *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="20"
                value={formData.quantity}
                onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                placeholder="Enter quantity"
              />
            </div>

            {/* Hospital */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="hospital">Destination Hospital *</Label>
              <Select
                value={formData.hospital}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, hospital: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select hospital" />
                </SelectTrigger>
                <SelectContent>
                  {hospitals.map((hospital) => (
                    <SelectItem key={hospital} value={hospital}>
                      {hospital}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Urgency */}
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level *</Label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${level.color}`}>{level.label}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Patient ID */}
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                value={formData.patientId}
                onChange={(e) => setFormData((prev) => ({ ...prev, patientId: e.target.value }))}
                placeholder="Enter patient ID"
              />
            </div>

            {/* Requested By */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="requestedBy">Requested By *</Label>
              <Input
                id="requestedBy"
                value={formData.requestedBy}
                onChange={(e) => setFormData((prev) => ({ ...prev, requestedBy: e.target.value }))}
                placeholder="Doctor name or department"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Any special instructions or medical notes..."
                rows={3}
              />
            </div>
          </div>

          {/* Estimated Delivery */}
          {estimatedTime && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900 dark:text-blue-100">Estimated Delivery Time</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{estimatedTime} minutes</div>
              <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Based on current traffic and drone availability
              </div>
            </div>
          )}

          {/* Warning for critical orders */}
          {formData.urgency === "critical" && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-900 dark:text-red-100">Critical Order Alert</span>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                This order will be prioritized and all available drones will be considered for immediate dispatch.
              </p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700"
              disabled={
                !formData.bloodType ||
                !formData.quantity ||
                !formData.hospital ||
                !formData.urgency ||
                !formData.requestedBy ||
                isSubmitting
              }
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
