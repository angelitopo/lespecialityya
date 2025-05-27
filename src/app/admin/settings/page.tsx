'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

interface Settings {
  storeName: string
  storeHours: {
    open: string
    close: string
  }
  notifications: {
    email: boolean
    sms: boolean
  }
  taxRate: number
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({
    storeName: 'Ghibli Café',
    storeHours: {
      open: '08:00',
      close: '20:00'
    },
    notifications: {
      email: true,
      sms: false
    },
    taxRate: 0.21
  })

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        toast({
          title: "Settings saved",
          description: "Your settings have been updated successfully.",
        })
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation isAdmin={true} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Settings</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Store Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  value={settings.storeName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, storeName: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Store Hours</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="time"
                    value={settings.storeHours.open}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({
                      ...settings,
                      storeHours: { ...settings.storeHours, open: e.target.value }
                    })}
                  />
                  <span>to</span>
                  <Input
                    type="time"
                    value={settings.storeHours.close}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({
                      ...settings,
                      storeHours: { ...settings.storeHours, close: e.target.value }
                    })}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications" className="cursor-pointer">
                      Email Notifications
                    </Label>
                    <Switch
                      id="emailNotifications"
                      checked={settings.notifications.email}
                      onCheckedChange={(checked: boolean) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, email: checked }
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsNotifications" className="cursor-pointer">
                      SMS Notifications
                    </Label>
                    <Switch
                      id="smsNotifications"
                      checked={settings.notifications.sms}
                      onCheckedChange={(checked: boolean) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, sms: checked }
                      })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  value={settings.taxRate * 100}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({
                    ...settings,
                    taxRate: parseFloat(e.target.value) / 100
                  })}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              
              <Button
                className="w-full"
                onClick={handleSave}
              >
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
