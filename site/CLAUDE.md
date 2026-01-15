# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run sync:content # Sync JSON content from ../init to ./content
```

Requires Node.js >= 18.17 (use `nvm use 20` if needed).

## Architecture

Site vitrine Next.js (App Router) pour une pharmacie d'officine.

### Content Layer (`src/lib/content.ts`)
- Charge les données depuis `content/*.json` (pharmacy, services, team, faq, legal, localbusiness_jsonld)
- Validation Zod stricte avec types exportés
- Fonctions: `loadPharmacy()`, `loadServices()`, `loadServiceBySlug(slug)`, `loadTeam()`, `loadFaq()`, `loadLegal()`, `loadJsonLd()`

### Routing
- `/` - Accueil avec hero, ServiceFinder, services phares, FAQ
- `/services` - Liste par catégorie
- `/services/[slug]` - Détail service (généré statiquement via `generateStaticParams`)
- `/rendez-vous` - Hub vers Doctolib/MyPharmactiv
- `/ordonnance` - Hub transmission ordonnance
- `/equipe`, `/contact`, `/la-pharmacie`, `/mentions-legales`, `/confidentialite`

### Key Components
- `StickyActionBar` - Barre mobile fixe (Appeler, RDV, Ordonnance)
- `HoursStatus` - Indicateur ouvert/fermé temps réel (Europe/Paris)
- `ServiceFinder` - Filtre besoins → services correspondants
- `ServiceCard` - Carte service avec catégorie, durée, CTA
- `SimpleGallery` - Galerie photos avec lightbox et filtres
- `EmergencyBanner` - Rappel urgences 15/112

### Design System
- Tailwind + shadcn/ui pattern (components in `src/components/ui/`)
- CSS variables in `globals.css` (--primary: vert pharmacie #3d8b5e)
- Utilitaires: `cn()` pour merge classes, `formatPhone()`, `isOpenNow()`

## Constraints

- Mobile-first, taille tactile min 44px
- Aucune collecte de données de santé via formulaire
- Message urgence (15/112) sur pages sensibles (services, ordonnance)
- JSON-LD Pharmacy injecté dans layout pour SEO
