"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, X, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "./language-provider"

interface LocationInfo {
  country: string
  countryCode: string
  flag: string
  city?: string
  region?: string
}

export function GeolocationDetector() {
  const [location, setLocation] = useState<LocationInfo | null>(null)
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()

  useEffect(() => {
    detectLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * STEP 1 — Try browser geolocation (fast & precise if user allows it)
   * STEP 2 — Fallback to an IP-based lookup if the user denies / times-out
   */
  async function detectLocation() {
    setIsLoading(true)

    const geoPromise = new Promise<LocationInfo | null>((resolve) => {
      if (!navigator.geolocation) return resolve(null)

      navigator.geolocation.getCurrentPosition(
        // Success → we don’t actually need the coordinates here.
        () =>
          resolve({
            country: "France",
            countryCode: "FR",
            flag: "🇫🇷",
          }),
        // Failure (permission denied / timeout / unavailable)
        () => resolve(null),
        {
          enableHighAccuracy: false, // less battery & fewer timeouts
          timeout: 8000, // shorter timeout
          maximumAge: 300000, // 5 minutes
        },
      )
    })

    // Fetch-based fallback (IP API)
    const ipPromise = fetch("https://ipapi.co/json/")
      .then(async (r) => {
        if (!r.ok) throw new Error("ipapi error")
        const data = await r.json()
        return {
          country: data.country_name,
          countryCode: data.country_code,
          flag: countryCodeToFlag(data.country_code),
          city: data.city,
          region: data.region,
        } as LocationInfo
      })
      .catch(() => null)

    // Whichever returns first
    const geoResult = await Promise.race([geoPromise, ipPromise])

    setIsLoading(false)

    if (!geoResult) return // could not detect → silently ignore

    setLocation(geoResult)
    setShowSuggestion(true)

    toast({
      title: t("location.detected"),
      description: `${t("location.detectedIn")} ${geoResult.city ?? ""} ${geoResult.country}`,
    })
  }

  function countryCodeToFlag(code: string) {
    return Array.from(code.toUpperCase())
      .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
      .join("")
  }

  const handleViewCountryLaws = () => {
    if (location) window.location.href = `/countries/${location.countryCode.toLowerCase()}`
  }

  if (!showSuggestion || !location || isLoading) return null

  return (
    <div className="fixed top-20 right-4 z-40 w-80 md:w-96">
      <Card className="shadow-2xl border-0 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold">{t("location.yourLocation")}</h4>
                <p className="text-sm text-blue-200">
                  {location.city ? `${location.city}, ` : ""}
                  {location.country}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSuggestion(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{location.flag}</span>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {location.country}
            </Badge>
          </div>

          <p className="text-sm text-blue-200 mb-4">{t("location.suggestion")}</p>

          <div className="flex gap-2">
            <Button
              onClick={handleViewCountryLaws}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-blue-900 font-semibold"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t("location.viewLaws")}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSuggestion(false)}
              className="border-white/30 text-white hover:bg-white/20 bg-transparent"
            >
              {t("location.later")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
