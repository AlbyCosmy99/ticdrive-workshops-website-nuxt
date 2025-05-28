<template>
    <div class="bg-white rounded-lg p-6">
        <!-- Overall Rating Header -->
        <div class="flex items-center gap-2 mb-6">
            <span class="text-yellow-500 text-2xl">⭐</span>
            <h2 class="text-2xl font-semibold text-gray-900">
                {{ averageRating }}/5 ({{ totalReviews }} recensioni)
            </h2>
        </div>

        <!-- Rating Breakdown -->
        <div class="space-y-3">
            <div v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="flex items-center gap-4">
                <!-- Rating Number -->
                <span class="text-sm font-medium text-gray-700 w-3">{{ rating }}</span>

                <!-- Progress Bar -->
                <div class="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                    <div class="bg-green-500 h-full rounded-full transition-all duration-300 ease-out"
                        :style="{ width: getPercentage(rating) + '%' }"></div>
                </div>

                <!-- Star Rating Display -->
                <div class="flex items-center gap-1">
                    <template v-for="i in 5" :key="i">
                        <span class="text-yellow-400 text-sm" :class="{ 'text-gray-300': i > rating }">
                            ★
                        </span>
                    </template>
                </div>
            </div>
        </div>

        <!-- Individual Reviews Section -->

    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Review {
    id: string | number;
    user: string;
    avatar?: string;
    date: string;
    rating: number;
    comment: string;
}

interface Props {
    reviews: Review[];
}

const props = defineProps<Props>();
// No emit needed as individual reviews are handled by ReviewCard

// Calculate total reviews
const totalReviews = computed(() => props.reviews.length);

// Calculate average rating
const averageRating = computed(() => {
    if (props.reviews.length === 0) return '0';

    const sum = props.reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / props.reviews.length;
    return average.toFixed(1);
});

// Calculate rating distribution
const ratingCounts = computed(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    props.reviews.forEach(review => {
        if (review.rating >= 1 && review.rating <= 5) {
            counts[review.rating as keyof typeof counts]++;
        }
    });

    return counts;
});

// Calculate percentage for progress bars
const getPercentage = (rating: number): number => {
    if (totalReviews.value === 0) return 0;
    return (ratingCounts.value[rating as keyof typeof ratingCounts.value] / totalReviews.value) * 100;
};

// No handleReply function needed - individual reviews are handled by ReviewCard
</script>