import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve the directory where this file lives
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// The design directory is one level up from .config
const designDir = path.resolve(__dirname, '..');
// The src directory is one level up from design
const srcDir = path.resolve(designDir, '..');

export const designAliases = {
  "~": designDir,
  "@": srcDir,
  "~/assets_/": path.resolve(designDir, "assets/components/"),
  "~/data_/": path.resolve(designDir, "data/components/"),
  "~/feedback_/": path.resolve(designDir, "feedback/components/"),
  "~/forms_/": path.resolve(designDir, "forms/components/"),
  "~/layout_/": path.resolve(designDir, "layout/components/"),
  "~/nav_/": path.resolve(designDir, "nav/components/"),
  "~/overlays_/": path.resolve(designDir, "overlays/components/"),
  "~/shared_/": path.resolve(designDir, "shared/components/"),
  "~/surfaces_/": path.resolve(designDir, "surfaces/components/"),
  "~/triggers_/": path.resolve(designDir, "triggers/components/"),
  "~/typography_/": path.resolve(designDir, "typography/components/"),
};
