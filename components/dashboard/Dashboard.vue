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
      <UiCardsBookingsCards booking-type="Waiting" :take="2" />
    </div>

    <div class="mb-2">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Recensioni Recenti</h2>
        <SeeAllButton
          @on-click="router.push('/reviews')"
          content="Vedi tutte le recensioni"
        />
      </div>
      <div class="grid gap-4">
        <ReviewCard
          v-for="review in recentReviews"
          :key="review.id"
          v-bind="review"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatsCards from '../ui/cards/dashboard/stats/StatsCards.vue';
import SeeAllButton from '../ui/buttons/SeeAllButton.vue';
import ReviewCard from '../ui/cards/reviews/ReviewCard.vue'; 

const router = useRouter();

const recentReviews = [
  {
    id: 1,
    user: 'Mario Rossi',
    avatar: '/public/images/Profile.png',
    date: '2024-06-01',
    rating: 5,
    comment: 'Ottimo servizio!',
  },
  {
    id: 2,
    user: 'Giulia Bianchi',
    avatar: '/public/images/Profile.png',
    date: '2024-06-03',
    rating: 4,
    comment: 'Tutto perfetto, grazie!',
  },
];
</script>
