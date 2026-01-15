import Link from 'next/link'
import { Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react'
import { formatPhone } from '@/lib/utils'
import type { Pharmacy } from '@/lib/content'

interface FooterProps {
  pharmacy: Pharmacy
}

export function Footer({ pharmacy }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background/90 pb-24 md:pb-0">
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Coordonnées */}
          <div>
            <h3 className="font-semibold text-background mb-4">
              {pharmacy.identity.display_name}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>
                  {pharmacy.identity.address_line_1}
                  <br />
                  {pharmacy.identity.postal_code} {pharmacy.identity.city}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${pharmacy.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 hover:text-background transition-colors"
                >
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  {formatPhone(pharmacy.contact.phone)}
                </a>
              </li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-semibold text-background mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Horaires
            </h3>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Lun - Sam</span>
                <span>08:30 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche</span>
                <span>Fermé</span>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-background mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="hover:text-background transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="hover:text-background transition-colors">
                  Équipe
                </Link>
              </li>
              <li>
                <Link href="/rendez-vous" className="hover:text-background transition-colors">
                  Rendez-vous
                </Link>
              </li>
              <li>
                <Link href="/ordonnance" className="hover:text-background transition-colors">
                  Ordonnance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-background transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Réseaux et légal */}
          <div>
            <h3 className="font-semibold text-background mb-4">Suivez-nous</h3>
            <div className="flex gap-4 mb-6">
              {pharmacy.social.facebook && (
                <a
                  href={pharmacy.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              )}
              {pharmacy.social.instagram && (
                <a
                  href={pharmacy.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              )}
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mentions-legales" className="hover:text-background transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-background transition-colors">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Urgences + Copyright */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-background/60">
              © {currentYear} {pharmacy.identity.display_name}. Tous droits réservés.
            </p>
            <p className="text-amber-300 font-medium">
              Urgence médicale : 15 (SAMU) · 112
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
