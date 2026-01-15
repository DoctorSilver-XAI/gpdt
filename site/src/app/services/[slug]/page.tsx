import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, CheckCircle, ExternalLink, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmergencyBanner } from '@/components/EmergencyBanner'
import { loadServices, loadServiceBySlug, getCategoryLabel, loadPharmacy } from '@/lib/content'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const services = await loadServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await loadServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service non trouvé',
    }
  }

  return {
    title: service.name,
    description: service.short_promise,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await loadServiceBySlug(slug)
  const pharmacy = await loadPharmacy()

  if (!service) {
    notFound()
  }

  const primaryChannel = service.booking.channels[0]

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b">
        <div className="section-container py-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux services
          </Link>
        </div>
      </div>

      <article className="section-container section-padding">
        <div className="max-w-3xl mx-auto">
          {/* En-tête */}
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {getCategoryLabel(service.category)}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{service.name}</h1>
            <p className="text-xl text-muted-foreground">{service.short_promise}</p>
          </header>

          {/* Infos clés */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Durée estimée</p>
                  <p className="font-medium">
                    {service.duration_range_min[0]}-{service.duration_range_min[1]} minutes
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-2">Ce qu&apos;il faut apporter</p>
                <ul className="space-y-1">
                  {service.what_to_bring.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">À propos de ce service</h2>
            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
          </section>

          {/* CTA Réservation */}
          <Card className="bg-primary/5 border-primary/20 mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{service.booking.primary_cta_label}</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                {primaryChannel.type === 'phone' ? (
                  <Button size="lg" asChild>
                    <a href={`tel:${primaryChannel.value?.replace(/\s/g, '')}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      Appeler la pharmacie
                    </a>
                  </Button>
                ) : (
                  <Button size="lg" asChild>
                    <a href={primaryChannel.url} target="_blank" rel="noopener noreferrer">
                      {service.booking.primary_cta_label}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                {service.booking.channels.length > 1 && (
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href={`tel:${pharmacy.contact.phone.replace(/\s/g, '')}`}
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Nous appeler
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Avertissement sécurité */}
          {service.safety_notice && (
            <div className="mb-8">
              <EmergencyBanner />
            </div>
          )}

          {/* Retour */}
          <div className="pt-8 border-t">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Voir tous les services
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
