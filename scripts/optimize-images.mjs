/**
 * Otimização das imagens geradas pelo Higgsfield.
 *
 * Converte os PNGs originais (pesados, 1.5–7 MB) em WebP com largura máxima
 * controlada, reduzindo o peso total do site em ~95% sem perda visual
 * perceptível. Executar com: `npm run images:optimize`.
 */
import { readdir, stat, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = path.resolve(__dirname, '../src/assets/images')

/** Largura máxima por tipo de imagem (px). */
const MAX_WIDTH = [
  { match: /^hero-/, width: 2400, quality: 82 },
  { match: /^showroom-/, width: 2000, quality: 82 },
  { match: /^cadeira-/, width: 1200, quality: 84 },
  { match: /^(sobre|processo)-/, width: 1600, quality: 82 },
]

const DEFAULT_RULE = { width: 1600, quality: 82 }

const ruleFor = (file) => MAX_WIDTH.find((r) => r.match.test(file)) ?? DEFAULT_RULE

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} kB`

const run = async () => {
  const files = (await readdir(IMAGES_DIR)).filter((f) => /\.(png|jpe?g)$/i.test(f))

  if (files.length === 0) {
    console.log('Nenhuma imagem PNG/JPG encontrada em src/assets/images.')
    return
  }

  let before = 0
  let after = 0

  for (const file of files) {
    const input = path.join(IMAGES_DIR, file)
    const output = path.join(IMAGES_DIR, `${path.parse(file).name}.webp`)
    const { width, quality } = ruleFor(file)

    const originalSize = (await stat(input)).size
    before += originalSize

    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(output)

    const newSize = (await stat(output)).size
    after += newSize

    await unlink(input)

    console.log(
      `  ${path.parse(file).name.padEnd(34)} ${kb(originalSize).padStart(9)} → ${kb(newSize).padStart(8)}`,
    )
  }

  const saved = (1 - after / before) * 100
  console.log(`\n  Total: ${kb(before)} → ${kb(after)}  (−${saved.toFixed(1)}%)`)
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
