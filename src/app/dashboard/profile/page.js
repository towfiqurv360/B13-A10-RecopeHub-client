// src/app/dashboard/profile/page.js
"use client";
import { useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiCamera, FiShield, FiAward, FiEdit3 } from "react-icons/fi";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      setUser(localUser);
      setName(localUser.name || "");
    }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axiosSecure.get("/users/profile");
      if (res.data) {
        setUser(res.data);
        setName(res.data.name);

        
        const currentLocal = JSON.parse(localStorage.getItem("user")) || {};
        localStorage.setItem("user", JSON.stringify({ ...currentLocal, ...res.data }));
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (file) => {
    const imageFormData = new FormData();
    imageFormData.append("image", file);
    
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;
    
    const res = await fetch(imgbbUrl, { method: "POST", body: imageFormData });
    const data = await res.json();
    if (data.success) return data.data.display_url;
    throw new Error("Image upload failed");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let updatedImageUrl = user?.image || "";
      
      if (imageFile) {
        toast.loading("Uploading image...", { id: "updateProfile" });
        updatedImageUrl = await handleImageUpload(imageFile);
      }

      toast.loading("Updating profile...", { id: "updateProfile" });

      const res = await axiosSecure.patch("/users/profile", {
        name,
        image: updatedImageUrl,
      });

      if (res.status === 200) {
        toast.success("Profile updated successfully!", { id: "updateProfile" });
        const updatedUser = { ...user, name, image: updatedImageUrl };
        setUser(updatedUser);
        
        const localUser = JSON.parse(localStorage.getItem("user")) || {};
        localStorage.setItem("user", JSON.stringify({ ...localUser, ...updatedUser }));
        
        setPreviewUrl(null);
        setImageFile(null);
      }
    } catch (error) {
      toast.error("Failed to update profile", { id: "updateProfile" });
    } finally {
      setUpdating(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const userRole = user?.role || "user";

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Account Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your profile information and account security.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-gray-900/80 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
            <div className="h-32 bg-gradient-to-r from-orange-500 to-amber-500"></div>
            
            <div className="relative px-6 pb-8 text-center -mt-16">
              <div className="relative inline-block">
                <img 
                  src={previewUrl || user?.image || "https://via.placeholder.com/150"} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-md bg-white dark:bg-gray-800"
                />
                {user?.isPremium && (
                  <div className="absolute bottom-1 right-1 bg-amber-400 text-white p-1.5 rounded-full border-2 border-white dark:border-gray-900 shadow-sm" title="Premium Member">
                    <FiAward className="text-lg" />
                  </div>
                )}
              </div>
              
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{user?.name || "User"}</h2>
              <div className="flex items-center justify-center gap-2 mt-1 text-gray-500 dark:text-gray-400">
                <FiMail className="text-sm" />
                <span className="text-sm">{user?.email}</span>
              </div>
              
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <FiShield className={`text-lg ${userRole === 'admin' ? 'text-indigo-500' : 'text-orange-500'}`} />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize tracking-wide">
                  {userRole} Account
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2">
          <div className="bg-white dark:bg-gray-900/80 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl p-8 transition-all duration-300">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
              <FiEdit3 className="text-2xl text-orange-500" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile Details</h3>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FiUser className="text-gray-400" /> Full Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300" 
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FiCamera className="text-gray-400" /> Profile Picture
                </label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 dark:file:bg-orange-900/30 dark:file:text-orange-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300" 
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">JPG, PNG or GIF. Max size of 2MB.</p>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={updating || (!imageFile && name === user?.name)}
                  className="px-8 py-3.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  {updating ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Saving Changes...
                    </span>
                  ) : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}