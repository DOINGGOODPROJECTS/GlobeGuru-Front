"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Download, Wifi, WifiOff, Trash2, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OfflineCountry {
  code: string
  name: string
  flag: string
  size: string
  downloadDate: string
  isDownloaded: boolean
  isDownloading: boolean
  progress: number
}

export function OfflineManager() {
  const [countries, setCountries] = useState<OfflineCountry[]>([
    {
      code: "FR",
      name: "France",
      flag: "🇫🇷",
      size: "2.3 MB",
      downloadDate: "2024-01-15",
      isDownloaded: true,
      isDownloading: false,
      progress: 100,
    },
    {
      code: "JP",
      name: "Japan",
      flag: "🇯🇵",
      size: "2.8 MB",
      downloadDate: "",
      isDownloaded: false,
      isDownloading: false,
      progress: 0,
    },
    {
      code: "TH",
      name: "Thailand",
      flag: "🇹🇭",
      size: "3.1 MB",
      downloadDate: "",
      isDownloaded: false,
      isDownloading: false,
      progress: 0,
    },
  ])

  const [isOnline, setIsOnline] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleDownload = (countryCode: string) => {
    setCountries((prev) =>
      prev.map((country) =>
        country.code === countryCode ? { ...country, isDownloading: true, progress: 0 } : country,
      ),
    )

    // Simulate download progress
    const interval = setInterval(() => {
      setCountries((prev) =>
        prev.map((country) => {
          if (country.code === countryCode && country.isDownloading) {
            const newProgress = Math.min(country.progress + 10, 100)
            if (newProgress === 100) {
              clearInterval(interval)
              toast({
                title: "Download Complete",
                description: `${country.name} laws are now available offline.`,
              })
              return {
                ...country,
                isDownloading: false,
                isDownloaded: true,
                progress: 100,
                downloadDate: new Date().toISOString().split("T")[0],
              }
            }
            return { ...country, progress: newProgress }
          }
          return country
        }),
      )
    }, 200)
  }

  const handleDelete = (countryCode: string) => {
    setCountries((prev) =>
      prev.map((country) =>
        country.code === countryCode ? { ...country, isDownloaded: false, progress: 0, downloadDate: "" } : country,
      ),
    )

    toast({
      title: "Offline Data Removed",
      description: "Country data has been removed from offline storage.",
    })
  }

  const handleUpdate = (countryCode: string) => {
    toast({
      title: "Updating...",
      description: "Checking for latest legal updates.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isOnline ? <Wifi className="w-5 h-5 text-green-600" /> : <WifiOff className="w-5 h-5 text-red-600" />}
          Offline Access Manager
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={isOnline ? "default" : "destructive"}>{isOnline ? "Online" : "Offline"}</Badge>
          {!isOnline && <Badge variant="secondary">Using Offline Data</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {countries.map((country) => (
          <div key={country.code} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{country.flag}</span>
                <div>
                  <h4 className="font-semibold text-blue-900">{country.name}</h4>
                  <p className="text-sm text-blue-600">Size: {country.size}</p>
                  {country.downloadDate && <p className="text-xs text-blue-500">Downloaded: {country.downloadDate}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {country.isDownloaded && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    ✓ Downloaded
                  </Badge>
                )}
                {country.isDownloading && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Downloading...
                  </Badge>
                )}
              </div>
            </div>

            {country.isDownloading && (
              <div className="mb-3">
                <Progress value={country.progress} className="h-2" />
                <p className="text-xs text-blue-600 mt-1">{country.progress}% complete</p>
              </div>
            )}

            <div className="flex gap-2">
              {!country.isDownloaded && !country.isDownloading && (
                <Button
                  size="sm"
                  onClick={() => handleDownload(country.code)}
                  disabled={!isOnline}
                  className="bg-blue-900 hover:bg-blue-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              )}

              {country.isDownloaded && (
                <>
                  <Button size="sm" variant="outline" onClick={() => handleUpdate(country.code)} disabled={!isOnline}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Update
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(country.code)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}

        <div className="text-center pt-4 border-t">
          <p className="text-sm text-blue-600 mb-2">Free plan: 1 country offline • Premium: Unlimited countries</p>
          <Button variant="outline" className="bg-transparent">
            Upgrade to Premium
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
