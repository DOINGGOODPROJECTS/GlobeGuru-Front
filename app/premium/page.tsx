import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Star } from "lucide-react"

export default function PremiumPage() {
  const features = {
    free: [
      "Access to 10 countries",
      "Basic law summaries",
      "Law of the day",
      "Basic chatbot",
      "Offline access for 1 country",
    ],
    premium: [
      "Access to ALL countries",
      "Detailed legal guides",
      "Personalized recommendations",
      "Advanced AI assistant",
      "Offline access for all countries",
      "Real-time legal updates",
      "Google Maps integration",
      "Priority support",
      "Ad-free experience",
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Crown className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-blue-900 mb-4 dark:text-white">Upgrade to Premium</h1>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto dark:text-gray-300">
            Unlock the full potential of GlobeGuru with premium features designed for serious travelers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-900 dark:text-white">Free Plan</CardTitle>
              <div className="text-3xl font-bold text-blue-900 dark:text-white">$0</div>
              <p className="text-blue-600 dark:text-gray-400">Perfect for occasional travelers</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.free.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-blue-900 dark:text-gray-300">{feature}</span>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-6 bg-transparent dark:border-gray-600 dark:text-gray-300">
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-amber-400 relative dark:bg-gray-800">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-amber-400 text-blue-900 px-4 py-1">
                <Star className="w-4 h-4 mr-1" />
                Most Popular
              </Badge>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-900 dark:text-white">Premium Plan</CardTitle>
              <div className="text-3xl font-bold text-blue-900 dark:text-white">
                $9.99<span className="text-lg text-blue-600 dark:text-gray-400">/month</span>
              </div>
              <p className="text-blue-600 dark:text-gray-400">For frequent international travelers</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.premium.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-blue-900 dark:text-gray-300">{feature}</span>
                </div>
              ))}
              <Button className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-blue-900 font-semibold">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-blue-600 mb-4 dark:text-gray-400">
            30-day money-back guarantee • Cancel anytime • Secure payment
          </p>
          <div className="flex justify-center gap-8 text-sm text-blue-500 dark:text-gray-500">
            <span>✓ Stripe Secure Payment</span>
            <span>✓ SSL Encrypted</span>
            <span>✓ GDPR Compliant</span>
          </div>
        </div>
      </main>
    </div>
  )
}
