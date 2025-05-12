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
      <div class="flex items-center space-x-4">
        <OptionButton image="/images/mail.png" alt="Messages" />
        <OptionButton image="/images/bell.png" alt="Notifications" />
      </div>
      <div class="flex items-center space-x-3">
        <div
          v-if="authStore.user?.images.length"
          class="cursor-pointer w-[48px] h-[48px] rounded-full overflow-hidden flex items-center justify-center transition-colors shadow-sm"
        >
          <NuxtImg
            :src="authStore.user?.images[0].url"
            alt="Profile"
            class="w-full h-full object-cover rounded-full"
          />
        </div>
        <div class="flex flex-col items-start justify-center">
          <span class="font-semibold text-gray-800 leading-tight">
            {{ authStore.user?.name }}
          </span>
          <span class="text-xs font-normal">Titolare</span>
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
