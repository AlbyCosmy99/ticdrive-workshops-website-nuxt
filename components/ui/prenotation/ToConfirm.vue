<template>
  <div>
    <div v-if="hasBookings" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BookingCard
        name="Mario Verdi"
        time="Domani - 10:00"
        service="Cambio gomme"
        vehicle="Fiat Panda 2022"
        price="€80"
        paymentStatus="unpaid"
        clockIconSvg="/svg/clock-icon.svg"
        toolsIconSvg="/svg/tools-icon.svg"
        carIconSvg="/svg/car-icon.svg"
        paymentIconSvg="/svg/payment-icon.svg"
        statusIconSvg="/svg/status-icon.svg"
        userImageSrc="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
      />
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
      <p class="text-lg font-medium">Nessuna prenotazione da confermare</p>
      <p class="text-sm text-gray-500">
        Le richieste dei clienti compariranno qui appena disponibili.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import BookingCard from '~/components/ui/cards/dashboard/BookingCard.vue';
const hasBookings = false;
</script>
