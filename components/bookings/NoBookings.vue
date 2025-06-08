<template>
  <div
    class="flex flex-col items-center justify-center py-10 text-gray-400 text-center"
  >
    <img
      src="@/public/images/bookings/booking.png"
      alt="Nessuna prenotazione"
      class="w-24 h-24 mb-4 opacity-70"
    />
    <p class="text-lg font-medium">{{ title }}</p>
    <p class="text-sm text-gray-500">{{ subtitle }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
  }>(),
  {
    title: 'Nessuna prenotazione al momento',
    subtitle: 'Riceverai le richieste dei clienti direttamente qui',
  },
);
</script>
