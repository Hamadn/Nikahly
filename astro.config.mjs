import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import clerk from '@clerk/astro'

export default defineConfig({
  integrations: [react(), tailwind(), clerk()],
  adapter: node({ mode: 'standalone' }),
  output: 'server',
  site: 'https://nikahly.me',
})