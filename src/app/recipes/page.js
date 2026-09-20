"use client";
import { useState, useEffect } from "react";
import { axiosSecure } from "@/lib/axios";
import Link from "next/link";
import { FiHeart, FiUser, FiSearch, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function AllRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const url = selectedCategory && selectedCategory !== "All"
          ? `/recipes?category=${encodeURIComponent(selectedCategory)}&page=${page}&limit=${limit}`
          : `/recipes?page=${page}&limit=${limit}`;
          
        const res = await axiosSecure.get(url);
        
        const fetchedData = Array.isArray(res.data) 
          ? res.data 
          : (res.data?.data || res.data?.recipes || []);
          
        setRecipes(fetchedData);
        setTotalPages(Number(res.data?.totalPages || 1));
      } catch (error) {
        toast.error("Failed to fetch recipes");
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [selectedCategory, page]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-300 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4"
          >
            Culinary Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 dark:text-gray-400 max-w-2xl text-sm md:text-base"
          >
            Explore our curated selection of premium recipes designed for every palate and occasion.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setPage(1); }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                selectedCategory === cat
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-md transform scale-105"
                  : "bg-white dark:bg-[#121212] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        ) : recipes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-white dark:bg-[#121212] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiSearch className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No recipes found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
              We couldn't find any recipes in the "{selectedCategory}" category at the moment.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8"
          >
            {recipes.map((recipe) => (
              <motion.div 
                variants={itemVariants}
                key={recipe._id} 
                className="group flex flex-col bg-white dark:bg-[#121212] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <img 
                    src={recipe.recipeImage || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=400&auto=format&fit=crop"} 
                    alt={recipe.recipeName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-4 right-4 bg-white/95 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/20 dark:border-white/10">
                    <FiHeart className="text-gray-900 dark:text-white text-xs fill-transparent" /> 
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      {recipe.likesCount || 0}
                    </span>
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/95 dark:bg-black/80 backdrop-blur-md text-gray-900 dark:text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm border border-white/20 dark:border-white/10">
                      {recipe.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-1">
                    {recipe.recipeName}
                  </h3>
                  
                  <div className="flex items-center gap-2.5 mb-6 text-gray-500 dark:text-gray-400">
                    <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <FiUser className="text-[10px]" />
                    </div>
                    <span className="text-sm font-medium truncate">
                      {recipe.authorName}
                    </span>
                  </div>
                  
                  <div className="mt-auto pt-5 border-t border-gray-100 dark:border-gray-800/60">
                    <Link 
                      href={`/recipes/${recipe._id}`} 
                      className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors group/link"
                    >
                      View Recipe 
                      <FiArrowRight className="transform group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-4 py-2 rounded-lg border disabled:opacity-40 bg-white dark:bg-[#121212]">Previous</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setPage(n)} className={`w-10 h-10 rounded-lg font-bold ${page === n ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "border bg-white dark:bg-[#121212] text-gray-700 dark:text-gray-300"}`}>{n}</button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="px-4 py-2 rounded-lg border disabled:opacity-40 bg-white dark:bg-[#121212]">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}