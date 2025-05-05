<template>
  <div
    class="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col h-[85vh] relative overflow-hidden"
  >
    <h1 class="text-2xl font-semibold mb-6">Calendario Prenotazioni</h1>

    <div class="flex justify-between items-center mb-6">
      <!-- Intestazione con pulsanti -->
      ...
    </div>

    <!-- Contenuto calendario bloccato -->
    <div
      class="flex-grow flex flex-col overflow-auto pointer-events-none opacity-50 select-none"
    >
      <DayView v-if="activeView === 'day'" class="flex-grow" />
      <WeekView v-else-if="activeView === 'week'" class="flex-grow" />
      <MonthView v-else-if="activeView === 'month'" class="flex-grow" />
    </div>

    <!-- Overlay: Presto disponibile -->
    <div
      class="absolute inset-0 bg-white bg-opacity-[1%] backdrop-blur-sm flex flex-col items-center justify-center z-10 text-gray-600 text-center"
    >
      <svg
        class="w-16 h-16 mb-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M12 9.75V12h1.5M12 18a6 6 0 100-12 6 6 0 000 12z"
        />
      </svg>
      <h2 class="text-xl font-semibold">Calendario non ancora disponibile</h2>
      <p class="text-sm mt-1">
        Stiamo lavorando per attivare questa funzionalità.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue';
import DayView from './DayView.vue';
import WeekView from './WeekView.vue';
import MonthView from './MonthView.vue';

const activeView = ref('week');

const dayNames = [
  'Domenica',
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato',
];

const monthNames = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

const today = new Date();

// Compute today text in the format "Oggi, Giovedì 7 Febbraio"
const todayText = computed(() => {
  const dayOfWeek = dayNames[today.getDay()];
  const dayOfMonth = today.getDate();
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();

  return `Oggi, ${dayOfWeek} ${dayOfMonth} ${month}`;
});

const goToToday = () => {
  console.log('Go to today');
};
</script>
