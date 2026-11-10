"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "@/lib/auth-client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Briefcase,
  BriefcaseBusiness ,
  Bookmark,
  FileText,
  CreditCard,
  Settings,
  Users,
  Building2,
  Sparkles,
  ChevronRight,
} from "lucide-react"

const menuItemByRole = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker/dashboard", icon: LayoutDashboard },
    { name: "Browse Jobs", url: "/dashboard/seeker/dashboard/seeker/jobs", icon: Briefcase },
    { name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    { name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter/dashboard", icon: LayoutDashboard },
    { name: "Add Jobs", url: "/dashboard/recruiter/add-jobs", icon: BriefcaseBusiness },
    { name: "Manage Jobs", url: "/dashboard/recruiter/manage-jobs", icon: Briefcase },
    { name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { name: "Jobs", url: "/dashboard/dashboard/dashboard/admin/jobs", icon: Briefcase },
    { name: "Payments", url: "/dashboard/dashboard/admin/payments", icon: CreditCard },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

type UserRole = keyof typeof menuItemByRole

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const userRole = session?.user?.role as UserRole | undefined

  const role: UserRole =
    userRole && userRole in menuItemByRole ? userRole : "seeker"

  const currentMenuItems = menuItemByRole[role]

  const userName = session?.user?.name || "Welcome"
  const userEmail = session?.user?.email || "Your account"

  return (
    <Sidebar className="border-r border-slate-200/70 bg-white">
      {/* Logo */}
      <SidebarHeader className="px-5 pt-7 pb-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:scale-105">
            <Briefcase className="h-5 w-5 text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-[21px] font-extrabold tracking-tight text-slate-900">
              hire<span className="text-orange-500">loop</span>
            </span>
            <span className="text-[10px] font-medium tracking-[2px] text-slate-400 uppercase">
              Career starts here
            </span>
          </div>
        </Link>

        {role === "admin" && (
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-orange-100 bg-orange-50 px-3 py-2">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-semibold text-orange-700">
              Admin Console
            </span>
          </div>
        )}
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3">
        <SidebarGroup className="gap-3">
          <div className="px-3 pb-2">
            <p className="text-[10px] font-bold tracking-[2px] text-slate-400 uppercase">
              Workspace
            </p>
          </div>

          <SidebarMenu className="gap-1.5">
            {currentMenuItems.map((item) => {
              const Icon = item.icon

              const isActive =
                pathname === item.url ||
                (item.url !== "/dashboard" &&
                  item.url !== "/recruiter/dashboard" &&
                  item.url !== "/admin/dashboard" &&
                  pathname.startsWith(`${item.url}/`))

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.name}
                    className={`h-11 rounded-xl px-3 transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:text-white"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Link
                      href={item.url}
                      className="flex h-full w-full items-center gap-3"
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" />

                      <span className="flex-1 text-[13px] font-semibold">
                        {item.name}
                      </span>

                      {isActive && (
                        <ChevronRight className="h-4 w-4 opacity-80" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile Footer */}
      <SidebarFooter className="p-3">
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-md">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold text-slate-800">
                {userName}
              </p>
              <p className="truncate text-[11px] text-slate-400">
                {userEmail}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              {role} account
            </span>

            <Link
              href={role === "admin" ? "/admin/settings" : role === "recruiter" ? "/recruiter/settings" : "/settings"}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 transition-colors hover:text-blue-600"
            >
              Settings
              <Settings className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}