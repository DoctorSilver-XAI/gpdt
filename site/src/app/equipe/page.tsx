import type { Metadata } from 'next'
import { User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { loadTeam } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Notre équipe',
  description:
    'Découvrez notre équipe de pharmaciens et préparateurs, leurs spécialités et expertises.',
}

function getRoleOrder(type: string): number {
  const order: Record<string, number> = {
    pharmacist_owner: 1,
    pharmacist_assistant: 2,
    medical_equipment_manager: 3,
    pharmacy_technician: 4,
    storekeeper: 5,
  }
  return order[type] || 99
}

export default async function EquipePage() {
  const members = await loadTeam()

  // Trier par rôle
  const sortedMembers = [...members].sort(
    (a, b) => getRoleOrder(a.type) - getRoleOrder(b.type)
  )

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background section-padding">
        <div className="section-container">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Notre équipe</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Une équipe de {members.length} professionnels dévoués, à votre écoute pour vous
            accompagner dans toutes vos démarches de santé.
          </p>
        </div>
      </section>

      {/* Grille équipe */}
      <section className="section-container section-padding">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedMembers.map((member) => (
            <Card key={member.full_name} className="overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center">
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photo}
                    alt={member.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-20 w-20 text-muted-foreground/30" />
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{member.full_name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                {member.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.slice(0, 3).map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {member.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{member.specialties.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Note sur les langues */}
      <section className="bg-muted/50 section-padding">
        <div className="section-container text-center">
          <h2 className="text-2xl font-bold mb-4">Un accueil multilingue</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Notre équipe parle français, anglais, allemand, italien et arabe pour accueillir au
            mieux les résidents et les touristes de la région.
          </p>
        </div>
      </section>
    </>
  )
}
