<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col gap-2 min-h-[160px]">
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

    <template v-if="hasData">
      <h2 class="text-2xl font-bold">{{ value }}</h2>
      <div class="flex items-center mt-2 text-sm gap-2">
        <PositiveTrendIcon v-if="trendDirection === 'positive'" />
        <NegativeTrendIcon v-else />
        <div class="flex items-center">
          <span
            :class="[
              'mr-1',
              `text-${trendDirection === 'positive' ? 'green' : 'red'}-500`,
            ]"
          >
            {{ trendValue }}
          </span>
          <span class="text-xs text-gray-500">
            {{ trendDirection === 'positive' ? 'in più' : 'in meno' }} rispetto
            al mese scorso
          </span>
        </div>
      </div>
    </template>

    <template v-else>
      <div
        class="flex flex-col items-center justify-center text-center text-gray-400 py-6 space-y-1"
      >
        <p class="text-sm font-medium">Dati non ancora disponibili</p>
        <p class="text-xs">
          I valori verranno mostrati appena riceverai una prenotazione.
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import PositiveTrendIcon from '@/public/svg/trend/positive-trend.svg';
import NegativeTrendIcon from '@/public/svg/trend/negative-trend.svg';

interface StatsCardProps {
  title: string;
  value: string;
  iconBgColor: string;
  trendValue: string;
  trendDirection: 'positive' | 'negative';
  hasData?: boolean;
}

const props = withDefaults(defineProps<StatsCardProps>(), {
  hasData: true,
});
</script>
