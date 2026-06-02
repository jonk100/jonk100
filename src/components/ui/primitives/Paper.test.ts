import { render } from "vitest-browser-astro";
import { expect, test } from "vitest";
import Paper from "./Paper.astro";

test("renders elevated paper", async () => {
  const screen = await render(Paper, {
    props: { layer: 3 },
    slots: { default: "Paper Content" },
  });

  await expect.element(screen.locator('.layer--3')).toBeInTheDocument();
});

test("applies interactive class", async () => {
  const screen = await render(Paper, {
    props: { interactive: true },
    slots: { default: "Interactive" },
  });

  await expect.element(screen.locator('.paper--interactive')).toBeInTheDocument();
});
