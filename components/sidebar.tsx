"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Plane,
  Building2,
  FileText,
  Package,
  Brain,
  Settings,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Plane, label: "Drones", id: "drones" },
  { icon: Building2, label: "Hospitals", id: "hospitals" },
  { icon: FileText, label: "Requests", id: "requests" },
  { icon: Package, label: "Inventory", id: "inventory" },
  { icon: Brain, label: "AI Insights", id: "ai-insights" },
  { icon: Settings, label: "Settings", id: "settings" },
]

interface SidebarProps {
  activePage: string
  onPageChange: (pageId: string) => void
}

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && <span className="font-bold text-lg text-gray-900 dark:text-white">CrimsonWings</span>}
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.id
            return (
              <Button
                key={item.label}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-11",
                  isActive && "bg-red-600 hover:bg-red-700 text-white",
                  isCollapsed && "px-2",
                )}
                onClick={() => onPageChange(item.id)}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            )
          })}
        </nav>

        {/* Collapse Toggle */}
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="mt-8 w-full">
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Collapse
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
