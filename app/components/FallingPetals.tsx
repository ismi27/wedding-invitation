"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const petals = Array.from({ length: 18 })

export default function FallingPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: 0,
            opacity: 0.7,
          }}
          animate={{
            y: "110vh",
            x:
              Math.random() * window.innerWidth,
            rotate: 360,
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          className="absolute"
        >
          <Image
            src="/ornaments/petal.png"
            alt="petal"
            width={24}
            height={24}
            className="opacity-70"
          />
        </motion.div>
      ))}
    </div>
  )
}