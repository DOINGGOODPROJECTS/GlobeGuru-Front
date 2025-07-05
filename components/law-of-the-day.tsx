"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { useLanguage } from "./language-provider"

export function LawOfTheDay() {
  const { t } = useLanguage()

  const todayLaw = {
    country: "Thailand",
    flag: "🇹🇭",
    title: "Respect for Royal Family",
    summary:
      "Thailand has strict lese-majeste laws. Any disrespectful comments or actions toward the royal family can result in serious legal consequences, including imprisonment.",
    category: "Cultural & Social",
    severity: "High",
    date: new Date().toLocaleDateString(),
  }

  return (
    <section className="w-full">
      <Card className="bg-gradient-to-r from-blue-900 to-blue-800 text-white border-0 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6 text-amber-400" />
              {t("home.lawOfDay")}
            </CardTitle>
            <Badge variant="secondary" className="bg-amber-400 text-blue-900 font-semibold">
              {todayLaw.date}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{todayLaw.flag}</span>
            <div>
              <h3 className="text-xl font-semibold">{todayLaw.title}</h3>
              <div className="flex items-center gap-2 text-blue-200">
                <MapPin className="w-4 h-4" />
                <span>{todayLaw.country}</span>
              </div>
            </div>
          </div>

          <p className="text-blue-100 leading-relaxed">{todayLaw.summary}</p>

          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-2">
              <Badge variant="outline" className="border-amber-400 text-amber-400">
                {todayLaw.category}
              </Badge>
              <Badge variant="outline" className={`border-red-400 text-red-400`}>
                {todayLaw.severity} Risk
              </Badge>
            </div>
            <Button variant="secondary" size="sm" className="bg-white text-blue-900 hover:bg-blue-50">
              Learn More
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
