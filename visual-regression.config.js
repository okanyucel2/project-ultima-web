/**
 * Visual Regression Configuration for UltimaMinds
 *
 * Reuses @genesis/visual-regression for threshold presets and Argos CI config.
 * Adapted for Playwright-based screenshots (no Storybook).
 *
 * @see packages/visual-regression/README.md
 */
import { createVisualRegressionConfig, THRESHOLD_PRESETS } from '@genesis/visual-regression'

export default createVisualRegressionConfig({
  projectSlug: 'project-ultima-web',
  outDir: 'docs/proofs',
  thresholdPreset: 'standard', // 0.1% pixel diff tolerance
  baseBranch: 'main',
  storycapPreset: 'standard', // desktop + mobile viewports
  argosPreset: 'standard',
})

/**
 * Custom viewport definitions matching playwright.config.ts
 * (exported for CI scripts that need viewport info)
 */
export const ULTIMA_VIEWPORTS = {
  desktop: { width: 1920, height: 1080, name: 'desktop' },
  tablet: { width: 768, height: 1024, name: 'tablet' },
  mobile: { width: 390, height: 844, name: 'mobile' },
}

/**
 * Visual assertion presets per section.
 * Reusable across visual-proof.spec.ts and visual-ai-review.spec.ts
 */
export const SECTION_ASSERTIONS = {
  hero: [
    'Hero heading text is clearly readable against dark background',
    'Gradient text (blue to purple to orange) is visible',
    'Navigation bar has glass-morphism effect',
    'CTA buttons are prominently placed',
    'Dark space theme background is consistent',
  ],
  vision: [
    'Section heading with gradient text is readable',
    'Metric cards have glass-morphism styling',
    'Numbers are prominently displayed',
    'Card layouts are properly aligned',
  ],
  technology: [
    'Three pillar cards in grid layout',
    'Each card has distinct neon accent color',
    'Glass-morphism visible on cards',
    'Card content is readable',
  ],
  architecture: [
    '6-layer stack visible (L0-L5)',
    'Status indicators present (ACTIVE, EVOLVING, OBSERVING, UNKNOWN)',
    'Glass-morphism card styling',
    'Gradient heading text visible',
  ],
  contact: [
    'CTA card centered with glow border',
    'Email button has gradient background',
    'Green pulse indicator visible',
    'Heading gradient text readable',
  ],
  fullPage: [
    'All sections properly ordered',
    'Dark space theme consistent throughout',
    'No layout breaks or overlapping elements',
    'Typography consistent (Inter + JetBrains Mono)',
    'Color palette cohesive',
  ],
}

/**
 * Threshold for AI review pass rate.
 * At least this % of assertions must pass for the review to be considered successful.
 */
export const AI_REVIEW_PASS_THRESHOLD = 0.8 // 80% of assertions must pass
