"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Brain,
  FileText,
  Home,
  Settings,
  TrendingUp,
  Users,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Employee Profile", href: "/employee", icon: User },
  { name: "Skill Insights", href: "/skills", icon: Brain },
  { name: "Company Analytics", href: "/analytics", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Industry Trends", href: "#trends", icon: TrendingUp },
  { name: "Settings", href: "#settings", icon: Settings },
]

interface SidebarProps {
  user: { id: string; name: string; email: string }
  userProfile?: {
    jobTitle: string
    department: string
    performanceRating: string
  } | null
  onLogout: () => void
}

export function Sidebar({ user, userProfile, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const getRiskLevel = () => {
    if (!userProfile) return "Unknown"

    // Simple risk calculation based on performance rating
    switch (userProfile.performanceRating) {
      case "exceeds":
        return "Low"
      case "meets":
        return "Medium"
      case "below":
        return "High"
      default:
        return "Unknown"
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-sidebar-primary-foreground" />
              </div>
              <span className="font-bold text-sidebar-foreground">LayoffGuard</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent/10"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {!collapsed && (
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/professional-woman-diverse.png" alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-sidebar-foreground/70">{userProfile?.jobTitle || "User"}</p>
                  <Badge variant="secondary" className={`text-xs ${getRiskColor(getRiskLevel())}`}>
                    {getRiskLevel()} Risk
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 space-y-1 p-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-foreground",
                )}
              >
                <item.icon className={cn("flex-shrink-0 w-5 h-5", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && item.name}
              </Link>
            )
          })}
        </nav>

        {!collapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/10"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
