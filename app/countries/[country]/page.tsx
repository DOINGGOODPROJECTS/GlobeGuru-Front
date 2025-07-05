"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { MapPin, AlertTriangle, Heart, Download, Share2, Clock, Users, Scale } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const countryData = {
  us: {
    name: "United States",
    flag: "🇺🇸",
    code: "US",
    riskLevel: "Medium",
    totalLaws: 156,
    categories: [
      {
        name: "Customs & Immigration",
        laws: 45,
        riskLevel: "Medium",
        description: "Entry requirements, customs declarations, and immigration procedures",
      },
      {
        name: "Transportation",
        laws: 38,
        riskLevel: "Low",
        description: "Driving laws, public transport regulations, and traffic rules",
      },
      {
        name: "Substance Laws",
        laws: 32,
        riskLevel: "High",
        description: "Alcohol, tobacco, and controlled substance regulations",
      },
      {
        name: "Business & Finance",
        laws: 28,
        riskLevel: "Medium",
        description: "Tax obligations, business regulations, and financial laws",
      },
      {
        name: "Cultural & Social",
        laws: 13,
        riskLevel: "Low",
        description: "Social norms, public behavior, and cultural considerations",
      },
    ],
    keyLaws: [
      {
        title: "Customs Declaration Requirements",
        category: "Customs & Immigration",
        riskLevel: "High",
        summary:
          "All items over $800 must be declared. Failure to declare can result in fines up to $500 or confiscation.",
        details:
          "When entering the US, you must declare all items purchased abroad that exceed $800 in value. This includes gifts, souvenirs, and duty-free purchases. Agricultural products, medications, and large amounts of cash (over $10,000) must also be declared regardless of value.",
        penalties: "Fines range from $300-$500 for minor violations, up to criminal charges for major violations.",
        tips: "Keep all receipts, use the CBP app for pre-declaration, and when in doubt, declare it.",
      },
      {
        title: "State-Specific Cannabis Laws",
        category: "Substance Laws",
        riskLevel: "High",
        summary: "Cannabis laws vary dramatically by state. What's legal in one state may be a felony in another.",
        details:
          "While some states have legalized recreational cannabis, it remains federally illegal. Crossing state lines with cannabis is always illegal, even between legal states. Penalties vary from fines to imprisonment.",
        penalties: "Ranges from civil fines to felony charges depending on state and amount.",
        tips: "Research specific state laws before traveling. Never transport across state lines.",
      },
    ],
    emergencyInfo: {
      police: "911",
      embassy: "+1-202-501-4444",
      tourist_hotline: "1-800-VISIT-US",
    },
  },
}

interface CountryPageProps {
  params: { country: string }
}

export default function CountryPage({ params }: CountryPageProps) {
  const { country } = params
  const { toast } = useToast()
  const data = countryData[country as keyof typeof countryData] || countryData.us

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

  const handleSaveOffline = () => {
    toast({
      title: "Saved for Offline",
      description: `${data.name} laws are now available offline.`,
    })
  }

  const handleShare = () => {
    toast({
      title: "Link Copied",
      description: "Country page link copied to clipboard.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Country Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{data.flag}</span>
            <div>
              <h1 className="text-4xl font-bold text-blue-900 dark:text-white">{data.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-gray-400" />
                  <span className="text-blue-600 dark:text-gray-400">{data.code}</span>
                </div>
                <Badge variant="outline" className={getRiskColor(data.riskLevel)}>
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {data.riskLevel} Risk
                </Badge>
                <div className="flex items-center gap-2 text-blue-600 dark:text-gray-400">
                  <Scale className="w-4 h-4" />
                  <span>{data.totalLaws} laws</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSaveOffline} className="bg-blue-900 hover:bg-blue-800">
              <Download className="w-4 h-4 mr-2" />
              Save Offline
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 bg-transparent"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 bg-transparent"
            >
              <Heart className="w-4 h-4 mr-2" />
              Add to Favorites
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 dark:bg-gray-800">
            <TabsTrigger value="overview" className="dark:data-[state=active]:bg-gray-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="categories" className="dark:data-[state=active]:bg-gray-700">
              Categories
            </TabsTrigger>
            <TabsTrigger value="key-laws" className="dark:data-[state=active]:bg-gray-700">
              Key Laws
            </TabsTrigger>
            <TabsTrigger value="emergency" className="dark:data-[state=active]:bg-gray-700">
              Emergency
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Scale className="w-5 h-5 text-blue-600" />
                    Legal Complexity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="dark:text-gray-300">Overall Risk</span>
                      <span className="font-medium dark:text-white">{data.riskLevel}</span>
                    </div>
                    <Progress value={60} className="h-2" />
                    <p className="text-sm text-blue-600 dark:text-gray-400">
                      Moderate complexity with state-specific variations
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Users className="w-5 h-5 text-blue-600" />
                    Traveler Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Most Searched</span>
                      <span className="font-medium dark:text-white">Customs Laws</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Common Issues</span>
                      <span className="font-medium dark:text-white">Declaration</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Success Rate</span>
                      <span className="font-medium text-green-600">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Last Updated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Content</span>
                      <span className="font-medium dark:text-white">2 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Verification</span>
                      <span className="font-medium dark:text-white">1 week ago</span>
                    </div>
                    <Badge
                      variant="outline"
                      className="w-full justify-center bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                    >
                      ✓ Expert Verified
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid gap-4">
              {data.categories.map((category, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-750"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-blue-900 dark:text-white">{category.name}</h3>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={getRiskColor(category.riskLevel)}>
                          {category.riskLevel}
                        </Badge>
                        <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                          {category.laws} laws
                        </Badge>
                      </div>
                    </div>
                    <p className="text-blue-700 mb-4 dark:text-gray-300">{category.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 bg-transparent"
                    >
                      View {category.laws} Laws
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="key-laws" className="space-y-6">
            {data.keyLaws.map((law, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500 dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl text-blue-900 dark:text-white">{law.title}</CardTitle>
                    <Badge variant="outline" className={getRiskColor(law.riskLevel)}>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {law.riskLevel}
                    </Badge>
                  </div>
                  <Badge variant="secondary" className="w-fit dark:bg-gray-700 dark:text-gray-300">
                    {law.category}
                  </Badge>
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
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-900 flex items-center gap-2 dark:text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg dark:bg-gray-800">
                    <h4 className="font-semibold text-red-900 mb-2 dark:text-red-400">Police Emergency</h4>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-400">{data.emergencyInfo.police}</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg dark:bg-gray-800">
                    <h4 className="font-semibold text-red-900 mb-2 dark:text-red-400">Embassy</h4>
                    <p className="text-lg font-bold text-red-700 dark:text-red-400">{data.emergencyInfo.embassy}</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg dark:bg-gray-800">
                    <h4 className="font-semibold text-red-900 mb-2 dark:text-red-400">Tourist Hotline</h4>
                    <p className="text-lg font-bold text-red-700 dark:text-red-400">
                      {data.emergencyInfo.tourist_hotline}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
