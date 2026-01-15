import Link from 'next/link'
import { ArrowRight, Clock, Syringe, TestTube, Stethoscope, Heart, Glasses, Sparkles, HelpCircle, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCategoryLabel, type Service } from '@/lib/content'
import { cn } from '@/lib/utils'

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  prevention: Syringe,
  screening: TestTube,
  clinical_support: Stethoscope,
  medical_equipment: Heart,
  specialty: Glasses,
  dermocosmetics: Sparkles,
  advice: HelpCircle,
  support: Users,
}

const CATEGORY_COLORS: Record<string, string> = {
  prevention: 'bg-blue-50 text-blue-700 border-blue-200',
  screening: 'bg-purple-50 text-purple-700 border-purple-200',
  clinical_support: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  medical_equipment: 'bg-rose-50 text-rose-700 border-rose-200',
  specialty: 'bg-amber-50 text-amber-700 border-amber-200',
  dermocosmetics: 'bg-pink-50 text-pink-700 border-pink-200',
  advice: 'bg-sky-50 text-sky-700 border-sky-200',
  support: 'bg-indigo-50 text-indigo-700 border-indigo-200',
}

interface ServiceCardProps {
  service: Service
  index?: number
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = CATEGORY_ICONS[service.category] || HelpCircle
  const colorClass = CATEGORY_COLORS[service.category] || 'bg-gray-50 text-gray-700 border-gray-200'

  return (
    <Link href={`/services/${service.slug}`} className="group block h-full">
      <Card className={cn(
        'h-full border-border/50 transition-all duration-300',
        'hover:shadow-xl hover:-translate-y-1 hover:border-primary/30',
        'relative overflow-hidden'
      )}>
        {/* Gradient décoratif au survol */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardContent className="relative p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            {/* Badge avec icône */}
            <Badge variant="outline" className={cn('text-xs font-medium border', colorClass)}>
              <Icon className="h-3 w-3 mr-1.5" />
              {getCategoryLabel(service.category)}
            </Badge>
            {/* Flèche animée */}
            <div className="relative">
              <ArrowRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
            {service.name}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
            {service.short_promise}
          </p>

          {/* Footer avec durée et indicateur visuel */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {service.duration_range_min[0]}-{service.duration_range_min[1]} min
              </span>
            </div>
            <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              En savoir plus
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
