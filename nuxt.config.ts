import { defineNuxtConfig } from 'nuxt/config'
import type { NuxtConfig } from '@nuxt/schema'

export default defineNuxtConfig({
  /* -------------------------------------------------- */
  /*  Rendering & Nitro                                 */
  /* -------------------------------------------------- */
  ssr: true,
  nitro: {
    prerender: { crawlLinks: true },
    compressPublicAssets: true,
    compatibilityDate: '2025-05-01',
    routeRules: {
      '/api/session': { }
    }
  },

  /* -------------------------------------------------- */
  /*  Modules                                           */
  /* -------------------------------------------------- */
  modules: [
    [
      '@pinia/nuxt',
      {
        ssr: true,
        autoImports: ['defineStore', 'storeToRefs', 'withDefaults']
      }
    ],

    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@sentry/nuxt',
    '@sidebase/nuxt-auth',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vite-pwa/nuxt',
    'nuxt-seo-utils',
    '@nuxtjs/robots',
  ],

  /* -------------------------------------------------- */
  /*  PostCSS                                           */
  /* -------------------------------------------------- */
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  /* -------------------------------------------------- */
  /*  Aliases                                           */
  /* -------------------------------------------------- */
  alias: {
    components: '/components',
    utils: '/utils',
    types: '/types',
    services: '/services',
    store: '/store',
    pages: '/pages',
    public: '/public',
    server: '/server',
  },  

  /* -------------------------------------------------- */
  /*  i18n                                              */
  /* -------------------------------------------------- */
  i18n: {
    lazy: true,
    langDir: '',
    strategy: 'prefix_except_default',
    defaultLocale: 'ru',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true
    },
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'ru', file: 'ru.json', name: 'Русский' }
    ]
  },

  /* -------------------------------------------------- */
  /*  socket.io                                         */
  /* -------------------------------------------------- */
  io: {
    sockets: [{ name: 'main', url: 'https://example.com' }]
  },

  /* -------------------------------------------------- */
  /*  SEO / meta                                        */
  /* -------------------------------------------------- */
  site: { url: 'https://example.com', name: 'Example' },

  sitemap: {
    sitemaps: {
      posts: {
        include: [],
        defaults: { priority: 0.7 },
      },
      pages: {
        exclude: []
      },
    },
  },

  /* -------------------------------------------------- */
  /*  Runtime config (Nitro)                            */
  /* -------------------------------------------------- */
  runtimeConfig: {
    public: {},
    private: {}
  },


  /* -------------------------------------------------- */
  /*  PWA                                               */
  /* -------------------------------------------------- */
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'My App',
      short_name: 'App',
      theme_color: '#0ea5e9'
    }
  },

  /* -------------------------------------------------- */
  /*  Sentry                                            */
  /* -------------------------------------------------- */
  sentry: {
    dsn: 'https://YOUR_DSN@sentry.io/123',
    logSampleRate: 1.0
  },

  /* -------------------------------------------------- */
  /*  Auth (sidebase/nuxt-auth)                         */
  /* -------------------------------------------------- */
  auth: {
    baseURL: process.env.AUTH_BASE_URL || '/api',
  },


}) 
