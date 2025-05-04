<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  script: process.env.NODE_ENV === 'production'
    ? [{
        src: 'https://vercel.com/analytics/script.js',
        defer: true,
      }]
    : []
})
</script>
