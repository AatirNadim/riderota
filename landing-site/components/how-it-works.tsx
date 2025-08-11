"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, UserPlus, Settings, Car, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Organization Setup",
    description: "Super admin creates organization profile and enrolls initial admin team members.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Settings,
    title: "System Configuration",
    description: "Configure workflows, approval processes, and organization-specific policies and settings.",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: Car,
    title: "Driver & Employee Onboarding",
    description: "Admins review and approve driver applications while employees request enrollment access.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: CheckCircle,
    title: "Smart Ride Management",
    description: "Employees request rides, admins assign drivers, and everyone tracks progress in real-time.",
    color: "from-green-500 to-green-600",
  },
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll(".step-card")
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add("animate-in")
              }, index * 200)
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
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              RideRota Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your organization up and running with our streamlined four-step process. From setup to daily operations,
            we make transportation management effortless.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 transform -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="step-card opacity-0 translate-y-8 transition-all duration-700 ease-out hover:shadow-xl border-0 shadow-lg bg-white">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} mb-4 mx-auto`}
                    >
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">STEP {index + 1}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .step-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}
