import Link from "next/link";
import {
    FiBookOpen,
    FiFacebook,
    FiTwitter,
    FiInstagram,
    FiGithub,
    FiMail,
    FiArrowRight,
    FiHeart
} from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-300 relative overflow-hidden pt-20 pb-12 border-t border-gray-800 transition-colors duration-300 mt-auto">

            {/* Background Glow Effect */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-gray-800/80">

                    {/* Brand & Description (Takes 2 columns) */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer w-fit">
                            <div className="bg-gradient-to-tr from-orange-600 to-amber-500 text-white p-2.5 rounded-xl group-hover:scale-105 transition duration-300 shadow-lg shadow-orange-600/20">
                                <FiBookOpen className="text-xl" />
                            </div>
                            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-400">
                                RecipeHub
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
                            Discover, share, and enjoy the best recipes from culinary enthusiasts around the world. Your ultimate destination for daily culinary inspiration.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 pt-2">
                            {[
                                { Icon: FiFacebook, href: "https://www.facebook.com/share/199uVLsTh7/" },
                                { Icon: FiTwitter, href: "https://x.com/Towfiqurz960" },
                                { Icon: FiInstagram, href: "https://www.instagram.com/towfiqurv360?stkn=dzRhaTRhYXN6Z29r" },
                                { Icon: FiGithub, href: "https://github.com/towfiqurv360" }
                            ].map(({ Icon, href }, index) => (
                                <a
                                    key={index}
                                    href={href}
                                    className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-orange-600 hover:border-orange-600 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-sm"
                                >
                                    <Icon className="text-base" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
                        <ul className="space-y-2.5 text-sm">
                            {[
                                { name: "Home", path: "/" },
                                { name: "Browse Recipes", path: "/recipes" },
                                { name: "Dashboard", path: "/dashboard" },
                                { name: "About Us", path: "/about" }
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.path}
                                        className="text-gray-400 hover:text-orange-500 transition-colors duration-200 flex items-center gap-1.5 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-orange-500 transition-colors"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Support</h3>
                        <ul className="space-y-2.5 text-sm">
                            {["Help Center", "Privacy Policy", "Terms of Service", "Contact Us"].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href="#"
                                        className="text-gray-400 hover:text-orange-500 transition-colors duration-200 flex items-center gap-1.5 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-orange-500 transition-colors"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="space-y-5">
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Have a question or need help? Reach out to the RecipeHub team through the app.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Stay Updated</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Subscribe to our newsletter for weekly featured recipes.
                            </p>
                        </div>
                        <form className="space-y-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-500 text-sm" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-9 pr-3 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-600/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>Subscribe</span>
                                <FiArrowRight className="text-sm" />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>
                        &copy; {new Date().getFullYear()} RecipeHub. All rights reserved.
                    </p>
                    <p className="flex items-center gap-1.5 font-medium text-gray-400">
                        Crafted with <FiHeart className="text-red-500" /> for food lovers
                    </p>
                </div>
            </div>
        </footer>
    );
}