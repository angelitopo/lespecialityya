import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const status = searchParams.get('status')
  
  // In a real app, this would query your database
  // and filter by userId and/or status
  
  // Mock response
  const mockOrders = [
    { 
      id: 'ORD-1001', 
      userId: 'usr_12345',
      customer: 'John Doe', 
      items: [
        { name: 'Cappuccino', quantity: 1 },
        { name: 'Croissant', quantity: 2 }
      ],
      total: 12.50, 
      status: 'pending',
      orderTime: '2025-05-21T08:30:00Z'
    },
    { 
      id: 'ORD-1002', 
      userId: 'usr_12345',
      customer: 'Jane Smith', 
      items: [
        { name: 'Latte', quantity: 1 },
        { name: 'Chocolate Muffin', quantity: 1 }
      ],
      total: 8.70, 
      status: 'ready',
      orderTime: '2025-05-21T08:45:00Z'
    }
  ]
  
  let filteredOrders = mockOrders
  
  if (status) {
    filteredOrders = filteredOrders.filter(order => order.status === status)
  }
  
  if (userId) {
    filteredOrders = filteredOrders.filter(order => order.userId === userId)
  }
  
  return NextResponse.json(filteredOrders)
}

export async function POST(request: Request) {
  try {
    const { items, totalPrice, userId } = await request.json()
    
    if (!items || items.length === 0 || !totalPrice) {
      return NextResponse.json(
        { error: 'Invalid order data' },
        { status: 400 }
      )
    }
    
    // In a real app, this would:
    // 1. Verify the user has sufficient balance
    // 2. Create the order in your database
    // 3. Deduct the balance from the user's account
    
    // Mock response
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-4)}`,
      userId: userId || 'usr_12345',
      items: items,
      total: totalPrice,
      status: 'pending',
      orderTime: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      order: newOrder
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const { orderId, status } = await request.json()
    
    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Order ID and status are required' },
        { status: 400 }
      )
    }
    
    // In a real app, this would update the order in your database
    
    return NextResponse.json({
      success: true,
      orderId: orderId,
      newStatus: status
    })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
} 