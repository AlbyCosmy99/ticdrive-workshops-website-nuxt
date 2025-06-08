<template>
  <div
    class="bg-white rounded-xl border border-gray-200 shadow p-6 flex flex-col h-[85vh]"
  >
    <h1 class="text-2xl font-semibold mb-6">Calendario Prenotazioni</h1>

    <div class="flex justify-between items-center mb-6">
      <div
        class="flex items-center space-x-2 cursor-pointer group"
        @click="goToToday"
      >
        <div
          class="text-drive border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition"
        >
          <CalendarIcon />
        </div>
        <span class="font-medium text-drive">{{ todayText }}</span>
      </div>
      <CalendarViewSwitcher v-model="activeView" />
    </div>

    <div class="flex-grow overflow-auto">
      <DayView
        v-if="activeView === 'day'"
        :focusToday="goTodayFlag"
        @view-mounted="resetGoTodayFlag"
      />
      <WeekView
        v-else-if="activeView === 'week'"
        :focusToday="goTodayFlag"
        @view-mounted="resetGoTodayFlag"
      />
      <MonthView
        v-else-if="activeView === 'month'"
        :focusToday="goTodayFlag"
        @view-mounted="resetGoTodayFlag"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import DayView from './DayView.vue';
import WeekView from './WeekView.vue';
import MonthView from './MonthView.vue';
import CalendarViewSwitcher from './CalendarViewSwitcher.vue';
import CalendarIcon from '@/public/svg/time/calendar.svg';
import italianDayNames from '~/data/datetime/italianDayNames';
import italianMonthNames from '~/data/datetime/italianMonthNames';

const activeView = ref<'day' | 'week' | 'month'>('week');
const goTodayFlag = ref(false);

const today = new Date();
const todayText = computed(() => {
  return `Oggi, ${italianDayNames[today.getDay()]} ${today.getDate()} ${italianMonthNames[today.getMonth()]}`;
});

const goToToday = () => {
  activeView.value = 'day';
  goTodayFlag.value = true;
};

const resetGoTodayFlag = () => {
  goTodayFlag.value = false;
};
</script>
