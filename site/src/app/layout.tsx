import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { StickyActionBar } from '@/components/StickyActionBar'
import { ChatWidget } from '@/components/ChatWidget'
import { loadPharmacy, loadJsonLd } from '@/lib/content'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export async function generateMetadata(): Promise<Metadata> {
  const pharmacy = await loadPharmacy()

  return {
    title: {
      default: `${pharmacy.identity.display_name} | Pharmacie à ${pharmacy.identity.city}`,
      template: `%s | ${pharmacy.identity.display_name}`,
    },
    description: `Votre pharmacie à ${pharmacy.identity.city}. Services: vaccination, dépistage, matériel médical, orthopédie, et plus. Ouverte du lundi au samedi.`,
    keywords: [
      'pharmacie',
      pharmacy.identity.city,
      'vaccination',
      'dépistage',
      'matériel médical',
      'orthopédie',
      'officine',
    ],
    authors: [{ name: pharmacy.identity.display_name }],
    creator: pharmacy.identity.display_name,
    metadataBase: new URL('https://www.pharmacietassigny.fr'),
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      siteName: pharmacy.identity.display_name,
      title: pharmacy.identity.display_name,
      description: `Votre pharmacie à ${pharmacy.identity.city}. Ouverte du lundi au samedi de 08:30 à 20:00.`,
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: '/',
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pharmacy = await loadPharmacy()
  const jsonLd = await loadJsonLd()

  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header pharmacyName={pharmacy.identity.display_name} />
        <main className="flex-1">{children}</main>
        <Footer pharmacy={pharmacy} />
        <StickyActionBar phone={pharmacy.contact.phone} />
        <ChatWidget />
      </body>
    </html>
  )
}
