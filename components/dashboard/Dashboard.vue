<template>
  <div class="flex flex-col w-full">
    <div class="mb-4">
      <h1 class="text-2xl font-bold mb-1">Panoramica</h1>
    </div>
    <StatsCards />
    <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">
          Prenotazioni In Attesa di Conferma
        </h2>
        <button
          class="flex items-center text-white bg-[#39b269] px-4 py-2 rounded-md"
        >
          Vedi tutto
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BookingCard
          name="Mario Verdi"
          time="Oggi - 13:30"
          service="Cambio olio"
          vehicle="Toyota Corolla 2021"
          price="€120"
          paymentStatus="pagati"
          clockIconSvg="/svg/clock-icon.svg"
          toolsIconSvg="/svg/tools-icon.svg"
          carIconSvg="/svg/car-icon.svg"
          paymentIconSvg="/svg/payment-icon.svg"
          statusIconSvg="/svg/status-icon.svg"
        />
        <BookingCard
          name="Mario Verdi"
          time="Oggi - 13:30"
          service="Cambio olio"
          vehicle="Toyota Corolla 2021"
          price="€120"
          paymentStatus="pagati"
          clockIconSvg="/svg/clock-icon.svg"
          toolsIconSvg="/svg/tools-icon.svg"
          carIconSvg="/svg/car-icon.svg"
          paymentIconSvg="/svg/payment-icon.svg"
          statusIconSvg="/svg/status-icon.svg"
        />
      </div>
    </div>

    <div>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Recensioni Recenti</h2>
        <button
          class="flex items-center text-white bg-[#39b269] px-4 py-2 rounded-md"
        >
          Vedi tutto
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                No.
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Utente
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Data Recensione
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Servizio
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Voto
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <ReviewRow
              number="01"
              user="Mario Rossi"
              userId="#A000001"
              date="24 Dicembre, 2024"
              time="11:35"
              service="Tagliando"
              rating="5"
              starIconSvg="/svg/star-icon.svg"
              userImageSrc="/img/users/user1.jpg"
            />
            <ReviewRow
              number="02"
              user="Paolo Verdi"
              userId="#A000002"
              date="15 Gennaio, 2025"
              time="18:02"
              service="Cambio pastiglie"
              rating="4"
              starIconSvg="/svg/star-icon.svg"
              userImageSrc="/img/users/user2.jpg"
            />
            <ReviewRow
              number="03"
              user="Marietta Rosa"
              userId="#A000003"
              date="3 Febbraio, 2025"
              time="13:52"
              service="Cambio Olio"
              rating="3"
              starIconSvg="/svg/star-icon.svg"
              userImageSrc="/img/users/user3.jpg"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BookingCard from '~/components/ui/cards/dashboard/BookingCard.vue';
import ReviewRow from '~/components/ui/cards/dashboard/ReviewCard.vue';
import StatsCards from '../ui/cards/dashboard/StatsCards.vue';
</script>
