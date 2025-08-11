"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Car,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export function Footer() {
  return (
    <footer
      id="contact"
      style={{ backgroundColor: "var(--neutral-900)", color: "white" }}
    >
      {/* Contact Section */}
      <div style={{ borderBottom: "1px solid var(--neutral-800)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Transform Your{" "}
                <span className="text-secondary-gradient">Transportation?</span>
              </h2>
              <p
                className="text-lg mb-8"
                style={{ color: "var(--neutral-300)" }}
              >
                Get in touch with our team to learn how RideRota can streamline
                your {`organization's`} cab management and improve employee
                satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-primary-gradient hover:shadow-custom-hover transition-all duration-100"
                  >
                    Start Free Trial
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white bg-transparent transition-all duration-100"
                    style={{
                      borderColor: "var(--neutral-600)",
                      "&:hover": { backgroundColor: "var(--neutral-800)" },
                    }}
                  >
                    Schedule Demo
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-lg p-8"
              style={{ backgroundColor: "var(--neutral-800)" }}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-xl font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, text: "contact@riderota.com" },
                  { icon: Phone, text: "+1 (555) 123-4567" },
                  {
                    icon: MapPin,
                    text: "123 Business Ave, Tech City, TC 12345",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon
                      className="h-5 w-5 mr-3"
                      style={{ color: "var(--primary-400)" }}
                    />
                    <span style={{ color: "var(--neutral-300)" }}>
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">
                  Subscribe to Updates
                </h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your email"
                    className="text-white placeholder-neutral-400"
                    style={{
                      backgroundColor: "var(--neutral-700)",
                      borderColor: "var(--neutral-600)",
                    }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button style={{ backgroundColor: "var(--primary-600)" }}>
                      Subscribe
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <motion.div
              className="flex items-center space-x-2 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="p-2 bg-primary-gradient rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">RideRota</span>
            </motion.div>
            <p className="mb-6" style={{ color: "var(--neutral-400)" }}>
              The complete solution for organizational transportation
              management, connecting super admins, admins, drivers, and
              employees seamlessly.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href="#"
                    style={{ color: "var(--neutral-400)" }}
                    className="hover:text-primary-400 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {[
            {
              title: "Product",
              links: [
                "Features",
                "Pricing",
                "API Documentation",
                "Integrations",
              ],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog", "Press"],
            },
            {
              title: "Support",
              links: [
                "Help Center",
                "Contact Support",
                "System Status",
                "Security",
              ],
            },
          ].map((section, sectionIndex) => (
            <motion.div key={sectionIndex} variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href="#"
                      className="transition-colors hover:text-white"
                      style={{ color: "var(--neutral-400)" }}
                    >
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid var(--neutral-800)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="text-sm mb-4 md:mb-0"
              style={{ color: "var(--neutral-400)" }}
            >
              © 2024 RideRota. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href="#"
                      className="transition-colors hover:text-white"
                      style={{ color: "var(--neutral-400)" }}
                    >
                      {item}
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
