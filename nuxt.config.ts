import data from './data/projects.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Noa Jetzer',
      meta: [
        { name: 'description', content: 'Portfolio website for Noa Jetzer' }
      ],
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/Favicon.jpeg' },
      ],
    }
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      cloudinaryCloudName: process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }
  },
  ssr: true,
  nitro: {
    preset: "static",
    prerender: {
      routes: [
        '/',
        ...data.projects.map(p => `/projects/${p.slug}`)
      ]
    }
  }
})
