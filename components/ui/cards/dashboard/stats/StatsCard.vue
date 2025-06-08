<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
    <div class="h-24 flex justify-center items-center" v-if="loading">
      <TicDriveSpinner />
    </div>
    <span v-else class="h-24">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-gray-500 text-sm font-semibold">{{ title }}</h3>
        <div
          :class="[
            'w-[60px] h-[60px] rounded-3xl flex items-center justify-center',
            iconBgColor,
          ]"
        >
          <slot name="icon" />
        </div>
      </div>
      <h2 class="text-2xl font-bold">{{ value }}</h2>
      <div
        v-if="trendDirection && trendValue"
        class="flex items-center mt-2 text-sm gap-2"
      >
        <PositiveTrendIcon v-if="trendDirection === 'positive'" />
        <NegativeTrendIcon v-else />
        <div class="flex items-center">
          <span
            :class="[
              'mr-1',
              `text-${trendDirection === 'positive' ? 'green' : 'red'}-500`,
            ]"
            >{{ trendValue }}</span
          >
          <span class="text-xs text-gray-500"
            >{{ trendDirection === 'positive' ? 'in piu' : 'in meno' }} rispetto
            al mese scorso</span
          >
        </div>
      </div>
    </span>
  </div>
</template>

<script setup lang="ts">
import PositiveTrendIcon from '@/public/svg/trend/positive-trend.svg';
import NegativeTrendIcon from '@/public/svg/trend/negative-trend.svg';
import TicDriveSpinner from '~/components/ui/spinners/TicDriveSpinner.vue';

interface StatsCardProps {
  title: string;
  value: string;
  iconBgColor: string;
  trendValue?: string;
  trendDirection?: 'positive' | 'negative';
  loading?: boolean;
}

const props = defineProps<StatsCardProps>();
</script>
