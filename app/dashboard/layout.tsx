"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; role: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    try {
      const userStr = localStorage.getItem("user")

      if (!userStr) {
        // Set a cookie for middleware to check
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        router.push("/login")
        return
      }

      // Set auth cookie for middleware
      document.cookie = "auth=true; path=/;"

      const userData = JSON.parse(userStr)
      setUser(userData)
    } catch (e) {
      console.error("Error parsing user data:", e)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }, [router])

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  // If not loading and no user, return null (will be redirected by useEffect)
  if (!user) {
    return null
  }

  // Render the dashboard layout
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar userRole={user?.role || "user"} />
      <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
    </div>
  )
}

