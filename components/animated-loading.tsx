"use client"

import { motion } from "framer-motion"
import { Shield, Brain, Target, BarChart3 } from "lucide-react"

interface AnimatedLoadingProps {
  message?: string
}

export function AnimatedLoading({ message = "Analyzing your career data..." }: AnimatedLoadingProps) {
  const icons = [Shield, Brain, Target, BarChart3]

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className="w-20 h-20 border-4 border-primary/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Inner pulsing circle */}
        <motion.div
          className="absolute inset-2 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Shield className="w-6 h-6 text-primary-foreground" />
          </motion.div>
        </motion.div>

        {/* Floating icons */}
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center shadow-lg"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "0 0",
            }}
            animate={{
              rotate: [0, 360],
              x: [0, Math.cos((index * Math.PI) / 2) * 60],
              y: [0, Math.sin((index * Math.PI) / 2) * 60],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-4 h-4 text-primary" />
          </motion.div>
        ))}
      </div>

      <div className="text-center space-y-2">
        <motion.h3
          className="text-lg font-semibold text-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          AI Processing
        </motion.h3>
        <motion.p
          className="text-sm text-muted-foreground max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {message}
        </motion.p>
      </div>

      {/* Progress dots */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-primary rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}
