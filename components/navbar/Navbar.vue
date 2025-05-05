<template>
  <div
    class="bg-white w-full h-auto min-h-[70px] py-4 px-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between"
  >
    <div>
      <h1 class="font-semibold text-2xl">Ciao, {{ authStore.user?.name }}</h1>
      <p class="text-sm font-normal">
        Organizziamo insieme il lavoro in officina oggi!
      </p>
    </div>
    <div class="flex items-center gap-8">
      <div class="flex items-center space-x-3">
        <div
          class="cursor-pointer w-[48px] h-[48px] rounded-full overflow-hidden flex items-center justify-center transition-colors shadow-sm"
        >
          <img
            :src="authStore.user?.profileImageUrl"
            alt="Profile"
            class="w-full h-full object-cover rounded-full"
          />
        </div>
        <div class="flex flex-col items-start justify-center">
          <span class="font-semibold text-gray-800 leading-tight">
            {{ authStore.user?.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from '~/store/auth';
import OptionButton from './OptionButton.vue';

const authStore = useAuthStore();

// Vuoto per ora, puoi aggiungere logica se serve
</script>
