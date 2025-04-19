<template>
  <div
    class="bg-white w-full h-auto min-h-[70px] py-4 px-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between"
  >
    <div>
      <h1 class="font-semibold text-2xl">Ciao, Mario Rossi</h1>
      <p class="text-sm font-normal">Let's organize our work</p>
    </div>
    <div class="flex items-center space-x-4">
      <button class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border-2 border-white shadow-sm">
        <img src="/images/mail.png" alt="Messages" class="w-6 h-6" />
      </button>
      <button
        class="cursor-pointer w-[48px] h-[48px] rounded-full flex items-center justify-center transition-colors shadow-sm"
      >
        <img src="/images/bell.png" alt="Notifications" class="w-6 h-6" />
      </button>
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden" style="border: none;">
          <img 
            src="/images/Profile.png" 
            alt="Profile" 
            class="w-[100%] h-[100%] object-cover" 
            style="object-position: center; margin: 0; padding: 0;"
          />
        </div>
        <div class="flex flex-col items-start justify-center">
          <span class="font-semibold text-gray-800 leading-tight">Andrei Riccardi</span>
          <span class="text-sm text-gray-500 leading-tight">Dependent</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
