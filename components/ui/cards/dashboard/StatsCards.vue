<script setup lang="ts">
import StatsCard from './StatsCard.vue';
</script>
<template>
  <div class="mb-8">
    <div class="flex flex-wrap gap-3 w-full">
      <div class="flex flex-wrap gap-2 justify-between w-full">
        <StatsCard
          title="Clienti Unici"
          value="800"
          iconPath="/svg/logos/dashboard/ClientIcon.svg"
          trend="+28"
          trendLabel="in più rispetto al mese scorso"
          trendColor="text-green-500"
          iconSize="60px"
          class="flex-1"
        />
        <StatsCard
          title="Prenotazioni Raggiunte"
          value="920"
          iconPath="/svg/logos/dashboard/PrenotazRaggiunte.svg"
          trend="+31"
          trendLabel="in più rispetto al mese scorso"
          trendColor="text-green-500"
          iconSize="60px"
          class="flex-1"
        />
        <StatsCard
          title="Guadagno Raggiunto"
          value="€212.739"
          iconPath="/svg/logos/dashboard/TotalGain.svg"
          trend="-180€"
          trendLabel="in meno rispetto al mese scorso"
          trendColor="text-red-500"
          iconSize="60px"
          class="flex-1"
        />
        <StatsCard
          title="Totale Recensioni"
          value="687"
          iconPath="/svg/logos/dashboard/TotReview.svg"
          trend="+18"
          trendLabel="in più rispetto al mese scorso"
          trendColor="text-green-500"
          iconSize="60px"
          class="flex-1"
        />
      </div>
    </div>
  </div>
</template>