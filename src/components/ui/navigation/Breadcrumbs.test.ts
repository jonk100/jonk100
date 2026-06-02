import { render } from "vitest-browser-astro";
import { expect, test } from "vitest";
import Breadcrumbs from "./Breadcrumbs.astro";
import BreadcrumbItem from "./BreadcrumbItem.astro";

test("breadcrumbs ARIA roles", async () => {
  const screen = await render(Breadcrumbs, {
    slots: {
      default: '<li role="listitem">Home</li>'
    }
  });

  const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
  await expect.element(nav).toBeVisible();
});

test("current item signaling", async () => {
  const screen = await render(BreadcrumbItem, {
    props: { current: true },
    slots: { default: "Current Page" }
  });

  const text = screen.getByText("Current Page");
  await expect.element(text).toHaveAttribute("aria-current", "page");
});
