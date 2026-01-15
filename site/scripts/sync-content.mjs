#!/usr/bin/env node

/**
 * Script de synchronisation du contenu
 * Copie les fichiers JSON depuis /init vers /site/content
 * Usage: pnpm run sync:content
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SOURCE_DIR = resolve(__dirname, '../../init')
const DEST_DIR = resolve(__dirname, '../content')

const JSON_FILES = [
  'pharmacy.json',
  'services.json',
  'team.json',
  'faq.json',
  'legal.json',
  'localbusiness_jsonld.json',
]

function syncContent() {
  console.log('🔄 Synchronisation du contenu...\n')

  // Vérifier que le dossier source existe
  if (!existsSync(SOURCE_DIR)) {
    console.error(`❌ Dossier source introuvable: ${SOURCE_DIR}`)
    process.exit(1)
  }

  // Créer le dossier destination si nécessaire
  if (!existsSync(DEST_DIR)) {
    mkdirSync(DEST_DIR, { recursive: true })
    console.log(`📁 Dossier créé: ${DEST_DIR}`)
  }

  let copiedCount = 0
  let skippedCount = 0

  for (const file of JSON_FILES) {
    const sourcePath = join(SOURCE_DIR, file)
    const destPath = join(DEST_DIR, file)

    if (existsSync(sourcePath)) {
      copyFileSync(sourcePath, destPath)
      console.log(`✅ ${file}`)
      copiedCount++
    } else {
      console.log(`⚠️  ${file} (non trouvé dans source)`)
      skippedCount++
    }
  }

  console.log(`\n📊 Résultat: ${copiedCount} fichiers copiés, ${skippedCount} ignorés`)
  console.log('✨ Synchronisation terminée!\n')
}

syncContent()
