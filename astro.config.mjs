// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import alpinejs from '@astrojs/alpinejs';
import { defineConfig } from 'astro/config';
import { remarkScreenplay } from './src/plugins/remark-screenplay.ts';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [
		alpinejs(),
		mdx({
			remarkPlugins: [remarkScreenplay],
		}), 
		sitemap()
	],
});
