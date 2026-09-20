"use client";
import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { FaBookOpen, FaHeart, FaThumbsUp, FaUsers, FaUtensils, FaCrown, FaFlag } from "react-icons/fa";
import toast from "react-hot-toast";

export default function DashboardOverview() {
  const { user, updateUserProfile } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosSecure.get("/users/dashboard-stats");
        setStats(res.data.stats || {});
        if (res.data.user) updateUserProfile(res.data.user);
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not load dashboard statistics");
      } finally { setLoading(false); }
    };
    load();
  }, []);

  const admin = user?.role === "admin";
  const cards = admin ? [
    ["Total Users", stats.totalUsers, FaUsers],
    ["Total Recipes", stats.totalRecipes, FaUtensils],
    ["Premium Members", stats.premiumMembers, FaCrown],
    ["Total Reports", stats.totalReports, FaFlag],
  ] : [
    ["Total Recipes", stats.totalRecipes, FaBookOpen],
    ["Total Favorites", stats.totalFavorites, FaHeart],
    ["Likes Received", stats.likesReceived, FaThumbsUp],
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest">Dashboard</p>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mt-2">Welcome, {user?.name || "User"}!</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Here is a quick overview of your RecipeHub activity.</p>
      </div>

      {!admin && (
        <div className="mb-8 rounded-2xl border border-orange-200 dark:border-orange-900/40 bg-orange-50 dark:bg-orange-950/20 p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">Membership</p>
            <p className="text-xl font-black text-gray-900 dark:text-white mt-1">{user?.isPremium ? "Premium Member" : "Normal User"}</p>
          </div>
          {user?.isPremium && <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-white font-black text-sm"><FaCrown /> PREMIUM</span>}
        </div>
      )}

      {loading ? <div className="py-20 text-center text-gray-500">Loading statistics...</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(([label, value, Icon]) => (
            <div key={label} className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center"><Icon /></div>
              <p className="mt-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</p>
              <p className="mt-1 text-4xl font-black text-gray-900 dark:text-white">{value ?? 0}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
