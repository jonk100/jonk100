import { render } from "vitest-browser-astro";
import { expect, test } from "vitest";
import Badge from "./Badge.astro";

test("renders themed badge", async () => {
  const screen = await render(Badge, {
    props: { theme: "success" },
    slots: { default: "Stable" },
  });

  await expect.element(screen.locator('.badge--success')).toBeInTheDocument();
  await expect.element(screen.getByText("Stable")).toBeVisible();
});

test("renders outlined variant", async () => {
  const screen = await render(Badge, {
    props: { outlined: true },
    slots: { default: "Outlined" },
  });

  await expect.element(screen.locator('.badge--outlined')).toBeInTheDocument();
});
