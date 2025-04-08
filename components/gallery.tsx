"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { X } from "lucide-react"

export function Gallery() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Project images
  const images = [
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t("gallery.title")}</h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden rounded-lg aspect-video cursor-pointer group"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Project ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium">View</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for full-size image view */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={(e) => {
              // Close modal when clicking the background
              if (e.target === e.currentTarget) {
                setSelectedImage(null)
              }
            }}
          >
            <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="h-8 w-8" />
              </button>
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={`Project ${selectedImage + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg cursor-default"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

