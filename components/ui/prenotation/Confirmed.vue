<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
    <h2 class="text-2xl font-semibold mb-6">Prenotazioni Confermate</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BookingCard
        v-for="(reservation, index) in reservations"
        :key="index"
        :name="reservation.userName"
        :userImageSrc="reservation.userImage"
        :time="reservation.time"
        :service="reservation.service"
        :vehicle="reservation.vehicle"
        :price="reservation.payment"
      >
        <template #actions>
          <button class="flex-1 py-2 bg-drive text-white rounded-md text-center hover:bg-green-dark">
            Conferma fine intervento
          </button>
          <button class="flex-1 py-2 border border-red-500 text-red-500 rounded-md text-center">
            Segnala un problema
          </button>
        </template>
      </BookingCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import BookingCard from '../cards/dashboard/BookingCard.vue';

interface Reservation {
  userName: string;
  userImage: string;
  time: string;
  service: string;
  vehicle: string;
  payment: string;
}

const reservations = ref<Reservation[]>([
  {
    userName: 'Paolo Bianchi',
    userImage: '/images/Profile.png',
    time: 'Domani - 10:00',
    service: 'Cambio olio',
    vehicle: 'Fiat Panda 2018',
    payment: '€80 pagati',
  },
  {
    userName: 'Lucia Rossi',
    userImage: '/images/Profile.png',
    time: 'Domani - 14:30',
    service: 'Revisione',
    vehicle: 'Audi A3 2020',
    payment: '€150 pagati',
  },
]);
</script>
