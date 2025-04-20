<script setup lang="ts">
import StatsCard from './StatsCard.vue';
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <StatsCard
      title="Clienti Unici"
      value="800"
      iconSvg="/svg/users-icon.svg"
      iconBgColor="bg-blue-100"
      trend="+28"
      trendLabel="in più rispetto al mese scorso"
      trendColor="text-green-500"
    />
    <StatsCard
      title="Prenotazioni Raggiunte"
      value="920"
      iconSvg="/svg/calendar-icon.svg"
      iconBgColor="bg-amber-100"
      trend="+31"
      trendLabel="in più rispetto al mese scorso"
      trendColor="text-green-500"
    />
    <StatsCard
      title="Guadagno Raggiunto"
      value="€212.739"
      iconSvg="/svg/chart-icon.svg"
      iconBgColor="bg-green-100"
      trend="-180€"
      trendLabel="in meno rispetto al mese scorso"
      trendColor="text-red-500"
    />
    <StatsCard
      title="Totale Recensioni"
      value="687"
      iconSvg="/svg/star-icon.svg"
      iconBgColor="bg-amber-100"
      rating="4.7"
      trend="+18"
      trendLabel="in più rispetto al mese scorso"
      trendColor="text-green-500"
    />
  </div>
</template>
