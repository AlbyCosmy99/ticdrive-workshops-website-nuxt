<template>
  <div class="bg-white rounded-lg shadow p-4 border border-gray-100">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-gray-200 rounded-full mr-3 overflow-hidden">
          <NuxtImg
            v-if="userImageSrc"
            :src="userImageSrc"
            :alt="`${name}'s avatar`"
            class="w-full h-full object-cover"
            width="48"
            height="48"
          />
        </div>
        <span class="font-bold text-base">{{ name }}</span>
      </div>
      <WaitingConfirmationCard />
    </div>
    <hr />

    <div class="grid grid-cols-2 gap-2 mb-4 mt-6">
      <div class="flex items-center gap-2">
        <EventAvailableIcon />
        <p class="text-base font-medium text-tic">Ora</p>
      </div>
      <p class="text-base font-medium text-right">{{ time }}</p>

      <div class="flex items-center gap-2 mt-1">
        <CarRepairIcon />
        <p class="text-base font-medium text-tic">Servizio</p>
      </div>
      <p class="text-base font-medium text-right mt-1">{{ service }}</p>

      <div class="flex items-center gap-2 mt-1">
        <Car1Icon />
        <p class="text-base font-medium text-tic">Veicolo</p>
      </div>
      <p class="text-base font-medium text-right mt-1">{{ vehicle }}</p>

      <div class="flex items-center gap-2 mt-1">
        <PaymentDoneIcon />
        <p class="text-base font-medium text-tic">Pagamento</p>
      </div>
      <p class="text-base font-medium text-right mt-1">
        {{ price }} {{ paymentStatus === 'paid' ? 'pagato' : 'da pagare' }}
      </p>
    </div>

    <div class="flex space-x-2 mb-3">
      <slot name="actions" />
    </div>
    <p
      class="text-center mt-2 text-sm font-semibold text-tic cursor-pointer hover:underline"
    >
      Vuoi suggerire un orario diverso?
    </p>
  </div>
</template>

<script setup lang="ts">
import WaitingConfirmationCard from '../bookings/WaitingConfirmationCard.vue';
import EventAvailableIcon from '@/public/svg/time/event_available.svg';
import CarRepairIcon from '@/public/svg/cars/car_repair.svg';
import Car1Icon from '@/public/svg/cars/car1.svg';
import PaymentDoneIcon from '@/public/svg/payment/payment_done.svg';

interface BookingCardProps {
  name: string;
  time: string;
  service: string;
  vehicle: string;
  price: string;
  paymentStatus?: 'paid' | 'to pay';
  userImageSrc?: string;
  paymentIconSvg?: string;
}

defineProps<BookingCardProps>();
</script>
