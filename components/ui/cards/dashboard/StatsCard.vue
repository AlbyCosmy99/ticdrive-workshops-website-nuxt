<!-- components/ui/StatsCard.vue -->
<template>
    <div class="bg-white rounded-lg shadow p-4 flex flex-col">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-gray-500 text-sm font-medium">{{ title }}</h3>
        <div :class="['w-10 h-10 rounded-full flex items-center justify-center', iconBgColor]">
          <ClientIcon/>
        </div>
      </div>
      <div class="flex items-end justify-between">
        <div>
          <h2 class="text-3xl font-bold">{{ value }}</h2>
          <div class="flex items-center mt-2 text-sm">
            <span :class="[trendColor, 'mr-1']">{{ trend }}</span>
            <span class="text-gray-500">{{ trendLabel }}</span>
          </div>
        </div>
        <div v-if="rating" class="flex items-center bg-amber-100 rounded-full px-2 py-1">
          <img v-if="starIconSvg" :src="starIconSvg" alt="Star" class="w-4 h-4 mr-1" />
          <span v-else class="text-amber-500 text-sm mr-1">★</span>
          <span class="font-bold text-sm">{{ rating }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineComponent } from 'vue';
  import ClientIcon from "@/public/svg/logos/dashboard/ClientIcon.svg"
  interface StatsCardProps {
    title: string;
    value: string;
    iconSvg: string;
    iconBgColor: string;
    trend: string;
    trendLabel: string;
    trendColor: string;
    rating?: string;
    starIconSvg?: string;
  }
  
  defineComponent({
    name: 'StatsCard'
  });
  
  defineProps<StatsCardProps>();
  </script>