"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { axiosSecure } from "@/lib/axios";
import { FiHeart, FiBookmark, FiFlag, FiShoppingCart, FiClock, FiActivity, FiGlobe } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function RecipeDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    try {
      const res = await axiosSecure.get(`/recipes/${id}`);
      setRecipe(res.data);
      setLikesCount(res.data.likesCount || 0);
      if (res.data.isLikedByUser !== undefined) {
        setIsLiked(res.data.isLikedByUser);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching recipe");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount((prev) => (newLikedState ? prev + 1 : prev - 1));

    try {
      await axiosSecure.patch(`/recipes/${id}/like`);
      toast.success(newLikedState ? "Recipe liked!" : "Like removed!");
    } catch (error) {
      setIsLiked(!newLikedState);
      setLikesCount((prev) => (newLikedState ? prev - 1 : prev + 1));
      toast.error(error.response?.data?.message || "Failed to update like status.");
    }
  };

  const handleFavorite = async () => {
    try {
      await axiosSecure.post("/favorites", { recipeId: id });
      toast.success("Added to favorites!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to favorites.");
    }
  };

  const handleReport = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post("/reports", { recipeId: id, reason: reportReason });
      toast.success("Recipe reported successfully.");
      setIsReportModalOpen(false);
      setReportReason("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to report recipe.");
    }
  };

  const handlePurchase = () => {
    router.push(`/recipes/${id}/purchase`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] flex flex-col justify-center items-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Recipe Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400">The recipe you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-300 py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-[#121212] rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
        >
          <div className="relative h-[40vh] md:h-[60vh] w-full bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <img 
              src={recipe.recipeImage || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1200&auto=format&fit=crop"} 
              alt={recipe.recipeName} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <span className="inline-block px-4 py-1.5 mb-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                {recipe.category}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
                {recipe.recipeName}
              </h1>
              <p className="text-white/80 text-sm md:text-base font-medium flex items-center gap-2">
                Crafted by <span className="font-bold text-white">{recipe.authorName}</span>
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center justify-between gap-6 pb-10 border-b border-gray-100 dark:border-gray-800">
              <div className="flex flex-wrap items-center gap-4 md:gap-8">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <div className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-full border border-gray-100 dark:border-gray-800">
                    <FiGlobe className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Cuisine</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{recipe.cuisineType}</p>
                  </div>
                </div>

                <div className="w-px h-10 bg-gray-200 dark:bg-gray-800 hidden md:block"></div>

                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <div className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-full border border-gray-100 dark:border-gray-800">
                    <FiActivity className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Difficulty</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{recipe.difficultyLevel}</p>
                  </div>
                </div>

                <div className="w-px h-10 bg-gray-200 dark:bg-gray-800 hidden md:block"></div>

                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <div className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-full border border-gray-100 dark:border-gray-800">
                    <FiClock className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Prep Time</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{recipe.preparationTime}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={handleLike} 
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full font-medium transition-all"
                >
                  <FiHeart className={isLiked ? "fill-orange-500 text-orange-500" : ""} /> 
                  <span>{likesCount}</span>
                </button>
                <button 
                  onClick={handleFavorite} 
                  className="p-2.5 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full transition-all"
                  title="Save Recipe"
                >
                  <FiBookmark className="text-lg" />
                </button>
                <button 
                  onClick={() => setIsReportModalOpen(true)} 
                  className="p-2.5 bg-gray-50 dark:bg-gray-900 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600 border border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800/50 rounded-full transition-all"
                  title="Report"
                >
                  <FiFlag className="text-lg" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-12">
              <div className="lg:col-span-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ingredients</h3>
                <ul className="space-y-4">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Instructions</h3>
                <div className="space-y-8">
                  {recipe.instructions.map((step, index) => (
                    <div key={index} className="flex gap-5">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white flex items-center justify-center font-bold text-sm border border-gray-200 dark:border-gray-700">
                        {index + 1}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-800 flex justify-center">
              <button 
                onClick={handlePurchase} 
                className="group flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <FiShoppingCart className="text-xl group-hover:scale-110 transition-transform" /> 
                Buy This Recipe
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#121212] p-8 rounded-3xl w-full max-w-md border border-gray-200 dark:border-gray-800 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Report Recipe</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Help us understand what's wrong with this recipe.</p>
            
            <form onSubmit={handleReport}>
              <select 
                required
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-xl px-4 py-3.5 mb-6 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all cursor-pointer"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              >
                <option value="" disabled>Select a reason</option>
                <option value="Spam">Spam or misleading</option>
                <option value="Offensive Content">Offensive content</option>
                <option value="Copyright Issue">Copyright violation</option>
              </select>
              
              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsReportModalOpen(false)} 
                  className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors shadow-md shadow-red-600/20"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}