import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Button from "./Button.astro";

test("renders standard button", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Button, {
    props: { label: "Click Me" },
  });

  expect(result).toContain("Click Me");
  expect(result).toContain("control");
});

test("renders loading state", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Button, {
    props: { label: "Click Me", loading: true },
  });

  expect(result).toContain('data-testid="control-loader"');
  expect(result).toContain('disabled');
});
