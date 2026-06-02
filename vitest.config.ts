import { getViteConfig } from "astro/config";
import { astroRenderer } from "vitest-browser-astro/plugin";
import { playwright } from "@vitest/browser-playwright";

export default getViteConfig({
  plugins: [astroRenderer()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [
        { browser: "chromium" },
      ],
    },
  },
});
