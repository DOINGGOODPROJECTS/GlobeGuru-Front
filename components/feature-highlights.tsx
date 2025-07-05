"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wifi, Globe, RefreshCw, Shield } from "lucide-react"
import { useLanguage } from "./language-provider"

export function FeatureHighlights() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Wifi,
      title: t("features.offline"),
      description: t("features.offlineDesc"),
      color: "text-green-600",
    },
    {
      icon: Globe,
      title: t("features.multilingual"),
      description: t("features.multilingualDesc"),
      color: "text-blue-600",
    },
    {
      icon: RefreshCw,
      title: t("features.updated"),
      description: t("features.updatedDesc"),
      color: "text-amber-600",
    },
    {
      icon: Shield,
      title: t("features.expert"),
      description: t("features.expertDesc"),
      color: "text-purple-600",
    },
  ]

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">Why Choose GlobeGuru?</h2>
        <p className="text-blue-700">Trusted by travelers worldwide for accurate legal information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className={`inline-flex p-3 rounded-full bg-gray-50 ${feature.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 text-lg mb-2">{feature.title}</h3>
                  <p className="text-blue-600 text-sm">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
