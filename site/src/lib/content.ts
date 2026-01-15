import { z } from 'zod'
import { promises as fs } from 'fs'
import path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// ============================================================================
// SCHEMAS ZOD
// ============================================================================

// Schema Pharmacy
const OpeningSlotSchema = z.object({
  opens: z.string(),
  closes: z.string(),
})

export const PharmacySchema = z.object({
  schema_version: z.string(),
  entity_type: z.literal('pharmacy_profile'),
  identity: z.object({
    display_name: z.string(),
    city: z.string(),
    postal_code: z.string(),
    address_line_1: z.string(),
    country: z.string(),
    timezone: z.string(),
  }),
  contact: z.object({
    phone: z.string(),
    fax: z.string().nullable(),
    email: z.string().nullable(),
    notes: z.string().optional(),
  }),
  languages_spoken: z.array(z.string()),
  opening_hours: z.record(z.string(), z.array(OpeningSlotSchema)),
  social: z.object({
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
  }),
  public_links: z.object({
    mypharmactiv_listing: z.string().url().optional(),
    existing_website: z.string().url().optional(),
    doctolib: z.string().url().optional(),
  }),
  notes_to_confirm: z.array(z.object({
    field: z.string(),
    why: z.string(),
  })).optional(),
})

export type Pharmacy = z.infer<typeof PharmacySchema>

// Schema Service
const BookingChannelSchema = z.object({
  type: z.string(),
  url: z.string().url().optional(),
  value: z.string().optional(),
})

export const ServiceSchema = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  short_promise: z.string(),
  description: z.string(),
  duration_range_min: z.array(z.number()).length(2),
  what_to_bring: z.array(z.string()),
  booking: z.object({
    primary_cta_label: z.string(),
    channels: z.array(BookingChannelSchema),
  }),
  safety_notice: z.string().optional(),
})

export const ServicesSchema = z.object({
  schema_version: z.string(),
  entity_type: z.literal('services_catalog'),
  services: z.array(ServiceSchema),
  notes: z.array(z.string()).optional(),
})

export type Service = z.infer<typeof ServiceSchema>
export type Services = z.infer<typeof ServicesSchema>

// Schema Team
export const TeamMemberSchema = z.object({
  full_name: z.string(),
  role: z.string(),
  type: z.string(),
  specialties: z.array(z.string()),
  photo: z.string().nullable(),
})

export const TeamSchema = z.object({
  schema_version: z.string(),
  entity_type: z.literal('team'),
  members: z.array(TeamMemberSchema),
  notes: z.array(z.string()).optional(),
})

export type TeamMember = z.infer<typeof TeamMemberSchema>
export type Team = z.infer<typeof TeamSchema>

// Schema FAQ
export const FaqItemSchema = z.object({
  q: z.string(),
  a: z.string(),
})

export const FaqSchema = z.object({
  schema_version: z.string(),
  entity_type: z.literal('faq'),
  disclaimer: z.string().optional(),
  items: z.array(FaqItemSchema),
})

export type FaqItem = z.infer<typeof FaqItemSchema>
export type Faq = z.infer<typeof FaqSchema>

// Schema Legal
export const LegalSchema = z.object({
  schema_version: z.string(),
  entity_type: z.literal('legal'),
  status: z.string(),
  required_fields_to_fill: z.record(z.string(), z.string().nullable()),
  notes: z.array(z.string()).optional(),
})

export type Legal = z.infer<typeof LegalSchema>

// Schema JSON-LD (flexible)
export const JsonLdSchema = z.object({
  '@context': z.string(),
  '@type': z.string(),
  name: z.string(),
  address: z.object({
    '@type': z.string(),
    streetAddress: z.string(),
    postalCode: z.string(),
    addressLocality: z.string(),
    addressCountry: z.string(),
  }),
  telephone: z.string(),
  openingHoursSpecification: z.array(z.object({
    '@type': z.string(),
    dayOfWeek: z.string(),
    opens: z.string(),
    closes: z.string(),
  })),
  sameAs: z.array(z.string().url()).optional(),
})

export type JsonLd = z.infer<typeof JsonLdSchema>

// ============================================================================
// FONCTIONS DE CHARGEMENT
// ============================================================================

async function loadJson<T>(filename: string, schema: z.ZodType<T>): Promise<T> {
  const filePath = path.join(CONTENT_DIR, filename)

  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(content)
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(`Erreur de validation pour ${filename}:`, error.errors)
      throw new Error(`Fichier ${filename} invalide: ${error.errors.map(e => e.message).join(', ')}`)
    }
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(`Fichier ${filename} introuvable. Lancez "pnpm run sync:content" pour synchroniser le contenu.`)
    }
    throw error
  }
}

export async function loadPharmacy(): Promise<Pharmacy> {
  return loadJson('pharmacy.json', PharmacySchema)
}

export async function loadServices(): Promise<Service[]> {
  const data = await loadJson('services.json', ServicesSchema)
  return data.services
}

export async function loadServiceBySlug(slug: string): Promise<Service | null> {
  const services = await loadServices()
  return services.find(s => s.slug === slug) || null
}

export async function loadTeam(): Promise<TeamMember[]> {
  const data = await loadJson('team.json', TeamSchema)
  return data.members
}

export async function loadFaq(): Promise<FaqItem[]> {
  const data = await loadJson('faq.json', FaqSchema)
  return data.items
}

export async function loadLegal(): Promise<Legal> {
  return loadJson('legal.json', LegalSchema)
}

export async function loadJsonLd(): Promise<JsonLd> {
  return loadJson('localbusiness_jsonld.json', JsonLdSchema)
}

// ============================================================================
// HELPERS
// ============================================================================

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    prevention: 'Prévention',
    screening: 'Dépistage',
    clinical_support: 'Suivi clinique',
    medical_equipment: 'Matériel médical',
    specialty: 'Spécialités',
    dermocosmetics: 'Dermocosmétique',
    advice: 'Conseils',
    support: 'Accompagnement',
  }
  return labels[category] || category
}

export function getLanguageLabel(code: string): string {
  const labels: Record<string, string> = {
    fr: 'Français',
    en: 'Anglais',
    de: 'Allemand',
    ar: 'Arabe',
    it: 'Italien',
  }
  return labels[code] || code
}
