import { dezign8 } from 'dezign8';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkProps from './src/plugins/remark-props.mjs';
import remarkPreview from './src/plugins/remark-preview.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://jonk100.netlify.app',
  integrations: [
    dezign8(), 
    mdx({
      remarkPlugins: [remarkProps, remarkPreview],
    }),
    sitemap(),
  ],
});
