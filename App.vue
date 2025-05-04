<template>
  <NuxtLayout>
    <NuxtPage />
    <Analytics/>
    <SpeedInsights/>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Analytics } from '@vercel/analytics/nuxt'
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
</script>
