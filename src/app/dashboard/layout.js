"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  FaChartPie, FaUtensils, FaPlusCircle, FaHeart, 
  FaShoppingBag, FaUserAlt, FaCrown, FaUsers, 
  FaFlag, FaMoneyBillWave, FaSignOutAlt 
} from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth(); 
  const pathname = usePathname();

  const userLinks = [
    { name: "Overview", path: "/dashboard", icon: <FaChartPie /> },
    { name: "My Recipes", path: "/dashboard/my-recipes", icon: <FaUtensils /> },
    { name: "Add Recipe", path: "/dashboard/add-recipe", icon: <FaPlusCircle /> },
    { name: "My Favorites", path: "/dashboard/favorites", icon: <FaHeart /> },
    { name: "Purchased", path: "/dashboard/purchased", icon: <FaShoppingBag /> },
    { name: "Profile", path: "/dashboard/profile", icon: <FaUserAlt /> },
    { name: "Premium", path: "/dashboard/premium", icon: <FaCrown className="text-amber-500" /> },
  ];

  const adminLinks = [
    { name: "Overview", path: "/dashboard", icon: <FaChartPie /> },
    { name: "Manage Users", path: "/dashboard/manage-users", icon: <FaUsers /> },
    { name: "Manage Recipes", path: "/dashboard/manage-recipes", icon: <FaUtensils /> },
    { name: "Reports", path: "/dashboard/reports", icon: <FaFlag /> },
    { name: "Transactions", path: "/dashboard/transactions", icon: <FaMoneyBillWave className="text-green-500" /> }, 
    { name: "Profile", path: "/dashboard/profile", icon: <FaUserAlt /> },
  ];

  const linksToShow = user?.role === "admin" ? adminLinks : userLinks;

  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-[#0b0f19] font-sans selection:bg-orange-500/30">
      
      <aside className="sticky top-0 h-screen w-72 bg-white/70 dark:bg-gray-900/50 backdrop-blur-2xl border-r border-gray-200/50 dark:border-gray-800/50 flex flex-col flex-shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
        
        <div className="px-8 pt-10 pb-6">
          <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500 tracking-tighter drop-shadow-sm flex items-center gap-2">
            RecipeHub
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          </h2>
          <div className="mt-4 flex items-center gap-2 px-3 py-1.5 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg border border-gray-200/80 dark:border-gray-700/80 w-max">
            <div className={`w-2 h-2 rounded-full ${user?.role === "admin" ? "bg-indigo-500" : "bg-green-500"}`}></div>
            <p className="text-[11px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">
              {user?.role === "admin" ? "Admin Workspace" : "User Workspace"}
            </p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 overflow-y-auto scrollbar-hide">
          <div className="space-y-1.5">
            {linksToShow.map((link) => {
              const isActive = pathname === link.path;
              
              return (
                <Link 
                  key={link.name}
                  href={link.path}
                  className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 ease-out text-sm font-bold relative overflow-hidden ${
                    isActive 
                      ? "text-white shadow-lg shadow-orange-500/20" 
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-100 transition-opacity duration-300"></div>
                  )}
                  
                  <span className={`relative z-10 text-lg transition-transform duration-300 ${isActive ? "scale-110 text-white" : "group-hover:scale-110 group-hover:text-orange-500"}`}>
                    {link.icon}
                  </span>
                  
                  <span className="relative z-10 tracking-wide">
                    {link.name}
                  </span>

                  {isActive && (
                    <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] z-10"></span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
        
        <div className="p-4 mt-auto">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50 shadow-inner">
            <div className="flex items-center gap-3">
              <img 
                src={user?.image || "https://via.placeholder.com/150"} 
                alt="User" 
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-white dark:ring-gray-800 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || "..."}
                </p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl transition-colors duration-300"
            >
              <FaSignOutAlt /> Log out
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 relative overflow-y-auto h-screen w-full">
        <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-orange-500/5 dark:from-orange-500/5 to-transparent pointer-events-none -z-10"></div>
        
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-full">
          {children}
        </div>
      </main>
      
    </div>
  );
}