import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Breadcrumbs from "./Breadcrumbs.astro";

test("breadcrumbs rendering", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Breadcrumbs, {
    slots: { default: "<li>Home</li>" }
  });

  expect(result).toContain('aria-label="Breadcrumb"');
});
