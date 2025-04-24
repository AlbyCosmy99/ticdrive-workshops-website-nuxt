<script setup>
import TicDriveBooking from '~/components/ui/prenotation/Prenotation.vue';
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});
</script>

<template>
  <TicDriveBooking />
</template>
