<template>
  <div
    class="bg-white w-full h-auto min-h-[70px] py-4 px-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between"
  >
    <div>
      <h1 class="font-semibold text-2xl">Ciao, Mario Rossi</h1>
      <p class="text-sm font-normal">Let's organize our work</p>
    </div>
    <div class="flex items-center space-x-5">
      <button
        class="cursor-pointer w-[48px] h-[48px] rounded-full flex items-center justify-center transition-colors shadow-sm"
      >
        <img src="/images/mail.png" alt="Messages" class="w-6 h-6" />
      </button>
      <button
        class="cursor-pointer w-[48px] h-[48px] rounded-full flex items-center justify-center transition-colors shadow-sm"
      >
        <img src="/images/bell.png" alt="Notifications" class="w-6 h-6" />
      </button>
      <button
        class="cursor-pointer w-[48px] h-[48px] rounded-full flex items-center justify-center transition-colors"
      >
        <img src="/images/Profile.png" alt="Profile" class="w-full h-full" />
      </button>
      <div class="flex flex-col items-start">
        <span class="font-semibold text-gray-800">Andrei Riccardi</span>
        <span class="text-sm text-gray-500">Dependent</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
