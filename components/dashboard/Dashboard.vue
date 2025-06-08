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
        <SeeAllButton
          @on-click="router.push('/bookings')"
          content="Vedi tutte le richieste"
        />
      </div>
      <UiCardsBookingsCards booking-type="Waiting" :take="2"/>
    </div>

    <div class="mb-2">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Recensioni Recenti</h2>
        <SeeAllButton
          @on-click="router.push('/reviews')"
          content="Vedi tutte le recensioni"
        />
      </div>
      <ReviewExtendedCards />
    </div>
  </div>
</template>

<script setup lang="ts">
import StatsCards from '../ui/cards/dashboard/stats/StatsCards.vue';
import SeeAllButton from '../ui/buttons/SeeAllButton.vue';
import ReviewExtendedCards from '../ui/cards/reviews/ReviewExtendedCards.vue';

const router = useRouter();
</script>
