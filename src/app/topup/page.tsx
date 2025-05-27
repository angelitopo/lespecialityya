'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TopUp() {
  const [amount, setAmount] = useState(10)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const predefinedAmounts = [5, 10, 20, 50]
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value))
  }
  
  const handlePredefinedAmount = (value: number) => {
    setAmount(value)
  }
  
  const createCheckout = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: amount,
          currency: 'EUR',
          description: `Top up €${amount} - Ghibli Café`,
          return_url: window.location.origin + '/topup/success'
        })
      })
      
      const data = await response.json()
      
      if (data.id) {
        // In a real app, this would redirect to SumUp's payment page
        // For demo purposes, we'll just update the balance
        const balanceResponse = await fetch('/api/user/balance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount })
        })
        
        if (balanceResponse.ok) {
          router.push('/topup/success')
        }
      }
    } catch (error) {
      console.error('Error creating checkout:', error)
      alert('Failed to process payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Top Up Your Balance</h1>
        
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Select Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {predefinedAmounts.map((value) => (
                  <Button
                    key={value}
                    variant={amount === value ? 'default' : 'outline'}
                    onClick={() => handlePredefinedAmount(value)}
                    className="w-full"
                  >
                    €{value}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="custom-amount">Or enter custom amount:</Label>
                <Input
                  id="custom-amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
              
              <Button
                className="w-full"
                onClick={createCheckout}
                disabled={loading}
              >
                {loading ? 'Processing...' : `Top Up €${amount}`}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 