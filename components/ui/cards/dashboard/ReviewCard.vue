<!-- components/ui/ReviewRow.vue -->
<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-lg font-medium text-gray-900">{{ number }}</div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div
          class="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full overflow-hidden"
        >
          <img
            v-if="userImageSrc"
            :src="userImageSrc"
            :alt="`${user}'s avatar`"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">{{ user }}</div>
          <div class="text-sm text-gray-500">{{ userId }}</div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ date }}</div>
      <div class="text-sm text-gray-500">{{ time }}</div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ service }}</div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div
        :class="[
          'px-3 py-1 rounded-md inline-flex items-center',
          ratingBackgroundColor,
        ]"
      >
        <div class="flex">
          <template v-for="i in 5" :key="i">
            <img
              v-if="StarsIcon"
              :src="StarsIcon"
              :alt="i <= parseInt(rating) ? 'Filled star' : 'Empty star'"
              :class="[
                'w-4 h-4',
                i <= parseInt(rating)
                  ? 'text-amber-500'
                  : 'text-amber-300 opacity-40',
              ]"
            />
            <span
              v-else
              :class="[
                'text-amber-500',
                i > parseInt(rating) ? 'opacity-40' : '',
              ]"
            >
              {{ i <= parseInt(rating) ? '★' : '☆' }}
            </span>
          </template>
        </div>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import {defineComponent, computed} from 'vue';

interface ReviewRowProps {
  number: string;
  user: string;
  userId: string;
  date: string;
  time: string;
  service: string;
  rating: string;
  userImageSrc?: string;
  starIconSvg?: string;
}

defineComponent({
  name: 'ReviewRow',
});

const props = defineProps<ReviewRowProps>();

const ratingBackgroundColor = computed((): string => {
  const rating = parseInt(props.rating);
  if (rating >= 4) return 'bg-green-100';
  if (rating >= 3) return 'bg-amber-100';
  return 'bg-red-100';
});
</script>
