'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GalleryImage {
  src: string
  alt: string
  category: 'interior' | 'exterior'
}

interface SimpleGalleryProps {
  images: GalleryImage[]
}

export function SimpleGallery({ images }: SimpleGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'interior' | 'exterior'>('all')

  const filteredImages = filter === 'all' ? images : images.filter((img) => img.category === filter)

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredImages.length)
    }
  }

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length)
    }
  }

  if (images.length === 0) {
    return (
      <div className="bg-muted rounded-lg p-12 text-center">
        <p className="text-muted-foreground">
          Galerie photos à venir.
          {/* TODO: Ajouter des photos dans /public/media/interior et /public/media/exterior */}
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Filtres */}
      <div className="flex gap-2 mb-6">
        {[
          { value: 'all', label: 'Toutes' },
          { value: 'interior', label: 'Intérieur' },
          { value: 'exterior', label: 'Extérieur' },
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value as typeof filter)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              filter === value
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <button
            key={image.src}
            onClick={() => openLightbox(index)}
            className="relative aspect-[4/3] rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div
            className="relative max-w-4xl max-h-[80vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filteredImages[selectedIndex].src}
              alt={filteredImages[selectedIndex].alt}
              width={1200}
              height={800}
              className="object-contain w-full h-full"
            />
            <p className="text-white text-center mt-4">
              {filteredImages[selectedIndex].alt}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Photo suivante"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </>
  )
}
