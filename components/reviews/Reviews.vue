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
    <div class="mb-8">
      <h2 class="flex items-center text-2xl font-semibold">
        <span class="text-amber-500 mr-2">★</span>
        {{ averageRating }}/5 ({{ totalReviews }} recensioni)
      </h2>

      <div class="py-4 space-y-3 pr-4">
        <div
          v-for="(count, index) in ratingDistribution"
          :key="index"
          class="flex items-center gap-3"
        >
          <div class="w-6 text-center font-medium">{{ 5 - index }}</div>
          <div class="flex-1 bg-gray-200 rounded-full h-2.5">
            <div
              class="h-2.5 rounded-full"
              :style="{
                width: `${calculatePercentage(count)}%`,
                backgroundColor: '#39b269',
              }"
            ></div>
          </div>
          <div class="flex">
            <template v-for="i in 5" :key="i">
              <span
                class="text-amber-500"
                :class="{'opacity-40': i > 5 - index}"
              >
                {{ i <= 5 - index ? '★' : '☆' }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>

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
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import ReviewCard from '../ui/cards/reviews/ReviewCard.vue';

// Reviews data
const totalReviews = ref(57);
const averageRating = ref('4.4');
const ratingDistribution = ref([37, 10, 7, 3, 0]); // 5★, 4★, 3★, 2★, 1★

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
    rating: 5,
    comment:
      "Si vede chiaramente da parte del personale l'esperienza lavorativa nel settore, veloci, onesti nei prezzi e anche simpatici.",
  },
  {
    id: 3,
    user: 'Maria Rossi',
    avatar: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
    date: '2 settimane fa',
    rating: 3,
    comment: 'Professionali cortesi disponibili e con prezzi buoni',
  },
]);

// Methods
const calculatePercentage = (count: number) => {
  const total = ratingDistribution.value.reduce(
    (sum, current) => sum + current,
    0,
  );
  return (count / total) * 100;
};

const handleReply = (user: string) => {
  console.log(`Replying to ${user}'s review`);
  // Implement reply functionality here
};
</script>
