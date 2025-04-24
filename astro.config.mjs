import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import react from '@astrojs/react';
import clerk from '@clerk/astro'

export default defineConfig({
  integrations: [clerk(), react()],
  adapter: node({ mode: 'standalone' }),
  output: 'server',
})