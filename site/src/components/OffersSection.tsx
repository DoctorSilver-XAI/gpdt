'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Tag, Sparkles, ArrowRight, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  description: string
  image: string
  category: 'prix-futes' | 'actu-mois'
  brand?: string
  price: number
  discount?: string // "-1.00€", "-20%", etc.
}

const OFFERS: Product[] = [
  // Prix Futés - Vrais prix MyPharmactiv
  {
    id: 'eau-micellaire',
    name: 'Eau micellaire démaquillante',
    description: '500 ml',
    image: '/media/products/eau-micellaire.webp',
    category: 'prix-futes',
    brand: 'Pharmactiv Bio',
    price: 6.35,
    discount: '-1.00€',
  },
  {
    id: 'baume-levres',
    name: 'Baume à lèvres certifié bio',
    description: '15 ml',
    image: '/media/products/baume-levres.webp',
    category: 'prix-futes',
    brand: 'Pharmactiv',
    price: 5.75,
  },
  {
    id: 'pastilles-gorge',
    name: 'Pastilles pour la gorge',
    description: '24 pastilles',
    image: '/media/products/pastilles-gorge.webp',
    category: 'prix-futes',
    brand: 'Pharmactiv',
    price: 5.39,
  },
  {
    id: 'savon-anesse',
    name: 'Savon surgras au lait d\'ânesse bio',
    description: '100 g',
    image: '/media/products/savon-anesse.webp',
    category: 'prix-futes',
    brand: 'Pharmactiv',
    price: 2.46,
    discount: '-20%',
  },
  // Actu du mois - Dermasoin (vrais prix)
  {
    id: 'dermasoin-levres',
    name: 'Soin lèvres',
    description: '4 g',
    image: '/media/products/dermasoin-levres.webp',
    category: 'actu-mois',
    brand: 'Dermasoin',
    price: 2.57,
  },
  {
    id: 'dermasoin-cica',
    name: 'Crème cica',
    description: '40 ml',
    image: '/media/products/dermasoin-cica.webp',
    category: 'actu-mois',
    brand: 'Dermasoin',
    price: 6.96,
  },
  {
    id: 'dermasoin-mains',
    name: 'Crème mains réparatrice',
    description: '75 ml',
    image: '/media/products/dermasoin-mains.webp',
    category: 'actu-mois',
    brand: 'Dermasoin',
    price: 4.90,
  },
  {
    id: 'dermasoin-huile',
    name: 'Huile lavante apaisante',
    description: '1 l',
    image: '/media/products/dermasoin-huile.webp',
    category: 'actu-mois',
    brand: 'Dermasoin',
    price: 10.65,
  },
]

interface OffersSectionProps {
  className?: string
  mypharmactivUrl?: string
}

export function OffersSection({ className, mypharmactivUrl = 'https://www.mypharmactiv.fr/offres' }: OffersSectionProps) {
  const [activeTab, setActiveTab] = useState<'prix-futes' | 'actu-mois'>('prix-futes')
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const prixFutes = OFFERS.filter(o => o.category === 'prix-futes')
  const actuMois = OFFERS.filter(o => o.category === 'actu-mois')

  return (
    <section className={cn('bg-gradient-to-b from-white via-secondary/30 to-white', className)}>
      <div className="section-container section-padding">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
              <Sparkles className="h-4 w-4" />
              Offres du moment
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Nos <span className="text-primary">bons plans</span>
            </h2>
          </div>
          <Button variant="outline" asChild className="group w-fit">
            <a href={mypharmactivUrl} target="_blank" rel="noopener noreferrer">
              Voir toutes les offres
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Button>
        </div>

        {/* Tabs - Style MyPharmactiv */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveTab('prix-futes')}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300',
              activeTab === 'prix-futes'
                ? 'bg-[#C4368C] text-white shadow-lg shadow-[#C4368C]/25 scale-105'
                : 'bg-white text-muted-foreground hover:bg-pink-50 shadow-sm border border-border/50'
            )}
          >
            <Tag className="h-4 w-4" />
            Prix Futés
            <Badge variant="secondary" className={cn(
              'ml-1 transition-colors',
              activeTab === 'prix-futes' ? 'bg-white/20 text-white' : 'bg-[#C4368C]/10 text-[#C4368C]'
            )}>
              {prixFutes.length}
            </Badge>
          </button>
          <button
            onClick={() => setActiveTab('actu-mois')}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300',
              activeTab === 'actu-mois'
                ? 'bg-[#D32F2F] text-white shadow-lg shadow-[#D32F2F]/25 scale-105'
                : 'bg-white text-muted-foreground hover:bg-red-50 shadow-sm border border-border/50'
            )}
          >
            <Sparkles className="h-4 w-4" />
            Actu du mois
            <Badge variant="secondary" className={cn(
              'ml-1 transition-colors',
              activeTab === 'actu-mois' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'
            )}>
              {actuMois.length}
            </Badge>
          </button>
        </div>

        {/* Grille produits Prix Futés */}
        {activeTab === 'prix-futes' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {prixFutes.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isHovered={hoveredProduct === product.id}
                onHover={() => setHoveredProduct(product.id)}
                onLeave={() => setHoveredProduct(null)}
                accentColor="amber"
              />
            ))}
          </div>
        )}

        {/* Grille produits Actu du mois - Dermasoin */}
        {activeTab === 'actu-mois' && (
          <>
            <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#D32F2F] flex items-center justify-center">
                  <span className="text-xl font-bold text-white">D</span>
                </div>
                <div>
                  <p className="font-semibold text-[#D32F2F]">Gamme DERMASOIN</p>
                  <p className="text-sm text-muted-foreground">
                    Soins réparateurs haute tolérance pour les peaux sensibles et irritées
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {actuMois.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isHovered={hoveredProduct === product.id}
                  onHover={() => setHoveredProduct(product.id)}
                  onLeave={() => setHoveredProduct(null)}
                  accentColor="emerald"
                />
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground mb-4">
            Ces offres sont disponibles en pharmacie. Venez nous rendre visite !
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/contact">
                Nous trouver
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={mypharmactivUrl} target="_blank" rel="noopener noreferrer">
                Voir sur MyPharmactiv
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ProductCardProps {
  product: Product
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  accentColor: 'amber' | 'emerald'
  compact?: boolean
}

function ProductCard({
  product,
  index,
  isHovered,
  onHover,
  onLeave,
  accentColor,
  compact = false,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  // Couleur magenta de la marque pour Prix Futés
  const isPrixFutes = product.category === 'prix-futes'

  return (
    <Card
      className={cn(
        'group overflow-hidden border-border/50 transition-all duration-300 bg-white',
        isHovered && 'shadow-xl scale-[1.02] border-primary/30',
        'animate-in fade-in slide-in-from-bottom-4',
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <CardContent className={cn('p-0', compact ? 'pb-3' : 'pb-4')}>
        {/* Image */}
        <div className={cn(
          'relative overflow-hidden bg-white',
          compact ? 'aspect-square' : 'aspect-[4/3]'
        )}>
          {!imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className={cn(
                'w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold',
                isPrixFutes ? 'bg-[#C4368C]/10 text-[#C4368C]' : 'bg-red-100 text-red-600'
              )}>
                {product.brand?.charAt(0) || 'P'}
              </div>
            </div>
          )}

          {/* Badge réduction (style MyPharmactiv) */}
          {product.discount && (
            <div className="absolute top-2 left-2">
              <Badge
                className="text-xs font-bold bg-[#C4368C] text-white hover:bg-[#C4368C] px-2.5 py-1 rounded-full"
              >
                {product.discount}
              </Badge>
            </div>
          )}
        </div>

        {/* Infos avec prix */}
        <div className={cn('px-3 text-center', compact ? 'pt-2' : 'pt-3')}>
          {/* Prix - Style MyPharmactiv */}
          <p className={cn(
            'font-bold mb-1',
            isPrixFutes ? 'text-[#C4368C]' : 'text-primary',
            compact ? 'text-lg' : 'text-xl'
          )}>
            {product.price.toFixed(2).replace('.', ',')} €
          </p>

          {/* Nom du produit */}
          <h3 className={cn(
            'font-medium leading-tight text-foreground',
            isPrixFutes ? 'group-hover:text-[#C4368C]' : 'group-hover:text-primary',
            'transition-colors',
            compact ? 'text-xs line-clamp-2' : 'text-sm'
          )}>
            {product.brand} {product.name.toLowerCase()}, {product.description}
          </h3>

          {/* Disponibilité */}
          <p className={cn(
            'mt-2 font-medium',
            isPrixFutes ? 'text-[#1e3a5f]' : 'text-primary',
            compact ? 'text-xs' : 'text-sm'
          )}>
            Demander la disponibilité
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
