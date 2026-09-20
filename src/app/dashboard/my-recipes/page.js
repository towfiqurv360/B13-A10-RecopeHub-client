"use client";
import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaEdit, FaEye, FaTrash, FaPlus } from "react-icons/fa";

export default function MyRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => { try { const r = await axiosSecure.get("/recipes/my-recipes"); setRecipes(r.data || []); } catch(e){ toast.error(e.response?.data?.message || "Failed to load recipes"); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const remove = async (id) => { if(!confirm("Delete this recipe?")) return; try { await axiosSecure.delete(`/recipes/${id}`); toast.success("Recipe deleted"); load(); } catch(e){ toast.error(e.response?.data?.message || "Delete failed"); } };
  if(loading) return <div className="p-10 text-center">Loading...</div>;
  return <div className="w-full"><div className="flex items-center justify-between mb-7"><div><h1 className="text-3xl font-black text-gray-900 dark:text-white">My Recipes</h1><p className="text-gray-500 mt-1">Edit, view and delete your recipes.</p></div><Link href="/dashboard/add-recipe" className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-600 text-white font-bold"><FaPlus/> Add Recipe</Link></div>
    {recipes.length===0 ? <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center border dark:border-gray-800"><p className="text-gray-500 mb-5">You have not added any recipes yet.</p><Link href="/dashboard/add-recipe" className="text-orange-600 font-bold">Create your first recipe</Link></div> : <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800"><table className="w-full text-left"><thead><tr className="border-b dark:border-gray-800 text-gray-500 text-sm"><th className="p-4">Recipe</th><th className="p-4">Category</th><th className="p-4">Likes</th><th className="p-4">Actions</th></tr></thead><tbody>{recipes.map(r=><tr key={r._id} className="border-b dark:border-gray-800"><td className="p-4 flex items-center gap-3"><img src={r.recipeImage} alt={r.recipeName} className="w-14 h-14 rounded-lg object-cover"/><span className="font-bold text-gray-900 dark:text-white">{r.recipeName}</span></td><td className="p-4 text-gray-600 dark:text-gray-300">{r.category}</td><td className="p-4">{r.likesCount || 0}</td><td className="p-4"><div className="flex gap-2"><Link href={`/recipes/${r._id}`} className="p-2 rounded-lg bg-gray-100 text-gray-700"><FaEye/></Link><Link href={`/dashboard/edit-recipe/${r._id}`} className="p-2 rounded-lg bg-blue-100 text-blue-600"><FaEdit/></Link><button onClick={()=>remove(r._id)} className="p-2 rounded-lg bg-red-100 text-red-600"><FaTrash/></button></div></td></tr>)}</tbody></table></div>}
  </div>;
}
