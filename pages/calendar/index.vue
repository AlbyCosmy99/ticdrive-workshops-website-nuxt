<script setup lang="ts">
import TicDriveCalendar from '~/components/dashboard/calendar/TicDriveCalendar.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});
</script>

<template>
  <TicDriveCalendar />
</template>
