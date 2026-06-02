import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Bento from "./Bento.astro";

test("bento grid rendering", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Bento, {
    props: { columns: 4 },
    slots: { default: "<div>Item</div>" }
  });

  expect(result).toContain("bento-grid");
  expect(result).toContain("grid-template-columns");
});
