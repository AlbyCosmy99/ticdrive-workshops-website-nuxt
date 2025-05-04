<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { inject } from "@vercel/analytics"
inject()
</script>
