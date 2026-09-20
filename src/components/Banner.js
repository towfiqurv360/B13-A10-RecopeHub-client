// src/components/Banner.js
"use client";
import Link from "next/link";
import { motion } from "framer-motion"; 

export default function Banner() {
  return (
    <section className="relative bg-orange-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
        
        {/* Title Animation */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight"
        >
          Share Your <span className="text-orange-600">Culinary</span> Creations
        </motion.h1>
        
        {/* Description Animation */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-300"
        >
          Discover, create, and share amazing recipes with food enthusiasts around the world. Your next great meal starts here.
        </motion.p>
        
        {/* Call to Action Button Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex gap-4"
        >
          <Link 
            href="/recipes" 
            className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
          >
            Explore Recipes
          </Link>
          <Link 
            href="/dashboard" 
            className="px-8 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-orange-600 dark:text-orange-400 font-semibold rounded-full border border-orange-200 dark:border-gray-700 shadow-sm transition-all duration-300"
          >
            Share a Recipe
          </Link>
        </motion.div>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-orange-400/10 dark:bg-orange-500/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-yellow-400/10 dark:bg-yellow-500/5 blur-3xl"></div>
    </section>
  );
}