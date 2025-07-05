"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, TrendingUpIcon as Trending } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "./language-provider"

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useLanguage()

  const trendingTopics = [
    "Alcohol laws",
    "Dress code",
    "Photography restrictions",
    "Customs regulations",
    "Driving requirements",
    "Public behavior",
  ]

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">Find Laws by Country or Topic</h2>
        <p className="text-blue-700">Search through our comprehensive database of international laws</p>
      </div>

      <Card className="bg-white shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <Input
                placeholder={t("home.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg border-blue-200 focus:border-blue-400"
              />
            </div>
            <Button size="lg" className="bg-blue-900 hover:bg-blue-800 px-8">
              <Search className="w-5 h-5 mr-2" />
              {t("home.searchButton")}
            </Button>
            <Button variant="outline" size="lg" className="border-blue-200 bg-transparent">
              <Filter className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Trending className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-blue-900">Trending Topics:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 bg-blue-50 text-blue-700 border border-blue-200"
                  onClick={() => setSearchQuery(topic)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
