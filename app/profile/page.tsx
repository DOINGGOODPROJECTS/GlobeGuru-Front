"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Settings, Heart, Download, Bell, Globe, Crown, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Traveler",
    email: "john@example.com",
    country: "United States",
    language: "English",
    notifications: true,
    offlineCountry: "France",
    travelAlerts: true,
    newsletter: false,
  })

  const { toast } = useToast()

  const favoriteCountries = [
    { name: "France", flag: "🇫🇷", laws: 134, lastVisited: "2024-01-15" },
    { name: "Japan", flag: "🇯🇵", laws: 145, lastVisited: "2023-12-20" },
    { name: "Thailand", flag: "🇹🇭", laws: 167, lastVisited: "2023-11-10" },
  ]

  const recentSearches = [
    "Alcohol laws in UAE",
    "Photography restrictions Qatar",
    "Customs declaration Japan",
    "Dress code Saudi Arabia",
  ]

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-2">{profile.name}</h1>
          <p className="text-blue-700">{profile.email}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Free Plan
            </Badge>
            <Button variant="outline" size="sm">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Home Country</Label>
                    <Select
                      value={profile.country}
                      onValueChange={(value) => setProfile({ ...profile, country: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">🇺🇸 United States</SelectItem>
                        <SelectItem value="United Kingdom">🇬🇧 United Kingdom</SelectItem>
                        <SelectItem value="France">🇫🇷 France</SelectItem>
                        <SelectItem value="Germany">🇩🇪 Germany</SelectItem>
                        <SelectItem value="Canada">🇨🇦 Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select
                      value={profile.language}
                      onValueChange={(value) => setProfile({ ...profile, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">🇺🇸 English</SelectItem>
                        <SelectItem value="French">🇫🇷 Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleSaveProfile} className="bg-blue-900 hover:bg-blue-800">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Offline Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="offline-country">Selected Country for Offline Access</Label>
                    <Select
                      value={profile.offlineCountry}
                      onValueChange={(value) => setProfile({ ...profile, offlineCountry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="France">🇫🇷 France</SelectItem>
                        <SelectItem value="Japan">🇯🇵 Japan</SelectItem>
                        <SelectItem value="Thailand">🇹🇭 Thailand</SelectItem>
                        <SelectItem value="UAE">🇦🇪 United Arab Emirates</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-sm text-blue-600">
                    Free plan allows offline access for one country. Upgrade to Premium for unlimited offline access.
                  </p>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download {profile.offlineCountry} Laws
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Favorite Countries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {favoriteCountries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{country.flag}</span>
                        <div>
                          <h4 className="font-semibold text-blue-900">{country.name}</h4>
                          <p className="text-sm text-blue-600">{country.laws} laws available</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-blue-600">Last visited</p>
                        <p className="text-sm font-medium">{country.lastVisited}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Searches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-900">{search}</span>
                      <Button variant="ghost" size="sm">
                        Search Again
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-blue-600">Receive important legal updates</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={profile.notifications}
                    onCheckedChange={(checked) => setProfile({ ...profile, notifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="travel-alerts">Travel Alerts</Label>
                    <p className="text-sm text-blue-600">Get notified about law changes in your favorite countries</p>
                  </div>
                  <Switch
                    id="travel-alerts"
                    checked={profile.travelAlerts}
                    onCheckedChange={(checked) => setProfile({ ...profile, travelAlerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newsletter">Newsletter</Label>
                    <p className="text-sm text-blue-600">Weekly digest of travel law updates</p>
                  </div>
                  <Switch
                    id="newsletter"
                    checked={profile.newsletter}
                    onCheckedChange={(checked) => setProfile({ ...profile, newsletter: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  App Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Default Search Region</Label>
                  <Select defaultValue="worldwide">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="worldwide">🌍 Worldwide</SelectItem>
                      <SelectItem value="europe">🇪🇺 Europe</SelectItem>
                      <SelectItem value="asia">🌏 Asia</SelectItem>
                      <SelectItem value="americas">🌎 Americas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Risk Level Display</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Show All Levels</SelectItem>
                      <SelectItem value="medium-high">Medium & High Only</SelectItem>
                      <SelectItem value="high">High Risk Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Countries Explored</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-2">8</div>
                  <p className="text-blue-600">out of 10 available</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Laws Read</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-2">247</div>
                  <p className="text-blue-600">total laws viewed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Days Active</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-blue-900 mb-2">45</div>
                  <p className="text-blue-600">since joining</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Viewed", item: "UAE Alcohol Laws", time: "2 hours ago", icon: MapPin },
                    { action: "Saved", item: "Japan Customs Guide", time: "1 day ago", icon: Heart },
                    { action: "Downloaded", item: "France Laws (Offline)", time: "3 days ago", icon: Download },
                    { action: "Searched", item: "Photography restrictions", time: "1 week ago", icon: Globe },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <activity.icon className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-blue-900">
                          <span className="font-medium">{activity.action}</span> {activity.item}
                        </p>
                        <p className="text-sm text-blue-600">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
