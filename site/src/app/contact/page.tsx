import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Clock, Car, Accessibility, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HoursStatus } from '@/components/HoursStatus'
import { loadPharmacy, getLanguageLabel } from '@/lib/content'
import { formatPhone } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contact & Accès',
  description: 'Horaires, adresse et informations pratiques pour venir à la pharmacie.',
}

export default async function ContactPage() {
  const pharmacy = await loadPharmacy()

  const days = [
    { key: 'monday', label: 'Lundi' },
    { key: 'tuesday', label: 'Mardi' },
    { key: 'wednesday', label: 'Mercredi' },
    { key: 'thursday', label: 'Jeudi' },
    { key: 'friday', label: 'Vendredi' },
    { key: 'saturday', label: 'Samedi' },
    { key: 'sunday', label: 'Dimanche' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background section-padding">
        <div className="section-container">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact & Accès</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Toutes les informations pratiques pour nous trouver et nous contacter.
          </p>
          <div className="mt-6">
            <HoursStatus hours={pharmacy.opening_hours} />
          </div>
        </div>
      </section>

      <section className="section-container section-padding">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Infos */}
          <div className="space-y-6">
            {/* Adresse */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg mb-2">Adresse</h2>
                    <p className="text-muted-foreground">
                      {pharmacy.identity.address_line_1}
                      <br />
                      {pharmacy.identity.postal_code} {pharmacy.identity.city}
                    </p>
                    <Button variant="link" className="px-0 mt-2" asChild>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${pharmacy.identity.display_name} ${pharmacy.identity.address_line_1} ${pharmacy.identity.city}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ouvrir dans Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Téléphone */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg mb-2">Téléphone</h2>
                    <a
                      href={`tel:${pharmacy.contact.phone.replace(/\s/g, '')}`}
                      className="text-2xl font-semibold text-primary hover:underline"
                    >
                      {formatPhone(pharmacy.contact.phone)}
                    </a>
                    {pharmacy.contact.fax && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Fax : {formatPhone(pharmacy.contact.fax)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Horaires */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg mb-4">Horaires d&apos;ouverture</h2>
                    <ul className="space-y-2">
                      {days.map(({ key, label }) => {
                        const slots = pharmacy.opening_hours[key] || []
                        return (
                          <li key={key} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{label}</span>
                            <span className="font-medium">
                              {slots.length > 0
                                ? `${slots[0].opens} - ${slots[0].closes}`
                                : 'Fermé'}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Infos pratiques */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Car className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Parking</p>
                    <p className="text-xs text-muted-foreground">À proximité</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Accessibility className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Accessibilité</p>
                    <p className="text-xs text-muted-foreground">Accès PMR</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Langues */}
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Langues parlées</p>
                  <p className="text-sm text-muted-foreground">
                    {pharmacy.languages_spoken.map(getLanguageLabel).join(', ')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Carte */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] bg-muted relative">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                    `${pharmacy.identity.display_name} ${pharmacy.identity.address_line_1} ${pharmacy.identity.city}`
                  )}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation de la pharmacie"
                  className="absolute inset-0"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Button className="flex-1" asChild>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                        `${pharmacy.identity.address_line_1} ${pharmacy.identity.postal_code} ${pharmacy.identity.city}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Itinéraire
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={`tel:${pharmacy.contact.phone.replace(/\s/g, '')}`}>Appeler</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
