import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Tabs from "./Tabs.astro";

test("tabs structure rendering", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Tabs, {
    props: { defaultTab: "tab-1" },
    slots: {
      tabs: '<button role="tab" aria-controls="tab-1">Tab 1</button>',
      default: '<div role="tabpanel" id="tab-1">Panel 1</div>'
    }
  });

  expect(result).toContain('role="tablist"');
  expect(result).toContain('Tab 1');
  expect(result).toContain('Panel 1');
});
