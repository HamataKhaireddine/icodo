/**
 * Generates ICODO Company Profile PDF from docs/company-profile.html
 * Run: npm run profile:pdf
 */
import puppeteer from 'puppeteer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const htmlPath = path.join(root, 'docs/company-profile.html')
const outPath = path.join(root, 'docs/ICODO-Company-Profile.pdf')

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' })
await page.pdf({
  path: outPath,
  format: 'A4',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  preferCSSPageSize: true,
})
await browser.close()
console.log(`Generated: ${outPath}`)
