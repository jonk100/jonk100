import { render } from "vitest-browser-astro";
import { expect, test } from "vitest";
import Accordion from "./Accordion.astro";
import AccordionItem from "./AccordionItem.astro";

test("accordion toggle logic", async () => {
  const screen = await render(Accordion, {
    slots: {
      default: `
        <details id="item-1">
          <summary>Item 1</summary>
          <div id="content-1">Content 1</div>
        </details>
      `
    }
  });

  const summary = screen.getByText("Item 1");
  const details = screen.locator('details');
  const content = screen.getByText("Content 1");

  // Initial state (closed)
  await expect.element(details).not.toHaveAttribute("open");

  // Click to open
  await summary.click();
  
  // Note: Native details behavior in some test environments might need 
  // manual attribute checks or a real browser instance.
  // With vitest-browser-astro + Playwright, this should work.
  await expect.element(details).toHaveAttribute("open");
});
