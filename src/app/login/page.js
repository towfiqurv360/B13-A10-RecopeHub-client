// src/app/login/page.js
"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { axiosSecure } from "@/lib/axios";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { googleSignIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosSecure.post("/auth/login", formData);
      if (res.status === 200) {
        
        localStorage.setItem("user", JSON.stringify({
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.role,
          image: res.data.user.image
        }));

        toast.success("Login successful!");
        
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-950 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-400/20 dark:bg-orange-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/20 dark:bg-amber-600/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/40 dark:border-gray-800 z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30"
          >
            <FiLock className="text-3xl" />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 p-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/50"
            >
              <FiAlertCircle className="text-lg flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          <div className="space-y-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                <FiMail className="text-lg" />
              </div>
              <input
                type="email" 
                required 
                placeholder="Email Address"
                className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                <FiLock className="text-lg" />
              </div>
              <input
                
                type={showPassword ? "text" : "password"}
                required 
                placeholder="Password"
                className="block w-full pl-11 pr-12 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-orange-500 cursor-pointer transition-colors focus:outline-none"
              >
                {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link href="#" className="text-sm font-semibold text-orange-600 hover:text-orange-500 dark:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-orange-500/30 text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:focus:ring-offset-gray-900 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-300"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : "Sign in"}
          </button>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={googleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-offset-gray-900 cursor-pointer transform hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
          >
            <FcGoogle className="text-2xl" />
            Google
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer">
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}