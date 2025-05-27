'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
}

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu')
      const data = await response.json()
      setItems(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching menu items:', error)
      setLoading(false)
    }
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
  }

  const handleSave = async (item: MenuItem) => {
    try {
      const response = await fetch(`/api/menu/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })

      if (response.ok) {
        fetchMenuItems()
        setEditingItem(null)
      }
    } catch (error) {
      console.error('Error updating menu item:', error)
    }
  }

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      const response = await fetch(`/api/menu/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: !item.available })
      })

      if (response.ok) {
        fetchMenuItems()
      }
    } catch (error) {
      console.error('Error toggling item availability:', error)
    }
  }

  return (
    <main className="min-h-screen">
      <Navigation isAdmin={true} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Menu Management</h1>
        
        {loading ? (
          <div className="text-center py-8">Loading menu items...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{item.name}</CardTitle>
                    <Switch
                      checked={item.available}
                      onCheckedChange={() => handleToggleAvailability(item)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => {
                            if (editingItem?.id === item.id) {
                              setEditingItem({ ...editingItem, description: e.target.value })
                            }
                          }}
                          disabled={editingItem?.id !== item.id}
                        />
                      </div>
                      
                      <div>
                        <Label>Price</Label>
                        <Input
                          type="number"
                          value={item.price}
                          onChange={(e) => {
                            if (editingItem?.id === item.id) {
                              setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })
                            }
                          }}
                          disabled={editingItem?.id !== item.id}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        {editingItem?.id === item.id ? (
                          <>
                            <Button
                              variant="default"
                              onClick={() => handleSave(editingItem)}
                            >
                              Save
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setEditingItem(null)}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
