"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"
import { testimonials } from "@/public/data/testimonials"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--neutral-900)" }}>
            What Our <span className="text-primary-gradient">Users Say</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--neutral-600)" }}>
            {`Don't`} just take our word for it. {`Here's`} what real users across different roles have to say about their
            RideRota experience.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "var(--shadow-2xl)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="border-0 shadow-custom relative overflow-hidden h-full">
                <CardContent className="p-6">
                  <motion.div
                    className="absolute top-4 right-4 opacity-10"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <Quote className="h-8 w-8" style={{ color: "var(--primary-600)" }} />
                  </motion.div>

                  <motion.div
                    className="flex items-center mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 500 }}
                      >
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <p className="mb-6 leading-relaxed" style={{ color: "var(--neutral-600)" }}>
                    {testimonial.content}
                  </p>

                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    />
                    <div>
                      <div className="font-semibold" style={{ color: "var(--neutral-900)" }}>
                        {testimonial.name}
                      </div>
                      <div className="text-sm" style={{ color: "var(--neutral-500)" }}>
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
