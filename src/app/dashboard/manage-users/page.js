"use client";
import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import toast from "react-hot-toast";
import { FaBan, FaCheck, FaCrown } from "react-icons/fa";

export default function ManageUsersPage(){
 const [users,setUsers]=useState([]); const [loading,setLoading]=useState(true);
 const load=async()=>{try{const r=await axiosSecure.get("/users");setUsers(r.data||[])}catch(e){toast.error(e.response?.data?.message||"Failed to load users")}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 const toggleBlock=async(u)=>{if(!confirm(`${u.isBlocked?"Unblock":"Block"} ${u.name}?`))return;try{await axiosSecure.patch(`/users/${u._id}/block`);toast.success(`User ${u.isBlocked?"unblocked":"blocked"}`);load()}catch(e){toast.error(e.response?.data?.message||"Action failed")}};
 const togglePremium=async(u)=>{try{await axiosSecure.patch(`/users/${u._id}`,{isPremium:!u.isPremium});toast.success("Premium status updated");load()}catch(e){toast.error(e.response?.data?.message||"Update failed")}};
 if(loading)return <div className="p-10 text-center">Loading users...</div>;
 return <div className="bg-white dark:bg-gray-900 rounded-2xl border dark:border-gray-800 p-6"><h1 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Manage Users</h1><div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b dark:border-gray-800 text-gray-500"><th className="p-4">User</th><th className="p-4">Role</th><th className="p-4">Premium</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead><tbody>{users.map(u=><tr key={u._id} className="border-b dark:border-gray-800"><td className="p-4"><div className="flex items-center gap-3"><img src={u.image||"https://via.placeholder.com/80"} className="w-10 h-10 rounded-full object-cover" alt=""/><div><p className="font-bold text-gray-900 dark:text-white">{u.name}</p><p className="text-sm text-gray-500">{u.email}</p></div></div></td><td className="p-4 capitalize">{u.role}</td><td className="p-4">{u.isPremium?<FaCrown className="text-amber-500"/>:"—"}</td><td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${u.isBlocked?"bg-red-100 text-red-700":"bg-green-100 text-green-700"}`}>{u.isBlocked?"Blocked":"Active"}</span></td><td className="p-4"><div className="flex gap-2"><button onClick={()=>toggleBlock(u)} className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm ${u.isBlocked?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>{u.isBlocked?<FaCheck/>:<FaBan/>}{u.isBlocked?"Unblock":"Block"}</button><button onClick={()=>togglePremium(u)} className="px-3 py-2 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm">{u.isPremium?"Remove Premium":"Make Premium"}</button></div></td></tr>)}</tbody></table></div></div>;
}
