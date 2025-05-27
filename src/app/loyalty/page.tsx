'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { QRCodeSVG } from 'qrcode.react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LoyaltyInfo {
  stamps: number
  nextReward: string
  stampsTillNextReward: number
}

export default function LoyaltyCard() {
  const [stamps, setStamps] = useState(0)
  const [rewards, setRewards] = useState<LoyaltyInfo>({
    stamps: 0,
    nextReward: 'Free Coffee',
    stampsTillNextReward: 3
  })

  useEffect(() => {
    // In a real app, this would be an API call
    setStamps(7)
    setRewards({
      stamps: 7,
      nextReward: 'Free Coffee',
      stampsTillNextReward: 3
    })
  }, [])

  const qrValue = 'user-123' // In a real app, this would be the user's unique ID

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Your Loyalty Card</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>QR Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG 
                    value={qrValue}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="text-muted-foreground mt-4 text-center">
                  Show this code to be scanned at checkout
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Stamps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4 mb-8">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-lg flex items-center justify-center text-2xl font-bold border-2 transition-colors ${
                      i < stamps 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-muted text-muted-foreground border-muted'
                    }`}
                  >
                    {i < stamps ? '✓' : ''}
                  </div>
                ))}
              </div>
              
              <div className="text-center space-y-2">
                <p className="font-semibold">Next reward: {rewards.nextReward}</p>
                {rewards.stampsTillNextReward > 0 && (
                  <p className="text-muted-foreground">
                    Only {rewards.stampsTillNextReward} more stamp{rewards.stampsTillNextReward !== 1 ? 's' : ''} to go!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
} 