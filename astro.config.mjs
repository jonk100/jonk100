// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import alpinejs from '@astrojs/alpinejs';
import { defineConfig } from 'astro/config';
import path from 'path';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',

  integrations: [
      alpinejs(),
      mdx(),
      sitemap()
	],

  adapter: netlify(),

  vite: {
    resolve: {
      alias: {
        '@writty': path.resolve('./writty/src'),
      }
    }
  }
});