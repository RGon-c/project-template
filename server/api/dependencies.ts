import { readFile } from 'fs/promises'
import { defineEventHandler } from 'h3'
import { join } from 'pathe'

export default defineEventHandler(async () => {
  const pkgPath = join(process.cwd(), 'package.json')
  const raw = await readFile(pkgPath, 'utf-8')
  const { dependencies = {}, devDependencies = {} } = JSON.parse(raw)
  return { dependencies, devDependencies }
})
