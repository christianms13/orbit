"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { dictionaries, type TranslationKey } from "./dictionaries"
import type { Locale } from "./locale"

interface I18nContextValue {
  language: Locale
  setLanguage: (lang: Locale) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export default function I18nProvider({children}: {children: ReactNode}) {
  const [language, setLanguage] = useState<Locale>("en")

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("language")

    if (savedLanguage === "en" || savedLanguage === "es") {
      setLanguage(savedLanguage)
      document.documentElement.lang = savedLanguage
      return
    }

    document.documentElement.lang = "en"
  }, [])

  useEffect(() => {
    window.localStorage.setItem("language", language)
    document.documentElement.lang = language
  }, [language])

  const t = (key: TranslationKey) => dictionaries[language][key]

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }

  return context
}
