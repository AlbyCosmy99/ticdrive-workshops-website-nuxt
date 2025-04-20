<script setup lang="ts">
import Dashboard from '~/components/dashboard/Dashboard.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});
</script>

<template>
  <Dashboard />
</template>
