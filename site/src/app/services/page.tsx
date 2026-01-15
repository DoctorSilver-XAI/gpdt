import type { Metadata } from 'next'
import { ServiceCard } from '@/components/ServiceCard'
import { ServiceFinder } from '@/components/ServiceFinder'
import { loadServices, getCategoryLabel } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Nos services',
  description:
    'Découvrez tous nos services: vaccination, dépistage, matériel médical, orthopédie, accompagnement personnalisé et plus.',
}

export default async function ServicesPage() {
  const services = await loadServices()

  // Grouper par catégorie
  const categories = services.reduce(
    (acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = []
      }
      acc[service.category].push(service)
      return acc
    },
    {} as Record<string, typeof services>
  )

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background section-padding">
        <div className="section-container">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Nos services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Une offre complète de soins et d&apos;accompagnement pour répondre à vos besoins de
            santé au quotidien.
          </p>
        </div>
      </section>

      {/* Service Finder */}
      <section className="section-container py-8">
        <ServiceFinder services={services} />
      </section>

      {/* Liste par catégorie */}
      <section className="section-container section-padding">
        {Object.entries(categories).map(([category, categoryServices]) => (
          <div key={category} className="mb-12 last:mb-0">
            <h2 className="text-2xl font-bold mb-6">{getCategoryLabel(category)}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
