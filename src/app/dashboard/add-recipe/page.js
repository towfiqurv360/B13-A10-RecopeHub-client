"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { axiosSecure } from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiUploadCloud, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";

export default function AddRecipePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    recipeName: "",
    category: "",
    cuisineType: "",
    difficultyLevel: "",
    preparationTime: "",
    ingredients: "",
    instructions: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return toast.error("Please select a recipe image");

    setLoading(true);

    try {
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);
      const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      
      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        imageFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      
      const imageUrl = imgbbResponse.data.data.display_url;

      const formattedIngredients = formData.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      const formattedInstructions = formData.instructions
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      const recipeData = {
        recipeName: formData.recipeName,
        category: formData.category,
        cuisineType: formData.cuisineType,
        difficultyLevel: formData.difficultyLevel,
        preparationTime: formData.preparationTime,
        ingredients: formattedIngredients,
        instructions: formattedInstructions,
        recipeImage: imageUrl,
        authorName: user?.name || "Unknown",
        authorEmail: user?.email,
        authorId: user?.id || user?._id || user?.userId, 
        likesCount: 0,
        isFeatured: false,
        status: "active"
      };

      const backendResponse = await axiosSecure.post("/recipes", recipeData);

      if (backendResponse.status === 201 || backendResponse.status === 200) {
        toast.success("Recipe published successfully!");
        router.push("/dashboard/my-recipes");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Limit reached! Upgrade to premium to add more.");
      } else {
        toast.error("Failed to add recipe. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white dark:bg-[#121212] rounded-[1.5rem] border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
      >
        <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">
            Publish New Recipe
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Share your culinary masterpiece with the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Recipe Name</label>
              <input 
                type="text" 
                name="recipeName" 
                required 
                onChange={handleChange} 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:ring-0 outline-none transition-colors text-sm" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Category</label>
              <input 
                type="text" 
                name="category" 
                required 
                onChange={handleChange} 
                placeholder="e.g. Breakfast, Burger, Drink..." 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:ring-0 outline-none transition-colors text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Cuisine Type</label>
              <input 
                type="text" 
                name="cuisineType" 
                required 
                onChange={handleChange} 
                placeholder="e.g. Italian" 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:ring-0 outline-none transition-colors text-sm" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Difficulty</label>
              <select 
                name="difficultyLevel" 
                required 
                onChange={handleChange} 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:ring-0 outline-none transition-colors appearance-none cursor-pointer text-sm"
              >
                <option value="" disabled>Select Level</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Prep Time</label>
              <input 
                type="text" 
                name="preparationTime" 
                required 
                onChange={handleChange} 
                placeholder="e.g. 30 mins" 
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:ring-0 outline-none transition-colors text-sm" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Ingredients (Comma Separated)</label>
            <textarea 
              name="ingredients" 
              required 
              rows="2" 
              onChange={handleChange} 
              placeholder="Flour, Sugar, Eggs, Milk..." 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:ring-0 outline-none resize-none transition-colors text-sm"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Instructions (One step per line)</label>
            <textarea 
              name="instructions" 
              required 
              rows="3" 
              onChange={handleChange} 
              placeholder="Mix the dry ingredients.&#10;Add milk and stir well.&#10;Bake for 30 minutes..." 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white focus:ring-0 outline-none resize-none transition-colors text-sm"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Cover Image</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 dark:border-gray-800 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-all overflow-hidden relative group">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium text-sm">Change Image</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center pt-4 pb-4">
                  <FiUploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG or WEBP</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-base rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white dark:border-gray-900"></div>
              ) : (
                <>
                  <FiCheck className="text-lg" />
                  Publish Recipe
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}