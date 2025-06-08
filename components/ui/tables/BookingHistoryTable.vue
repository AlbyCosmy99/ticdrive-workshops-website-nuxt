<template>
  <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
    <div v-if="loadingBookings" class="flex justify-center items-center">
      <UiSpinnersTicDriveSpinner />
    </div>
    <div v-else class="rounded-lg overflow-hidden border border-gray-200">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Nome
              </th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Data
              </th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Tipo di intervento
              </th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Stato dell'Intervento
              </th>
              <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">
                PIN
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(booking, index) in bookings"
              :key="index"
              class="border-b border-gray-200"
            >
              <td class="px-6 py-4 text-sm">{{ booking.customerName }}</td>
              <td class="px-6 py-4 text-sm">{{ booking.appointmentDate }}</td>
              <td class="px-6 py-4 text-sm">{{ booking.serviceName }}</td>
              <td class="px-6 py-4 text-sm">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :class="statusClass(booking.status)"
                >
                  {{ statusLabel(booking.status) }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm">{{ booking.pinCode }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import getBookingsAsync from '~/services/http/requests/get/getBookingsAsync';
import type {Booking} from '~/types/bookings/Booking';

const $ticDriveAxios = useTicDriveAxios();
const bookings = ref<Booking[]>([]);
const loadingBookings = ref(false);
const showToast = useToast();

const statusClass = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Waiting':
      return 'bg-orange-100 text-orange-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    case 'RescheduleProposed':
      return 'bg-yellow-100 text-yellow-800';
    case 'Accepted':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const statusLabel = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'Completato';
    case 'Waiting':
      return 'Da confermare';
    case 'Rejected':
      return 'Rifiutato';
    case 'RescheduleProposed':
      return 'Riprogrammazione proposta';
    case 'Accepted':
      return 'Accettato';
    default:
      return 'Sconosciuto';
  }
};

onMounted(async () => {
  try {
    loadingBookings.value = true;
    const res = await getBookingsAsync($ticDriveAxios);
    bookings.value = res.data.bookings;
  } catch (e: any) {
    showToast(
      'error',
      'Errore durante il caricamento delle prenotazioni',
      e.message,
    );
  } finally {
    loadingBookings.value = false;
  }
});
</script>
