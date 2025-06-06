<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Prenotazioni</h1>
      <div class="flex border border-gray-200 rounded-full overflow-hidden">
        <button
          class="px-4 py-2 font-medium transition-colors"
          :class="
            activeTab === 'confirmed' ? 'bg-drive text-white' : 'bg-white'
          "
          @click="changeTab('confirmed')"
        >
          Confermate
        </button>
        <button
          class="px-4 py-2 font-medium transition-colors"
          :class="
            activeTab === 'to-confirm' ? 'bg-drive text-white' : 'bg-white'
          "
          @click="changeTab('to-confirm')"
        >
          Da Confermare
        </button>
        <button
          class="px-4 py-2 font-medium transition-colors"
          :class="activeTab === 'history' ? 'bg-drive text-white' : 'bg-white'"
          @click="changeTab('history')"
        >
          Storico
        </button>
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-6">{{ title }}</h2>
      <History v-if="activeTab === 'history'" />
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div class="flex flex-col sm:flex-row gap-2 w-full mt-2">
              <button
                v-if="activeTab === 'confirmed'"
                class="flex-1 py-2 bg-drive text-white rounded-md text-center hover:bg-green-dark transition-colors"
              >
                Conferma fine intervento
              </button>
              <button
                v-if="activeTab === 'confirmed'"
                class="flex-1 py-2 border border-red-500 text-red-500 rounded-md text-center transition-colors"
              >
                Segnala un problema
              </button>
              <button
                v-if="activeTab === 'to-confirm'"
                class="flex-1 py-2 bg-drive text-white rounded-md text-center hover:bg-green-dark transition-colors"
              >
                Conferma Prenotazione
              </button>
              <button
                v-if="activeTab === 'to-confirm'"
                class="flex-1 py-2 border border-red-500 text-red-500 rounded-md text-center transition-colors"
              >
                Rifiuta Intervento
              </button>
            </div>
          </template>
        </BookingCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import History from '../ui/prenotation/History.vue';
import BookingCard from '../ui/cards/dashboard/BookingCard.vue';

type activeTabTypes = 'confirmed' | 'to-confirm' | 'history';

const activeTab = ref<activeTabTypes>('to-confirm');

const title = computed(() => {
  switch (activeTab.value) {
    case 'to-confirm':
      return 'Prenotazioni In Attesa di Conferma';
    case 'confirmed':
      return 'Prenotazioni Confermate';
    case 'history':
      return 'Storico Prenotazioni';
  }
});

const changeTab = (tab: activeTabTypes) => {
  activeTab.value = tab;
};

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
