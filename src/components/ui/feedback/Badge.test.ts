import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Badge from "./Badge.astro";

test("renders themed badge", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Badge, {
    props: { theme: "success" },
    slots: { default: "Stable" },
  });

  expect(result).toContain("badge--success");
  expect(result).toContain("Stable");
});
