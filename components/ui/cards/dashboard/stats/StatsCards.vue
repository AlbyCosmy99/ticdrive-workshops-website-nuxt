<script setup lang="ts">
import StatsCard from './StatsCard.vue';
import ClientIcon from '@/public/svg/logos/dashboard/ClientIcon.svg';
import CalendarIcon from '@/public/svg/logos/dashboard/PrenotazRaggiunte.svg';
import DashboardIcon from '@/public/svg/logos/dashboard/TotalGain.svg';
import StarIcon from '@/public/svg/stars/star.svg';
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <StatsCard
      title="Clienti Unici"
      value="800"
      iconBgColor="bg-blue-100"
      trendValue="28"
      trendDirection="positive"
    >
      <template #icon>
        <ClientIcon />
      </template>
    </StatsCard>
    <StatsCard
      title="Prenotazioni Raggiunte"
      value="920"
      iconBgColor="bg-amber-100"
      trendValue="31"
      trendDirection="positive"
    >
      <template #icon>
        <CalendarIcon />
      </template>
    </StatsCard>
    <StatsCard
      title="Guadagno Raggiunto"
      value="€212.739"
      iconBgColor="bg-green-100"
      trendValue="180€"
      trendDirection="negative"
    >
      <template #icon>
        <DashboardIcon />
      </template>
    </StatsCard>
    <StatsCard
      title="Totale Recensioni"
      value="687"
      iconBgColor="bg-amber-100"
      trendValue="18"
      trendDirection="positive"
    >
      <template #icon>
        <div class="flex flex-col justify-center items-center gap-1">
          <StarIcon />
          <p class="font-bold text-base">4,7</p>
        </div>
      </template>
    </StatsCard>
  </div>
</template>
