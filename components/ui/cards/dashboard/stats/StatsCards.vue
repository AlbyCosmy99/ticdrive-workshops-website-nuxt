<script setup lang="ts">
import {ref, onMounted} from 'vue';
import StatsCard from './StatsCard.vue';
import ClientIcon from '@/public/svg/logos/dashboard/ClientIcon.svg';
import CalendarIcon from '@/public/svg/logos/dashboard/PrenotazRaggiunte.svg';
import DashboardIcon from '@/public/svg/logos/dashboard/TotalGain.svg';
import StarIcon from '@/public/svg/stars/star.svg';
import getDashboardStatisticsAsync from '~/services/http/requests/get/statistics/getDashboardStatisticsAsync';

const loading = ref(true);
const $ticDriveAxios = useTicDriveAxios();

interface StatsCardData {
  title: string;
  value: string;
  iconBgColor: string;
  trendValue: string | number;
  trendDirection: 'positive' | 'negative';
}

const uniqueClients = ref<StatsCardData>({
  title: 'Clienti Unici',
  value: '...',
  iconBgColor: 'bg-blue-100',
  trendValue: 0,
  trendDirection: 'positive',
});

const totalBookings = ref<StatsCardData>({
  title: 'Prenotazioni Raggiunte',
  value: '...',
  iconBgColor: 'bg-amber-100',
  trendValue: 0,
  trendDirection: 'positive',
});

const totalGain = ref<StatsCardData>({
  title: 'Guadagno Raggiunto',
  value: '...',
  iconBgColor: 'bg-green-100',
  trendValue: '0€',
  trendDirection: 'negative',
});

const totalReviews = ref<StatsCardData>({
  title: 'Totale Recensioni',
  value: '...',
  iconBgColor: 'bg-amber-100',
  trendValue: 0,
  trendDirection: 'positive',
});

const averageRating = ref('0.0');

onMounted(async () => {
  try {
    const res = await getDashboardStatisticsAsync($ticDriveAxios);

    uniqueClients.value.value = res.data.uniqueClients.toString();
    totalBookings.value.value = res.data.totalBookings.toString();
    totalGain.value.value = `€${res.data.totalEarnings.toLocaleString('it-IT')}`;
    totalReviews.value.value = res.data.totalReviews.toString();
    averageRating.value = res.data.averageRating.toFixed(1);
  } catch (err) {
    console.error('Errore nel recupero delle statistiche:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <StatsCard
      :title="uniqueClients.title"
      :value="uniqueClients.value"
      :iconBgColor="uniqueClients.iconBgColor"
      :loading="loading"
    >
      <template #icon>
        <ClientIcon />
      </template>
    </StatsCard>

    <StatsCard
      :title="totalBookings.title"
      :value="totalBookings.value"
      :iconBgColor="totalBookings.iconBgColor"
      :loading="loading"
    >
      <template #icon>
        <CalendarIcon />
      </template>
    </StatsCard>

    <StatsCard
      :title="totalGain.title"
      :value="totalGain.value"
      :iconBgColor="totalGain.iconBgColor"
      :loading="loading"
    >
      <template #icon>
        <DashboardIcon />
      </template>
    </StatsCard>

    <StatsCard
      :title="totalReviews.title"
      :value="totalReviews.value"
      :iconBgColor="totalReviews.iconBgColor"
      :loading="loading"
    >
      <template #icon>
        <div class="flex flex-col justify-center items-center gap-1">
          <StarIcon />
          <p class="font-bold text-base">{{ averageRating }}</p>
        </div>
      </template>
    </StatsCard>
  </div>
</template>
