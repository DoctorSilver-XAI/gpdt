'use client'

import { useState, useEffect } from 'react'
import { Gift, Sparkles, CreditCard, ChevronRight, Star, Trophy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LoyaltyCardProps {
  className?: string
}

export function LoyaltyCard({ className }: LoyaltyCardProps) {
  const [simulatedPoints, setSimulatedPoints] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showSimulator, setShowSimulator] = useState(false)

  // Animation du compteur
  const [displayedProgress, setDisplayedProgress] = useState(0)
  const targetProgress = 42 // Exemple: 42% de progression

  useEffect(() => {
    const timer = setTimeout(() => {
      if (displayedProgress < targetProgress) {
        setDisplayedProgress(prev => Math.min(prev + 1, targetProgress))
      }
    }, 30)
    return () => clearTimeout(timer)
  }, [displayedProgress, targetProgress])

  const handleSimulate = (amount: number) => {
    setIsAnimating(true)
    setSimulatedPoints(amount)
    setTimeout(() => setIsAnimating(false), 600)
  }

  // Couleur magenta de la marque Prix Futés
  const brandMagenta = '#C4368C'

  return (
    <section className={cn('relative overflow-hidden', className)}>
      {/* Background décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-white to-emerald-50/30" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4368C]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-200/20 rounded-full blur-3xl" />

      <div className="section-container section-padding relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C4368C]/10 text-[#C4368C] rounded-full text-sm font-medium mb-4">
            <Gift className="h-4 w-4" />
            Programme fidélité
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Carte Fidélité <span className="text-[#C4368C]">Pharmactiv</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cumulez des points à chaque achat et bénéficiez de 20€ offerts dès 200 points !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          {/* Carte visuelle animée - Design magenta */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#C4368C] via-pink-400 to-[#C4368C] rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
            <Card className="relative overflow-hidden border-0 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C4368C] via-[#A82D76] to-[#8B2A6B]" />
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 border border-white/30 rounded-full" />
                <div className="absolute top-8 right-8 w-20 h-20 border border-white/20 rounded-full" />
                <div className="absolute -bottom-6 -left-6 w-40 h-40 border border-white/20 rounded-full" />
              </div>

              <CardContent className="relative p-8 text-white">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-pink-200 text-sm font-medium tracking-wider uppercase mb-1">
                      Carte Fidélité
                    </p>
                    <p className="text-2xl font-bold tracking-wide">PHARMACTIV</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="h-6 w-6 text-pink-200" />
                    <Trophy className="h-5 w-5 text-pink-200/60" />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-pink-200">Progression</span>
                    <span className="font-bold text-white">
                      {displayedProgress * 2} / 200 pts
                    </span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-white to-pink-200 rounded-full transition-all duration-300 relative"
                      style={{ width: `${displayedProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-pink-200 text-xs">Encore</p>
                    <p className="text-2xl font-bold text-white">
                      {200 - displayedProgress * 2} pts
                    </p>
                    <p className="text-pink-200 text-xs">pour 20€ offerts</p>
                  </div>
                  <CreditCard className="h-10 w-10 text-pink-200/40" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Avantages et simulateur */}
          <div className="space-y-6">
            {/* Avantages */}
            <div className="space-y-4">
              {[
                { icon: CreditCard, text: 'Carte gratuite, disponible en pharmacie' },
                { icon: Star, text: '1€ dépensé = 1 point cumulé' },
                { icon: Gift, text: '200 points = 20€ d\'achats offerts' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-border/50 hover:shadow-md hover:border-[#C4368C]/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#C4368C]/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-[#C4368C]" />
                  </div>
                  <p className="font-medium">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Simulateur */}
            <Card className="border-dashed border-2 border-[#C4368C]/30 bg-pink-50/50">
              <CardContent className="p-5">
                <button
                  onClick={() => setShowSimulator(!showSimulator)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-[#C4368C]" />
                    <span className="font-semibold text-[#8B2A6B]">Simulez vos gains</span>
                  </div>
                  <ChevronRight className={cn(
                    'h-5 w-5 text-[#C4368C] transition-transform duration-300',
                    showSimulator && 'rotate-90'
                  )} />
                </button>

                {showSimulator && (
                  <div className="mt-4 pt-4 border-t border-[#C4368C]/20 space-y-3">
                    <p className="text-sm text-[#8B2A6B]">Votre prochain achat :</p>
                    <div className="flex flex-wrap gap-2">
                      {[20, 30, 50, 100].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handleSimulate(amount)}
                          className={cn(
                            'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300',
                            simulatedPoints === amount
                              ? 'bg-[#C4368C] text-white scale-105 shadow-lg shadow-[#C4368C]/30'
                              : 'bg-white text-[#8B2A6B] hover:bg-pink-100 shadow-sm'
                          )}
                        >
                          {amount}€
                        </button>
                      ))}
                    </div>
                    {simulatedPoints && (
                      <div className={cn(
                        'p-3 bg-[#C4368C]/10 rounded-lg text-center transition-all duration-300',
                        isAnimating && 'scale-105'
                      )}>
                        <p className="text-[#8B2A6B]">
                          Vous gagnez <span className="font-bold text-lg text-[#C4368C]">{simulatedPoints} points</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* CTA */}
            <Button
              size="lg"
              className="w-full group bg-[#C4368C] hover:bg-[#A82D76] shadow-lg shadow-[#C4368C]/20 hover:shadow-xl hover:shadow-[#C4368C]/30"
            >
              Obtenir ma carte en pharmacie
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
