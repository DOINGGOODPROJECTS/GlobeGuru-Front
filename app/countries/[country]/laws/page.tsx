"use client"

import { useState } from "react"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter, AlertTriangle, BookOpen, Scale, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

const countryLaws = {
  us: {
    name: "United States",
    flag: "🇺🇸",
    laws: [
      {
        id: 1,
        title: "Customs Declaration Requirements",
        category: "Customs & Immigration",
        riskLevel: "High",
        summary:
          "All items over $800 must be declared. Failure to declare can result in fines up to $500 or confiscation.",
        details:
          "When entering the US, you must declare all items purchased abroad that exceed $800 in value. This includes gifts, souvenirs, and duty-free purchases. Agricultural products, medications, and large amounts of cash (over $10,000) must also be declared regardless of value.",
        penalties: "Fines range from $300-$500 for minor violations, up to criminal charges for major violations.",
        tips: "Keep all receipts, use the CBP app for pre-declaration, and when in doubt, declare it.",
        lastUpdated: "2024-01-15",
      },
      {
        id: 2,
        title: "State-Specific Cannabis Laws",
        category: "Substance Laws",
        riskLevel: "High",
        summary: "Cannabis laws vary dramatically by state. What's legal in one state may be a felony in another.",
        details:
          "While some states have legalized recreational cannabis, it remains federally illegal. Crossing state lines with cannabis is always illegal, even between legal states. Penalties vary from fines to imprisonment.",
        penalties: "Ranges from civil fines to felony charges depending on state and amount.",
        tips: "Research specific state laws before traveling. Never transport across state lines.",
        lastUpdated: "2024-01-10",
      },
      {
        id: 3,
        title: "Driving License Requirements",
        category: "Transportation",
        riskLevel: "Medium",
        summary: "International visitors can drive with their home country license for up to 1 year in most states.",
        details:
          "Most states allow international visitors to drive with a valid license from their home country for tourism purposes. However, some states require an International Driving Permit (IDP) in addition to your home license.",
        penalties: "Driving without proper documentation can result in fines of $100-$500 and vehicle impoundment.",
        tips: "Obtain an IDP before traveling. Check specific state requirements as they vary.",
        lastUpdated: "2024-01-08",
      },
      {
        id: 4,
        title: "Photography in Federal Buildings",
        category: "Privacy & Media",
        riskLevel: "Medium",
        summary: "Photography is generally prohibited in federal buildings and around sensitive government facilities.",
        details:
          "Taking photos inside federal courthouses, military installations, and certain government buildings is prohibited. This includes the exterior of some sensitive facilities. Security personnel may confiscate devices and delete photos.",
        penalties: "Can result in detention, device confiscation, and potential criminal charges.",
        tips: "Always ask permission before photographing any government building. Respect posted signs and security instructions.",
        lastUpdated: "2024-01-05",
      },
      {
        id: 5,
        title: "Tipping Customs and Expectations",
        category: "Cultural & Social",
        riskLevel: "Low",
        summary: "Tipping is expected in most service industries, typically 18-25% at restaurants.",
        details:
          "Unlike many countries, tipping is not optional in the US. Standard rates are 18-25% at restaurants, $1-2 per drink at bars, 15-20% for taxi/rideshare, and $1-2 per bag for hotel staff. Some establishments automatically add gratuity for large groups.",
        penalties: "While not illegal, not tipping can result in confrontation and poor service.",
        tips: "Calculate tips before dining out. Use apps to help calculate appropriate amounts. Cash tips are preferred.",
        lastUpdated: "2024-01-03",
      },
    ],
  },
}

interface CountryLawsPageProps {
  params: { country: string }
}

export default function CountryLawsPage({ params }: CountryLawsPageProps) {
  const { country } = params
  const { t } = useLanguage()
  const data = countryLaws[country as keyof typeof countryLaws] || countryLaws.us

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRisk, setSelectedRisk] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    "All Categories",
    "Customs & Immigration",
    "Substance Laws",
    "Transportation",
    "Privacy & Media",
    "Cultural & Social",
    "Business & Finance",
  ]

  const riskLevels = ["All Levels", "Low", "Medium", "High"]

  // Filter laws
  const filteredLaws = data.laws.filter((law) => {
    const matchesSearch =
      law.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || selectedCategory === "All Categories" || law.category === selectedCategory
    const matchesRisk = selectedRisk === "all" || selectedRisk === "All Levels" || law.riskLevel === selectedRisk
    return matchesSearch && matchesCategory && matchesRisk
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href={`/countries/${country}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors dark:text-blue-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {data.name} Overview
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{data.flag}</span>
            <div>
              <h1 className="text-4xl font-bold text-blue-900 dark:text-white">{data.name} Laws & Regulations</h1>
              <p className="text-blue-700 dark:text-gray-300">Complete legal guide for travelers</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Scale className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900 dark:text-white">{data.laws.length}</div>
                <div className="text-sm text-blue-600 dark:text-gray-400">Total Laws</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900 dark:text-white">
                  {data.laws.filter((law) => law.riskLevel === "High").length}
                </div>
                <div className="text-sm text-blue-600 dark:text-gray-400">High Risk</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900 dark:text-white">94%</div>
                <div className="text-sm text-blue-600 dark:text-gray-400">Compliance Rate</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900 dark:text-white">
                  {new Set(data.laws.map((law) => law.category)).size}
                </div>
                <div className="text-sm text-blue-600 dark:text-gray-400">Categories</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <Input
                  placeholder="Search laws and regulations..."
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <label className="text-sm font-medium text-blue-900 mb-2 block dark:text-white">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-900 mb-2 block dark:text-white">Risk Level</label>
                  <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {riskLevels.map((level) => (
                        <SelectItem key={level} value={level}>
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

        {/* Laws List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-blue-900 dark:text-white">
              Laws & Regulations ({filteredLaws.length})
            </h2>
          </div>

          {filteredLaws.map((law) => (
            <Card key={law.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-blue-900 dark:text-white mb-2">{law.title}</CardTitle>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">{law.category}</Badge>
                      <Badge variant="outline" className={getRiskColor(law.riskLevel)}>
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {law.riskLevel} Risk
                      </Badge>
                      <span className="text-sm text-blue-600 dark:text-gray-400">Updated: {law.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2 dark:text-white">Summary</h4>
                  <p className="text-blue-700 dark:text-gray-300">{law.summary}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2 dark:text-white">Details</h4>
                  <p className="text-blue-700 dark:text-gray-300">{law.details}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2 dark:text-white">Penalties</h4>
                  <p className="text-red-700 dark:text-red-400">{law.penalties}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2 dark:text-white">Travel Tips</h4>
                  <p className="text-green-700 dark:text-green-400">{law.tips}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredLaws.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2 dark:text-gray-400">No laws found</h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Try adjusting your search terms or filters to find relevant laws.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
