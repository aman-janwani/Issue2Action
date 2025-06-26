"use client"

import { motion, Variants } from "framer-motion"
import { ArrowRight, GitBranch, Zap, Rocket } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: GitBranch,
      title: "Connect",
      description: "Link your GitHub repo and watch our AI dive into your issue chaos like a digital archaeologist.",
    },
    {
      number: "02",
      icon: Zap,
      title: "Analyze",
      description: "Our AI reads every issue, comment, and emoji to understand what you're actually trying to build.",
    },
    {
      number: "03",
      icon: Rocket,
      title: "Execute",
      description: "Get a clear roadmap with timelines, PR suggestions, and tasks that make sense to humans.",
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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
      y: [-8, 8, -8],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="relative py-20 bg-[#0d1117] overflow-hidden">
      {/* Floating elements */}
      <motion.div
        className="absolute bottom-20 left-8 bg-[#161b22] border border-[#30363d] rounded-2xl p-3 shadow-lg"
        variants={floatingVariants}
        animate="animate"
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-[#f85149]"></div>
          <span className="text-[#f0f6fc] text-xs">Bug #404</span>
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
            How It <span className="text-[#2da44e]">Actually</span> Works
          </h2>
          <p className="text-xl text-[#7d8590] max-w-3xl mx-auto">
            Three steps to turn your GitHub nightmare into a developer&apos;s dream.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div key={index} className="relative" variants={itemVariants}>
              <motion.div
                className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 shadow-lg text-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* <motion.div
                  className="text-6xl font-bold text-[#0969da] opacity-20 mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                >
                  {step.number}
                </motion.div> */}
                <motion.div
                  className="flex items-center justify-center w-16 h-16 bg-[#0969da] bg-opacity-10 rounded-2xl mb-6 mx-auto"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <step.icon className="w-8 h-8 text-[#fff]" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#f0f6fc] mb-4">{step.title}</h3>
                <p className="text-[#7d8590] leading-relaxed">{step.description}</p>
              </motion.div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-9 transform -translate-y-1/2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                >
                  <ArrowRight className="w-6 h-6 text-[#30363d]" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
