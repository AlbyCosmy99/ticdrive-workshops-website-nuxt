<template>
  <div class="flex flex-col w-full">
    <div class="mb-4">
      <h1 class="text-2xl font-bold mb-1">Panoramica</h1>
    </div>
    <StatsCards />
    <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">
          Prenotazioni In Attesa di Conferma
        </h2>
        <button
          class="flex items-center text-white bg-[#39b269] px-4 py-2 rounded-md"
        >
          <SeeAllButton @on-click="router.push('/bookings')" />
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>

    <div class="mb-2">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Recensioni Recenti</h2>
        <button
          class="flex items-center text-white bg-[#39b269] px-4 py-2 rounded-md"
        >
          <SeeAllButton @on-click="router.push('/reviews')" />
        </button>
      </div>
      <ReviewCards />
    </div>
  </div>
</template>

<script setup lang="ts">
import BookingCard from '~/components/ui/cards/dashboard/BookingCard.vue';
import StatsCards from '../ui/cards/dashboard/stats/StatsCards.vue';
import SeeAllButton from '../ui/buttons/SeeAllButton.vue';
import ReviewCards from '../ui/cards/reviews/ReviewCards.vue';

const router = useRouter();
</script>
