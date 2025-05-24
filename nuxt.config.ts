import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {enabled: true},

  css: [
    'primevue/resources/themes/aura-light-green/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    '~/assets/css/main.css',
  ],

  vite: {
    plugins: [svgLoader()],
  },

  build: {
    transpile: ['primevue'],
  },

  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/sitemap',
      {
        sitemap: {
          siteUrl: 'https://www.ticdrive.it',
          trailingSlash: false,
          autoLastmod: true,
        },
      },
    ],
  ],

  app: {
    head: {
      title: 'TicDrive – Prenota servizi auto',
      meta: [
        {
          name: 'description',
          content:
            'TicDrive è l’app che ti permette di prenotare servizi auto facilmente, confrontando officine e prezzi vicino a te.',
        },
        {
          name: 'keywords',
          content:
            'ticdrive, officine, auto, prenotazione, meccanico, revisione, cambio olio',
        },
        {property: 'og:title', content: 'TicDrive – Prenota servizi auto'},
        {
          property: 'og:description',
          content:
            'Prenota servizi per la tua auto con TicDrive: trova officine, confronta prezzi e leggi recensioni.',
        },
        {property: 'og:type', content: 'website'},
        {property: 'og:url', content: 'https://www.ticdrive.it'},
        {property: 'og:image', content: '/images/ticDriveLogo.png'},
      ],
      link: [{rel: 'icon', type: 'image/png', href: '/favicon.png'}],
    },
  },
});
