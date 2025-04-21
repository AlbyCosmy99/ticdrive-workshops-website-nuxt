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
  ],
});
