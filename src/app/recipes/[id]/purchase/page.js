"use client";
import CheckoutForm from "@/components/CheckoutForm";
import { useParams } from "next/navigation";
export default function RecipePurchasePage(){const {id}=useParams();return <div className="py-16 px-4 bg-gray-50 dark:bg-gray-950 min-h-screen"><div className="max-w-3xl mx-auto text-center mb-10"><h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Unlock Premium Recipe</h2><p className="text-gray-600 dark:text-gray-400">Complete your purchase using Stripe Checkout.</p></div><CheckoutForm paymentType="recipe" recipeId={id}/></div>}
