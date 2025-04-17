<template>
  <div class="w-[220px] bg-white h-[66.6667vh] rounded-lg border border-gray-200 flex flex-col py-6 shadow-sm relative">
    <!-- Logo -->
    <div class="px-6 mb-12">
      <div class="flex items-center justify-center">
        <img 
          src="public/images/ticDriveLogo.png" 
          alt="TicDrive Logo" 
          class="h-40 w-40" 
        />
      </div>
    </div>

    <!-- Navigation Menu -->
    <div class="flex flex-col flex-grow space-y-1 px-4">
      <div class="relative">
        <!-- Curved indicator at extreme left edge of sidebar -->
        <div class="absolute left-0 w-1 h-13 bg-green-500 transition-all rounded-r-md" 
          :class="$route.path === '/dashboard' ? 'opacity-100' : 'opacity-0'"
          style="top: 50%; transform: translateY(-50%); left: -16px;"></div>
          
        <button
          @click="$router.push('/dashboard')"
          class="flex items-center text-gray-700 py-3 px-4 rounded-md hover:bg-green-100 group transition-colors w-full"
          :class="{ 'bg-green-300': $route.path === '/dashboard' }"
        >
          <div class="w-6 h-6 mr-3 flex items-center justify-center text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <span class="font-medium text-sm">Dashboard</span>
        </button>
      </div>

      <div class="relative">
        <div class="absolute left-0 w-1 h-13 bg-green-500 transition-all rounded-r-md" 
          :class="$route.path === '/bookings' ? 'opacity-100' : 'opacity-0'"
          style="top: 50%; transform: translateY(-50%); left: -16px;"></div>
          
        <button
          @click="$router.push('/bookings')"
          class="flex items-center text-gray-700 py-3 px-4 rounded-md hover:bg-green-100 group transition-colors w-full"
          :class="{ 'bg-green-300': $route.path === '/bookings' }"
        >
          <div class="w-6 h-6 mr-3 flex items-center justify-center text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="font-medium text-sm">Prenotazioni</span>
        </button>
      </div>

      <div class="relative">
        <div class="absolute left-0 w-1 h-13 bg-green-500 transition-all rounded-r-md" 
          :class="$route.path === '/calendar' ? 'opacity-100' : 'opacity-0'"
          style="top: 50%; transform: translateY(-50%); left: -16px;"></div>
          
        <button
          @click="$router.push('/calendar')"
          class="flex items-center text-gray-700 py-3 px-4 rounded-md hover:bg-green-100 group transition-colors w-full"
          :class="{ 'bg-green-300': $route.path === '/calendar' }"
        >
          <div class="w-6 h-6 mr-3 flex items-center justify-center text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="font-medium text-sm">Calendario</span>
        </button>
      </div>

      <div class="relative">
        <div class="absolute left-0 w-1 h-13 bg-green-500 transition-all rounded-r-md" 
          :class="$route.path === '/settings' ? 'opacity-100' : 'opacity-0'"
          style="top: 50%; transform: translateY(-50%); left: -16px;"></div>
          
        <button
          @click="$router.push('/settings')"
          class="flex items-center text-gray-700 py-3 px-4 rounded-md hover:bg-green-100 group transition-colors w-full"
          :class="{ 'bg-green-300': $route.path === '/settings' }"
        >
          <div class="w-6 h-6 mr-3 flex items-center justify-center text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="font-medium text-sm">Impostazioni</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideBar',
  computed: {
    currentRoute() {
      return this.$route.path;
    }
  }
});
</script>