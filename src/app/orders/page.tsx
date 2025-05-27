'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  createdAt: string
  completedAt?: string
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchOrders()
  }, [])
  
  const fetchOrders = async () => {
    try {
      // In a real app, this would be an API call
      const mockOrders: Order[] = [
        {
          id: '1',
          items: [
            { id: '1', name: 'Ghibli Special Coffee', quantity: 2, price: 4.50 },
            { id: '3', name: 'Kiki\'s Chocolate Cake', quantity: 1, price: 6.50 }
          ],
          total: 15.50,
          status: 'completed',
          createdAt: '2024-03-15T10:30:00Z',
          completedAt: '2024-03-15T10:45:00Z'
        },
        {
          id: '2',
          items: [
            { id: '2', name: 'Totoro Matcha Latte', quantity: 1, price: 5.00 },
            { id: '4', name: 'Howl\'s Breakfast Set', quantity: 1, price: 12.00 }
          ],
          total: 17.00,
          status: 'preparing',
          createdAt: '2024-03-15T11:00:00Z'
        }
      ]
      
      setOrders(mockOrders)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching orders:', error)
      setLoading(false)
    }
  }
  
  const getStatusColor = (status: Order['status']) => {
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
  
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Order History</h1>
        
        {loading ? (
          <div className="text-center py-8">Loading orders...</div>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No orders found.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Order #{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Items:</h3>
                      <ul className="space-y-2">
                        {order.items.map(item => (
                          <li key={item.id} className="flex justify-between">
                            <span>
                              {item.name} x{item.quantity}
                            </span>
                            <span>€{(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold">€{order.total.toFixed(2)}</span>
                    </div>
                    
                    {order.completedAt && (
                      <p className="text-sm text-muted-foreground">
                        Completed on {formatDate(order.completedAt)}
                      </p>
                    )}
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