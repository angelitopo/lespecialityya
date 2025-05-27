'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface QRScannerProps {
  onScan: (decodedText: string) => void
  onError?: (errorMessage: string) => void
  validateScan?: (text: string) => boolean
}

export default function QRScanner({ onScan, onError, validateScan }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)
  const isInitializedRef = useRef(false)
  
  const handleScan = useCallback((decodedText: string) => {
    try {
      if (validateScan && !validateScan(decodedText)) {
        if (onError) {
          onError('Invalid QR code format')
        }
        return
      }
      onScan(decodedText)
      setIsScanning(false)
      if (scannerRef.current) {
        scannerRef.current.clear()
      }
    } catch (error) {
      if (onError) {
        onError(error instanceof Error ? error.message : 'Failed to process scan')
      }
      setIsScanning(false)
    }
  }, [onScan, onError, validateScan])

  const handleError = useCallback((errorMessage: string) => {
    if (onError) {
      onError(errorMessage)
    }
    setIsScanning(false)
  }, [onError])

  const startScanner = useCallback(async () => {
    if (!scannerRef.current || isScanning) return

    try {
      await scannerRef.current.render(handleScan, handleError)
      setIsScanning(true)
    } catch (error) {
      if (onError) {
        onError('Failed to start scanner. Please try again.')
      }
      setIsScanning(false)
    }
  }, [handleScan, handleError, isScanning, onError])

  const checkCameraPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach(track => track.stop())
      setHasPermission(true)
    } catch (error) {
      setHasPermission(false)
      if (onError) {
        onError('Camera permission denied. Please enable camera access to use the scanner.')
      }
    }
  }, [onError])

  const initializeScanner = useCallback(() => {
    if (isInitializedRef.current || !hasPermission) return

    try {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        }
      )
      
      scannerRef.current = scanner
      isInitializedRef.current = true
      startScanner()
    } catch (error) {
      if (onError) {
        onError('Failed to initialize scanner. Please refresh the page.')
      }
    }
  }, [hasPermission, startScanner, onError])
  
  useEffect(() => {
    if (typeof window === 'undefined') return

    checkCameraPermission()
    
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
        scannerRef.current = null
      }
      isInitializedRef.current = false
    }
  }, [checkCameraPermission])

  useEffect(() => {
    if (hasPermission) {
      initializeScanner()
    }
  }, [hasPermission, initializeScanner])
  
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6">
        <div id="qr-reader" className="w-full aspect-square mb-4"></div>
        {hasPermission === false && (
          <div className="text-red-500 mb-4">
            Camera access is required to use the scanner. Please enable camera access in your browser settings.
          </div>
        )}
        {!isScanning && hasPermission && (
          <Button
            className="w-full"
            onClick={startScanner}
          >
            Start Scanning
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 