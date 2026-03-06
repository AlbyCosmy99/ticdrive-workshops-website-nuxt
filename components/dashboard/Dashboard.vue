<template>
  <div class="flex flex-col w-full">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-1">Panoramica</h1>
    </div>

    <StatsCards />

    <div class="mb-8">
      <div
        class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <h2 class="text-2xl font-semibold leading-tight">
          Prenotazioni In Attesa di Conferma
        </h2>
        <SeeAllButton @on-click="router.push('/bookings')" />
      </div>

      <div v-if="hasBookings" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BookingCard
          name="Mario Verdi"
          time="Oggi - 13:30"
          service="Cambio olio"
          vehicle="Toyota Corolla 2021"
          price="€120"
          paymentStatus="paid"
          clockIconSvg="/svg/clock-icon.svg"
          toolsIconSvg="/svg/tools-icon.svg"
          carIconSvg="/svg/car-icon.svg"
          paymentIconSvg="/svg/payment-icon.svg"
          statusIconSvg="/svg/status-icon.svg"
          userImageSrc="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
        />
        <BookingCard
          name="Mario Verdi"
          time="Oggi - 13:30"
          service="Cambio olio"
          vehicle="Toyota Corolla 2021"
          price="€120"
          paymentStatus="paid"
          clockIconSvg="/svg/clock-icon.svg"
          toolsIconSvg="/svg/tools-icon.svg"
          carIconSvg="/svg/car-icon.svg"
          paymentIconSvg="/svg/payment-icon.svg"
          statusIconSvg="/svg/status-icon.svg"
          userImageSrc="https://cdn-icons-png.flaticon.com/512/8090/8090457.png"
        />
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center text-gray-400 shadow-sm"
      >
        <img
          src="/images/booking.png"
          alt="Nessuna prenotazione"
          class="w-24 h-24 mb-4 opacity-70"
        />
        <p class="text-lg font-medium">Nessuna prenotazione al momento</p>
        <p class="text-sm text-gray-500">
          Riceverai le richieste dei clienti direttamente qui
        </p>
      </div>
    </div>

    <div class="mb-2">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-2xl font-semibold">Recensioni Recenti</h2>
      </div>
      <ReviewExtendedCards />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import BookingCard from '~/components/ui/cards/dashboard/BookingCard.vue';
import StatsCards from '../ui/cards/dashboard/stats/StatsCards.vue';
import SeeAllButton from '../ui/buttons/SeeAllButton.vue';
import ReviewExtendedCards from '../ui/cards/reviews/ReviewExtendedCards.vue';

const router = useRouter();

const hasBookings = ref(false);
</script>
