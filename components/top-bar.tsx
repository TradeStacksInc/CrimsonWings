"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, Plus, Globe, AlertTriangle } from "lucide-react"

interface TopBarProps {
  isDisasterMode: boolean
  onToggleDisasterMode: () => void
  onOpenOrderModal: () => void
}

export function TopBar({ isDisasterMode, onToggleDisasterMode, onOpenOrderModal }: TopBarProps) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mission Control</h1>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            All Systems Operational
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          {/* Place Order Button */}
          <Button onClick={onOpenOrderModal} className="bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Place Order
          </Button>

          {/* Disaster Mode Toggle */}
          <Button variant={isDisasterMode ? "destructive" : "outline"} onClick={onToggleDisasterMode} className="gap-2">
            <AlertTriangle className="w-4 h-4" />
            {isDisasterMode ? "Exit" : "Disaster"} Mode
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                EN
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Yoruba</DropdownMenuItem>
              <DropdownMenuItem>Igbo</DropdownMenuItem>
              <DropdownMenuItem>Hausa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <ModeToggle />

          {/* Notifications */}
          <Button variant="outline" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-red-600 text-white text-xs">
              3
            </Badge>
          </Button>

          {/* User Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Dr. Adebayo Okafor</DropdownMenuItem>
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
