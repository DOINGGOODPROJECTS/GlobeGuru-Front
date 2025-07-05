"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, Globe, Search, MessageCircle, Crown, Info } from "lucide-react"
import { LanguageSelector } from "./language-selector"
import { ThemeToggle } from "./theme-toggle"
import { useLanguage } from "./language-provider"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  const navigation = [
    { name: t("nav.countries"), href: "/countries", icon: Globe },
    { name: t("nav.search"), href: "/search", icon: Search },
    { name: t("nav.chat"), href: "/chat", icon: MessageCircle },
    { name: t("nav.premium"), href: "/premium", icon: Crown },
  ]

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 dark:bg-gray-900/95 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="GlobeGuru" className="w-8 h-8" />
            <span className="text-xl font-bold text-blue-900 dark:text-white">GlobeGuru</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 transition-colors relative ${
                    active
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-blue-700 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {active && (
                    <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-amber-600 dark:bg-amber-400"></div>
                  )}
                </Link>
              )
            })}
            <Link
              href="/profile"
              className={`flex items-center space-x-1 transition-colors relative ${
                isActive("/profile")
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-blue-700 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400"
              }`}
            >
              <User className="w-4 h-4" />
              <span>{t("nav.profile")}</span>
              {isActive("/profile") && (
                <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-amber-600 dark:bg-amber-400"></div>
              )}
            </Link>
            <Link
              href="/about"
              className={`flex items-center space-x-1 transition-colors relative ${
                isActive("/about")
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-blue-700 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400"
              }`}
            >
              <Info className="w-4 h-4" />
              <span>{t("nav.about")}</span>
              {isActive("/about") && (
                <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-amber-600 dark:bg-amber-400"></div>
              )}
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSelector />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="w-4 h-4 mr-2" />
                {t("auth.login")}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center space-x-3 transition-colors p-2 rounded-lg ${
                          active
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                            : "text-blue-700 hover:text-amber-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-amber-400 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-lg">{item.name}</span>
                      </Link>
                    )
                  })}
                  <Link
                    href="/profile"
                    className={`flex items-center space-x-3 transition-colors p-2 rounded-lg ${
                      isActive("/profile")
                        ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                        : "text-blue-700 hover:text-amber-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-amber-400 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-lg">{t("nav.profile")}</span>
                  </Link>
                  <Link
                    href="/about"
                    className={`flex items-center space-x-3 transition-colors p-2 rounded-lg ${
                      isActive("/about")
                        ? "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
                        : "text-blue-700 hover:text-amber-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-amber-400 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Info className="w-5 h-5" />
                    <span className="text-lg">{t("nav.about")}</span>
                  </Link>
                  <div className="border-t pt-4">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">
                        <User className="w-4 h-4 mr-2" />
                        {t("auth.login")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
