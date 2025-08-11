"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Car, UserCheck, BarChart3, Clock, MapPin, Bell, Settings } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Super Admin Control",
    description:
      "Complete organizational oversight with admin management, complaint handling, and comprehensive analytics.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Admin Dashboard",
    description:
      "Streamlined driver and employee enrollment, ride request management, and intelligent assignment algorithms.",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: Car,
    title: "Driver Management",
    description:
      "Efficient task assignment, availability tracking, and seamless communication between drivers and admins.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: UserCheck,
    title: "Employee Portal",
    description: "Easy ride booking, real-time tracking, ride history, and direct complaint escalation system.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive reporting, usage statistics, and performance metrics for data-driven decisions.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Live location updates, ETA calculations, and instant notifications for all stakeholders.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: MapPin,
    title: "Smart Routing",
    description: "Optimized route planning, traffic-aware navigation, and efficient pickup/drop scheduling.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "SMS and email alerts for ride confirmations, updates, and important system notifications.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Settings,
    title: "Flexible Configuration",
    description: "Customizable workflows, approval processes, and organization-specific settings and policies.",
    color: "from-gray-500 to-gray-600",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".feature-card")
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-in")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Every Role
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From super admins to employees, RideRota provides tailored solutions that streamline transportation
            management across your entire organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="feature-card opacity-0 translate-y-8 transition-all duration-700 ease-out hover:shadow-xl hover:scale-105 border-0 shadow-lg"
            >
              <CardContent className="p-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        .feature-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}
