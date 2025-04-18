<template>
  <div class="w-full bg-white rounded-lg border border-gray-200 flex items-center justify-between px-6 py-6 shadow-sm">
    <!-- Greeting Section -->
    <div class="flex flex-col">
      <h1 class="text-xl font-bold text-gray-800">Ciao, {{ userName }}</h1>
      <p class="text-sm text-gray-600">{{ welcomeMessage }}</p>
    </div>

    <!-- Right Section: Icons and Profile -->
    <div class="flex items-center space-x-6">
      <!-- Message Icon -->
      <div class="relative">
        <button class="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
          <img 
            :src="messageIconPath" 
            alt="Messages" 
            class="h-5 w-5" 
          />
          <span v-if="unreadMessages > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {{ unreadMessages }}
          </span>
        </button>
      </div>
      
      <!-- Notification Bell Icon -->
      <div class="relative">
        <button class="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
          <img 
            :src="notificationIconPath" 
            alt="Notifications" 
            class="h-5 w-5" 
          />
          <span v-if="unreadNotifications > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {{ unreadNotifications }}
          </span>
        </button>
      </div>

      <!-- User Profile -->
      <div class="flex items-center">
        <div class="h-10 w-10 rounded-full overflow-hidden">
          <img 
            :src="userProfileImage" 
            :alt="`${userName} profile picture`"
            class="h-full w-full object-cover" 
          />
        </div>
        <div class="ml-3">
          <h3 class="font-bold text-gray-800 text-sm">{{ userName }}</h3>
          <p class="text-xs text-gray-500">{{ userRole }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavBar',
  props: {
    userName: {
      type: String,
      default: 'Mario Rossi'
    },
    userRole: {
      type: String,
      default: 'Titolare'
    },
    welcomeMessage: {
      type: String,
      default: 'Organizziamo insieme il lavoro in officina oggi!'
    },
    userProfileImage: {
      type: String,
      default: 'images/Profile.png ' // for now here, new dir to put navBar and sidebar image? 
    },
    messageIconPath: {
      type: String,
      default: '/images/mail.png ' // for now here
    },
    notificationIconPath: {
      type: String,
      default: '/images/bell.png ' // for now here
    },
    unreadMessages: {
      type: Number,
      default: 1
    },
    unreadNotifications: {
      type: Number,
      default: 1
    }
  }
});
</script>