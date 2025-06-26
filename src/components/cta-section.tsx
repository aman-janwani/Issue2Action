"use client"

import { useState } from "react"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, ArrowRight, Zap } from "lucide-react"

export default function CTASection() {
  const [isHovered, setIsHovered] = useState(false)


const floatingVariants: Variants = {
  animate: {
    y: [-8, 8, -8],
    rotate: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut", // or [0.42, 0, 0.58, 1] if string causes issues
    },
  },
};

  return (
    <section className="relative py-20 bg-[#08090a] overflow-hidden">
      {/* Floating elements */}
      <motion.div
        className="absolute top-10 left-10 bg-[#161b22] border border-[#30363d] rounded-2xl p-4 shadow-lg"
        variants={floatingVariants}
        animate="animate"
        whileHover={{ scale: 1.1, rotate: 0 }}
      >
        <div className="flex items-center space-x-2">
          <Zap className="w-3 h-3 text-[#0969da]" />
          <span className="text-[#f0f6fc] text-xs">Ready to ship!</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 bg-[#161b22] border border-[#30363d] rounded-2xl p-4 shadow-lg"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
        whileHover={{ scale: 1.1, rotate: 0 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#2da44e]"></div>
          <span className="text-[#f0f6fc] text-xs">Issues solved</span>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f0f6fc] leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to <span className="text-[#0969da]">Decode</span>
            <br />
            Your Issues?
          </motion.h2>

          <motion.p
            className="text-xl sm:text-2xl text-[#7d8590] leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Stop drowning in your backlog. Start shipping features that matter.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-[#238636] hover:bg-[#2da44e] text-white border-0 px-8 py-4 text-lg font-medium transition-all duration-200 rounded-2xl shadow-lg hover:shadow-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Github className="w-5 h-5 mr-2" />
                Get Started Free
                <motion.div animate={{ x: isHovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>

          <motion.p
            className="text-sm text-[#7d8590]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            No credit card required • 5-minute setup • Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
