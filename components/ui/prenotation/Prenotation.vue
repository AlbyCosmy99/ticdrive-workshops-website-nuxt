<template>
    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Tab Navigation -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Prenotazioni</h1>
        <div class="flex border border-gray-200 rounded-full overflow-hidden">
          <button 
            class="px-4 py-2 font-medium transition-colors"
            :class="activeTab === 'confirmed' ? 'bg-drive text-white' : 'bg-white'" 
            @click="changeTab('confirmed')">
            Confermate
          </button>
          <button 
            class="px-4 py-2 font-medium transition-colors"
            :class="activeTab === 'toConfirm' ? 'bg-drive text-white' : 'bg-white'"
            @click="changeTab('toConfirm')">
            Da Confermare
          </button>
          <button 
            class="px-4 py-2 font-medium transition-colors"
            :class="activeTab === 'history' ? 'bg-drive text-white' : 'bg-white'"
            @click="changeTab('history')">
            Storico
          </button>
        </div>
      </div>
      
      <!-- Dynamic Component based on active tab -->
      <component :is="currentTabComponent" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import ToConfirm from './ToConfirm.vue'
  import Confirmed from './Confirmed.vue'
  import History from './History.vue'
  
  const activeTab = ref('toConfirm')
  
  const currentTabComponent = computed(() => {
    switch(activeTab.value) {
      case 'toConfirm':
        return ToConfirm
      case 'confirmed':
        return Confirmed
      case 'history':
        return History
      default:
        return ToConfirm
    }
  })
  
  const changeTab = (tab: string) => {
    activeTab.value = tab
  }
  </script>