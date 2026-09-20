"use client";
import { useState } from "react";
import { axiosSecure } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { FiLock, FiCreditCard } from "react-icons/fi";

export default function CheckoutForm({ paymentType, recipeId = null }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.post("/payments/create-checkout-session", { paymentType, recipeId });
      if (!res.data?.url) throw new Error("Stripe Checkout URL was not returned.");
      window.location.href = res.data.url;
    } catch (e) {
      alert(e.response?.data?.message || e.message || "Could not start checkout");
      setLoading(false);
    }
  };
  return <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl text-center"><div className="w-14 h-14 mx-auto rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-5"><FiCreditCard className="text-2xl text-blue-600"/></div><h3 className="text-2xl font-black text-gray-900 dark:text-white">Secure Stripe Checkout</h3><p className="text-gray-500 dark:text-gray-400 mt-2 mb-7">You will be redirected to Stripe's hosted Checkout page to complete your payment.</p><button onClick={handleCheckout} disabled={loading} className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-60">{loading?"Redirecting to Stripe...":"Continue to Stripe Checkout"}</button><p className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-1"><FiLock/> Secure payment powered by Stripe</p></div>;
}
