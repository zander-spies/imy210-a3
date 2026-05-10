// Spies u25033931
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.scss'],
  runtimeConfig: {
    public: {
      strapiBase: process.env.STRAPI_BASE_URL || 'http://localhost:1337'
    }
  },
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      'Playfair Display': [400, 700, 900],
      'DM Sans': [300, 400, 500]
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/css/variables" as *;`
        }
      }
    }
  }
})
