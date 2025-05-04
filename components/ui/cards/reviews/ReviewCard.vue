<template>
  <div class="p-4 border border-gray-100 rounded-lg shadow-sm">
    <div class="flex items-start gap-4">
      <!-- User avatar -->
      <div
        class="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-full overflow-hidden"
      >
        <img
          v-if="avatar"
          :src="avatar"
          :alt="`${user}'s avatar`"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Review content -->
      <div class="flex-1">
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-medium text-lg">{{ user }}</h3>
          <div class="flex px-2 py-1 rounded-md" :class="ratingBackgroundClass">
            <template v-for="i in 5" :key="i">
              <span class="text-amber-500" :class="{'opacity-40': i > rating}">
                {{ i <= rating ? '★' : '☆' }}
              </span>
            </template>
          </div>
        </div>

        <div class="text-sm text-gray-500 mb-2">{{ date }}</div>
        <p class="text-gray-700">{{ comment }}</p>
      </div>
    </div>

    <!-- Reply button -->
    <div class="flex justify-end mt-4">
      <button
        class="px-4 py-2 text-white rounded-full hover:opacity-90 transition"
        style="background-color: #39b269"
        @click="handleReply"
      >
        Rispondi
      </button>

      <div class="relative ml-2" ref="menuRef">
        <button
          class="text-gray-400 hover:text-gray-600"
          @click="toggleOptions"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>

        <div
          v-if="showOptions"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200"
        >
          <button
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            @click="viewProfile"
          >
            View profile
          </button>
          <button
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            @click="reportReview"
          >
            Report
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, onMounted, onBeforeUnmount} from 'vue';

interface ReviewCardProps {
  user: string;
  avatar?: string;
  date: string;
  rating: number;
  comment: string;
}

const props = defineProps<ReviewCardProps>();
const emit = defineEmits(['reply', 'viewProfile', 'report']);

const showOptions = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    showOptions.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside, true);
});

const ratingBackgroundClass = computed((): string => {
  if (props.rating >= 4) return 'bg-emerald-50';
  if (props.rating >= 3) return 'bg-amber-100';
  return 'bg-red-100';
});

const handleReply = () => {
  emit('reply', props.user);
};

const toggleOptions = () => {
  showOptions.value = !showOptions.value;
};

const viewProfile = () => {
  emit('viewProfile', props.user);
  showOptions.value = false;
};

const reportReview = () => {
  emit('report', props.user);
  showOptions.value = false;
};
</script>
