import { defineConfig } from 'vitest/config';
import { getViteConfig } from 'astro/config';

export default defineConfig(
  getViteConfig({
    test: {
      browser: {
        enabled: false,
      },
      environment: 'happy-dom',
      globals: true,
      include: ['src/**/*.test.ts'],
      exclude: ['tests/e2e/**'],
    },
  })
);
