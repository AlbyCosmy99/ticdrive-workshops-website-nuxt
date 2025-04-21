<template>
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-6">Prenotazioni In Attesa di Conferma</h2>
      
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
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import BookingCard from '../cards/dashboard/BookingCard.vue'
  
  interface Reservation {
    userName: string
    userImage: string
    time: string
    service: string
    vehicle: string
    payment: string
  }
  
  const reservations = ref<Reservation[]>([
    {
      userName: 'Mario Verdi',
      userImage: '/images/Profile.png',
      time: 'Oggi - 13:30',
      service: 'Cambio olio',
      vehicle: 'Toyota Corolla 2021',
      payment: '€120 pagati'
    },
    {
      userName: 'Lucia Bianchi',
      userImage: '/images/Profile.png',
      time: 'Oggi - 15:00',
      service: 'Revisione',
      vehicle: 'Fiat Punto 2019',
      payment: '€90 pagati'
    },
    {
      userName: 'Giulio Rossi',
      userImage: '/images/Profile.png',
      time: 'Domani - 09:15',
      service: 'Sostituzione pneumatici',
      vehicle: 'Audi A3 2020',
      payment: '€200 pagati'
    },
    {
      userName: 'Anna Ferrari',
      userImage: '/images/Profile.png',
      time: 'Domani - 11:30',
      service: 'Cambio olio',
      vehicle: 'Volkswagen Golf 2018',
      payment: '€110 pagati'
    }
  ])
  </script>