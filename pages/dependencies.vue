<script setup lang="ts">
const { data, pending, error } = await useAsyncData('deps', () =>
  $fetch<{ dependencies: Record<string, string>, devDependencies: Record<string, string> }>('/api/dependencies')
)
</script>

<template>
  <div class="prose max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Зависимости проекта</h1>

    <div v-if="pending">⏳ Загружаем...</div>
    <div v-else-if="error">❌ {{ error.message }}</div>

    <div v-else>
      <h2 class="text-xl font-semibold mt-6 mb-2">dependencies</h2>
      <ul class="list-disc pl-5 space-y-1">
        <li v-for="(v, k) in data!.dependencies" :key="k">
          <code>{{ k }}</code> — <span class="text-sm">{{ v }}</span>
        </li>
      </ul>

      <h2 class="text-xl font-semibold mt-6 mb-2">devDependencies</h2>
      <ul class="list-disc pl-5 space-y-1">
        <li v-for="(v, k) in data!.devDependencies" :key="k">
          <code>{{ k }}</code> — <span class="text-sm">{{ v }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
