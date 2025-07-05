import { Header } from "@/components/header"
import { CountryGrid } from "@/components/country-grid"
import { GeolocationDetector } from "@/components/geolocation-detector"

export default function CountriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <GeolocationDetector />
      <main className="container mx-auto px-4 py-8">
        <CountryGrid showAll={true} />
      </main>
    </div>
  )
}
