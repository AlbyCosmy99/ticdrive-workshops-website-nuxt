<script setup lang="ts">
import Calendar from '~/components/dashboard/calendar/Calendar.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});
</script>

<template>
  <div class="p-6">
    <Calendar />
  </div>
</template>
