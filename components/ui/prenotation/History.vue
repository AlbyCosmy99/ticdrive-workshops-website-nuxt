<template>
  <div>
    <div v-if="hasBookings" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- BookingCard -->
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center text-center text-gray-400 py-10"
    >
      <img
        src="@/public/images/booking.png"
        alt="Nessuna prenotazione"
        class="w-24 h-24 mb-4 opacity-70"
      />
      <p class="text-lg font-medium">Nessuna cronologia disponibile</p>
      <p class="text-sm text-gray-500">
        Lo storico sarà visibile dopo le prime prenotazioni concluse.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const hasBookings = false;
</script>
