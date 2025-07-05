import { Header } from "@/components/header"
import { LawOfTheDay } from "@/components/law-of-the-day"
import { CountryGrid } from "@/components/country-grid"
import { SearchSection } from "@/components/search-section"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { FeatureHighlights } from "@/components/feature-highlights"
import { OfflineManager } from "@/components/offline-manager"
import { GeolocationDetector } from "@/components/geolocation-detector"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <GeolocationDetector />
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="GlobeGuru Logo" className="w-24 h-24 md:w-32 md:h-32" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4 dark:text-white">GlobeGuru</h1>
          <p className="text-xl md:text-2xl text-blue-700 max-w-3xl mx-auto dark:text-gray-300">
            Navigate international laws with confidence. Your trusted guide to legal requirements worldwide.
          </p>
        </section>

        {/* Law of the Day */}
        <LawOfTheDay />

        {/* Search Section */}
        <SearchSection />

        {/* Country Grid */}
        <CountryGrid />

        {/* Feature Highlights */}
        <FeatureHighlights />

        {/* Offline Manager */}
        <section className="max-w-2xl mx-auto">
          <OfflineManager />
        </section>
      </main>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  )
}
