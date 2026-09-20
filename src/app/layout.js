import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RecipeHub | Share Your Culinary Creations",
  description: "A centralized space for recipe sharing and culinary inspiration.",
};

export default function RootLayout({ children }) {
  return (
   
    <html lang="en" suppressHydrationWarning>
      
      <body className={`${inter.className} flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            {/* Navbar */}
            <Navbar />
            
            {/* Main Content */}
            <main className="flex-grow">
              {children}
            </main>
            
            {/* Footer */}
            <Footer />
            
            <Toaster 
              position="top-center" 
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }} 
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}