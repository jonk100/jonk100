import { render } from "vitest-browser-astro";
import { expect, test } from "vitest";
import Table from "./Table.astro";
import TableRow from "./TableRow.astro";

test("table responsiveness", async () => {
  const screen = await render(Table, {
    slots: { default: "<tr><td>Data</td></tr>" }
  });

  await expect.element(screen.locator('.table-wrapper')).toBeInTheDocument();
  await expect.element(screen.locator('table')).toBeVisible();
});

test("row hover state", async () => {
  const screen = await render(TableRow, {
    props: { hover: true },
    slots: { default: "<td>Row</td>" }
  });

  await expect.element(screen.locator('.table-row--hover')).toBeInTheDocument();
});
