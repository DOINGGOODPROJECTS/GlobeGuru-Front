"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Mail, Lock, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t("auth.error"),
        description: t("auth.passwordMismatch"),
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: t("auth.accountCreated"),
        description: t("auth.signupSuccess"),
      })
    }, 2000)
  }

  const handleSocialSignup = (provider: string) => {
    setIsLoading(true)
    toast({
      title: t("auth.socialSignup"),
      description: `${t("auth.redirecting")} ${provider}...`,
    })

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: t("auth.accountCreated"),
        description: t("auth.signupSuccess"),
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-200 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("nav.backToHome")}
          </Link>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <img src="/logo.png" alt="GlobeGuru" className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white">GlobeGuru</h1>
            <p className="text-blue-200">{t("auth.tagline")}</p>
          </Link>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-900">{t("auth.createAccount")}</CardTitle>
            <p className="text-blue-600">{t("auth.signupSubtitle")}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Signup Buttons */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="w-full bg-transparent hover:bg-blue-50"
                onClick={() => handleSocialSignup("Google")}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {t("auth.signUpWithGoogle")}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:bg-blue-50"
                  onClick={() => handleSocialSignup("Facebook")}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:bg-blue-50"
                  onClick={() => handleSocialSignup("LinkedIn")}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-2" fill="#0A66C2" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </Button>
              </div>
            </div>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-2 text-sm text-blue-600">{t("auth.orSignUpWith")}</span>
              </div>
            </div>

            {/* Email Signup Form */}
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="name">{t("auth.fullName")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                  <Input
                    id="name"
                    type="text"
                    placeholder={t("auth.namePlaceholder")}
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">{t("auth.email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("auth.emailPlaceholder")}
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">{t("auth.password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder={t("auth.createPassword")}
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder={t("auth.confirmPasswordPlaceholder")}
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  {t("auth.agreeToTerms")}{" "}
                  <Button variant="link" className="p-0 h-auto text-sm">
                    {t("auth.termsOfService")}
                  </Button>{" "}
                  {t("auth.and")}{" "}
                  <Button variant="link" className="p-0 h-auto text-sm">
                    {t("auth.privacyPolicy")}
                  </Button>
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800"
                disabled={isLoading || !formData.agreeToTerms}
              >
                {isLoading ? t("auth.creatingAccount") : t("auth.createAccount")}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-blue-600">
                {t("auth.alreadyHaveAccount")}{" "}
                <Link href="/login" className="font-medium text-blue-900 hover:text-amber-600">
                  {t("auth.signIn")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
