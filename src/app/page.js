"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { axiosSecure } from "../lib/axios";

import { 
  FaHeart, 
  FaUsers, 
  FaUtensils, 
  FaClock, 
  FaGlobe, 
  FaUserPlus, 
  FaPencilAlt, 
  FaTrophy 
} from "react-icons/fa";
import { motion } from "framer-motion";
import Banner from "@/components/Banner";

export default function HomePage() {
  const [data, setData] = useState({
    stats: { totalRecipes: 0, totalUsers: 0 },
    featuredRecipes: [],
    popularRecipes: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await axiosSecure.get("/home");
        
        setData({
          stats: res.data.stats || { totalRecipes: 0, totalUsers: 0 },
          // Accommodate backend response gracefully
          featuredRecipes: res.data.featuredRecipes || [],
          popularRecipes: res.data.popularRecipes || res.data.trendingRecipes || []
        });
      } catch (error) {
        console.error("Failed to fetch home data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      
      {/* 1. Banner / Hero Section */}
      <Banner />

      {/* Extra Static Section 1: Success Stories (Stats) */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          
          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-10 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-800 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-orange-100/50 dark:border-gray-700 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-200/30 dark:bg-gray-700/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="w-20 h-20 mx-auto bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 shadow-md z-10 relative">
              <FaUtensils className="text-4xl text-orange-500" />
            </div>
            <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-2 z-10 relative">{data.stats.totalRecipes}+</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-bold tracking-widest uppercase z-10 relative">Recipes Shared</p>
          </motion.div>

          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-100/50 dark:border-gray-700 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-200/30 dark:bg-gray-700/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="w-20 h-20 mx-auto bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 shadow-md z-10 relative">
              <FaUsers className="text-4xl text-blue-500" />
            </div>
            <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-2 z-10 relative">{data.stats.totalUsers}+</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-bold tracking-widest uppercase z-10 relative">Happy Foodies</p>
          </motion.div>

        </div>
      </section>

      {/* Dynamic Section 1: Featured Recipes */}
      {data.featuredRecipes && data.featuredRecipes.length > 0 && (
        <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center mb-16 text-center">
              <span className="text-orange-600 dark:text-orange-400 font-bold tracking-wider uppercase mb-2">Editor's Choice</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Featured Recipes</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.featuredRecipes.map((recipe, index) => (
                <motion.div 
                  key={recipe._id}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 group flex flex-col"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={recipe.recipeImage} 
                      alt={recipe.recipeName} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      Featured
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
                        {recipe.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {recipe.recipeName}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 font-medium mb-6">
                      <div className="flex items-center gap-1.5">
                        <FaGlobe className="text-orange-500" />
                        {recipe.cuisineType || "Global"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaClock className="text-orange-500" />
                        {recipe.preparationTime || "30 min"}
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <Link 
                        href={`/recipes/${recipe._id}`} 
                        className="block text-center w-full bg-orange-50 dark:bg-gray-700/50 text-orange-600 dark:text-orange-400 font-bold py-3 rounded-xl hover:bg-orange-600 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300 shadow-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Section 2: Popular Recipes */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="text-pink-600 dark:text-pink-400 font-bold tracking-wider uppercase mb-2">Community Favorites</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Popular Recipes</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"></div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
                  <div className="h-60 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-full mt-6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.popularRecipes.map((recipe, index) => (
                <motion.div 
                  key={recipe._id}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 group flex flex-col"
                >
                  <div className="h-60 overflow-hidden relative">
                    <img 
                      src={recipe.recipeImage} 
                      alt={recipe.recipeName} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                      <FaHeart className="text-pink-500 text-sm" /> 
                      <span className="text-sm font-bold text-gray-800 dark:text-white">{recipe.likesCount || 0}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                      {recipe.recipeName}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 font-medium">
                      By <span className="text-gray-800 dark:text-gray-200">{recipe.authorName}</span>
                    </p>
                    
                    <div className="mt-auto">
                      <Link 
                        href={`/recipes/${recipe._id}`} 
                        className="block text-center w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 rounded-xl hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 border border-gray-200 dark:border-gray-600 hover:border-pink-600 dark:hover:border-pink-600 transition-all duration-300 shadow-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && data.popularRecipes.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 py-16 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
              <FaHeart className="text-5xl mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p className="text-lg font-medium">No popular recipes found yet. Check back later!</p>
            </div>
          )}
        </div>
      </section>

      {/* Extra Static Section 2: How It Works */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Join our community and start your culinary journey in three simple steps.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <motion.div variants={fadeUpVariant} className="flex flex-col items-center group">
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-700 mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                <FaUserPlus className="text-4xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Create Account</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Sign up for free and set up your personalized chef profile in seconds.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="flex flex-col items-center group">
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-700 mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                <FaPencilAlt className="text-4xl text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Share Recipes</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Upload your secret recipes, add stunning photos, and share with the world.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="flex flex-col items-center group">
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-700 mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                <FaTrophy className="text-4xl text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Get Featured</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Receive likes, gain followers, and get your recipes featured on our homepage.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}