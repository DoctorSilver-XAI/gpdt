import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ExternalLink, Phone, Clock, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EmergencyBanner } from '@/components/EmergencyBanner'
import { loadPharmacy, loadServices } from '@/lib/content'
import { formatPhone } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Prendre rendez-vous',
  description: 'Réservez un créneau pour vaccination, dépistage, conseil ou autre service.',
}

export default async function RendezVousPage() {
  const pharmacy = await loadPharmacy()
  const services = await loadServices()

  // Services avec RDV en ligne
  const onlineBookingServices = services.filter((s) =>
    s.booking.channels.some((c) => c.type !== 'phone')
  )

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background section-padding">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calendar className="h-6 w-6" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">Prendre rendez-vous</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Réservez un créneau en ligne ou par téléphone pour votre prochain rendez-vous.
          </p>
        </div>
      </section>

      <section className="section-container section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Plateformes de RDV */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Doctolib */}
            <Card className="card-hover border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🩺</span>
                  Doctolib
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Plateforme de rendez-vous médicaux. Idéale pour vaccination et consultations.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Vaccination (grippe, COVID, etc.)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Confirmation par SMS/email
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <a
                    href={pharmacy.public_links.doctolib}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Réserver sur Doctolib
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* MyPharmactiv */}
            <Card className="card-hover border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💊</span>
                  MyPharmactiv
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Application de votre pharmacie. Pour tous les services officinaux.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Dépistage, entretiens, conseils
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Orthopédie sur rendez-vous
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <a
                    href={pharmacy.public_links.mypharmactiv_listing}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Réserver sur MyPharmactiv
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Par téléphone */}
          <Card className="mb-12">
            <CardContent className="p-6 sm:p-8 text-center">
              <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Préférez le téléphone ?</h2>
              <p className="text-muted-foreground mb-4">
                Notre équipe est disponible pour prendre votre rendez-vous par téléphone.
              </p>
              <a
                href={`tel:${pharmacy.contact.phone.replace(/\s/g, '')}`}
                className="text-3xl font-bold text-primary hover:underline"
              >
                {formatPhone(pharmacy.contact.phone)}
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                Du lundi au samedi, 08:30 - 20:00
              </p>
            </CardContent>
          </Card>

          {/* Services avec RDV */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Services disponibles sur rendez-vous</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {onlineBookingServices.slice(0, 8).map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="flex items-center gap-3 p-4 rounded-lg border hover:border-primary hover:bg-secondary/50 transition-colors group"
                >
                  <Clock className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  <div>
                    <p className="font-medium group-hover:text-primary">{service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.duration_range_min[0]}-{service.duration_range_min[1]} min
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/services">Voir tous les services</Link>
              </Button>
            </div>
          </div>

          {/* Urgence */}
          <EmergencyBanner />
        </div>
      </section>
    </>
  )
}
