import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset className="min-w-0">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-white px-5">
          <SidebarTrigger />
          <span className="text-sm font-semibold text-slate-700">
            Dashboard
          </span>
        </header>

        <main className="min-h-[calc(100vh-8rem)] flex-1 bg-slate-50 p-5 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout