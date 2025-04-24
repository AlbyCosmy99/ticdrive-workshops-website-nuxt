<script setup lang="ts">
import FullReviwes from '~/components/dashboard/fullReviews/FullReviews.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});
</script>

<template>
  <FullReviwes />
</template>
