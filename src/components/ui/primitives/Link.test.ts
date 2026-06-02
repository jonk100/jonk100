import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Link from "./Link.astro";

test("renders basic link", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Link, {
    props: { href: "/test" },
    slots: { default: "Link Text" },
  });

  expect(result).toContain('href="/test"');
  expect(result).toContain("Link Text");
});
