'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
type TabValue = 'all' | OrderStatus

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: string
  completedAt?: string
  customerName?: string
  customerEmail?: string
}

const TAB_VALUES: TabValue[] = ['all', 'pending', 'preparing', 'ready'] as const

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<TabValue>('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching orders:', error)
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        fetchOrders()
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'preparing': return 'bg-blue-100 text-blue-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus)

  return (
    <main className="min-h-screen">
      <Navigation isAdmin={true} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Order Management</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {TAB_VALUES.map((value) => (
              <TabsTrigger 
                key={value}
                value={value} 
                onClick={() => setSelectedStatus(value)}
              >
                {value === 'all' ? 'All Orders' : value.charAt(0).toUpperCase() + value.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {TAB_VALUES.map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue}>
              {loading ? (
                <div className="text-center py-8">Loading orders...</div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No orders found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredOrders.map(order => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>Order #{order.id}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Placed on {formatDate(order.createdAt)}
                            </p>
                            {order.customerName && (
                              <p className="text-sm text-muted-foreground">
                                {order.customerName} ({order.customerEmail})
                              </p>
                            )}
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {order.items.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                              </div>
                              <p className="font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                          
                          <div className="border-t pt-4">
                            <div className="flex justify-between items-center">
                              <p className="font-medium">Total</p>
                              <p className="text-lg font-bold">€{order.total.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            {order.status === 'pending' && (
                              <Button
                                variant="default"
                                onClick={() => updateOrderStatus(order.id, 'preparing')}
                              >
                                Start Preparing
                              </Button>
                            )}
                            
                            {order.status === 'preparing' && (
                              <Button
                                variant="default"
                                onClick={() => updateOrderStatus(order.id, 'ready')}
                              >
                                Mark as Ready
                              </Button>
                            )}
                            
                            {order.status === 'ready' && (
                              <Button
                                variant="default"
                                onClick={() => updateOrderStatus(order.id, 'completed')}
                              >
                                Complete Order
                              </Button>
                            )}
                            
                            {order.status !== 'completed' && order.status !== 'cancelled' && (
                              <Button
                                variant="destructive"
                                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                              >
                                Cancel Order
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  )
}
