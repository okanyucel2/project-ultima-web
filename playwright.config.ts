import { createPlaywrightConfig } from '@genesis/playwright-config'
import { devices } from '@playwright/test'

const isProduction = !!process.env.VISUAL_PROOF_PRODUCTION

const config = createPlaywrightConfig({
  projectSlug: 'project-ultima-web',
  testDir: './tests/e2e',
  ...(isProduction
    ? { baseURL: 'https://ultimaminds.ai' }
    : {
        webServer: {
          command: 'pnpm dev',
        },
      }),
  timeout: 60000,
  use: {
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
})

// Override projects for multi-viewport visual proof
// workers: 2 to prevent CPU saturation (3 viewports x N tests)
export default {
  ...config,
  workers: 2,
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'tablet',
      use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 } },
    },
  ],
}
