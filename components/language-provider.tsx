"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ru"

type Translations = {
  [key: string]: {
    en: string
    ru: string
  }
}

// Define all translations here
export const translations: Translations = {
  // Header
  "nav.home": {
    en: "Home",
    ru: "Главная",
  },
  "nav.about": {
    en: "About",
    ru: "Обо мне",
  },
  "nav.latest": {
    en: "Latest Work",
    ru: "Последние работы",
  },
  "nav.skills": {
    en: "Skills",
    ru: "Навыки",
  },
  "nav.experience": {
    en: "Experience",
    ru: "Опыт",
  },
  "nav.projects": {
    en: "Projects",
    ru: "Проекты",
  },
  "nav.gallery": {
    en: "Gallery",
    ru: "Галерея",
  },
  "nav.cv": {
    en: "CV",
    ru: "Резюме",
  },

  // Hero
  "hero.title": {
    en: "Web Portfolio",
    ru: "Веб-портфолио",
  },
  "hero.subtitle": {
    en: "RuffBuff - Blockchain & IT Developer",
    ru: "RuffBuff - Блокчейн & ИТ Разработчик",
  },
  "hero.cta": {
    en: "View My Work",
    ru: "Смотреть работы",
  },

  // About
  "about.title": {
    en: "About Me",
    ru: "Обо мне",
  },
  "about.description": {
    en: "I'm a 22-year-old developer with diverse experience across construction, cleaning, marketing, moderation, content creation, blockchain, and IT. For the past 5 years, I've focused on blockchain and IT development. I've worked in various countries, for different companies, private individuals, and even led my own blockchain project (currently on hold). Currently, I'm actively engaged in programming, creating Telegram bots/software, and content creation.",
    ru: "Мне 22 года, я разработчик с разнообразным опытом работы в сферах строительства, уборки, маркетинга, модерации, создания контента, блокчейна и ИТ. Последние 5 лет я сосредоточился на разработке блокчейна и ИТ. Я работал в разных странах, для разных компаний, частных лиц, а также руководил собственным блокчейн-проектом (в настоящее время приостановлен). В настоящее время я активно занимаюсь программированием, созданием Telegram-ботов/программного обеспечения и созданием контента.",
  },

  // Latest Work
  "latest.title": {
    en: "Latest Work",
    ru: "Последние работы",
  },
  "latest.subtitle": {
    en: "Check out my most recent projects",
    ru: "Ознакомьтесь с моими последними проектами",
  },

  // Skills
  "skills.title": {
    en: "Skills",
    ru: "Навыки",
  },
  "skills.blockchain": {
    en: "Blockchain",
    ru: "Блокчейн",
  },
  "skills.development": {
    en: "Development",
    ru: "Разработка",
  },
  "skills.content": {
    en: "Content Creation",
    ru: "Создание контента",
  },

  // Experience
  "experience.title": {
    en: "Experience",
    ru: "Опыт работы",
  },
  "experience.basics.title": {
    en: "Blockchain & Crypto Basics",
    ru: "Основы блокчейна и криптовалют",
  },
  "experience.basics.period": {
    en: "2018 - 2019",
    ru: "2018 - 2019",
  },
  "experience.basics.description": {
    en: "Initial exploration of blockchain technology, NFTs, and tokens. Learning fundamentals of cryptocurrency trading and investments.",
    ru: "Изучение основ блокчейна, NFT и токенов. Первые шаги в криптовалютах и инвестициях.",
  },
  "experience.trading.title": {
    en: "Crypto Trading & Analysis",
    ru: "Трейдинг и анализ крипторынка",
  },
  "experience.trading.period": {
    en: "2019 - 2020",
    ru: "2019 - 2020",
  },
  "experience.trading.description": {
    en: "Active trading and market analysis. Deep dive into altcoins and market trends.",
    ru: "Активная торговля и анализ рынка. Углубленное изучение альткоинов и рыночных трендов.",
  },
  "experience.smart.title": {
    en: "Smart Contracts & Project Leadership",
    ru: "Смарт-контракты и управление проектами",
  },
  "experience.smart.period": {
    en: "2020 - 2023",
    ru: "2020 - 2023",
  },
  "experience.smart.description": {
    en: "Smart contract development and project management. Leading blockchain initiatives. Initial steps in IT development.",
    ru: "Разработка смарт-контрактов и управление проектами. Курирование крипто-проекта. Начало изучения IT.",
  },
  "experience.fullstack.title": {
    en: "Full-Stack Development",
    ru: "Полноценная разработка",
  },
  "experience.fullstack.period": {
    en: "2023 - Present",
    ru: "2023 - Настоящее время",
  },
  "experience.fullstack.description": {
    en: "Advanced smart contract development combined with full IT stack. Building custom solutions and managing personal projects.",
    ru: "Продвинутая разработка смарт-контрактов и полный стек IT. Создание собственных решений и проектов.",
  },

  // Projects
  "projects.title": {
    en: "Projects",
    ru: "Проекты",
  },
  "projects.blockchain.title": {
    en: "Blockchain Project",
    ru: "Блокчейн-проект",
  },
  "projects.blockchain.description": {
    en: "A comprehensive blockchain solution (currently on hold).",
    ru: "Комплексное блокчейн-решение (в настоящее время приостановлено).",
  },
  "projects.telegram.title": {
    en: "Telegram Bots",
    ru: "Telegram-боты",
  },
  "projects.telegram.description": {
    en: "Various automated solutions for Telegram platform.",
    ru: "Различные автоматизированные решения для платформы Telegram.",
  },
  "projects.software.title": {
    en: "Custom Software",
    ru: "Индивидуальное ПО",
  },
  "projects.software.description": {
    en: "Bespoke software solutions for specific client needs.",
    ru: "Индивидуальные программные решения для конкретных потребностей клиентов.",
  },

  // Gallery
  "gallery.title": {
    en: "Gallery",
    ru: "Галерея",
  },

  // CV
  "cv.title": {
    en: "Curriculum Vitae",
    ru: "Резюме",
  },
  "cv.download": {
    en: "Download CV",
    ru: "Скачать резюме",
  },
  "cv.name": {
    en: "Sergei Avramtsuk",
    ru: "Сергей Аврамчук",
  },
  "cv.age": {
    en: "22 years old",
    ru: "22 года",
  },
  "cv.location": {
    en: "Originally from Estonia, currently based in Spain",
    ru: "Родом из Эстонии, в настоящее время проживаю в Испании",
  },
  "cv.profession": {
    en: "Blockchain & IT Developer",
    ru: "Блокчейн & ИТ Разработчик",
  },
  "cv.languages.title": {
    en: "Languages",
    ru: "Языки",
  },
  "cv.languages.russian": {
    en: "Russian - C1 (Native)",
    ru: "Русский - C1 (Родной)",
  },
  "cv.languages.estonian": {
    en: "Estonian - B2",
    ru: "Эстонский - B2",
  },
  "cv.languages.english": {
    en: "English - B2",
    ru: "Английский - B2",
  },
  "cv.skills.title": {
    en: "Skills",
    ru: "Навыки",
  },
  "cv.skills.programming.title": {
    en: "Programming Languages",
    ru: "Языки программирования",
  },
  "cv.skills.programming.primary": {
    en: "Primary: Python, JavaScript/TypeScript, Solidity, HTML/CSS",
    ru: "Основные: Python, JavaScript/TypeScript, Solidity, HTML/CSS",
  },
  "cv.skills.programming.secondary": {
    en: "Secondary: Lua, Bash",
    ru: "Дополнительные: Lua, Bash",
  },
  "cv.skills.technical.title": {
    en: "Technical Skills",
    ru: "Технические навыки",
  },
  "cv.skills.technical.items": {
    en: "Blockchain Development, Smart Contracts, Web3, Node.js, React, Next.js, Telegram Bot Development, API Integration, Database Management",
    ru: "Разработка блокчейн-решений, Смарт-контракты, Web3, Node.js, React, Next.js, Разработка Telegram-ботов, Интеграция API, Управление базами данных",
  },
  "cv.skills.soft.title": {
    en: "Soft Skills",
    ru: "Гибкие навыки",
  },
  "cv.skills.soft.items": {
    en: "Project Management, Team Leadership, Problem Solving, Communication, Adaptability, Self-Learning",
    ru: "Управление проектами, Лидерство в команде, Решение проблем, Коммуникация, Адаптивность, Самообучение",
  },
  "cv.education.title": {
    en: "Education & Self-Learning",
    ru: "Образование и самообучение",
  },
  "cv.education.courses": {
    en: "Programming Courses",
    ru: "Курсы программирования",
  },
  "cv.education.courses.period": {
    en: "2023 - 2025",
    ru: "2023 - 2025",
  },
  "cv.education.courses.description": {
    en: "Self-taught developer, completed various programming courses",
    ru: "Самостоятельное обучение, прохождение различных курсов по программированию",
  },
  "cv.education.smart_contracts": {
    en: "Smart Contracts Development",
    ru: "Разработка смарт-контрактов",
  },
  "cv.education.smart_contracts.period": {
    en: "2021 - 2023",
    ru: "2021 - 2023",
  },
  "cv.education.smart_contracts.description": {
    en: "Learning smart contract development and Chainlink tools",
    ru: "Изучение разработки смарт-контрактов и инструментов Chainlink",
  },
  "cv.experience.title": {
    en: "Experience",
    ru: "Опыт работы",
  },
  "cv.experience.basics": {
    en: "Blockchain & Crypto Basics",
    ru: "Основы блокчейна и криптовалют",
  },
  "cv.experience.basics.period": {
    en: "2018 - 2019",
    ru: "2018 - 2019",
  },
  "cv.experience.basics.description": {
    en: "Initial exploration of blockchain technology, NFTs, and tokens. Learning fundamentals of cryptocurrency trading and investments.",
    ru: "Изучение основ блокчейна, NFT и токенов. Первые шаги в криптовалютах и инвестициях.",
  },
  "cv.experience.trading": {
    en: "Crypto Trading & Analysis",
    ru: "Трейдинг и анализ крипторынка",
  },
  "cv.experience.trading.period": {
    en: "2019 - 2020",
    ru: "2019 - 2020",
  },
  "cv.experience.trading.description": {
    en: "Active trading and market analysis. Deep dive into altcoins and market trends.",
    ru: "Активная торговля и анализ рынка. Углубленное изучение альткоинов и рыночных трендов.",
  },
  "cv.experience.smart": {
    en: "Smart Contracts & Project Leadership",
    ru: "Смарт-контракты и управление проектами",
  },
  "cv.experience.smart.period": {
    en: "2020 - 2023",
    ru: "2020 - 2023",
  },
  "cv.experience.smart.description": {
    en: "Smart contract development and project management. Leading blockchain initiatives. Initial steps in IT development.",
    ru: "Разработка смарт-контрактов и управление проектами. Курирование крипто-проекта. Начало изучения IT.",
  },
  "cv.experience.fullstack": {
    en: "Full-Stack Development",
    ru: "Полноценная разработка",
  },
  "cv.experience.fullstack.period": {
    en: "2023 - Present",
    ru: "2023 - Настоящее время",
  },
  "cv.experience.fullstack.description": {
    en: "Advanced smart contract development combined with full IT stack. Building custom solutions and managing personal projects.",
    ru: "Продвинутая разработка смарт-контрактов и полный стек IT. Создание собственных решений и проектов.",
  },
  "cv.hackathons.title": {
    en: "Hackathons",
    ru: "Хакатоны",
  },
  "cv.hackathons.constellation.title": {
    en: "Chainlink Constellation Hackathon 2023",
    ru: "Chainlink Constellation Хакатон 2023",
  },
  "cv.hackathons.constellation.description": {
    en: "Developed DynamicAI - a blockchain-based AI solution. Project focused on integrating AI with blockchain technology for dynamic content generation and management.",
    ru: "Разработал DynamicAI - блокчейн-решение на основе ИИ. Проект был сосредоточен на интеграции ИИ с блокчейн-технологиями для динамической генерации и управления контентом.",
  },
  "cv.hackathons.blockmagic.title": {
    en: "Chainlink BlockMagic Hackathon 2024",
    ru: "Chainlink BlockMagic Хакатон 2024",
  },
  "cv.hackathons.blockmagic.description": {
    en: "Created OnChainTTT - a decentralized Tic Tac Toe game on Polygon blockchain. Implemented Chainlink VRF for fair gameplay and Chainlink Automation for game state management.",
    ru: "Создал OnChainTTT - децентрализованную игру в крестики-нолики на блокчейне Polygon. Реализовал Chainlink VRF для честной игры и Chainlink Automation для управления состоянием игры.",
  },

  // Footer
  "footer.copyright": {
    en: "© 2024 RuffBuff. All rights reserved.",
    ru: "© 2024 RuffBuff. Все права защищены.",
  },
  "footer.contact": {
    en: "Contact Me",
    ru: "Связаться со мной",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ru")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

