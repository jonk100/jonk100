// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkProps from './src/plugins/remark-props.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx({
    remarkPlugins: [remarkProps],
  })],
});
