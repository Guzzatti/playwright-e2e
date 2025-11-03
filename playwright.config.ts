import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'src/scenarios',
  timeout: 120000,
  retries: 0,
  expect: {
    timeout: 30000,
  },
  use: {
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    launchOptions: {
      slowMo: 150,
    },
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'off',
    locale: 'pt-BR',
    actionTimeout: 10000,
    navigationTimeout: 20000,
  },
  reporter: [
    [
      'html',
      {
        outputFolder: 'artifacts/report',
        open: 'never',
      },
    ],
    ['list'],
  ],
});
