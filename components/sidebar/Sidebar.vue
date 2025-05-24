<template>
  <div
    class="w-[220px] bg-white h-[85vh] rounded-lg border border-gray-200 flex flex-col py-6 shadow-sm relative"
  >
    <div class="px-6 mb-12 flex items-center justify-center">
      <button
        class="flex items-center justify-center"
        @click="router.push('/')"
      >
        <NuxtImg
          src="/svg/TicDriveLogo.svg"
          alt="TicDrive logo"
          class="object-contain self-center max-w-full aspect-square"
          width="120"
          height="120"
        />
      </button>
    </div>
    <div class="flex flex-col flex-grow space-y-1 px-4">
      <Element
        path="/dashboard"
        title="Dashboard"
        :selected="currentRoute === '/dashboard'"
      >
        <template #icon>
          <SelectedDashboardLogo v-if="currentRoute === '/dashboard'" />
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
        path="/reviews"
        title="Recensioni"
        :selected="currentRoute === '/reviews'"
      >
        <template #icon>
          <SelectedReviewsLogo v-if="currentRoute === '/reviews'" />
          <ReviewsLogo v-else />
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
import SelectedReviewsLogo from '@/public/svg/logos/sidebar/selected/reviews.svg';
import ReviewsLogo from '@/public/svg/logos/sidebar/notSelected/reviews.svg';

const router = useRouter();
const route = useRoute();
const currentRoute = computed(() => route.path);
</script>
