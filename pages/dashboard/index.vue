<script setup lang="ts">
import Dashboard from '~/components/dashboard/Dashboard.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});
</script>

<template>
  <div>
    <Dashboard/>
    <p>This is the dashboard page content.</p>
  </div>
</template>
