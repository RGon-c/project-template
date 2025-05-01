import Plausible from 'plausible-tracker'
export default defineNuxtPlugin(() => {
  const { trackPageview } = Plausible({ domain: 'example.com' })
  watch(() => useRoute().fullPath, () => trackPageview())
})
