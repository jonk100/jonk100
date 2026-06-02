import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Card from "./Card.astro";

test("card structure", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Card, {
    props: { layer: 2 },
    slots: { default: "Card Content" }
  });

  expect(result).toContain("card");
  expect(result).toContain("layer--2");
});
