<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold mb-4">Dashboard</h1>
    <p>This is the dashboard page content.</p>
  </div>
</template>
