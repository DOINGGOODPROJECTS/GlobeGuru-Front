"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatQuickQuestions } from "@/components/chat-quick-questions"
import { Bot, User, Send, MapPin, AlertTriangle, BookOpen } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
  lawCard?: {
    title: string
    country: string
    flag: string
    riskLevel: string
    summary: string
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI legal assistant. I can help you understand laws and regulations for any country. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: [
        "Ask about a specific country",
        "Search by legal topic",
        "Get travel safety tips",
        "Emergency procedures",
      ],
    },
  ])
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (text?: string) => {
    const messageText = text || message
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("alcohol") && lowerMessage.includes("uae")) {
      return {
        id: (Date.now() + 1).toString(),
        text: "Here's what you need to know about alcohol laws in the UAE:",
        sender: "bot",
        timestamp: new Date(),
        lawCard: {
          title: "Alcohol Consumption Laws",
          country: "United Arab Emirates",
          flag: "🇦🇪",
          riskLevel: "High",
          summary:
            "Alcohol consumption is strictly regulated. Only licensed venues can serve alcohol, and public intoxication is illegal. Non-Muslims over 21 can purchase alcohol with a license.",
        },
        suggestions: [
          "Where can I buy alcohol in UAE?",
          "What are the penalties for public drinking?",
          "Can tourists drink alcohol?",
          "Tell me about other UAE laws",
        ],
      }
    }

    if (lowerMessage.includes("photo") || lowerMessage.includes("camera")) {
      return {
        id: (Date.now() + 1).toString(),
        text: "Photography laws vary by country. Here are some general guidelines:",
        sender: "bot",
        timestamp: new Date(),
        suggestions: [
          "Photography laws in Qatar",
          "Can I photograph government buildings?",
          "Social media posting restrictions",
          "Privacy laws for photography",
        ],
      }
    }

    if (lowerMessage.includes("customs") || lowerMessage.includes("declare")) {
      return {
        id: (Date.now() + 1).toString(),
        text: "Customs declarations are important for international travel. Here's what you typically need to declare:",
        sender: "bot",
        timestamp: new Date(),
        suggestions: [
          "US customs declaration limits",
          "What items are prohibited?",
          "Duty-free allowances",
          "Medication declaration rules",
        ],
      }
    }

    // Default response
    return {
      id: (Date.now() + 1).toString(),
      text: "I understand you're asking about travel laws. Could you be more specific about which country or legal topic you're interested in? I can provide detailed information about customs, cultural laws, substance regulations, and more.",
      sender: "bot",
      timestamp: new Date(),
      suggestions: [
        "Ask about a specific country",
        "Browse by legal category",
        "Get emergency contact info",
        "Learn about common violations",
      ],
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-2 dark:text-white">AI Legal Assistant</h1>
            <p className="text-xl text-blue-700 dark:text-gray-300">
              Get instant answers about international laws and regulations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Quick Questions Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24">
                <ChatQuickQuestions onQuestionClick={handleSendMessage} />
              </div>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                    {t("chat.title")}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 p-0 flex flex-col">
                  <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className="space-y-3">
                          <div className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            {msg.sender === "bot" && (
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-blue-600" />
                              </div>
                            )}
                            <div
                              className={`max-w-[80%] p-4 rounded-lg ${
                                msg.sender === "user"
                                  ? "bg-blue-900 text-white"
                                  : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                              }`}
                            >
                              <p>{msg.text}</p>
                            </div>
                            {msg.sender === "user" && (
                              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-amber-600" />
                              </div>
                            )}
                          </div>

                          {/* Law Card */}
                          {msg.lawCard && (
                            <div className="ml-11">
                              <Card className="border-l-4 border-l-blue-500">
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xl">{msg.lawCard.flag}</span>
                                      <div>
                                        <h4 className="font-semibold text-blue-900 dark:text-white">
                                          {msg.lawCard.title}
                                        </h4>
                                        <p className="text-sm text-blue-600 flex items-center gap-1 dark:text-gray-400">
                                          <MapPin className="w-3 h-3" />
                                          {msg.lawCard.country}
                                        </p>
                                      </div>
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className={
                                        msg.lawCard.riskLevel === "High"
                                          ? "bg-red-100 text-red-800 border-red-200"
                                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                      }
                                    >
                                      <AlertTriangle className="w-3 h-3 mr-1" />
                                      {msg.lawCard.riskLevel}
                                    </Badge>
                                  </div>
                                  <p className="text-blue-700 text-sm mb-3 dark:text-gray-300">{msg.lawCard.summary}</p>
                                  <Button variant="outline" size="sm">
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    Read Full Details
                                  </Button>
                                </CardContent>
                              </Card>
                            </div>
                          )}

                          {/* Suggestions */}
                          {msg.suggestions && (
                            <div className="ml-11">
                              <div className="flex flex-wrap gap-2">
                                {msg.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs bg-transparent"
                                    onClick={() => handleSendMessage(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex gap-3 justify-start">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder={t("chat.placeholder")}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={() => handleSendMessage()} disabled={!message.trim() || isTyping}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-blue-600 mt-2 dark:text-gray-400">
                      💡 Tip: Ask specific questions like "What are the alcohol laws in UAE?" for detailed answers
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
