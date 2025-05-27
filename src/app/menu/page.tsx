'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
}

interface CartItem extends MenuItem {
  quantity: number
  notes?: string
}

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchMenuItems()
  }, [])
  
  const fetchMenuItems = async () => {
    try {
      // In a real app, this would be an API call
      const mockItems: MenuItem[] = [
        {
          id: '1',
          name: 'Ghibli Special Coffee',
          description: 'Our signature blend with notes of caramel and chocolate',
          price: 4.50,
          category: 'coffee',
          image: '/images/menu/coffee.jpg',
          available: true
        },
        {
          id: '2',
          name: 'Totoro Matcha Latte',
          description: 'Premium matcha with steamed milk and a touch of honey',
          price: 5.00,
          category: 'tea',
          image: '/images/menu/matcha.jpg',
          available: true
        },
        {
          id: '3',
          name: 'Kiki\'s Chocolate Cake',
          description: 'Rich chocolate cake with a magical twist',
          price: 6.50,
          category: 'dessert',
          image: '/images/menu/cake.jpg',
          available: true
        }
      ]
      
      setItems(mockItems)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching menu items:', error)
      setLoading(false)
    }
  }
  
  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }
  
  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }
  
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId)
      return
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }
  
  const categories = ['all', 'coffee', 'tea', 'dessert']
  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory)
  
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Our Menu</h1>
        
        <div className="flex space-x-4 mb-8">
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer capitalize"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        
        {loading ? (
          <div className="text-center py-8">Loading menu items...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <Card key={item.id} className={!item.available ? 'opacity-50' : ''}>
                <CardHeader>
                  <div className="relative aspect-video mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">€{item.price.toFixed(2)}</span>
                    {!item.available && (
                      <Badge variant="destructive">Unavailable</Badge>
                    )}
                  </div>
                  {item.available && (
                    <Button
                      className="w-full mt-4"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
          <div className="container mx-auto px-4 py-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">€{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold">€{cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <Button className="w-full">
                    Proceed to Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </main>
  )
} 