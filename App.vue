<script setup lang="ts">
import Footer from './components/Footer.vue';

definePageMeta({
  title: 'TicDrive - Prenota servizi auto online',
  description: 'Scopri TicDrive: l’app che ti aiuta a trovare, confrontare e prenotare servizi per la tua auto. Facile, veloce e affidabile.',
});

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Footer/>
  </NuxtLayout>
</template>
