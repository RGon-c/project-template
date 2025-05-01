<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'My App',
  meta: [{ name: 'description', content: 'My App description' }],
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
