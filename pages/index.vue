<script setup lang="ts">
import { computed } from 'vue'
import pkg from '~/package.json' with { type: 'json' }

interface DepEntry {
  name: string
  version: string
}

const combine = (deps?: Record<string, string>): DepEntry[] =>
  deps ? Object.entries(deps).map(([name, version]) => ({ name, version })) : []

const list = [...combine(pkg.dependencies), ...combine(pkg.devDependencies)]

const categorize = (name: string): string => {
  if (/^(cypress|playwright|vitest|testcafe|jsdom|vue-test-utils)/.test(name))
    return 'Тесты'
  if (/^(eslint|@typescript-eslint)/.test(name) || /prettier/.test(name))
    return 'Линтинг / форматирование'
  if (/^(tailwindcss|@nuxtjs\/tailwindcss|postcss|autoprefixer|sass)/.test(name))
    return 'Стили'
  if (/(sitemap|robots|schema-org|seo|pwa|plausible)/.test(name))
    return 'SEO / PWA / Аналитика'
  if (/pinia/.test(name)) return 'State-management'
  if (/socket\.io/.test(name)) return 'Реал-тайм / сокеты'
  if (/(vee-validate|yup)/.test(name)) return 'Формы / валидация'
  if (/(nuxt|vue)/.test(name)) return 'Ядро фреймворка'
  return 'Прочее'
}

const grouped = computed<Record<string, DepEntry[]>>(() => {
  const g: Record<string, DepEntry[]> = {}
  list.forEach(dep => {
    const cat = categorize(dep.name)
    ;(g[cat] ||= []).push(dep)
  })
  return g
})
</script>


<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50 p-8"
  >
    <h1
      class="text-4xl md:text-5xl font-extrabold text-indigo-600 mb-10 drop-shadow-lg"
    >
      Project&nbsp;Dependencies
    </h1>

    <section
      v-for="(deps, category) in grouped"
      :key="category"
      class="mb-12 w-full max-w-6xl"
    >
      <h2 class="text-2xl font-bold text-gray-700 mb-4">{{ category }}</h2>

      <TransitionGroup
        tag="ul"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        enter-active-class="transform transition duration-700"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0 translate-y-6 rotate-6 scale-75"
        enter-to-class="opacity-100 translate-y-0 rotate-0 scale-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <li
          v-for="dep in deps"
          :key="dep.name"
          class="relative p-6 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md border border-white/30 flex flex-col gap-2"
        >
          <span class="text-lg font-semibold text-gray-800">{{ dep.name }}</span>
          <span class="text-sm text-gray-500">{{ dep.version }}</span>

          <span
            class="absolute top-4 right-4 inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-xs animate-pop"
            >✓</span
          >
        </li>
      </TransitionGroup>
    </section>
  </div>
</template>


