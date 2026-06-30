import type { AstroIntegration } from "astro";
import { tokensPlugin } from "./.config/plugins/tokens.ts";
import { checkCssVarsPlugin } from "./.config/plugins/check-css-vars.ts";
import { propsPlugin } from "./.config/plugins/props.ts";
import { designAliases } from "./.config/vite-aliases.ts";
import fs from "node:fs";

export default function dezign8(): AstroIntegration {
  return {
    name: "dezign8",
    hooks: {
      "astro:config:setup": ({ updateConfig, config, logger }) => {
        // 1. Inject the Vite plugins and aliases automatically
        updateConfig({
          vite: {
            plugins: [
              tokensPlugin(),
              checkCssVarsPlugin(),
              propsPlugin(),
            ],
            resolve: {
              alias: designAliases
            }
          }
        });

        // 2. Check if tsconfig.json is wired up, and if not, warn the user
        try {
          const tsconfigPath = new URL("tsconfig.json", config.root);
          if (fs.existsSync(tsconfigPath)) {
            const content = fs.readFileSync(tsconfigPath, "utf-8");
            const expectedPath = "./src/design/.config/tsconfig.paths.json";
            
            if (!content.includes(expectedPath)) {
              logger.warn(
                `Your tsconfig.json does not extend the design system paths.\n` +
                `To fix editor imports, add "${expectedPath}" to the "extends" array in your tsconfig.json.`
              );
            }
          }
        } catch (e) {
          // Ignore file read errors
        }
      }
    }
  };
}
