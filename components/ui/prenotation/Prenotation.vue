<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <!-- Tab Navigation -->
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-2xl font-bold text-gray-800">Prenotazioni</h1>
      <div
        class="grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 sm:w-auto sm:grid-cols-3 sm:rounded-full"
      >
        <button
          class="px-4 py-3 font-medium transition-colors"
          :class="
            activeTab === 'confirmed' ? 'bg-drive text-white' : 'bg-white'
          "
          @click="changeTab('confirmed')"
        >
          Confermate
        </button>
        <button
          class="border-t border-gray-200 px-4 py-3 font-medium transition-colors sm:border-l sm:border-t-0"
          :class="
            activeTab === 'toConfirm' ? 'bg-drive text-white' : 'bg-white'
          "
          @click="changeTab('toConfirm')"
        >
          Da Confermare
        </button>
        <button
          class="border-t border-gray-200 px-4 py-3 font-medium transition-colors sm:border-l sm:border-t-0"
          :class="activeTab === 'history' ? 'bg-drive text-white' : 'bg-white'"
          @click="changeTab('history')"
        >
          Storico
        </button>
      </div>
    </div>

    <!-- Dynamic Component based on active tab -->
    <component :is="currentTabComponent" />
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import ToConfirm from './ToConfirm.vue';
import Confirmed from './Confirmed.vue';
import History from './History.vue';

const activeTab = ref('toConfirm');

const currentTabComponent = computed(() => {
  switch (activeTab.value) {
    case 'toConfirm':
      return ToConfirm;
    case 'confirmed':
      return Confirmed;
    case 'history':
      return History;
    default:
      return ToConfirm;
  }
});

const changeTab = (tab: string) => {
  activeTab.value = tab;
};
</script>
