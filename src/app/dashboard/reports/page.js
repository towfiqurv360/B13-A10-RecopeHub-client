"use client";
import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ReportsPage(){
 const [reports,setReports]=useState([]); const [loading,setLoading]=useState(true);
 const load=async()=>{try{const r=await axiosSecure.get("/reports");setReports(r.data||[])}catch(e){toast.error(e.response?.data?.message||"Failed to load reports")}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 const dismiss=async(id)=>{try{await axiosSecure.patch(`/reports/${id}/dismiss`);toast.success("Report dismissed");load()}catch(e){toast.error(e.response?.data?.message||"Dismiss failed")}};
 const remove=async(id)=>{if(!confirm("Remove the reported recipe?"))return;try{await axiosSecure.delete(`/reports/${id}/recipe`);toast.success("Recipe removed and report closed");load()}catch(e){toast.error(e.response?.data?.message||"Remove failed")}};
 if(loading)return <div className="p-10 text-center">Loading reports...</div>;
 return <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-6"><h1 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Recipe Reports</h1>{reports.length===0?<p className="text-gray-500">No pending reports.</p>:<div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b dark:border-gray-800 text-gray-500"><th className="p-4">Recipe</th><th className="p-4">Reason</th><th className="p-4">Reporter</th><th className="p-4">Actions</th></tr></thead><tbody>{reports.map(r=><tr key={r._id} className="border-b dark:border-gray-800"><td className="p-4">{r.recipeId?<Link className="text-blue-600 font-bold" href={`/recipes/${r.recipeId._id}`}>{r.recipeId.recipeName}</Link>:<span>Deleted</span>}</td><td className="p-4 font-semibold text-red-600">{r.reason}</td><td className="p-4">{r.userId?.name||r.reporterEmail}</td><td className="p-4"><div className="flex gap-2"><button onClick={()=>dismiss(r._id)} className="px-3 py-2 rounded-lg bg-green-100 text-green-700 font-bold">Dismiss</button>{r.recipeId&&<button onClick={()=>remove(r._id)} className="px-3 py-2 rounded-lg bg-red-100 text-red-700 font-bold">Remove Recipe</button>}</div></td></tr>)}</tbody></table></div>}</div>;
}
