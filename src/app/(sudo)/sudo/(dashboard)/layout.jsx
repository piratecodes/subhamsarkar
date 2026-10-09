// ==========================================
// SERVER ACTIONS IMPORTS
// These functions communicate with the auth actions 
// to check the current session and logout the user.
// ==========================================
import { getAuthUser, logout } from "@/actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import SudoSidebar from "@/components/admin/layout/SudoSidebar";
import SudoTopNav from "@/components/admin/layout/SudoTopNav";
import { SidebarProvider } from "@/components/admin/layout/SidebarContext";

export default async function DashboardLayout({ children }) {
  const user = await getAuthUser();
  
  if (!user) {
    redirect("/sudo/login?clear=1");
  }

  const handleLogout = async () => {
    "use server";
    await logout();
    redirect("/sudo/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-surface flex selection:bg-primary-container selection:text-on-primary-container">
        {/* Sidebar Component */}
        <SudoSidebar user={user} />

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* TopNav Component */}
          <SudoTopNav user={user} handleLogout={handleLogout} />
          
          <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-surface relative">
            {/* Animated Background Magic */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
               {/* Primary Glow Orb */}
               <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-primary/10 blur-[120px] animate-[spin_15s_linear_infinite]" style={{ transformOrigin: 'bottom right' }}></div>
               {/* Secondary/Accent Glow Orb */}
               <div className="absolute bottom-[-10%] right-[-5%] w-[50%] aspect-square rounded-full bg-secondary/10 blur-[150px] animate-[spin_25s_linear_infinite]" style={{ transformOrigin: 'top left' }}></div>
               
               {/* Subtle Grid Texture overlay */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <div className="container relative z-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
