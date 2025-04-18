<template>
  <div
    class="w-[220px] bg-white h-[66.6667vh] rounded-lg border border-gray-200 flex flex-col py-6 shadow-sm relative"
  >
    <div class="px-6 mb-12">
      <div class="flex items-center justify-center">
        <NuxtImg
          src="/svg/TicDriveLogo.svg"
          alt="TicDrive logo"
          class="object-contain self-center max-w-full aspect-square"
          width="120"
          height="120"
        />
      </div>
    </div>
    <div class="flex flex-col flex-grow space-y-1 px-4">
      <Element path="/dashboard" title="Dashboard" iconPath="/images/Vector(1).png" />
      <Element path="/bookings" title="prenotazioni" iconPath="/images/Group.png" />
      <Element path="/calendar" title="Calendario" iconPath="/images/Group(1).png" />
      <Element path="/settings" title="Impostazioni" iconPath="/images/settings.png" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Element from './Element.vue';
</script>
