// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  // Genesis hash-based port: crc32('project-ultima-web') % 10000 + 15000
  devServer: {
    port: 15575,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  app: {
    head: {
      title: 'UltimaMinds | Architecting Living Minds',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'We don\'t build NPCs; we architect Living Minds. Autonomous ecosystems, sentient AI orchestration, and hyperbolic trauma memory.',
        },
        { name: 'theme-color', content: '#05050a' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700, 800],
      'JetBrains Mono': [400, 500],
    },
    display: 'swap',
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
})
