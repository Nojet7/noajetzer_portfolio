import data from './data/projects.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Noa Jetzer',
      meta: [
        {name: 'description', content: 'Portfolio website for Noa Jetzer'}
      ],
      link: [
        { rel: 'icon', type: 'image/svg', href: '/N.jpg' },
      ],
    }
  },
  css: ['~/assets/css/main.css'],
  ssr: true,       
  nitro: {
    prerender: {
      routes: [
        '/',
        ...data.projects.map(p => `/projects/${p.slug}`)
      ]     
    }
  }
})
