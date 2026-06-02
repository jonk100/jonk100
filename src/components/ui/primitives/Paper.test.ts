import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Paper from "./Paper.astro";

test("renders elevated paper", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Paper, {
    props: { layer: 3 },
    slots: { default: "Paper Content" },
  });

  expect(result).toContain("layer--3");
});
