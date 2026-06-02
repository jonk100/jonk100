import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Text from "./Text.astro";

test("renders standard paragraph", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Text, {
    slots: { default: "Sample Text" },
  });

  expect(result).toContain("Sample Text");
  expect(result).toContain("<p");
});

test("polymorphism: renders as h1", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Text, {
    props: { as: "h1" },
    slots: { default: "Heading" },
  });

  expect(result).toContain("<h1");
  expect(result).toContain("Heading");
});
