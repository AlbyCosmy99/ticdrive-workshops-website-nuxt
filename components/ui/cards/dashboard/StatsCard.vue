<!-- components/ui/StatsCard.vue -->
<template>
  <div :class="['bg-white rounded-lg shadow p-4 flex flex-col justify-between', cardClass]" style="width: 262px; height: 161px;">
    <div class="flex justify-between items-start">
      <h3 class="text-gray-500 text-sm font-medium">{{ title }}</h3>
      <div class="flex items-center justify-center">
        <img v-if="iconPath" :src="iconPath" :style="{ width: iconSize, height: iconSize }" alt="icon" />
      </div>
    </div>
    <div class="flex items-end justify-between mt-auto">
      <div>
        <h2 class="text-3xl font-bold">{{ value }}</h2>
        <div class="flex items-center mt-2 text-sm">
          <span :class="[trendColor, 'mr-1']">{{ trend }}</span>
          <span class="text-gray-500">{{ trendLabel }}</span>
        </div>
      </div>
      <div v-if="rating" class="flex items-center bg-amber-100 rounded-full px-2 py-1">
        <img src="@/public/svg/logos/dashboard/StarsIcon.svg" class="w-4 h-4 text-amber-500 mr-1" alt="star" />
        <span class="font-bold text-sm">{{ rating }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface StatsCardProps {
  title: string;
  value: string;
  iconPath: string;
  trend: string;
  trendLabel: string;
  trendColor: string;
  rating?: string;
  iconSize?: string;
  cardClass?: string;
}

const props = defineProps<StatsCardProps>();

// Default values for optional props
// or tra iconSize a size =24
const iconSize = props.iconSize || '24px';
</script>
