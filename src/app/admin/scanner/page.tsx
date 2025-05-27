'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import QRScanner from '@/components/QRScanner'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null)

  const handleScan = (decodedText: string) => {
    setScanResult(decodedText)
  }

  const handleError = (errorMessage: string) => {
    console.error('Scanner error:', errorMessage)
    // You might want to show this error to the user via a toast or alert
  }

  return (
    <main className="min-h-screen">
      <Navigation isAdmin={true} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">QR Code Scanner</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Scan QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="scanner-container">
              <QRScanner 
                onScan={handleScan}
                onError={handleError}
                validateScan={(text) => {
                  // Add your validation logic here
                  // For example, check if it's a valid user ID format
                  return text.startsWith('user-')
                }}
              />
              
              {scanResult && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h2 className="text-lg font-semibold mb-2">Scan Result:</h2>
                  <p className="text-sm">{scanResult}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
