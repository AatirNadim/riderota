"use client";

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works";
import { TestimonialsSection } from "@/components/testimonials";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <motion.div
      className="min-h-screen bg-hero-gradient"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </motion.div>
  );
}
