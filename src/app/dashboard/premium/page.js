"use client";
import CheckoutForm from "@/components/CheckoutForm";
export default function PremiumUpgradePage(){return <div className="py-16 px-4 bg-gray-50 dark:bg-gray-950 min-h-screen"><div className="max-w-3xl mx-auto text-center mb-10"><h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Upgrade to Premium</h2><p className="text-gray-600 dark:text-gray-400">Get unlimited recipe publishing and a premium badge.</p></div><CheckoutForm paymentType="premium"/></div>}
