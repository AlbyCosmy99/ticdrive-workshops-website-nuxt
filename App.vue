<script setup lang="ts">
import Footer from './components/Footer.vue';

definePageMeta({
  title: 'TicDrive - Prenota servizi auto online',
  description: 'Scopri TicDrive: l’app che ti aiuta a trovare, confrontare e prenotare servizi per la tua auto. Facile, veloce e affidabile.',
});

const route = useRoute();

const showGlobalFooter = computed(() => {
  const hiddenPrefixes = [
    '/auth',
    '/dashboard',
    '/bookings',
    '/calendar',
    '/settings',
    '/reviews',
  ];

  return !hiddenPrefixes.some(prefix => route.path.startsWith(prefix));
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Footer v-if="showGlobalFooter" />
  </NuxtLayout>
</template>
