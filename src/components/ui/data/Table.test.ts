import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Table from "./Table.astro";

test("table rendering", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Table, {
    slots: { default: "<tr><td>Data</td></tr>" }
  });

  expect(result).toContain("table-wrapper");
  expect(result).toContain("<table");
});
