// src/app/dashboard/favorites/page.js
"use client";
import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await axiosSecure.get("/favorites");
      setFavorites(res.data);
    } catch (error) {
      console.error("Failed to fetch favorites", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (confirm("Remove this recipe from favorites?")) {
      try {
        await axiosSecure.delete(`/favorites/${id}`);
        fetchFavorites(); 
      } catch (error) {
        alert("Failed to remove favorite.");
      }
    }
  };

  if (loading) return <div>Loading your favorites...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Favorites</h2>
      
      {favorites.length === 0 ? (
        <p className="text-gray-500">You haven't favorited any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            fav.recipeId ? (
              <div key={fav._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <img src={fav.recipeId.recipeImage} alt={fav.recipeId.recipeName} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{fav.recipeId.recipeName}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <Link 
                      href={`/recipes/${fav.recipeId._id}`} 
                      className="text-orange-600 font-medium hover:underline"
                    >
                      View Details
                    </Link>
                    <button 
                      onClick={() => handleRemove(fav._id)} 
                      className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full cursor-pointer"
                      title="Remove from favorites"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  );
}