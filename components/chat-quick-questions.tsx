"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useLanguage } from "./language-provider"

interface QuickQuestionsProps {
  onQuestionClick: (question: string) => void
}

export function ChatQuickQuestions({ onQuestionClick }: QuickQuestionsProps) {
  const { t } = useLanguage()

  const quickQuestions = [
    {
      category: "Popular",
      questions: [
        "What are the alcohol laws in UAE?",
        "Can I take photos in Qatar?",
        "What should I declare at US customs?",
        "What's the dress code in Saudi Arabia?",
      ],
    },
    {
      category: "Safety",
      questions: [
        "Are there any restrictions in Thailand?",
        "What medications can I bring to Japan?",
        "Emergency contacts in France",
        "Driving requirements in Germany",
      ],
    },
    {
      category: "Business",
      questions: [
        "Business visa requirements for China",
        "Tax obligations for tourists in UK",
        "Work permit laws in Canada",
        "Investment restrictions in Singapore",
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            {t("chat.quickQuestions")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickQuestions.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-2">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-white">{category.category}</h4>
              <div className="grid gap-2">
                {category.questions.map((question, questionIndex) => (
                  <Button
                    key={questionIndex}
                    variant="ghost"
                    className="w-full text-left justify-start h-auto p-3 text-xs hover:bg-blue-50 dark:hover:bg-gray-800 whitespace-normal"
                    onClick={() => onQuestionClick(question)}
                  >
                    <span className="line-clamp-2 text-left">{question}</span>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-blue-900 dark:text-white">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-transparent h-auto p-2 whitespace-normal"
                onClick={() => onQuestionClick(t("chat.askCountry"))}
              >
                <span className="text-center">🌍 {t("chat.askCountry")}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-transparent h-auto p-2 whitespace-normal"
                onClick={() => onQuestionClick(t("chat.searchTopic"))}
              >
                <span className="text-center">📚 {t("chat.searchTopic")}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-transparent h-auto p-2 whitespace-normal"
                onClick={() => onQuestionClick(t("chat.safetyTips"))}
              >
                <span className="text-center">🛡️ {t("chat.safetyTips")}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-transparent h-auto p-2 whitespace-normal"
                onClick={() => onQuestionClick(t("chat.emergency"))}
              >
                <span className="text-center">🚨 {t("chat.emergency")}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
