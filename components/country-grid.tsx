"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Users, AlertTriangle, Search, Filter } from "lucide-react"
import { useLanguage } from "./language-provider"
import { allCountries } from "@/data/countries"
import Link from "next/link"

export function CountryGrid({ showAll = false }: { showAll?: boolean }) {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedRisk, setSelectedRisk] = useState("all")
  const [sortBy, setSortBy] = useState("alphabetical")
  const [showFilters, setShowFilters] = useState(false)

  const regions = [
    { value: "all", label: "All Regions" },
    { value: "europe", label: "Europe" },
    { value: "asia", label: "Asia" },
    { value: "africa", label: "Africa" },
    { value: "americas", label: "Americas" },
    { value: "oceania", label: "Oceania" },
  ]

  const riskLevels = [
    { value: "all", label: "All Levels" },
    { value: "Low", label: "Low Risk" },
    { value: "Medium", label: "Medium Risk" },
    { value: "High", label: "High Risk" },
  ]

  const sortOptions = [
    { value: "alphabetical", label: t("home.alphabetical") },
    { value: "riskLevel", label: t("home.riskLevel") },
    { value: "lawCount", label: t("home.lawCount") },
  ]

  // Use all countries if showAll is true, otherwise use featured countries
  const baseCountries = showAll ? allCountries : allCountries.slice(0, 8)

  // Filter and sort countries
  const filteredCountries = baseCountries.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = selectedRisk === "all" || country.riskLevel === selectedRisk
    return matchesSearch && matchesRisk
  })

  // Sort countries
  filteredCountries.sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return a.name.localeCompare(b.name)
      case "riskLevel":
        const riskOrder = { High: 3, Medium: 2, Low: 1 }
        return riskOrder[b.riskLevel as keyof typeof riskOrder] - riskOrder[a.riskLevel as keyof typeof riskOrder]
      case "lawCount":
        return b.laws - a.laws
      default:
        return 0
    }
  })

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <section className="space-y-6">
      {!showAll && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">{t("home.featuredCountries")}</h2>
          <p className="text-blue-700">Explore legal requirements for popular travel destinations</p>
        </div>
      )}

      {showAll && (
        <>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">{t("home.allCountries")}</h2>
            <p className="text-blue-700">{t("home.showingResults", { count: filteredCountries.length })}</p>
          </div>

          {/* Search and Filters */}
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                  <Input
                    placeholder="Search countries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg border-blue-200 focus:border-blue-400"
                  />
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-blue-200 bg-transparent"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </Button>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-blue-900 mb-2 block">{t("home.filterByRegion")}</label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region.value} value={region.value}>
                            {region.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-900 mb-2 block">{t("home.filterByRisk")}</label>
                    <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {riskLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-900 mb-2 block">{t("home.sortBy")}</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <Link key={country.code} href={`/countries/${country.code.toLowerCase()}`}>
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md hover:-translate-y-1 h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="relative">
                  <div
                    className="w-full h-32 bg-cover bg-center rounded-t-lg"
                    style={{
                      backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.7), rgba(30, 58, 138, 0.7)), url('/legal-background.jpg')`,
                    }}
                  >
                    <div className="absolute top-3 left-3">
                      <span className="text-2xl">{country.flag}</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className={`${getRiskColor(country.riskLevel)} font-medium`}>
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {country.riskLevel}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 text-lg group-hover:text-amber-600 transition-colors">
                      {country.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-blue-600 mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{country.code}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{country.laws} laws</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white mt-auto" size="sm">
                    Explore Laws
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {!showAll && (
        <div className="text-center">
          <Link href="/countries">
            <Button
              variant="outline"
              size="lg"
              className="border-blue-200 text-blue-900 hover:bg-blue-50 bg-transparent"
            >
              {t("home.viewAll")}
            </Button>
          </Link>
        </div>
      )}
    </section>
  )
}
