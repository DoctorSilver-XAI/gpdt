import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, FileText, MapPin, Users, Stethoscope, Clock, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HoursStatus } from '@/components/HoursStatus'
import { ServiceFinder } from '@/components/ServiceFinder'
import { ServiceCard } from '@/components/ServiceCard'
import { LoyaltyCard } from '@/components/LoyaltyCard'
import { LoyaltyBadge } from '@/components/LoyaltyBadge'
import { OffersSection } from '@/components/OffersSection'
import { loadPharmacy, loadServices, loadFaq } from '@/lib/content'
import { formatPhone } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { AffluenceChart } from '@/components/AffluenceChart'

export default async function HomePage() {
  const pharmacy = await loadPharmacy()
  const services = await loadServices()
  const faq = await loadFaq()

  const featuredServices = services.slice(0, 4)

  return (
    <>
      {/* Hero - Design moderne et impactant */}
      <section className="relative overflow-hidden">
        {/* Background avec gradient et formes décoratives */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl" />

        <div className="section-container relative py-16 sm:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              {/* Badge statut + horaires */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <HoursStatus hours={pharmacy.opening_hours} />
                <Badge variant="outline" className="text-muted-foreground border-border/50">
                  <Clock className="h-3 w-3 mr-1.5" />
                  08:30 - 20:00
                </Badge>
              </div>

              {/* Titre avec accent gradient */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
                Votre santé,{' '}
                <span className="relative">
                  <span className="text-primary">notre priorité</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <path d="M0 6 Q50 0 100 6 T200 6" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              {/* Description enrichie */}
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Une équipe de <strong className="text-foreground">{services.length > 10 ? '15' : '10'}+ professionnels</strong> à votre écoute pour vous accompagner : vaccination, dépistage, orthopédie, matériel médical...
              </p>

              {/* Stats rapides */}
              <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border/50">
                {[
                  { value: '16+', label: 'Services' },
                  { value: '15', label: 'Experts' },
                  { value: '5', label: 'Langues' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTAs améliorés */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all" asChild>
                  <Link href="/rendez-vous">
                    <Calendar className="mr-2 h-5 w-5" />
                    Prendre rendez-vous
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="group" asChild>
                  <Link href="/ordonnance">
                    <FileText className="mr-2 h-5 w-5" />
                    Envoyer une ordonnance
                  </Link>
                </Button>
              </div>

              {/* Adresse avec lien */}
              <div className="mt-8 flex items-center gap-3 text-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{pharmacy.identity.city}</p>
                  <p className="text-muted-foreground">{pharmacy.identity.address_line_1}</p>
                </div>
              </div>
            </div>

            {/* Image avec éléments flottants */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <Image
                  src="/media/exterior/exterieur-1.webp"
                  alt={`Façade de la ${pharmacy.identity.display_name}`}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Card flottante - Contact */}
              <div className="absolute -bottom-6 -left-6 sm:left-auto sm:-right-6 bg-white rounded-2xl shadow-xl p-5 max-w-[240px] border border-border/50 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Appelez-nous</p>
                    <p className="font-semibold text-primary">
                      {formatPhone(pharmacy.contact.phone)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Du lundi au samedi
                </p>
              </div>

              {/* Badge fidélité flottant - interactif */}
              <LoyaltyBadge className="absolute -top-4 -right-4 animate-in fade-in slide-in-from-right-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Accès rapides */}
      <section className="section-container -mt-8 relative z-10 mb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Stethoscope,
              title: 'Nos services',
              desc: 'Vaccination, dépistage, conseils...',
              href: '/services',
            },
            {
              icon: Users,
              title: 'Notre équipe',
              desc: 'Des experts à votre écoute',
              href: '/equipe',
            },
            {
              icon: MapPin,
              title: 'Nous trouver',
              desc: 'Accès et informations pratiques',
              href: '/contact',
            },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <Card className="card-hover h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Affluence Section */}
      <section className="section-container mb-16 relative z-10">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                <Clock className="w-4 h-4" />
                <span>Horaires & Affluence</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 text-slate-900">Planifiez votre visite sereinement</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Pour vous éviter l&apos;attente, consultez nos prévisions d&apos;affluence.
                Nous adaptons notre organisation pour vous servir au mieux, même lors des pics de fréquentation.
              </p>
              <div className="flex flex-col gap-3 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span>Heures creuses : Passage fluide</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-300"></div>
                  <span>Affluence moyenne : &lt; 5 min d&apos;attente</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span>Forte affluence : Équipe renforcée</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <AffluenceChart />
            </div>
          </div>
        </div>
      </section>

      {/* Service Finder */}
      <section className="section-container section-padding">
        <ServiceFinder services={services} />
      </section>

      {/* Services phares */}
      <section className="bg-muted/50 section-padding">
        <div className="section-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Nos services</h2>
              <p className="text-muted-foreground">
                Découvrez notre offre de soins et d&apos;accompagnement
              </p>
            </div>
            <Link
              href="/services"
              className="hidden sm:flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Tous les services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/services">
                Voir tous les services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section Offres du Moment */}
      <OffersSection mypharmactivUrl={pharmacy.public_links.mypharmactiv_listing} />

      {/* Section Carte Fidélité - Gamification */}
      <LoyaltyCard />

      {/* FAQ */}
      <section className="section-container section-padding">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Questions fréquentes</h2>
          <p className="text-muted-foreground text-center mb-8">
            Les réponses à vos questions les plus courantes
          </p>

          <Accordion type="single" collapsible className="w-full">
            {faq.slice(0, 6).map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d&apos;un conseil ?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Notre équipe est à votre disposition pour vous accompagner dans vos démarches de santé.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/rendez-vous">Prendre rendez-vous</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <a href={`tel:${pharmacy.contact.phone.replace(/\s/g, '')}`}>
                Nous appeler
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
