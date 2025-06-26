"use client"

import { motion, Variants } from "framer-motion"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Frontend Dev",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=60&width=60",
      quote:
        "Finally, an AI that understands my issues aren't just technical debt, they're technical bankruptcy. Issue2Action helped me dig out of the hole.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Full Stack Engineer",
      company: "StartupXYZ",
      avatar: "/placeholder.svg?height=60&width=60",
      quote:
        "I went from 200+ random issues to a clear roadmap in 10 minutes. Now I actually know what I'm building instead of just hoping for the best.",
      rating: 5,
    },
    {
      name: "Alex Kim",
      role: "DevOps Lead",
      company: "ScaleUp Inc",
      avatar: "/placeholder.svg?height=60&width=60",
      quote:
        "Our backlog was like a digital junk drawer. Issue2Action turned it into something that actually makes sense. My team loves me again.",
      rating: 5,
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const floatingVariants: Variants = {
    animate: {
      y: [-4, 4, -4],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="relative py-20 bg-[#0d1117] overflow-hidden">
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-16 bg-[#161b22] border border-[#30363d] rounded-2xl p-3 shadow-lg"
        variants={floatingVariants}
        animate="animate"
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex items-center space-x-1">
          <Star className="w-3 h-3 text-[#ffd700]" />
          <span className="text-[#f0f6fc] text-xs">5 stars</span>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#f0f6fc] mb-6">
            Developers <span className="text-[#ffd700]">Love</span> It
          </h2>
          <p className="text-xl text-[#7d8590] max-w-3xl mx-auto">
            Real testimonials from real developers who escaped issue hell.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="flex items-center mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <Star className="w-4 h-4 text-[#ffd700] fill-current" />
                  </motion.div>
                ))}
              </motion.div>

              <blockquote className="text-[#f0f6fc] text-lg leading-relaxed mb-6">&quot;{testimonial.quote}&quot;</blockquote>

              <div className="flex items-center">
                <motion.img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <div>
                  <div className="text-[#f0f6fc] font-semibold">{testimonial.name}</div>
                  <div className="text-[#7d8590] text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
