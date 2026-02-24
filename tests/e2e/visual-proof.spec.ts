import { test, expect } from '@playwright/test'

const PROOF_DIR = 'docs/proofs'
const timestamp = new Date().toISOString().slice(0, 10)

test.describe('UltimaMinds Visual Proof Capture', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    // Wait for fonts and animations to settle
    await page.waitForTimeout(2000)
  })

  test('full-page landing screenshot', async ({ page }, testInfo) => {
    const viewport = testInfo.project.name
    await page.screenshot({
      path: `${PROOF_DIR}/ultimaminds-fullpage-${viewport}-${timestamp}.png`,
      fullPage: true,
    })
    // Verify page loaded correctly
    await expect(page.locator('body')).toBeVisible()
  })

  test('hero section', async ({ page }, testInfo) => {
    const viewport = testInfo.project.name
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible({ timeout: 10000 })
    await page.screenshot({
      path: `${PROOF_DIR}/ultimaminds-hero-${viewport}-${timestamp}.png`,
      fullPage: false,
    })
  })

  test('vision section', async ({ page }, testInfo) => {
    const viewport = testInfo.project.name
    const vision = page.locator('#vision')
    await vision.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await vision.screenshot({
      path: `${PROOF_DIR}/ultimaminds-vision-${viewport}-${timestamp}.png`,
    })
  })

  test('technology section', async ({ page }, testInfo) => {
    const viewport = testInfo.project.name
    const tech = page.locator('#technology')
    await tech.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await tech.screenshot({
      path: `${PROOF_DIR}/ultimaminds-technology-${viewport}-${timestamp}.png`,
    })
  })

  test('architecture section', async ({ page }, testInfo) => {
    const viewport = testInfo.project.name
    const arch = page.locator('#architecture')
    await arch.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await arch.screenshot({
      path: `${PROOF_DIR}/ultimaminds-architecture-${viewport}-${timestamp}.png`,
    })
  })

  test('contact section', async ({ page }, testInfo) => {
    const viewport = testInfo.project.name
    const contact = page.locator('#contact')
    await contact.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await contact.screenshot({
      path: `${PROOF_DIR}/ultimaminds-contact-${viewport}-${timestamp}.png`,
    })
  })
})
