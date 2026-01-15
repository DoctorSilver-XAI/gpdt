'use client'

import { useState } from 'react'
import { Sparkles, X, Gift, CreditCard, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LoyaltyBadgeProps {
  className?: string
}

export function LoyaltyBadge({ className }: LoyaltyBadgeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      {/* Badge principal */}
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'group flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm text-white shadow-lg transition-all duration-300 cursor-pointer',
          // Couleur magenta/violet de la marque Prix futés
          'bg-[#C4368C] hover:bg-[#A82D76]',
          'shadow-[#C4368C]/30 hover:shadow-xl hover:shadow-[#C4368C]/40',
          'hover:scale-105 active:scale-95',
          className
        )}
        aria-label="En savoir plus sur les 20€ offerts"
      >
        <Sparkles className={cn(
          'h-4 w-4 transition-transform duration-300',
          isHovered && 'rotate-12 scale-110'
        )} />
        <span>20€ offerts</span>
        <ChevronRight className={cn(
          'h-4 w-4 transition-all duration-300 opacity-0 -ml-2',
          isHovered && 'opacity-100 ml-0'
        )} />
      </button>

      {/* Modal/Overlay pour les conditions */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" />

          {/* Contenu */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec gradient */}
            <div className="relative bg-gradient-to-br from-[#C4368C] to-[#8B2A6B] p-6 text-white">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Programme fidélité</p>
                  <p className="text-2xl font-bold">20€ offerts !</p>
                </div>
              </div>

              {/* Décoration */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-white/5 rounded-full" />
            </div>

            {/* Corps */}
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-4 text-foreground">
                Comment ça marche ?
              </h3>

              <div className="space-y-4">
                {[
                  {
                    icon: CreditCard,
                    title: 'Carte gratuite',
                    desc: 'Demandez votre carte fidélité Pharmactiv gratuitement en pharmacie',
                  },
                  {
                    icon: Sparkles,
                    title: '1€ = 1 point',
                    desc: 'Cumulez des points à chaque achat effectué',
                  },
                  {
                    icon: Gift,
                    title: '200 points = 20€',
                    desc: 'Dès 200 points cumulés, profitez de 20€ offerts !',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#C4368C]/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-[#C4368C]" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#C4368C] hover:bg-[#A82D76] text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-[#C4368C]/20 hover:shadow-xl"
                >
                  Obtenir ma carte en pharmacie
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  Valable sur tous vos achats en pharmacie
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
