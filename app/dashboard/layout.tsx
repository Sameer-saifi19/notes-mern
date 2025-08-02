import AppSidebar from "@/components/AppSidebar";
import NavBar from "@/components/NavBar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Dashboardlayout({ children }: { children: React.ReactNode }){ 
    return (
        <>
            <SidebarProvider>

            <AppSidebar />
            <main className="w-full">
              <NavBar />
              <div className="px-4">
                {children}
              </div>
            </main>
          </SidebarProvider>
        </>
    )
}