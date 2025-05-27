'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Order {
  id: string
  items: string[]
  status: 'pending' | 'preparing' | 'ready' | 'completed'
  timestamp: string
}

export default function StaffDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState<'pending' | 'preparing' | 'ready'>('pending')

  useEffect(() => {
    // In a real app, this would be an API call
    setOrders([
      {
        id: '1',
        items: ['Cappuccino', 'Croissant'],
        status: 'pending',
        timestamp: '2024-03-20T10:30:00'
      },
      {
        id: '2',
        items: ['Latte', 'Chocolate Cake'],
        status: 'preparing',
        timestamp: '2024-03-20T10:25:00'
      },
      {
        id: '3',
        items: ['Espresso', 'Sandwich'],
        status: 'ready',
        timestamp: '2024-03-20T10:20:00'
      }
    ])
  }, [])

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const filteredOrders = orders.filter(order => order.status === activeTab)

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Staff Dashboard</h1>
        
        <div className="flex space-x-4 mb-8">
          <Button
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </Button>
          <Button
            variant={activeTab === 'preparing' ? 'default' : 'outline'}
            onClick={() => setActiveTab('preparing')}
          >
            Preparing
          </Button>
          <Button
            variant={activeTab === 'ready' ? 'default' : 'outline'}
            onClick={() => setActiveTab('ready')}
          >
            Ready
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map(order => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle>Order #{order.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Items:</h3>
                    <ul className="list-disc list-inside">
                      {order.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {new Date(order.timestamp).toLocaleTimeString()}
                  </div>
                  
                  <div className="flex space-x-2">
                    {order.status === 'pending' && (
                      <Button
                        onClick={() => handleStatusChange(order.id, 'preparing')}
                        className="w-full"
                      >
                        Start Preparing
                      </Button>
                    )}
                    {order.status === 'preparing' && (
                      <Button
                        onClick={() => handleStatusChange(order.id, 'ready')}
                        className="w-full"
                      >
                        Mark Ready
                      </Button>
                    )}
                    {order.status === 'ready' && (
                      <Button
                        onClick={() => handleStatusChange(order.id, 'completed')}
                        className="w-full"
                      >
                        Complete Order
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
} 