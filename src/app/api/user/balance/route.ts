import { NextResponse } from 'next/server'

export async function GET() {
  // In a real app, this would query your database
  // For demo purposes, we'll return mock data
  return NextResponse.json({
    balance: 25.50,
    currency: 'EUR'
  })
}

export async function POST(request: Request) {
  try {
    const { amount } = await request.json()
    
    if (!amount) {
      return NextResponse.json(
        { error: 'Amount is required' },
        { status: 400 }
      )
    }
    
    // In a real app, this would update the user's balance in your database
    
    // Mock response
    return NextResponse.json({
      success: true,
      newBalance: 25.50 + parseFloat(amount),
      currency: 'EUR'
    })
  } catch (error) {
    console.error('Error updating balance:', error)
    return NextResponse.json(
      { error: 'Failed to update balance' },
      { status: 500 }
    )
  }
} 