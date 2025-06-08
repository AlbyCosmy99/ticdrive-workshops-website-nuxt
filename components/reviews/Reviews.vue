<template>
  <div
    v-if="reviews.length === 0"
    class="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg shadow-sm text-center"
  >
    <h2 class="text-xl font-semibold text-gray-700 mb-2">
      Nessuna recensione disponibile
    </h2>
    <p class="text-gray-500 mb-4">
      Quando un utente prenota un servizio e lascia una recensione, sarà
      disponibile in questa sezione.
    </p>
    <button
      class="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded transition"
      @click="navigateTo('/dashboard')"
    >
      Vai alla Dashboard
    </button>
  </div>
  <div v-else class="bg-white rounded-lg shadow-sm p-2">
    <!-- Reviews summary section -->
    <div class="mb-6">
      <MediaReviews :reviews="reviews" />
    </div>

    <!-- Individual reviews section using ReviewCard -->
    <div class="flex flex-col gap-4">
      <h3 class="font-semibold text-xl px-4">Recensioni individuali</h3>
      <div class="flex flex-col gap-2">
        <ReviewCard
          v-for="review in reviews"
          :key="review.id"
          :user="review.user"
          :avatar="review.avatar"
          :date="review.date"
          :rating="review.rating"
          :comment="review.comment"
          @reply="handleReply"
          @viewProfile="viewUserProfile"
          @report="reportReview"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import ReviewCard from '../ui/cards/reviews/ReviewCard.vue';
import MediaReviews from '../ui/cards/reviews/MediaReviews.vue';

const reviews = ref([
  {
    id: 1,
    user: 'Maria Rossi',
    avatar: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
    date: '2 giorni fa',
    rating: 5,
    comment:
      "Si vede chiaramente da parte del personale l'esperienza lavorativa nel settore, veloci, onesti nei prezzi e anche simpatici.",
  },
  {
    id: 2,
    user: 'Maria Rossi',
    avatar: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
    date: '2 giorni fa',
    rating: 3,
    comment:
      "Si vede chiaramente da parte del personale l'esperienza lavorativa nel settore, veloci, onesti nei prezzi e anche simpatici.",
  },
  {
    id: 3,
    user: 'Maria Rossi',
    avatar: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
    date: '2 settimane fa',
    rating: 1,
    comment: 'Professionali cortesi disponibili e con prezzi buoni',
  },
]);

const handleReply = (user: string) => {
  console.log(`Replying to ${user}'s review`);
  // Implement reply functionality here
};

const viewUserProfile = (user: string) => {
  console.log(`Viewing ${user}'s profile`);
  // Implement profile view functionality here
};

const reportReview = (user: string) => {
  console.log(`Reporting ${user}'s review`);
  // Implement report functionality here
};
</script>
