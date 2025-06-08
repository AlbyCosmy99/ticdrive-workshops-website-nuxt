<template>
  <div class="rounded-xl border border-gray-100 shadow-sm p-4 bg-white hover:shadow-md transition duration-300 ease-in-out">
    <div class="flex gap-3">
      <!-- Avatar -->
      <div class="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
        <img
          v-if="avatar"
          :src="avatar"
          :alt="`${user}'s avatar`"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Content -->
      <div class="flex-1">
        <div class="flex justify-between items-center mb-1">
          <h3 class="font-semibold text-sm text-gray-900 truncate">{{ user }}</h3>
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

        <div class="text-xs text-gray-400 mb-1">{{ date }}</div>
        <p class="text-sm text-gray-700 leading-snug">
          {{ comment }}
        </p>

        <!-- Actions -->
        <div class="flex justify-end gap-3 mt-3 items-center">
          <button
            @click="handleReply"
            class="text-sm font-medium text-green-700 border border-green-500 rounded-full px-3 py-1 hover:bg-green-50 transition"
          >
            Rispondi
          </button>
          <button
            @click="reportReview"
            class="text-sm text-gray-400 hover:text-gray-600 transition"
            aria-label="Segnala recensione"
          >
            <FlagIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FlagIcon from '/public/svg/stars/flag.svg';

interface ReviewCardProps {
  user: string;
  avatar?: string;
  date: string;
  rating: number;
  comment: string;
}

const props = defineProps<ReviewCardProps>();

const handleReply = () => {
  console.log(`Reply to ${props.user}`);
};

const reportReview = () => {
  console.log(`Report ${props.user}`);
};
</script>
