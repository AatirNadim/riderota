"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              RideRota
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
              Login
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Features
              </Link>
              <Link href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                How It Works
              </Link>
              <Link href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Testimonials
              </Link>
              <Link href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Contact
              </Link>
              <div className="flex flex-col space-y-2 px-3 pt-2">
                <Button variant="ghost" className="justify-start">
                  Login
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">Sign Up</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
