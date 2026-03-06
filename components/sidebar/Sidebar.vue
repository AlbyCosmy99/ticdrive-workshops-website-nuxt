<template>
  <div
    class="flex h-full w-full flex-col border-r border-gray-200 bg-white py-5 shadow-xl shadow-slate-200/50 lg:rounded-2xl lg:border lg:py-6 lg:shadow-sm"
  >
    <div class="mb-8 flex items-center justify-center px-6 lg:mb-12">
      <button
        class="flex items-center justify-center"
        @click="router.push('/')"
      >
        <NuxtImg
          src="https://raw.githubusercontent.com/AlbyCosmy99/ticdrive-workshops-website-nuxt/7604878af149bec51368ddc4ae7686902fd92ad6/public/svg/TicDriveLogo.svg"
          alt="TicDrive logo"
          class="aspect-square max-w-full object-contain self-center"
          width="120"
          height="120"
        />
      </button>
    </div>

    <div class="flex flex-grow flex-col space-y-1 overflow-y-auto px-3 lg:px-4">
      <Element
        path="/dashboard"
        title="Dashboard"
        :selected="currentRoute === '/dashboard' || currentRoute === '/reviews'"
      >
        <template #icon>
          <SelectedDashboardLogo
            v-if="currentRoute === '/dashboard' || currentRoute === '/reviews'"
          />
          <DashboardLogo v-else />
        </template>
      </Element>
      <Element
        path="/bookings"
        title="Prenotazioni"
        :selected="currentRoute === '/bookings'"
      >
        <template #icon>
          <SelectedBookingsLogo v-if="currentRoute === '/bookings'" />
          <BookingsLogo v-else />
        </template>
      </Element>
      <Element
        path="/calendar"
        title="Calendario"
        :selected="currentRoute === '/calendar'"
      >
        <template #icon>
          <SelectedCalendarLogo v-if="currentRoute === '/calendar'" />
          <CalendarLogo v-else />
        </template>
      </Element>
      <Element
        path="/settings"
        title="Impostazioni"
        :selected="currentRoute === '/settings'"
      >
        <template #icon>
          <SelectedSettingsLogo v-if="currentRoute === '/settings'" />
          <SettingsLogo v-else />
        </template>
      </Element>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Element from './Element.vue';
import SelectedDashboardLogo from '@/public/svg/logos/sidebar/selected/dashboard.svg';
import DashboardLogo from '@/public/svg/logos/sidebar/notSelected/dashboard.svg';
import SelectedBookingsLogo from '@/public/svg/logos/sidebar/selected/bookings.svg';
import BookingsLogo from '@/public/svg/logos/sidebar/notSelected/bookings.svg';
import SelectedCalendarLogo from '@/public/svg/logos/sidebar/selected/calendar.svg';
import CalendarLogo from '@/public/svg/logos/sidebar/notSelected/calendar.svg';
import SelectedSettingsLogo from '@/public/svg/logos/sidebar/selected/settings.svg';
import SettingsLogo from '@/public/svg/logos/sidebar/notSelected/settings.svg';

const router = useRouter();
const route = useRoute();
const currentRoute = computed(() => route.path);
</script>
