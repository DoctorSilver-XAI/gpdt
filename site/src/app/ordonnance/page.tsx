import type { Metadata } from 'next'
import { FileText, Upload, Clock, CheckCircle, ExternalLink, Phone, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EmergencyBanner } from '@/components/EmergencyBanner'
import { loadPharmacy } from '@/lib/content'
import { formatPhone } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Transmettre une ordonnance',
  description:
    'Envoyez votre ordonnance en ligne pour préparer vos médicaments et gagner du temps.',
}

export default async function OrdonnancePage() {
  const pharmacy = await loadPharmacy()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background section-padding">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">Transmettre une ordonnance</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Envoyez votre ordonnance en avance pour que vos médicaments soient prêts à votre
            arrivée.
          </p>
        </div>
      </section>

      <section className="section-container section-padding">
        <div className="max-w-3xl mx-auto">
          {/* Comment ça marche */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Comment ça marche ?</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  step: 1,
                  icon: Upload,
                  title: 'Envoyez',
                  desc: 'Prenez en photo votre ordonnance et transmettez-la via MyPharmactiv.',
                },
                {
                  step: 2,
                  icon: Clock,
                  title: 'Préparation',
                  desc: 'Nous préparons vos médicaments et vous informons quand ils sont prêts.',
                },
                {
                  step: 3,
                  icon: CheckCircle,
                  title: 'Récupérez',
                  desc: 'Venez retirer votre commande avec votre ordonnance originale.',
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div className="text-sm text-primary font-medium mb-1">Étape {item.step}</div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Principal */}
          <Card className="bg-primary/5 border-primary/20 mb-8">
            <CardContent className="p-6 sm:p-8 text-center">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Envoyer mon ordonnance</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Transmettez votre ordonnance via la plateforme sécurisée MyPharmactiv.
              </p>
              <Button size="lg" asChild>
                <a
                  href={pharmacy.public_links.mypharmactiv_listing}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Transmettre via MyPharmactiv
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Infos importantes */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Informations importantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Apportez l&apos;ordonnance originale</strong> lors du retrait pour la
                    validation et le remboursement.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Délai de préparation</strong> : généralement sous 2h pendant les
                    heures d&apos;ouverture.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Produits non disponibles</strong> : nous vous contactons si un
                    médicament doit être commandé.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    Aucune donnée de santé n&apos;est stockée sur ce site. La transmission est
                    sécurisée via MyPharmactiv.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact téléphone */}
          <Card className="mb-8">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-4">
              <Phone className="h-8 w-8 text-primary flex-shrink-0" />
              <div className="text-center sm:text-left">
                <p className="font-medium">Une question sur votre ordonnance ?</p>
                <p className="text-sm text-muted-foreground">
                  Appelez-nous au{' '}
                  <a
                    href={`tel:${pharmacy.contact.phone.replace(/\s/g, '')}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {formatPhone(pharmacy.contact.phone)}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Urgence */}
          <EmergencyBanner />
        </div>
      </section>
    </>
  )
}
