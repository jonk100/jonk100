import { render } from "vitest-browser-astro";
import { expect, test } from "vitest";
import Bento from "./Bento.astro";
import BentoItem from "./BentoItem.astro";

test("bento grid column logic", async () => {
  const screen = await render(Bento, {
    props: { columns: 4, gap: "sm" },
    slots: {
      default: '<div class="item">Item</div>'
    }
  });

  const grid = screen.locator('.bento-grid');
  await expect.element(grid).toHaveStyle({ "grid-template-columns": "repeat(4, minmax(0, 1fr))" });
  await expect.element(grid).toHaveClass(/gap-sm/);
});

test("bento item span logic", async () => {
  const screen = await render(BentoItem, {
    props: { colSpan: 2, rowSpan: 3 },
    slots: { default: "Spanned Item" }
  });

  const item = screen.locator('.bento-item');
  await expect.element(item).toHaveStyle({ "grid-column": "span 2", "grid-row": "span 3" });
});
