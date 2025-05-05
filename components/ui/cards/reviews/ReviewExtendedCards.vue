<script setup lang="ts">
import {ref} from 'vue';
import ReviewExtendedCard from './ReviewExtendedCard.vue';

const hasReviews = ref(false);
</script>

<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <template v-if="hasReviews">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="text-center px-6 py-3 text-left text-base font-semibold uppercase tracking-wider"
            >
              No.
            </th>
            <th
              class="text-center px-6 py-3 text-left text-base font-semibold uppercase tracking-wider"
            >
              Utente
            </th>
            <th
              class="text-center px-6 py-3 text-left text-base font-semibold uppercase tracking-wider"
            >
              Data Recensione
            </th>
            <th
              class="text-center px-6 py-3 text-left text-base font-semibold uppercase tracking-wider"
            >
              Servizio
            </th>
            <th
              class="text-center px-6 py-3 text-left text-base font-semibold uppercase tracking-wider"
            >
              Voto
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <ReviewExtendedCard
            number="01"
            user="Mario Rossi"
            userId="#A000001"
            userImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRABxEMu4GRwpNWC8OndvH_fuF5z5r5yQmEaA&s"
            date="24 Dicembre, 2024"
            time="11:35"
            service="Tagliando"
            rating="5"
          />
          <ReviewExtendedCard
            number="02"
            user="Paolo Verdi"
            userId="#A000002"
            userImage="https://static.vecteezy.com/system/resources/previews/009/305/107/non_2x/man-avatar-clipart-illustration-free-png.png"
            date="15 Gennaio, 2025"
            time="18:02"
            service="Cambio pastiglie"
            rating="4"
          />
          <ReviewExtendedCard
            number="03"
            user="Marietta Rosa"
            userId="#A000003"
            userImage="https://p.kindpng.com/picc/s/137-1370698_avatar-people-person-business-user-man-character-vector.png"
            date="3 Febbraio, 2025"
            time="13:52"
            service="Cambio Olio"
            rating="3"
          />
        </tbody>
      </table>
    </template>

    <template v-else>
      <div
        class="flex flex-col items-center justify-center text-center text-gray-400 py-10"
      >
        <img
          src="@/public/images/rating.png"
          alt="Nessuna recensione"
          class="w-24 h-24 mb-4 opacity-70"
        />
        <p class="text-lg font-medium">Nessuna recensione disponibile</p>
        <p class="text-sm text-gray-500">
          Le recensioni dei tuoi clienti verranno visualizzate qui appena
          disponibili.
        </p>
      </div>
    </template>
  </div>
</template>
