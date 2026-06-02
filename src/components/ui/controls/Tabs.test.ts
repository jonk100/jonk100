import { render } from "vitest-browser-astro";
import { expect, test } from "vitest";
import Tabs from "./Tabs.astro";
import TabButton from "./TabButton.astro";
import TabPanel from "./TabPanel.astro";

test("tab switching logic", async () => {
  const screen = await render(Tabs, {
    props: { defaultTab: "tab-1" },
    slots: {
      tabs: `
        <button role="tab" aria-controls="tab-1" id="btn-1">Tab 1</button>
        <button role="tab" aria-controls="tab-2" id="btn-2">Tab 2</button>
      `,
      default: `
        <div role="tabpanel" id="tab-1">Panel 1</div>
        <div role="tabpanel" id="tab-2" style="display:none">Panel 2</div>
      `
    }
  });

  const btn2 = screen.getByText("Tab 2");
  await btn2.click();

  // Panel 2 should now be visible, Panel 1 hidden
  await expect.element(screen.getByText("Panel 2")).toBeVisible();
  await expect.element(screen.getByText("Panel 1")).not.toBeVisible();
});
