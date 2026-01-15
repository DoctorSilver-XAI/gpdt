'use client'

import { useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Service } from '@/lib/content'

interface ServiceFinderProps {
  services: Service[]
}

const NEEDS = [
  { id: 'vaccination', label: 'Me faire vacciner', keywords: ['vaccination'] },
  { id: 'depistage', label: 'Faire un dépistage', keywords: ['depistage', 'test', 'screening'] },
  { id: 'materiel', label: 'Louer/acheter du matériel médical', keywords: ['materiel', 'location', 'maintien'] },
  { id: 'orthopedie', label: 'Orthopédie / contention', keywords: ['orthopedie', 'orthese', 'contention', 'compression'] },
  { id: 'conseil', label: 'Avoir un conseil personnalisé', keywords: ['aromatherapie', 'sevrage', 'accompagnement', 'diagnostic'] },
  { id: 'suivi', label: 'Suivi de traitement', keywords: ['entretien', 'anticoagulant'] },
]

export function ServiceFinder({ services }: ServiceFinderProps) {
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null)

  const matchedServices = selectedNeed
    ? services.filter((service) => {
        const need = NEEDS.find((n) => n.id === selectedNeed)
        if (!need) return false
        return need.keywords.some(
          (kw) =>
            service.slug.includes(kw) ||
            service.name.toLowerCase().includes(kw) ||
            service.category.includes(kw)
        )
      })
    : []

  return (
    <Card className="bg-gradient-to-br from-secondary/50 to-secondary border-0">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Search className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-semibold">Trouver le bon service</h2>
        </div>

        <p className="text-muted-foreground mb-6">
          Sélectionnez votre besoin pour découvrir les services adaptés.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {NEEDS.map((need) => (
            <button
              key={need.id}
              onClick={() => setSelectedNeed(selectedNeed === need.id ? null : need.id)}
              className={`text-left px-4 py-3 rounded-lg border transition-all ${
                selectedNeed === need.id
                  ? 'border-primary bg-white shadow-sm'
                  : 'border-border bg-white/50 hover:bg-white hover:border-primary/30'
              }`}
            >
              {need.label}
            </button>
          ))}
        </div>

        {matchedServices.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <p className="text-sm font-medium text-muted-foreground">
              {matchedServices.length} service{matchedServices.length > 1 ? 's' : ''} correspond
              {matchedServices.length > 1 ? 'ent' : ''}
            </p>
            {matchedServices.slice(0, 3).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow group"
              >
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    {service.name}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {service.short_promise}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        )}

        {selectedNeed && matchedServices.length === 0 && (
          <div className="pt-4 border-t">
            <p className="text-muted-foreground">
              Aucun service trouvé.{' '}
              <Link href="/contact" className="text-primary hover:underline">
                Contactez-nous
              </Link>{' '}
              pour un conseil personnalisé.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
