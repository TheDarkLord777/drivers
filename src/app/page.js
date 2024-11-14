'use client'
import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/context/AuthContext"
import { CarTaxiFront } from 'lucide-react'

const regions = [
  { name: "Andijan", image: "Andijan.jpg" },
  { name: "Bukhara", image: "Bukhara.jpg" },
  { name: "Fergana", image: "Fergana.jpg" },
  { name: "Jizzakh", image: "Jizzakh.jpg" },
  { name: "Kashkadarya", image: "Kashkadarya.jpg" },
  { name: "Khorezm", image: "Khorezm.jpg" },
  { name: "Namangan", image: "Namangan.jpg" },
  { name: "Navoiy", image: "Navoiy.jpg" },
  { name: "Samarkand", image: "Samarkand.jpg" },
  { name: "Sirdarya", image: "Sirdarya.jpg" },
  { name: "Surkhandarya", image: "Surkhandarya.jpg" },
  { name: "Tashkent", image: "Tashkent.jpg" },
]

const messages = [
  "Assalomu aleykum, My Drivers xizmatiga xush kelibsiz!",
  "O'zbekiston bo'ylab uzoq masofalarga sayohat rejalashtirdingizmi?",
  "Unda bu siz izlayotgan xizmat! My Drivers bilan, siz ishonchli haydovchilar va qulay transport vositalari orqali xavfsiz va yoqimli safar qilishingiz mumkin.",
  "Bizning xizmatlarimiz orqali siz O'zbekistonning eng go'zal joylariga sayohat qilishingiz, shuningdek, shaxsiy va ish safarlar uchun qulay yechim topishingiz mumkin."
]

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated, logout } = useContext(AuthContext)
  const [authStatus, setAuthStatus] = useState(null)
  const [visibleMessageIndex, setVisibleMessageIndex] = useState(0)
  const [showButtons, setShowButtons] = useState(false)
  const [showMessages, setShowMessages] = useState(true)

  useEffect(() => {
    if (authStatus !== isAuthenticated) {
      setAuthStatus(isAuthenticated)
    }
  }, [isAuthenticated, authStatus])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleMessageIndex((prevIndex) => {
        if (prevIndex < messages.length - 1) {
          return prevIndex + 1
        } else {
          clearInterval(interval)
          setTimeout(() => {
            setShowMessages(false)
            setShowButtons(true)
          }, 3000) // Hide messages and show buttons 3 seconds after last message
          return prevIndex
        }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const navigateToRegister = () => {
    router.push("/register")
  }

  const navigateToLogin = () => {
    router.push("/login")
  }

  const handleLogout = async () => {
    try {
      await logout()
      localStorage.clear()
      setAuthStatus(false)
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  if (authStatus === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    )
  }

  const getFontSize = (message) => {
    const length = message.length
    if (length < 30) return 'text-4xl'
    if (length < 60) return 'text-3xl'
    if (length < 90) return 'text-2xl'
    return 'text-xl'
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-2xl flex items-center cursor-pointer">
          <CarTaxiFront className="mr-2" /> My Drivers
        </h1>
        {authStatus && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            Logout
          </button>
        )}
      </header>
      <main className="flex flex-col items-center justify-center flex-1 p-4 overflow-hidden">
        {!authStatus ? (
          <>
            {showMessages && (
              <div className="max-w-2xl mx-auto p-4 absolute inset-0 flex flex-col items-center justify-center">
                {messages.map((message, index) => (
                  <p
                    key={index}
                    className={`mb-4 text-center transition-all duration-1000 ease-in-out ${getFontSize(message)} ${
                      visibleMessageIndex === index
                        ? "opacity-100 translate-y-0"
                        : visibleMessageIndex > index
                        ? "opacity-0 -translate-y-full"
                        : "opacity-0 translate-y-full"
                    } absolute`}
                  >
                    {message}
                  </p>
                ))}
              </div>
            )}

            {showButtons && (
              <div className="flex space-x-4 transition-opacity duration-1000 ease-in-out animate-fade-in absolute">
                <button
                  onClick={navigateToRegister}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                >
                  Ro`yhatdan o`tish
                </button>
                <button
                  onClick={navigateToLogin}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                >
                  Kirish
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {regions.map((region, index) => (
              <div key={index} className="text-center cursor-pointer">
                <img
                  src={`/images/${region.image}`}
                  alt={region.name}
                  className="w-full h-48 object-cover rounded"
                />
                <p className="mt-2">{region.name}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}