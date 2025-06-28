"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, ArrowRight, Zap, Clock, Shield } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-[#0d1117] overflow-hidden">
      {/* Enhanced dot background */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 35 35' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23f0f6fc' fillOpacity='0.04'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen py-20 relative">
          {/* Floating GitHub Elements with enhanced animations */}
          <motion.div
            className="absolute top-20 left-10 bg-[#161b22] border border-[#30363d] rounded-2xl p-4 shadow-lg"
            variants={floatingVariants}
            animate="animate"
            whileHover={{ scale: 1.1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[#f85149]"></div>
              <span className="text-[#f0f6fc] text-xs font-medium">
                Bug #142
              </span>
            </div>
            <p className="text-[#7d8590] text-xs">Login broken again...</p>
          </motion.div>

          <motion.div
            className="absolute top-32 right-16 bg-[#161b22] border border-[#30363d] rounded-2xl p-4 shadow-lg"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "1s" }}
            whileHover={{ scale: 1.1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[#2da44e]"></div>
              <span className="text-[#f0f6fc] text-xs font-medium">
                Feature #89
              </span>
            </div>
            <p className="text-[#7d8590] text-xs">Dark mode please!</p>
          </motion.div>

          <motion.div
            className="absolute bottom-32 left-20 bg-[#161b22] border border-[#30363d] rounded-2xl p-4 shadow-lg"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "2s" }}
            whileHover={{ scale: 1.1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Zap className="w-3 h-3 text-[#0969da]" />
              <span className="text-[#f0f6fc] text-xs font-medium">
                AI Magic
              </span>
            </div>
            <p className="text-[#7d8590] text-xs">5 PRs ready!</p>
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-12 bg-[#161b22] border border-[#30363d] rounded-2xl p-4 shadow-lg"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "3s" }}
            whileHover={{ scale: 1.1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[#a5a5a5]"></div>
              <span className="text-[#f0f6fc] text-xs font-medium">
                Task #301
              </span>
            </div>
            <p className="text-[#7d8590] text-xs">Refactor everything</p>
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-8 bg-[#161b22] border border-[#30363d] rounded-2xl p-3 shadow-lg"
            variants={pulseVariants}
            animate="animate"
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col space-y-1">
              <div className="w-12 h-1 bg-[#2da44e] rounded-full"></div>
              <div className="w-8 h-1 bg-[#0969da] rounded-full"></div>
              <div className="w-6 h-1 bg-[#7d8590] rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 right-8 bg-[#161b22] border border-[#30363d] rounded-2xl p-4 shadow-lg"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "0.5s" }}
            whileHover={{ scale: 1.1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[#da3633]"></div>
              <span className="text-[#f0f6fc] text-xs font-medium">
                Critical #7
              </span>
            </div>
            <p className="text-[#7d8590] text-xs">Server is on fire 🔥</p>
          </motion.div>

          {/* Centered Content with staggered animations */}
          <motion.div
            className="text-center max-w-4xl mx-auto relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-8 flex flex-col items-center">
              <a
                href="https://www.producthunt.com/products/issues2action?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-issues2action"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=984895&theme=light&t=1751129211536"
                  alt="Issues2Action - Turn&#0032;GitHub&#0032;issues&#0032;into&#0032;clear&#0032;dev&#0032;plans&#0032;—&#0032;instantly&#0032;with&#0032;AI&#0046; | Product Hunt"
                  style={{ width: "250px", height: "54px" }}
                  width="250"
                  height="54"
                />
              </a>
              {/* Trust Indicators */}
              <motion.div
                className="flex items-center justify-center space-x-6 text-sm text-[#7d8590]"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <span>Powered by GitHub API</span>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Trusted by 1,000+ developers</span>
                </div> */}
              </motion.div>

              {/* Main Headlines */}
              <motion.div className="space-y-6" variants={itemVariants}>
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f0f6fc] leading-tight"
                  variants={itemVariants}
                >
                  <span className="text-[#0969da]">GitHub Issues</span>
                  Decoded
                </motion.h1>

                <motion.p
                  className="text-lg sm:text-xl text-[#7d8590] leading-relaxed max-w-3xl mx-auto"
                  variants={itemVariants}
                >
                  Turn your messy backlog into a masterpiece. Our AI speaks
                  fluent &quot;developer chaos&quot; and translates it into
                  actual plans.
                </motion.p>
              </motion.div>

              {/* Feature Highlights */}
              <motion.div
                className="flex flex-wrap justify-center gap-6 text-sm text-[#7d8590]"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-[#2da44e]" />
                  <span>{"< 2 second analysis"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-[#2da44e]" />
                  <span>Secure connection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#2da44e]" />
                  <span>Real-time updates</span>
                </div>
              </motion.div>

              {/* Call-to-Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SignInButton>
                    <Button
                      size="lg"
                      className="bg-[#238636] hover:bg-[#2da44e] text-white border-0 px-8 py-4 text-base font-medium transition-all duration-200 rounded-2xl shadow-lg hover:shadow-xl"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Connect GitHub
                      <motion.div
                        animate={{ x: isHovered ? 4 : 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </motion.div>
                    </Button>
                  </SignInButton>
                </motion.div>

                {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#30363d] text-[#30363d] hover:text-[#f0f6fc] hover:bg-[#161b22] hover:border-[#0969da] px-8 py-4 text-base font-medium transition-all duration-200 rounded-2xl"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    View Demo
                  </Button>
                </motion.div> */}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
