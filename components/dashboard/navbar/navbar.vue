<template>
  <div class="bg-white w-full h-auto min-h-[70px] py-4 px-5 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
    <div>
      <h1 class="font-bold text-xl text-gray-800">Ciao Andrei:/</h1>
      <p class="text-sm text-gray-500">Let's organize our work</p>
    </div>
    <div class="flex items-center space-x-5">
      <button class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border-2 border-white shadow-sm">
        <img src="/images/mail.png" alt="Messages" class="w-6 h-6" />
      </button>
      <button class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border-2 border-white shadow-sm">
        <img src="/images/bell.png" alt="Notifications" class="w-6 h-6" />
      </button>
      <button class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          <img src="/images/Profile.png" alt="Profile" class="w-full h-full object-cover" />
        </div>
        <div class="flex flex-col items-start">
          <span class="font-semibold text-gray-800">Andrei Riccardi</span>
          <span class="text-sm text-gray-500">Dependent</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>