<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Prenotazioni</h1>
      <div class="flex border border-gray-200 rounded-full overflow-hidden">
        <button
          class="px-4 py-2 font-medium transition-colors"
          :class="
            activeTab === 'confirmed' ? 'bg-drive text-white' : 'bg-white'
          "
          @click="changeTab('confirmed')"
        >
          Confermate
        </button>
        <button
          class="px-4 py-2 font-medium transition-colors"
          :class="
            activeTab === 'to-confirm' ? 'bg-drive text-white' : 'bg-white'
          "
          @click="changeTab('to-confirm')"
        >
          Da Confermare
        </button>
        <button
          class="px-4 py-2 font-medium transition-colors"
          :class="activeTab === 'history' ? 'bg-drive text-white' : 'bg-white'"
          @click="changeTab('history')"
        >
          Storico
        </button>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-medium mb-6">{{ title }}</h2>
      <BookingHistoryTable v-if="activeTab === 'history'" />
      <UiCardsBookingsCards
        v-else
        :key="activeTab"
        :booking-type="activeTab === 'confirmed' ? 'Accepted' : 'Waiting'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import BookingHistoryTable from '../ui/tables/BookingHistoryTable.vue';

type activeTabTypes = 'confirmed' | 'to-confirm' | 'history';

const activeTab = ref<activeTabTypes>('to-confirm');

const title = computed(() => {
  switch (activeTab.value) {
    case 'to-confirm':
      return 'Prenotazioni In Attesa di Conferma';
    case 'confirmed':
      return 'Prenotazioni Confermate';
    case 'history':
      return 'Storico Prenotazioni';
  }
});

const changeTab = (tab: activeTabTypes) => {
  activeTab.value = tab;
};
</script>
