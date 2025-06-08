"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, User, Bell, Shield, Database, Zap, Save, RefreshCw } from "lucide-react"

interface SettingsPageProps {
  isDisasterMode: boolean
}

export function SettingsPage({ isDisasterMode }: SettingsPageProps) {
  const [settings, setSettings] = useState({
    // User Profile
    name: "Dr. Adebayo Okafor",
    email: "adebayo.okafor@crimsonwings.ng",
    phone: "+234 801 234 5678",
    role: "Operations Manager",

    // Notifications
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    criticalAlerts: true,
    inventoryAlerts: true,
    deliveryUpdates: true,

    // System Preferences
    theme: "light",
    language: "en",
    timezone: "Africa/Lagos",
    autoRefresh: true,
    refreshInterval: "30",

    // Operational Settings
    defaultUrgencyLevel: "medium",
    maxDeliveryRadius: "50",
    minBatteryLevel: "20",
    temperatureThreshold: "4",

    // Security
    twoFactorAuth: true,
    sessionTimeout: "60",
    apiAccess: false,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Simulate saving settings
    console.log("Settings saved:", settings)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account and system preferences</p>
        </div>
        <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={settings.name} onChange={(e) => handleSettingChange("name", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleSettingChange("email", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleSettingChange("phone", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={settings.role} onValueChange={(value) => handleSettingChange("role", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                    <SelectItem value="Medical Director">Medical Director</SelectItem>
                    <SelectItem value="Logistics Coordinator">Logistics Coordinator</SelectItem>
                    <SelectItem value="System Administrator">System Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Dashboard
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Database className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Security Audit
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch
                id="sms-notifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="critical-alerts">Critical Alerts</Label>
              <Switch
                id="critical-alerts"
                checked={settings.criticalAlerts}
                onCheckedChange={(checked) => handleSettingChange("criticalAlerts", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="inventory-alerts">Inventory Alerts</Label>
              <Switch
                id="inventory-alerts"
                checked={settings.inventoryAlerts}
                onCheckedChange={(checked) => handleSettingChange("inventoryAlerts", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="delivery-updates">Delivery Updates</Label>
              <Switch
                id="delivery-updates"
                checked={settings.deliveryUpdates}
                onCheckedChange={(checked) => handleSettingChange("deliveryUpdates", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              System Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="theme">Theme</Label>
              <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="yo">Yoruba</SelectItem>
                  <SelectItem value="ig">Igbo</SelectItem>
                  <SelectItem value="ha">Hausa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-refresh">Auto Refresh</Label>
              <Switch
                id="auto-refresh"
                checked={settings.autoRefresh}
                onCheckedChange={(checked) => handleSettingChange("autoRefresh", checked)}
              />
            </div>
            {settings.autoRefresh && (
              <div>
                <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                <Input
                  id="refresh-interval"
                  type="number"
                  value={settings.refreshInterval}
                  onChange={(e) => handleSettingChange("refreshInterval", e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Operational Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Operational Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="default-urgency">Default Urgency Level</Label>
              <Select
                value={settings.defaultUrgencyLevel}
                onValueChange={(value) => handleSettingChange("defaultUrgencyLevel", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="max-delivery-radius">Max Delivery Radius (km)</Label>
              <Input
                id="max-delivery-radius"
                type="number"
                value={settings.maxDeliveryRadius}
                onChange={(e) => handleSettingChange("maxDeliveryRadius", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="min-battery">Min Battery Level (%)</Label>
              <Input
                id="min-battery"
                type="number"
                value={settings.minBatteryLevel}
                onChange={(e) => handleSettingChange("minBatteryLevel", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="temperature-threshold">Temperature Threshold (°C)</Label>
              <Input
                id="temperature-threshold"
                type="number"
                step="0.1"
                value={settings.temperatureThreshold}
                onChange={(e) => handleSettingChange("temperatureThreshold", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <Switch
                  id="two-factor"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                />
              </div>
              <div>
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="api-access">API Access</Label>
                <Switch
                  id="api-access"
                  checked={settings.apiAccess}
                  onCheckedChange={(checked) => handleSettingChange("apiAccess", checked)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Recent Security Events</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Last login</span>
                  <span className="text-gray-600">2024-01-20 14:30</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Password changed</span>
                  <span className="text-gray-600">2024-01-15 09:15</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>2FA enabled</span>
                  <span className="text-gray-600">2024-01-10 16:45</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Security Status</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Password Strong
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    2FA Enabled
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Account Verified
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
