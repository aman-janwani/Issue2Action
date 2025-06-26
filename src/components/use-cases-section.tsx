"use client"

import { motion, Variants } from "framer-motion"
import { User, Users, Trash2 } from "lucide-react"

export default function UseCasesSection() {
  const useCases = [
    {
      icon: User,
      title: "Solo Developer",
      description:
        "You're building the next unicorn in your garage. Our AI helps you prioritize features so you don't build a social network for cats (unless that's your thing).",
      highlight: "Perfect for side projects",
    },
    {
      icon: Users,
      title: "Small Team",
      description:
        "Your team of 3-5 developers needs to ship fast without stepping on each other's toes. We'll help you coordinate like a well-oiled machine.",
      highlight: "Scales with your team",
    },
    {
      icon: Trash2,
      title: "Project Cleanup",
      description:
        "Inherited a repo with 847 open issues from 2019? We'll help you separate the gold from the garbage and create a sane roadmap.",
      highlight: "Legacy project savior",
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
      y: [-6, 6, -6],
      rotate: [-1, 1, -1],
      transition: {
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="relative py-20 bg-[#08090a] overflow-hidden">
      {/* Floating elements */}
      <motion.div
        className="absolute top-16 right-12 bg-[#161b22] border border-[#30363d] rounded-2xl p-3 shadow-lg"
        variants={floatingVariants}
        animate="animate"
        whileHover={{ scale: 1.1, rotate: 0 }}
      >
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-[#a5a5a5]"></div>
          <span className="text-[#f0f6fc] text-xs">Backlog</span>
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
            Who This <span className="text-[#2da44e]">Saves</span>
          </h2>
          <p className="text-xl text-[#7d8590] max-w-3xl mx-auto">
            Whether you&apos;re flying solo or herding cats, we&apos;ve got your back.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                borderColor: "#2da44e",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="flex items-center justify-center w-16 h-16 bg-[#2da44e] bg-opacity-10 rounded-2xl mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <useCase.icon className="w-8 h-8 text-[#fff]" />
              </motion.div>
              <motion.div
                className="inline-block bg-[#2da44e] bg-opacity-10 text-[#fff] text-sm px-4 py-2 rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
              >
                {useCase.highlight}
              </motion.div>
              <h3 className="text-2xl font-bold text-[#f0f6fc] mb-4">{useCase.title}</h3>
              <p className="text-[#7d8590] leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
