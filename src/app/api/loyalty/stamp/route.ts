import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId, qrCode } = await request.json()
    
    // Validate required fields
    if (!userId || !qrCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // In a real app, this would validate the QR code and update stamps in your database
    
    // Mock response
    const mockCurrentStamps = 3
    const mockNewStamps = mockCurrentStamps + 1
    
    return NextResponse.json({
      success: true,
      userId: userId,
      previousStamps: mockCurrentStamps,
      newStamps: mockNewStamps,
      reward: mockNewStamps >= 10 ? 'FREE_COFFEE' : (mockNewStamps >= 5 ? 'DISCOUNT_50' : null)
    })
  } catch (error) {
    console.error('Error processing stamp:', error)
    return NextResponse.json(
      { error: 'Failed to process stamp' },
      { status: 500 }
    )
  }
} 