"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import {
    FiSun,
    FiMoon,
    FiHome,
    FiBookOpen,
    FiUser,
    FiLogOut,
    FiLayout,
    FiLogIn,
    FiUserPlus
} from "react-icons/fi";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        setMounted(true);

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentTheme = theme === "system" ? resolvedTheme : theme;

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-orange-600 text-white p-2 rounded-lg group-hover:bg-orange-700 transition">
                            <FiBookOpen className="text-xl" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
                            RecipeHub
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors">
                            <FiHome className="text-lg" />
                            <span>Home</span>
                        </Link>
                        <Link href="/recipes" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors">
                            <FiBookOpen className="text-lg" />
                            <span>All Recipes</span>
                        </Link>
                    </div>

                    {/* Right Section (Theme + Auth) */}
                    <div className="flex items-center gap-4">

                        {/* Theme Toggle Button */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-full cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                aria-label="Toggle Theme"
                            >
                                {currentTheme === "dark" ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
                            </button>
                        )}

                        {/* Divider */}
                        <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>

                        {/* Auth Section */}
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center focus:outline-none cursor-pointer"
                                >
                                    <img
                                        src={user.image || "https://via.placeholder.com/150"}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent hover:ring-orange-500 transition-all duration-300 shadow-sm"
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transform transition-all animate-fade-in-down">
                                        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                {user.name || "User"}
                                            </p>
                                        </div>

                                        <div className="p-2">
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-colors"
                                            >
                                                <FiLayout className="text-lg" />
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/dashboard/profile"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-colors"
                                            >
                                                <FiUser className="text-lg" />
                                                Profile Settings
                                            </Link>
                                        </div>

                                        <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                                            <button
                                                onClick={() => {
                                                    setIsDropdownOpen(false);
                                                    logout();
                                                }}
                                                className="flex w-full items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-left cursor-pointer"
                                            >
                                                <FiLogOut className="text-lg" />
                                                Log out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
                                >
                                    <FiLogIn />
                                    <span>Login</span>
                                </Link>
                                <Link
                                    href="/register"
                                    className="flex items-center gap-2 px-5 py-2 bg-orange-600 text-white rounded-full font-medium hover:bg-orange-700 hover:shadow-md transition-all active:scale-95"
                                >
                                    <FiUserPlus />
                                    <span>Register</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}