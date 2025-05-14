import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import clerk from '@clerk/astro'

export default defineConfig({
  integrations: [react(), tailwind(), clerk()],
  adapter: vercel(),
  output: 'server',
  site: 'https://nikahly.me',
})