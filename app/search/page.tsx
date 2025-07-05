"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, AlertTriangle, BookOpen } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const searchResults = [
  {
    id: 1,
    title: "Alcohol Consumption Laws",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    category: "Substance Laws",
    riskLevel: "High",
    summary:
      "Alcohol consumption is strictly regulated. Only licensed venues can serve alcohol, and public intoxication is illegal.",
    tags: ["alcohol", "public behavior", "licensing"],
  },
  {
    id: 2,
    title: "Photography Restrictions",
    country: "Qatar",
    flag: "🇶🇦",
    category: "Privacy & Media",
    riskLevel: "Medium",
    summary: "Photography of government buildings, military installations, and certain cultural sites is prohibited.",
    tags: ["photography", "government", "cultural sites"],
  },
  {
    id: 3,
    title: "Dress Code Requirements",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    category: "Cultural & Social",
    riskLevel: "High",
    summary: "Modest dress is required in public. Women must wear abaya, and men should avoid shorts in public areas.",
    tags: ["dress code", "cultural", "public behavior"],
  },
  {
    id: 4,
    title: "Customs Declaration",
    country: "Japan",
    flag: "🇯🇵",
    category: "Customs & Immigration",
    riskLevel: "Medium",
    summary:
      "Strict customs regulations on food items, medications, and cultural artifacts. Declare all items over ¥200,000.",
    tags: ["customs", "declaration", "import"],
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedRisk, setSelectedRisk] = useState("")
  const [showFilters, setShowFilters] = useState(true)
  const { t } = useLanguage()

  const categories = [
    "All Categories",
    "Substance Laws",
    "Privacy & Media",
    "Cultural & Social",
    "Customs & Immigration",
    "Transportation",
    "Business & Finance",
  ]
  const riskLevels = ["All Levels", "Low", "Medium", "High"]
  const countries = [
    "All Countries",
    "United States",
    "United Kingdom",
    "France",
    "UAE",
    "Qatar",
    "Saudi Arabia",
    "Thailand",
    "Japan",
  ]

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "High":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4 dark:text-white">Advanced Search</h1>
          <p className="text-xl text-blue-700 dark:text-gray-300">
            Find specific laws and regulations with detailed filters
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <Input
                  placeholder="Search laws, regulations, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <Button size="lg" className="bg-blue-900 hover:bg-blue-800">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t dark:border-gray-600">
                <div>
                  <label className="text-sm font-medium text-blue-900 mb-2 block dark:text-white">Country</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                      {countries.map((country) => (
                        <SelectItem key={country} value={country} className="dark:text-white dark:hover:bg-gray-700">
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900 mb-2 block dark:text-white">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="dark:text-white dark:hover:bg-gray-700">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900 mb-2 block dark:text-white">Risk Level</label>
                  <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                      {riskLevels.map((level) => (
                        <SelectItem key={level} value={level} className="dark:text-white dark:hover:bg-gray-700">
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-blue-900 dark:text-white">
              Search Results ({searchResults.length})
            </h2>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-48 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                <SelectItem value="relevance" className="dark:text-white dark:hover:bg-gray-700">
                  Sort by Relevance
                </SelectItem>
                <SelectItem value="country" className="dark:text-white dark:hover:bg-gray-700">
                  Sort by Country
                </SelectItem>
                <SelectItem value="risk" className="dark:text-white dark:hover:bg-gray-700">
                  Sort by Risk Level
                </SelectItem>
                <SelectItem value="category" className="dark:text-white dark:hover:bg-gray-700">
                  Sort by Category
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {searchResults.map((result) => (
            <Card
              key={result.id}
              className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-750"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{result.flag}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 hover:text-amber-600 transition-colors dark:text-white dark:hover:text-amber-400">
                        {result.title}
                      </h3>
                      <div className="flex items-center gap-2 text-blue-600 mt-1 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{result.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className="border-blue-200 text-blue-700 dark:border-gray-600 dark:text-gray-300"
                    >
                      {result.category}
                    </Badge>
                    <Badge variant="outline" className={getRiskColor(result.riskLevel)}>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {result.riskLevel}
                    </Badge>
                  </div>
                </div>

                <p className="text-blue-700 mb-4 leading-relaxed dark:text-gray-300">{result.summary}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {result.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 bg-transparent"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
