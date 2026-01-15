#!/usr/bin/env node

/**
 * Script d'optimisation des images
 * - Convertit PNG/JPEG → WebP (qualité 80%)
 * - Redimensionne à max 1920px de large
 * - Sauvegarde les originaux dans _backup
 *
 * Usage: npm run optimize:images
 */

import sharp from 'sharp'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MEDIA_DIR = path.join(__dirname, '../public/media')
const BACKUP_DIR = path.join(__dirname, '../public/media/_backup')
const MAX_WIDTH = 1920
const QUALITY = 80

async function getImageFiles(dir) {
  const files = []

  async function scan(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)

      if (entry.isDirectory() && entry.name !== '_backup') {
        await scan(fullPath)
      } else if (entry.isFile() && /\.(png|jpg|jpeg)$/i.test(entry.name)) {
        files.push(fullPath)
      }
    }
  }

  await scan(dir)
  return files
}

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {
    // Directory exists
  }
}

async function optimizeImage(inputPath) {
  const relativePath = path.relative(MEDIA_DIR, inputPath)
  const dir = path.dirname(inputPath)
  const ext = path.extname(inputPath)
  const basename = path.basename(inputPath, ext)
  const outputPath = path.join(dir, `${basename}.webp`)

  // Backup original
  const backupPath = path.join(BACKUP_DIR, relativePath)
  await ensureDir(path.dirname(backupPath))
  await fs.copyFile(inputPath, backupPath)

  // Get original stats
  const originalStats = await fs.stat(inputPath)
  const originalSizeKB = (originalStats.size / 1024).toFixed(0)

  // Get image metadata
  const metadata = await sharp(inputPath).metadata()

  // Process image
  let pipeline = sharp(inputPath)

  // Resize if needed
  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, null, {
      withoutEnlargement: true,
      fit: 'inside',
    })
  }

  // Convert to WebP
  await pipeline
    .webp({ quality: QUALITY })
    .toFile(outputPath)

  // Get new stats
  const newStats = await fs.stat(outputPath)
  const newSizeKB = (newStats.size / 1024).toFixed(0)

  // Remove original (now backed up)
  await fs.unlink(inputPath)

  const reduction = ((1 - newStats.size / originalStats.size) * 100).toFixed(0)

  console.log(`✅ ${relativePath}`)
  console.log(`   ${originalSizeKB} KB → ${newSizeKB} KB (-${reduction}%)`)
  console.log(`   → ${basename}.webp`)

  return {
    original: originalStats.size,
    optimized: newStats.size,
  }
}

async function main() {
  console.log('🖼️  Optimisation des images...\n')

  // Check if media dir exists
  try {
    await fs.access(MEDIA_DIR)
  } catch {
    console.error(`❌ Dossier introuvable: ${MEDIA_DIR}`)
    process.exit(1)
  }

  // Get all images
  const images = await getImageFiles(MEDIA_DIR)

  if (images.length === 0) {
    console.log('ℹ️  Aucune image PNG/JPEG trouvée.')
    return
  }

  console.log(`📁 ${images.length} image(s) trouvée(s)\n`)

  // Process each image
  let totalOriginal = 0
  let totalOptimized = 0

  for (const imagePath of images) {
    try {
      const result = await optimizeImage(imagePath)
      totalOriginal += result.original
      totalOptimized += result.optimized
    } catch (error) {
      console.error(`❌ Erreur: ${imagePath}`)
      console.error(`   ${error.message}`)
    }
    console.log('')
  }

  // Summary
  const totalOriginalMB = (totalOriginal / 1024 / 1024).toFixed(1)
  const totalOptimizedMB = (totalOptimized / 1024 / 1024).toFixed(1)
  const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(0)

  console.log('━'.repeat(40))
  console.log(`📊 Résumé:`)
  console.log(`   Avant:  ${totalOriginalMB} MB`)
  console.log(`   Après:  ${totalOptimizedMB} MB`)
  console.log(`   Gain:   -${totalReduction}%`)
  console.log(`\n💾 Originaux sauvegardés dans: public/media/_backup/`)
  console.log('✨ Optimisation terminée!\n')
}

main().catch(console.error)
