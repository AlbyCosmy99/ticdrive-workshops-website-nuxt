<template>
  <tr>
    <td>
      <div class="text-xl font-medium text-tic text-center">{{ number }}</div>
    </td>
    <td class="py-4">
      <div class="flex items-center justify-center">
        <div
          class="flex-shrink-0 h-[70px] w-[70px] bg-gray-200 rounded-2xl overflow-hidden"
        >
          <NuxtImg
            v-if="userImage"
            :src="userImage"
            :alt="`${user}'s avatar`"
            class="w-full h-full object-cover"
            width="70"
            height="70"
          />
        </div>
        <div class="ml-4 flex flex-col gap-2">
          <div class="text-base font-medium">{{ user }}</div>
          <div class="text-sm font-medium text-tic">{{ userId }}</div>
        </div>
      </div>
    </td>
    <td>
      <div class="ml-4 flex items-center justify-center">
        <div class="flex flex-col gap-2">
          <div class="text-base font-medium">{{ date }}</div>
          <div class="text-sm font-medium text-tic">{{ time }}</div>
        </div>
      </div>
    </td>

    <td class="text-center">
      <div class="text-base font-semibold">{{ service }}</div>
    </td>
    <td>
      <div class="flex items-center justify-center">
        <div
          :class="[
            'p-2 rounded-md flex items-center justify-center w-24',
            ratingBackgroundColor,
          ]"
        >
          <template v-for="i in 5" :key="i">
            <span
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
interface ReviewRowProps {
  number: string;
  user: string;
  userId: string;
  date: string;
  time: string;
  service: string;
  rating: string;
  userImage: string;
}

const props = defineProps<ReviewRowProps>();

const ratingBackgroundColor = computed((): string => {
  const rating = parseInt(props.rating);
  if (rating >= 4) return 'bg-green-100';
  if (rating >= 3) return 'bg-amber-100';
  return 'bg-red-100';
});
</script>
