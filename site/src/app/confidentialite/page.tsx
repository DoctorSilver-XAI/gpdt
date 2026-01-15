import type { Metadata } from 'next'
import { loadPharmacy } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de protection des données personnelles et cookies.',
}

export default async function ConfidentialitePage() {
  const pharmacy = await loadPharmacy()

  return (
    <section className="section-container section-padding">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Politique de confidentialité</h1>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            La {pharmacy.identity.display_name} s&apos;engage à protéger votre vie privée. Cette
            politique explique comment nous collectons et utilisons vos données.
          </p>

          <h2>Responsable du traitement</h2>
          <p>
            <strong>{pharmacy.identity.display_name}</strong>
            <br />
            {pharmacy.identity.address_line_1}
            <br />
            {pharmacy.identity.postal_code} {pharmacy.identity.city}
          </p>

          <h2>Données collectées</h2>
          <p>Ce site vitrine ne collecte pas directement de données personnelles, sauf :</p>
          <ul>
            <li>
              <strong>Données de navigation</strong> : via des cookies d&apos;analyse (avec votre
              consentement)
            </li>
            <li>
              <strong>Données de contact</strong> : si vous nous appelez ou utilisez les
              plateformes partenaires (Doctolib, MyPharmactiv)
            </li>
          </ul>

          <h2>Données de santé</h2>
          <p>
            <strong>
              Ce site ne collecte aucune donnée de santé via des formulaires en ligne.
            </strong>
          </p>
          <p>
            Les services de prise de rendez-vous et transmission d&apos;ordonnance sont assurés
            par des plateformes tierces sécurisées (Doctolib, MyPharmactiv) qui disposent de
            leurs propres politiques de confidentialité.
          </p>

          <h2>Cookies</h2>
          <p>Nous utilisons des cookies pour :</p>
          <ul>
            <li>Le bon fonctionnement du site (cookies techniques)</li>
            <li>L&apos;analyse de fréquentation (avec consentement)</li>
          </ul>
          <p>
            Vous pouvez modifier vos préférences de cookies à tout moment via le bandeau de
            consentement.
          </p>

          <h2>Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li>Droit d&apos;accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d&apos;opposition</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous par téléphone au {pharmacy.contact.phone} ou
            en pharmacie.
          </p>

          <h2>Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données
            contre tout accès non autorisé.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question relative à cette politique, vous pouvez nous contacter :
          </p>
          <ul>
            <li>Par téléphone : {pharmacy.contact.phone}</li>
            <li>
              En pharmacie : {pharmacy.identity.address_line_1}, {pharmacy.identity.postal_code}{' '}
              {pharmacy.identity.city}
            </li>
          </ul>

          <p className="text-sm text-muted-foreground mt-8">
            Dernière mise à jour : janvier 2026
          </p>
        </div>
      </div>
    </section>
  )
}
