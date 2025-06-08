<script setup>
import Bookings from '~/components/bookings/Bookings.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});
</script>

<template>
  <Bookings />
</template>
