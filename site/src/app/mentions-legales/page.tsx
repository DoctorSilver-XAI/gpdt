import type { Metadata } from 'next'
import { loadPharmacy, loadLegal } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales et informations juridiques du site.',
}

export default async function MentionsLegalesPage() {
  const pharmacy = await loadPharmacy()
  const legal = await loadLegal()

  return (
    <section className="section-container section-padding">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mentions légales</h1>

        <div className="prose prose-lg max-w-none">
          <h2>Éditeur du site</h2>
          <p>
            <strong>{pharmacy.identity.display_name}</strong>
            <br />
            {pharmacy.identity.address_line_1}
            <br />
            {pharmacy.identity.postal_code} {pharmacy.identity.city}
            <br />
            Téléphone : {pharmacy.contact.phone}
          </p>

          {legal.status === 'draft_placeholders' && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
              <p className="text-amber-800 text-sm">
                <strong>Note :</strong> Les informations légales complètes (SIRET, RPPS,
                hébergeur, etc.) sont en cours de validation et seront ajoutées prochainement.
              </p>
            </div>
          )}

          <h2>Directeur de la publication</h2>
          <p>
            {legal.required_fields_to_fill.directeur_publication ||
              '[À compléter avec le nom du pharmacien titulaire responsable]'}
          </p>

          <h2>Hébergement</h2>
          <p>
            {legal.required_fields_to_fill.hebergeur ||
              '[À compléter avec les informations de l\'hébergeur]'}
          </p>

          <h2>Activité réglementée</h2>
          <p>
            La pharmacie d&apos;officine est une activité réglementée. Les pharmaciens titulaires
            sont inscrits à l&apos;Ordre National des Pharmaciens.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, logos) est la propriété
            exclusive de {pharmacy.identity.display_name}, sauf mention contraire. Toute
            reproduction sans autorisation préalable est interdite.
          </p>

          <h2>Responsabilité</h2>
          <p>
            Les informations présentées sur ce site sont données à titre informatif et ne
            sauraient remplacer une consultation médicale ou pharmaceutique. En cas
            d&apos;urgence, appelez le 15 (SAMU) ou le 112.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Pour toute question relative à vos données personnelles, consultez notre{' '}
            <a href="/confidentialite" className="text-primary hover:underline">
              politique de confidentialité
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
