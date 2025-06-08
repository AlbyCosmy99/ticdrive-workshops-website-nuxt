<template>
  <div v-if="loading" class="flex justify-center items-center h-48">
    <TicDriveSpinner />
  </div>
  <div
    v-else-if="reviews.length === 0"
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
    <div class="mb-6">
      <ReviewsOverview :reviews="reviews" />
    </div>

    <div class="flex flex-col gap-4">
      <h3 class="font-semibold text-xl px-4">Recensioni individuali</h3>
      <div class="flex flex-col gap-2">
        <ReviewCard
          v-for="review in reviews"
          :key="review.id"
          :user="review.customerName"
          :avatar="review.customerImageUrl"
          :date="review.whenPublished"
          :rating="review.stars"
          :comment="review.text"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReviewCard from '../ui/cards/reviews/ReviewCard.vue';
import getReviewsAsync from '~/services/http/requests/get/reviews/getReviewsAsync';
import useAuthStore from '~/store/auth';
import useTicDriveAxios from '~/composables/useTicDriveAxios';
import useToast from '~/composables/useToast';
import type {Review} from '~/types/reviews/Review';
import TicDriveSpinner from '../ui/spinners/TicDriveSpinner.vue';
import ReviewsOverview from './ReviewsOverview.vue';

const loading = ref(false);
const $ticDriveAxios = useTicDriveAxios();
const authStore = useAuthStore();
const showToast = useToast();
const reviews = ref<Review[]>([]);

onMounted(async () => {
  try {
    loading.value = true;
    const res = await getReviewsAsync($ticDriveAxios, authStore.user?.id!);
    reviews.value = res.data;
  } catch (e: any) {
    showToast(
      'error',
      'Errore durante il carimento delle recensioni',
      e.message,
    );
  } finally {
    loading.value = false;
  }
});
</script>
