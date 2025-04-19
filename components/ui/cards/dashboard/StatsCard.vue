<!-- components/ui/StatsCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col">
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-gray-500 text-sm font-medium">{{ title }}</h3>
      <div :class="['w-10 h-10 rounded-full flex items-center justify-center', iconBgColor]">
        <!-- Use dynamic component based on icon type -->
        <component :is="getIconComponent()" class="w-6 h-6" />
      </div>
    </div>
    <div class="flex items-end justify-between">
      <div>
        <h2 class="text-3xl font-bold">{{ value }}</h2>
        <div class="flex items-center mt-2 text-sm">
          <span :class="[trendColor, 'mr-1']">{{ trend }}</span>
          <span class="text-gray-500">{{ trendLabel }}</span>
        </div>
      </div>
      <div v-if="rating" class="flex items-center bg-amber-100 rounded-full px-2 py-1">
        <StarIcon class="w-4 h-4 text-amber-500 mr-1" />
        <span class="font-bold text-sm">{{ rating }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClientIcon from "@/public/svg/logos/dashboard/ClientIcon.svg";
import CalendarIcon from "@/public/svg/logos/dashboard/PrenotazRaggiunte.svg";
import DashboardIcon from "@/public/svg/logos/dashboard/TotalGain.svg";
import BookingsIcon from "@/public/svg/logos/dashboard/TotReview.svg";
import SettingsIcon from "@/public/svg/logos/sidebar/notSelected/settings.svg";
import StarIcon from "@/public/svg/logos/dashboard/StarsIcon.svg";

interface StatsCardProps {
  title: string;
  value: string;
  iconType: string; // Changed from iconSvg to iconType for clearer intent
  iconBgColor: string;
  trend: string;
  trendLabel: string;
  trendColor: string;
  rating?: string;
}

const props = defineProps<StatsCardProps>();

// Function to get the correct icon component based on iconType
const getIconComponent = () => {
  switch (props.iconType) {
    case 'client':
      return ClientIcon;
    case 'calendar':
      return CalendarIcon;
    case 'dashboard':
      return DashboardIcon;
    case 'bookings':
      return BookingsIcon;
    case 'settings':
      return SettingsIcon;
    default:
      return ClientIcon; 
      
  }
};
</script>