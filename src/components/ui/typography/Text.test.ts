import { render } from "vitest-browser-astro";
import { expect, test } from "vitest";
import Text from "./Text.astro";

test("renders standard paragraph", async () => {
  const screen = await render(Text, {
    slots: { default: "Sample Text" },
  });

  await expect.element(screen.getByText("Sample Text")).toBeVisible();
  await expect.element(screen.locator('p')).toBeInTheDocument();
});

test("polymorphism: renders as h1", async () => {
  const screen = await render(Text, {
    props: { as: "h1" },
    slots: { default: "Heading" },
  });

  await expect.element(screen.locator('h1')).toBeInTheDocument();
  await expect.element(screen.getByText("Heading")).toBeVisible();
});

test("applies tone classes", async () => {
  const screen = await render(Text, {
    props: { tone: "accent" },
    slots: { default: "Accent Text" },
  });

  await expect.element(screen.locator('.text--accent')).toBeInTheDocument();
});
