import { render } from "vitest-browser-astro";
import { expect, test } from "vitest";
import Card from "./Card.astro";
import CardHeader from "./CardHeader.astro";

test("card structure", async () => {
  const screen = await render(Card, {
    props: { layer: 2 },
    slots: {
      default: `
        <div class="header">Header</div>
        <div class="content">Content</div>
      `
    }
  });

  await expect.element(screen.locator('.card')).toBeInTheDocument();
  await expect.element(screen.locator('.layer--2')).toBeInTheDocument();
});
