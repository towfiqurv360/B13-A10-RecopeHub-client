"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosSecure } from "../lib/axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

const loadGoogleScript = () => new Promise((resolve, reject) => {
  if (window.google?.accounts?.id) return resolve();
  const existing = document.getElementById("google-gsi-script");
  if (existing) {
    existing.addEventListener("load", resolve, { once: true });
    existing.addEventListener("error", reject, { once: true });
    return;
  }
  const script = document.createElement("script");
  script.id = "google-gsi-script";
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  script.onload = resolve;
  script.onerror = reject;
  document.head.appendChild(script);
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await axiosSecure.get("/auth/me");
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        document.cookie = "is_auth=true; path=/; max-age=604800"; // 7 days
      } catch {
        localStorage.removeItem("user");
        setUser(null);
        
        document.cookie = "is_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    
    document.cookie = "is_auth=true; path=/; max-age=604800"; 
  };

  const updateUserProfile = (updatedData) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedData };
      localStorage.setItem("user", JSON.stringify(next));
      return next;
    });
  };

  const logout = async () => {
    try { await axiosSecure.post("/auth/logout"); } catch {}
    setUser(null);
    localStorage.removeItem("user");
    
    document.cookie = "is_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const googleSignIn = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId) throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing");
      await loadGoogleScript();

      await new Promise((resolve, reject) => {
        let finished = false;
        const finish = (fn) => (value) => {
          if (finished) return;
          finished = true;
          fn(value);
        };
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response) => {
            try {
              const res = await axiosSecure.post("/auth/google-login", { credential: response.credential });
              login(res.data.user);
              toast.success("Google Login Successful!");
              router.push("/");
              finish(resolve)();
            } catch (error) {
              finish(reject)(error);
            }
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            finish(reject)(new Error("Google sign-in prompt was not displayed."));
          }
        });
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google login failed");
    }
  };

  return <AuthContext.Provider value={{ user, login, logout, googleSignIn, loading, setUser, updateUserProfile }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);