import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const { amount, currency, description, return_url } = await request.json()
    
    // Validate required fields
    if (!amount || !currency || !return_url) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // In a real app, you would call the SumUp API
    // For demo purposes, we'll create a mock checkout
    
    const checkout = {
      id: uuidv4(),
      checkout_reference: `TOPUP-${Date.now()}`,
      amount: amount,
      currency: currency,
      pay_to_email: 'cafe@example.com',
      merchant_code: 'GHIBLICAFE',
      description: description || `Top up ${amount} ${currency}`,
      return_url: return_url,
      status: 'PENDING',
      date: new Date().toISOString()
    }
    
    return NextResponse.json(checkout)
  } catch (error) {
    console.error('Error creating checkout:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout' },
      { status: 500 }
    )
  }
} 