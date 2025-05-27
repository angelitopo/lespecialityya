'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NewsItem {
  id: number
  title: string
  content: string
  date: string
}

export default function Home() {
  const [balance, setBalance] = useState(0)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    setBalance(25.50)
    setNewsItems([
      {
        id: 1,
        title: 'New Menu Items',
        content: 'We\'ve added some exciting new items to our menu, including the Totoro Matcha Latte and Kiki\'s Chocolate Cake!',
        date: '2024-03-15'
      },
      {
        id: 2,
        title: 'Extended Hours',
        content: 'We\'re now open until 8 PM on weekdays to serve you better!',
        date: '2024-03-14'
      }
    ])
  }, [])

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">€{balance.toFixed(2)}</div>
            <Button>Top Up</Button>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Café Updates</h2>
          <div className="space-y-4">
            {newsItems.map(item => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{item.content}</p>
                  <small className="text-muted-foreground">{item.date}</small>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="decorative-cloud top-left">
          <Image 
            src="/images/cloud.png" 
            alt="Decorative cloud" 
            width={128}
            height={128}
            className="w-32 h-auto"
          />
        </div>
        <div className="decorative-cloud top-right">
          <Image 
            src="/images/cloud.png" 
            alt="Decorative cloud" 
            width={96}
            height={96}
            className="w-24 h-auto"
          />
        </div>
      </div>
    </main>
  )
}
