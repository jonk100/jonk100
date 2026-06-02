import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Accordion from "./Accordion.astro";

test("accordion rendering", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Accordion, {
    slots: {
      default: '<details><summary>Item 1</summary>Content</details>'
    }
  });

  expect(result).toContain("accordion");
  expect(result).toContain("Item 1");
});
