"use client";
import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function PurchasedRecipesPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await axiosSecure.get("/payments/purchased");
      setPurchases(res.data);
    } catch (error) {
      toast.error("Failed to load purchased recipes");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading purchased recipes...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Purchased Recipes</h2>
      
      {purchases.length === 0 ? (
        <p className="text-gray-500">You haven't purchased any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchases.map((item) => (
            item.recipeId ? (
              <div key={item._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <img src={item.recipeId.recipeImage} alt={item.recipeId.recipeName} className="w-full h-40 object-cover" />
                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.recipeId.recipeName}</h3>
                    <p className="text-sm text-gray-500 mb-3">Paid: ${item.amount}</p>
                  </div>
                  <Link 
                    href={`/recipes/${item.recipeId._id}`} 
                    className="inline-block text-center bg-orange-100 text-orange-700 py-2 rounded font-medium hover:bg-orange-200"
                  >
                    View Full Recipe
                  </Link>
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  );
}