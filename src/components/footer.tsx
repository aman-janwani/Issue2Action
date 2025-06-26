"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"

export default function Footer() {
  const links = [
    { name: "About", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Contact", href: "#" },
  ]

  return (
    <footer className="relative bg-[#0d1117] border-t border-[#30363d] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center space-x-2 mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Github className="w-5 h-5 text-[#f0f6fc]" />
            <span className="text-[#f0f6fc] font-medium">Built for developers</span>
          </motion.div>

          <nav className="flex items-center space-x-8">
            {links.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-[#7d8590] hover:text-[#f0f6fc] transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>
        </motion.div>

        <motion.div
          className="mt-8 pt-8 border-t border-[#30363d] text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[#7d8590] text-sm">
            © 2024 Issue2Action. Making GitHub issues make sense, one repo at a time.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
