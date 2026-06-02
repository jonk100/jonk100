import { render } from "vitest-browser-astro";
import { expect, test } from "vitest";
import Button from "./Button.astro";

test("renders standard button", async () => {
  const screen = await render(Button, {
    props: { label: "Click Me" },
  });

  await expect.element(screen.getByText("Click Me")).toBeVisible();
});

test("renders loading state", async () => {
  const screen = await render(Button, {
    props: { label: "Click Me", loading: true },
  });

  // The label content area should be hidden
  await expect.element(screen.locator('.control-content')).not.toBeVisible();
  
  // The button should be disabled
  await expect.element(screen.getByRole("button")).toBeDisabled();
  
  // The spinner should be present
  await expect.element(screen.getByTestId("control-loader")).toBeVisible();
});
