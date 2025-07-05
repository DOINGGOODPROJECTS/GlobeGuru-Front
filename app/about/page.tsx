import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Globe, Award, Heart, Zap } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { label: "Countries Covered", value: "10+", icon: Globe },
    { label: "Laws & Regulations", value: "1,500+", icon: Shield },
    { label: "Happy Travelers", value: "50,000+", icon: Users },
    { label: "Expert Reviewers", value: "25+", icon: Award },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former international lawyer with 15+ years experience in travel law",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Dr. Ahmed Hassan",
      role: "Legal Director",
      bio: "International law expert specializing in Middle Eastern regulations",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Content",
      bio: "Travel journalist and legal researcher with global experience",
      image: "/placeholder.svg?height=120&width=120",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="GlobeGuru Logo" className="w-24 h-24" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4 dark:text-white">About GlobeGuru</h1>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto dark:text-gray-300">
            Empowering travelers with accessible legal knowledge for safer, more confident international journeys.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12 border-0 shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-4 dark:text-white">Our Mission</h2>
                <p className="text-blue-700 text-lg leading-relaxed mb-4 dark:text-gray-300">
                  We believe that understanding local laws shouldn't be a barrier to exploring the world. GlobeGuru was
                  born from the frustration of navigating complex legal requirements while traveling.
                </p>
                <p className="text-blue-700 text-lg leading-relaxed dark:text-gray-300">
                  Our mission is to democratize access to legal information, making it simple, accurate, and accessible
                  for every traveler, regardless of their legal background.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg dark:bg-gray-700">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-900 dark:text-white">Passion</h3>
                  <p className="text-sm text-blue-600 dark:text-gray-400">For safe travel</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg dark:bg-gray-700">
                  <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-900 dark:text-white">Trust</h3>
                  <p className="text-sm text-blue-600 dark:text-gray-400">Expert verified</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg dark:bg-gray-700">
                  <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-900 dark:text-white">Innovation</h3>
                  <p className="text-sm text-blue-600 dark:text-gray-400">AI-powered</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg dark:bg-gray-700">
                  <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-900 dark:text-white">Global</h3>
                  <p className="text-sm text-blue-600 dark:text-gray-400">Worldwide reach</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <Icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-900 mb-1 dark:text-white">{stat.value}</div>
                  <div className="text-blue-600 text-sm dark:text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Team Section */}
        <Card className="mb-12 border-0 shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-blue-900 dark:text-white">Meet Our Team</CardTitle>
            <p className="text-blue-700 dark:text-gray-300">
              Legal experts and travel enthusiasts working to keep you informed
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-blue-900 mb-1 dark:text-white">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3 dark:bg-gray-700 dark:text-gray-300">
                    {member.role}
                  </Badge>
                  <p className="text-blue-700 text-sm dark:text-gray-400">{member.bio}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                <Shield className="w-5 h-5" />
                Accuracy & Trust
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 dark:text-gray-300">
                Every piece of information is verified by legal experts and updated regularly. We partner with local law
                firms and government agencies to ensure accuracy.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                <Users className="w-5 h-5" />
                Community First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 dark:text-gray-300">
                Our community of travelers shares experiences and insights, creating a collaborative platform that
                benefits everyone.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                <Globe className="w-5 h-5" />
                Global Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 dark:text-gray-300">
                Available in multiple languages with offline access, ensuring you have legal information wherever your
                travels take you.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-white">
                <Zap className="w-5 h-5" />
                Innovation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 dark:text-gray-300">
                Leveraging AI and modern technology to make legal information more accessible and understandable for
                everyone.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="border-0 shadow-lg bg-blue-900 text-white dark:bg-gray-800">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-blue-200 mb-6 max-w-2xl mx-auto dark:text-gray-300">
              Have questions, suggestions, or want to contribute to our mission? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <h4 className="font-semibold mb-1">General Inquiries</h4>
                <p className="text-blue-200 dark:text-gray-400">hello@globeguru.com</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-1">Legal Team</h4>
                <p className="text-blue-200 dark:text-gray-400">legal@globeguru.com</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-1">Support</h4>
                <p className="text-blue-200 dark:text-gray-400">support@globeguru.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
