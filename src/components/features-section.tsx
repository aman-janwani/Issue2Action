"use client"

import { motion, Variants } from "framer-motion"
import { Brain, Clock, GitPullRequest } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "Smart Issue Analysis",
      description:
        "Our AI reads between the lines of your messy issue descriptions and figures out what you actually meant.",
    },
    {
      icon: Clock,
      title: "Timeline Estimation",
      description:
        "Get realistic timelines that account for coffee breaks, debugging sessions, and existential crises.",
    },
    {
      icon: GitPullRequest,
      title: "PR Planning",
      description: "Break down complex features into bite-sized PRs that won't make your reviewers cry.",
    },
    // {
    //   icon: Users,
    //   title: "Team Collaboration",
    //   description: "Assign tasks based on who's least likely to break production (we keep track).",
    // },
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
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section className="relative py-20 bg-[#08090a] overflow-hidden">
      {/* Floating elements */}
      <motion.div
        className="absolute top-10 left-10 bg-[#161b22] border border-[#30363d] rounded-2xl p-3 shadow-lg"
        variants={floatingVariants}
        animate="animate"
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-[#2da44e]"></div>
          <span className="text-[#f0f6fc] text-xs">Enhancement</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-32 right-16 bg-[#161b22] border border-[#30363d] rounded-2xl p-3 shadow-lg"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
        whileHover={{ scale: 1.1 }}
      >
        <GitPullRequest className="w-4 h-4 text-[#0969da]" />
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
            Features That Actually <span className="text-[#0969da]">Work</span>
          </h2>
          <p className="text-xl text-[#7d8590] max-w-3xl mx-auto">
            No buzzwords, no fluff. Just tools that help you ship code without losing your sanity.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                borderColor: "#0969da",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="flex items-center justify-center w-12 h-12 bg-[#0969da] bg-opacity-10 rounded-2xl mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-6 h-6 text-[#fff]" />
              </motion.div>
              <h3 className="text-xl font-semibold text-[#f0f6fc] mb-3">{feature.title}</h3>
              <p className="text-[#7d8590] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
