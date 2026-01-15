import type { Metadata } from 'next'
import Link from 'next/link'
import { Camera, MapPin, Users, Award, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SimpleGallery } from '@/components/SimpleGallery'
import { loadPharmacy, loadTeam, loadServices } from '@/lib/content'
import { promises as fs } from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'La pharmacie',
  description: 'Découvrez notre officine, nos espaces et notre engagement au service de votre santé.',
}

async function getGalleryImages() {
  const mediaDir = path.join(process.cwd(), 'public', 'media')
  const images: { src: string; alt: string; category: 'interior' | 'exterior' }[] = []

  try {
    // Images intérieur
    const interiorDir = path.join(mediaDir, 'interior')
    const interiorFiles = await fs.readdir(interiorDir).catch(() => [])
    for (const file of interiorFiles) {
      if (/\.(jpg|jpeg|png|webp|avif)$/i.test(file)) {
        images.push({
          src: `/media/interior/${file}`,
          alt: `Intérieur de la pharmacie - ${file.replace(/\.[^.]+$/, '')}`,
          category: 'interior',
        })
      }
    }

    // Images extérieur
    const exteriorDir = path.join(mediaDir, 'exterior')
    const exteriorFiles = await fs.readdir(exteriorDir).catch(() => [])
    for (const file of exteriorFiles) {
      if (/\.(jpg|jpeg|png|webp|avif)$/i.test(file)) {
        images.push({
          src: `/media/exterior/${file}`,
          alt: `Extérieur de la pharmacie - ${file.replace(/\.[^.]+$/, '')}`,
          category: 'exterior',
        })
      }
    }
  } catch {
    // Pas de photos disponibles
  }

  return images
}

export default async function LaPharmaiePage() {
  const pharmacy = await loadPharmacy()
  const team = await loadTeam()
  const services = await loadServices()
  const galleryImages = await getGalleryImages()

  const highlights = [
    {
      icon: Users,
      value: `${team.length}`,
      label: 'professionnels',
    },
    {
      icon: Award,
      value: `${services.length}+`,
      label: 'services',
    },
    {
      icon: MapPin,
      value: 'Fréjus',
      label: 'Var (83)',
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background section-padding">
        <div className="section-container">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{pharmacy.identity.display_name}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Une officine moderne au service de votre santé, avec une équipe à l&apos;écoute et des
            espaces dédiés pour vous accompagner.
          </p>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="section-container -mt-8 relative z-10 mb-12">
        <div className="grid sm:grid-cols-3 gap-4">
          {highlights.map((item, i) => (
            <Card key={i}>
              <CardContent className="p-6 text-center">
                <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold text-primary">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Présentation */}
      <section className="section-container section-padding">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Notre engagement</h2>
          <div className="prose prose-lg text-muted-foreground">
            <p>
              La {pharmacy.identity.display_name} vous accueille du lundi au samedi de 8h30 à 20h00.
              Située à Fréjus, notre officine dispose d&apos;espaces dédiés pour vous accompagner
              dans toutes vos démarches de santé.
            </p>
            <p>
              Notre équipe de {team.length} professionnels est formée pour vous conseiller en
              vaccination, dépistage, orthopédie, matériel médical, et bien plus. Nous parlons
              plusieurs langues pour accueillir au mieux les résidents et les touristes.
            </p>
          </div>
        </div>
      </section>

      {/* Espaces */}
      <section className="bg-muted/50 section-padding">
        <div className="section-container">
          <h2 className="text-2xl font-bold mb-8 text-center">Nos espaces</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Comptoir conseil', desc: 'Accueil et dispensation' },
              { name: 'Espace Betterlife', desc: 'Bien-être et dermocosmétique' },
              { name: 'Orthopédie', desc: 'Mesures et appareillage' },
              { name: 'Matériel médical', desc: 'Location et vente' },
            ].map((space) => (
              <Card key={space.name}>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-1">{space.name}</h3>
                  <p className="text-sm text-muted-foreground">{space.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="section-container section-padding">
        <div className="flex items-center gap-3 mb-8">
          <Camera className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Galerie photos</h2>
        </div>
        <SimpleGallery images={galleryImages} />
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-4">Venez nous rencontrer</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Notre équipe vous accueille du lundi au samedi pour vous conseiller et vous
            accompagner.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Nous trouver
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/equipe">Découvrir l&apos;équipe</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
