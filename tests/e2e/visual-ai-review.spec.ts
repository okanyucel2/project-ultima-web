import { test, expect } from '@playwright/test'
import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Visual AI Review - Layer 3
 *
 * Captures screenshots and validates them using Genesis verify_visual_state
 * (Gemini Vision API via backend). Falls back to Playwright assertion checks
 * when backend is unavailable.
 *
 * Reuses: backend/tools/vision.py (verify_visual_state)
 * Protocol: P0.45 (Application Integration Verification)
 * ADR: ADR-014 (Visual Self-Validation)
 */

const PROOF_DIR = 'docs/proofs'
const GENESIS_BACKEND = process.env.GENESIS_BACKEND_URL || 'http://localhost:5000'
const timestamp = new Date().toISOString().slice(0, 10)

/**
 * Call verify_visual_state via Genesis backend API.
 * Falls back gracefully if backend is unavailable.
 */
async function verifyVisualState(
  screenshotPath: string,
  assertions: string[],
  enhanced: boolean = false
): Promise<{ status: string; results: Array<{ assertion: string; pass: boolean; detail: string }> } | null> {
  try {
    const absolutePath = path.resolve(screenshotPath)
    if (!fs.existsSync(absolutePath)) {
      console.warn(`Screenshot not found: ${absolutePath}`)
      return null
    }

    const response = await fetch(`${GENESIS_BACKEND}/api/vision/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        screenshot_path: absolutePath,
        assertions,
        enhanced_mode: enhanced,
        check_accessibility: true,
      }),
    })

    if (!response.ok) {
      console.warn(`Vision API returned ${response.status}, falling back to Playwright assertions`)
      return null
    }

    return await response.json()
  } catch (e) {
    console.warn(`Vision API unavailable (${(e as Error).message}), using Playwright assertions only`)
    return null
  }
}

test.describe('Visual AI Review - UltimaMinds', () => {
  test.setTimeout(120000) // AI review needs more time

  // ─── HERO SECTION ─────────────────────────────────────────────
  test('AI Review: Hero Section', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)

    const viewport = testInfo.project.name
    const screenshotPath = `${PROOF_DIR}/ai-review-hero-${viewport}-${timestamp}.png`

    await page.screenshot({ path: screenshotPath, fullPage: false })

    // Playwright structural assertions (always run)
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
    await expect(page.getByText('We Don\'t Build NPCs.')).toBeVisible()
    await expect(page.getByText('We Architect')).toBeVisible()
    await expect(page.getByText('Living Minds.')).toBeVisible()
    await expect(page.getByRole('link', { name: /Explore the Architecture/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Read Our Thesis/i })).toBeVisible()

    // AI visual assertions (when backend available)
    const aiResult = await verifyVisualState(screenshotPath, [
      'Hero heading text is clearly readable against dark background',
      'Gradient text (blue to purple to orange) is visible on "We Architect Living Minds"',
      'Navigation bar is visible at the top with glass-morphism effect',
      'CTA buttons are prominently placed and visually distinct',
      'Dark space theme background is consistent',
    ])

    if (aiResult) {
      console.log(`AI Review: ${aiResult.status}`)
      aiResult.results.forEach(r => {
        console.log(`  ${r.pass ? 'PASS' : 'FAIL'}: ${r.assertion} — ${r.detail}`)
      })
      const failures = aiResult.results.filter(r => !r.pass)
      expect(failures.length, `AI found ${failures.length} visual issues`).toBeLessThanOrEqual(1)
    }
  })

  // ─── VISION SECTION ───────────────────────────────────────────
  test('AI Review: Vision Section', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)

    const vision = page.locator('#vision')
    await vision.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const viewport = testInfo.project.name
    const screenshotPath = `${PROOF_DIR}/ai-review-vision-${viewport}-${timestamp}.png`
    await vision.screenshot({ path: screenshotPath })

    // Playwright structural assertions
    await expect(page.getByText('Intelligence Is Not')).toBeVisible()
    await expect(page.getByText('It Emerges.')).toBeVisible()
    await expect(page.getByText('2,400+')).toBeVisible()
    await expect(page.getByText('14.7M')).toBeVisible()

    // AI visual assertions
    const aiResult = await verifyVisualState(screenshotPath, [
      'Section heading with gradient text is readable',
      'Metric cards are visible with glass-morphism styling',
      'Numbers (2,400+ and 14.7M) are prominently displayed',
      'Card layouts are properly aligned and spaced',
    ])

    if (aiResult) {
      const failures = aiResult.results.filter(r => !r.pass)
      expect(failures.length).toBeLessThanOrEqual(1)
    }
  })

  // ─── TECHNOLOGY SECTION ───────────────────────────────────────
  test('AI Review: Technology Section (Three Pillars)', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)

    const tech = page.locator('#technology')
    await tech.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const viewport = testInfo.project.name
    const screenshotPath = `${PROOF_DIR}/ai-review-technology-${viewport}-${timestamp}.png`
    await tech.screenshot({ path: screenshotPath })

    // Playwright structural assertions
    await expect(page.getByText('The Three Pillars')).toBeVisible()
    await expect(page.getByText('Autonomous Ecosystems')).toBeVisible()
    await expect(page.getByText('Hyperbolic Trauma Memory')).toBeVisible()
    await expect(page.getByText('Sentient AI Orchestration')).toBeVisible()

    // AI visual assertions
    const aiResult = await verifyVisualState(screenshotPath, [
      'Three pillar cards are displayed in a grid layout',
      'Each card has a distinct icon with neon accent color',
      'Glass-morphism effect is visible on cards (semi-transparent, backdrop blur)',
      'Card content (title + description + bullet points) is readable',
      'Cards are evenly spaced and aligned',
    ])

    if (aiResult) {
      const failures = aiResult.results.filter(r => !r.pass)
      expect(failures.length).toBeLessThanOrEqual(1)
    }
  })

  // ─── ARCHITECTURE SECTION ─────────────────────────────────────
  test('AI Review: Architecture Section (Layer Stack)', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)

    const arch = page.locator('#architecture')
    await arch.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const viewport = testInfo.project.name
    const screenshotPath = `${PROOF_DIR}/ai-review-architecture-${viewport}-${timestamp}.png`
    await arch.screenshot({ path: screenshotPath })

    // Playwright structural assertions
    await expect(page.getByText('From Substrate to Sentience')).toBeVisible()
    await expect(page.getByText('Neural Substrate')).toBeVisible()
    await expect(page.getByText('Emergence Interface')).toBeVisible()

    // AI visual assertions
    const aiResult = await verifyVisualState(screenshotPath, [
      '6-layer architecture stack is visible (L0 through L5)',
      'Each layer has a status indicator (ACTIVE, EVOLVING, OBSERVING, UNKNOWN)',
      'Layer cards use glass-morphism styling with subtle borders',
      'Heading gradient text (Substrate in blue, Sentience in orange) is visible',
      'Layer numbering (L0-L5) is clearly displayed with colored badges',
    ])

    if (aiResult) {
      const failures = aiResult.results.filter(r => !r.pass)
      expect(failures.length).toBeLessThanOrEqual(1)
    }
  })

  // ─── CONTACT SECTION ──────────────────────────────────────────
  test('AI Review: Contact Section (CTA)', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)

    const contact = page.locator('#contact')
    await contact.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    const viewport = testInfo.project.name
    const screenshotPath = `${PROOF_DIR}/ai-review-contact-${viewport}-${timestamp}.png`
    await contact.screenshot({ path: screenshotPath })

    // Playwright structural assertions
    await expect(page.getByText('The Next Mind Starts Here')).toBeVisible()
    await expect(page.getByText('research@ultimaminds.ai')).toBeVisible()
    await expect(page.getByText('Accepting research collaborators')).toBeVisible()

    // AI visual assertions
    const aiResult = await verifyVisualState(screenshotPath, [
      'CTA card is centered with glass-morphism effect and glow border',
      'Email button has gradient background (blue to purple)',
      'Green pulse indicator dot is visible next to "Accepting research collaborators"',
      'Heading gradient text is readable',
    ])

    if (aiResult) {
      const failures = aiResult.results.filter(r => !r.pass)
      expect(failures.length).toBeLessThanOrEqual(1)
    }
  })

  // ─── RESPONSIVE CONSISTENCY ───────────────────────────────────
  test('AI Review: Full Page Responsive Consistency', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)

    const viewport = testInfo.project.name
    const screenshotPath = `${PROOF_DIR}/ai-review-fullpage-${viewport}-${timestamp}.png`
    await page.screenshot({ path: screenshotPath, fullPage: true })

    // Playwright structural assertions
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.locator('#vision')).toBeVisible()
    await expect(page.locator('#technology')).toBeVisible()
    await expect(page.locator('#architecture')).toBeVisible()
    await expect(page.locator('#contact')).toBeVisible()

    // AI visual assertions
    const aiResult = await verifyVisualState(screenshotPath, [
      'All page sections are visible and properly ordered (Hero > Vision > Technology > Architecture > Contact > Footer)',
      'Dark space theme is consistent throughout the entire page',
      'No layout breaks or overlapping elements visible',
      'Typography is consistent (Inter for body, JetBrains Mono for code/labels)',
      'Color palette is cohesive (neon blue, purple, emerald, orange accents on dark background)',
    ], true) // enhanced mode for full-page review

    if (aiResult) {
      console.log(`\n=== AI Visual Review Report (${viewport}) ===`)
      console.log(`Status: ${aiResult.status}`)
      aiResult.results.forEach(r => {
        console.log(`  ${r.pass ? 'PASS' : 'FAIL'}: ${r.assertion}`)
        if (r.detail) console.log(`         ${r.detail}`)
      })
      console.log('='.repeat(50))

      const failures = aiResult.results.filter(r => !r.pass)
      expect(failures.length, `AI found ${failures.length} issues on full page`).toBeLessThanOrEqual(2)
    }
  })
})
