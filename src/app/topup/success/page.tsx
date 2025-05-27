'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TopUpSuccess() {
  const [balance, setBalance] = useState(0)
  const router = useRouter()
  
  useEffect(() => {
    // Fetch updated balance
    fetchBalance()
    
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [router])
  
  const fetchBalance = async () => {
    try {
      const response = await fetch('/api/user/balance')
      const data = await response.json()
      setBalance(data.balance)
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }
  
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Top Up Successful!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Your New Balance</h2>
                <div className="text-4xl font-bold">€{balance.toFixed(2)}</div>
              </div>
              
              <p className="text-muted-foreground">
                Redirecting to home page in 5 seconds...
              </p>
              
              <Button
                className="w-full"
                onClick={() => router.push('/')}
              >
                Return Home Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 