"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosSecure } from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function PaymentSuccess(){
  const router=useRouter();
  const {updateUserProfile}=useAuth();
  const [state,setState]=useState("Verifying your payment...");
  useEffect(()=>{
    const sessionId=new URLSearchParams(window.location.search).get("session_id");
    if(!sessionId){setState("Payment session is missing.");return;}
    (async()=>{
      try{
        const r=await axiosSecure.post("/payments/confirm-checkout-session",{sessionId});
        if(r.data.user) updateUserProfile(r.data.user);
        setState("Payment successful! Your purchase has been recorded.");
        setTimeout(()=>router.push("/dashboard"),1800);
      }catch(e){setState(e.response?.data?.message||"Payment could not be verified.");}
    })();
  },[router]);
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4"><div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-10 text-center"><div className="text-5xl mb-5">✓</div><h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3">{state}</h1><p className="text-gray-500">Redirecting to your dashboard...</p></div></div>;
}
