import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { BreadcrumbDemo } from "@/components/app-breadcrumb"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <AppSidebar />
      <main className="p-4">
      <BreadcrumbDemo />
        <div className="p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}