"use client";
import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaTrash, FaEdit, FaStar } from "react-icons/fa";

export default function ManageRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    try { const res = await axiosSecure.get("/recipes?limit=100"); setRecipes(res.data.recipes || []); }
    catch (e) { toast.error(e.response?.data?.message || "Failed to load recipes"); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const handleFeature = async (id) => {
    try { await axiosSecure.patch(`/recipes/${id}/feature`); toast.success("Featured status updated"); load(); }
    catch (e) { toast.error(e.response?.data?.message || "Failed to update featured status"); }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this recipe permanently?")) return;
    try { await axiosSecure.delete(`/recipes/${id}`); toast.success("Recipe deleted"); load(); }
    catch (e) { toast.error(e.response?.data?.message || "Failed to delete recipe"); }
  };
  if (loading) return <div className="p-10 text-center">Loading recipes...</div>;
  return <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
    <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Manage Recipes</h1>
    <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b dark:border-gray-800 text-gray-500 text-sm"><th className="p-4">Recipe</th><th className="p-4">Author</th><th className="p-4">Category</th><th className="p-4">Likes</th><th className="p-4">Featured</th><th className="p-4">Actions</th></tr></thead>
    <tbody>{recipes.map(r => <tr key={r._id} className="border-b dark:border-gray-800"><td className="p-4 flex items-center gap-3"><img src={r.recipeImage} alt="" className="w-12 h-12 rounded-lg object-cover"/><span className="font-bold text-gray-900 dark:text-white">{r.recipeName}</span></td><td className="p-4 text-gray-600 dark:text-gray-300">{r.authorName}</td><td className="p-4">{r.category}</td><td className="p-4">{r.likesCount || 0}</td><td className="p-4"><button onClick={() => handleFeature(r._id)} className={`p-2 rounded-lg ${r.isFeatured ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400"}`}><FaStar/></button></td><td className="p-4"><div className="flex gap-2"><Link href={`/dashboard/edit-recipe/${r._id}`} className="p-2 bg-blue-100 text-blue-600 rounded-lg"><FaEdit/></Link><button onClick={() => handleDelete(r._id)} className="p-2 bg-red-100 text-red-600 rounded-lg"><FaTrash/></button></div></td></tr>)}</tbody></table></div>
  </div>;
}
