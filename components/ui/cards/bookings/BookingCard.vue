<template>
  <div class="bg-white rounded-lg shadow p-4 border border-gray-100">
    <!-- Header -->
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

    <!-- Buttons -->
    <div class="flex flex-col sm:flex-row gap-2 w-full mt-2 mb-3">
      <button
        v-if="status === 'Accepted'"
        @click="openModal('complete')"
        class="flex-1 py-2 bg-drive text-white rounded-md hover:bg-green-dark transition-colors"
      >
        Fine intervento
      </button>

      <button
        v-if="status === 'Accepted'"
        @click="openModal('issue')"
        class="flex-1 py-2 border border-red-500 text-red-500 rounded-md transition-colors"
      >
        Segnala un problema
      </button>

      <button
        v-if="status === 'Waiting'"
        @click="openModal('confirm')"
        class="flex-1 py-2 bg-drive text-white rounded-md hover:bg-green-dark transition-colors"
      >
        Conferma Prenotazione
      </button>

      <button
        v-if="status === 'Waiting'"
        @click="openModal('reject')"
        class="flex-1 py-2 border border-red-500 text-red-500 rounded-md transition-colors"
      >
        Rifiuta Intervento
      </button>
    </div>

    <p
      class="text-center mt-2 text-sm font-semibold text-tic cursor-pointer hover:underline"
    >
      Vuoi suggerire un orario diverso?
    </p>
  </div>

  <!-- MODALE -->
  <BaseModal :isOpen="!!activeModal" @close="closeModal">
    <template #header>
      <h3 class="text-lg font-bold">
        {{
          activeModal === 'confirm'
            ? 'Conferma Prenotazione'
            : activeModal === 'reject'
              ? 'Rifiuta Intervento'
              : activeModal === 'complete'
                ? 'Fine Intervento'
                : 'Segnala Problema'
        }}
      </h3>
    </template>

    <div class="mt-4">
      <p v-if="activeModal === 'confirm'">
        Vuoi confermare questa prenotazione? Verrà inviata una mail al cliente
        per avvisarlo.
      </p>
      <p v-else-if="activeModal === 'reject'">
        Sei sicuro di voler rifiutare questo intervento? Verrà inviata una mail
        al cliente per avvisarlo.
      </p>
      <p v-else-if="activeModal === 'complete'">
        Vuoi segnare l'intervento come completato? Verrà inviata una mail al
        cliente per avvisarlo.
      </p>
      <p v-else-if="activeModal === 'issue'">
        Descrivi il problema riscontrato con il cliente.
      </p>

      <textarea
        v-if="activeModal === 'issue'"
        class="w-full mt-4 p-2 border border-gray-300 rounded"
        rows="4"
        placeholder="Descrivi qui il problema"
        v-model="issueText"
      />

      <div class="flex justify-end mt-6 space-x-2">
        <button @click="closeModal" class="px-4 py-2 text-sm">Annulla</button>
        <button
          @click="handleModalAction"
          :class="confirmButtonClass"
          :disabled="loading"
        >
          <span v-if="loading">Attendi...</span>
          <span v-else>{{ confirmButtonText }}</span>
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import EventAvailableIcon from '@/public/svg/time/event_available.svg';
import CarRepairIcon from '@/public/svg/cars/car_repair.svg';
import Car1Icon from '@/public/svg/cars/car1.svg';
import PaymentDoneIcon from '@/public/svg/payment/payment_done.svg';
import BaseModal from '../../modals/BaseModal.vue';
import {updateBookingStatusAsync} from '~/services/http/requests/get/bookings/UpdateBookingStatusAsync';
import type {BookingStatus} from '~/types/bookings/BookingStatus';

interface BookingCardProps {
  name: string;
  time: string;
  service: string;
  vehicle: string;
  price: string;
  paymentStatus?: 'paid' | 'to pay';
  userImageSrc?: string;
  status: BookingStatus;
  bookingId: number;
}

const props = defineProps<BookingCardProps>();

const activeModal = ref<'confirm' | 'reject' | 'complete' | 'issue' | null>(
  null,
);
const issueText = ref('');
const loading = ref(false);
const toast = useToast();
const $ticDriveAxios = useTicDriveAxios();

const openModal = (type: typeof activeModal.value) => {
  activeModal.value = type;
};

const confirmButtonClass = computed(() => {
  if (activeModal.value === 'reject') {
    return 'px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600';
  }
  if (activeModal.value === 'issue') {
    return 'px-4 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600';
  }
  return 'px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600';
});

const confirmButtonText = computed(() => {
  switch (activeModal.value) {
    case 'reject':
      return 'Rifiuta';
    case 'issue':
      return 'Invia';
    default:
      return 'Conferma';
  }
});

const closeModal = () => {
  activeModal.value = null;
  issueText.value = '';
  loading.value = false;
};

const emit = defineEmits(['updated']);

const handleModalAction = async () => {
  if (!props.bookingId) return;

  if (activeModal.value === 'issue') {
    toast(
      'warn',
      'Funzione in sviluppo',
      'La segnalazione verrà gestita in seguito.',
    );
    closeModal();
    return;
  }

  const statusMap = {
    confirm: 'Accepted',
    reject: 'Rejected',
    complete: 'Completed',
  } as const;

  const newStatus = statusMap[activeModal.value as keyof typeof statusMap];
  loading.value = true;

  try {
    await updateBookingStatusAsync(props.bookingId, newStatus, $ticDriveAxios);
    toast('success', 'Successo', `Stato aggiornato.`);
    closeModal();
    emit('updated');
  } catch (err) {
    toast(
      'error',
      'Errore',
      'Errore durante l’aggiornamento della prenotazione',
    );
    loading.value = false;
  }
};
</script>
