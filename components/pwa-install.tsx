"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setShowInstall(false)
    }

    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowInstall(false)
  }

  if (!showInstall) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
      <Card className="shadow-2xl border-0 bg-blue-900 text-white">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="GlobeGuru" className="w-10 h-10" />
              <div>
                <h4 className="font-semibold">Install GlobeGuru</h4>
                <p className="text-sm text-blue-200">Access offline anywhere</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleDismiss} className="text-white hover:bg-blue-800">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleInstall} className="flex-1 bg-amber-500 hover:bg-amber-600 text-blue-900">
              <Download className="w-4 h-4 mr-2" />
              Install App
            </Button>
            <Button
              variant="outline"
              onClick={handleDismiss}
              className="border-blue-300 text-blue-100 hover:bg-blue-800 bg-transparent"
            >
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
