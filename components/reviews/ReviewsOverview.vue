<template>
  <div class="bg-white rounded-xl shadow p-6">
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6"
    >
      <div class="flex items-center gap-2">
        <span class="text-yellow-400 text-3xl">★</span>
        <h2 class="text-2xl font-bold text-gray-800">
          {{ averageRating }}/5.0
        </h2>
      </div>
      <p class="text-gray-500 text-sm">
        {{ totalReviews }} recensione<span v-if="totalReviews !== 1">i</span>
        totale
      </p>
    </div>

    <div class="space-y-3">
      <div
        v-for="rating in [5, 4, 3, 2, 1]"
        :key="rating"
        class="flex items-center gap-3"
      >
        <span class="w-4 text-sm font-medium text-gray-600">{{ rating }}</span>
        <div class="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            class="bg-green-500 h-full rounded-full transition-all duration-500 ease-in-out"
            :style="{width: getPercentage(rating) + '%'}"
          />
        </div>
        <div class="flex gap-[1px]">
          <span
            v-for="i in 5"
            :key="i"
            class="text-sm"
            :class="i <= rating ? 'text-yellow-400' : 'text-gray-300'"
          >
            ★
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import type {Review} from '~/types/reviews/Review';

interface Props {
  reviews: Review[];
}

const props = defineProps<Props>();

const totalReviews = computed(() => props.reviews.length);

const averageRating = computed(() => {
  if (!props.reviews.length) return '0.0';
  const sum = props.reviews.reduce((acc, r) => acc + r.stars, 0);
  return (sum / props.reviews.length).toFixed(1);
});

const ratingCounts = computed<Record<number, number>>(() => {
  const counts: Record<number, number> = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

  props.reviews.forEach(review => {
    const rating = Math.round(review.stars);
    if (rating >= 1 && rating <= 5) counts[rating]++;
  });

  return counts;
});

const getPercentage = (rating: number): number => {
  if (!totalReviews.value) return 0;
  return (ratingCounts.value[rating] / totalReviews.value) * 100;
};
</script>
