<template>
  <div class="flex flex-col w-full">
    <div class="mb-4">
      <h1 class="text-2xl font-bold mb-1">Panoramica</h1>
    </div>
    <StatsCards />
    <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">
          Prenotazioni In Attesa di Conferma
        </h2>
        <SeeAllButton @on-click="router.push('/bookings')" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UiSpinnersTicDriveSpinner v-if="loadingBookings" />
        <div
          v-else-if="bookings.length === 0"
          class="flex flex-col items-center justify-center py-10 text-gray-400 text-center"
        >
          <img
            src="/images/booking.png"
            alt="Nessuna prenotazione"
            class="w-24 h-24 mb-4 opacity-70"
          />
          <p class="text-lg font-medium">Nessuna prenotazione al momento</p>
          <p class="text-sm text-gray-500">
            Riceverai le richieste dei clienti direttamente qui
          </p>
        </div>
        <BookingCard
          v-else
          v-for="booking in bookings.slice(0, 2)"
          :key="booking.id"
          :name="booking.customerName"
          :time="booking.appointmentDate"
          :service="booking.serviceName"
          :vehicle="`${booking.customerCarMake} ${booking.customerCarModel} - ${booking.customerCarYear} - ${booking.customerCarPlate}`"
          :price="`€${booking.finalPrice}`"
          paymentStatus="to pay"
          clockIconSvg="/svg/clock-icon.svg"
          toolsIconSvg="/svg/tools-icon.svg"
          carIconSvg="/svg/car-icon.svg"
          paymentIconSvg="/svg/payment-icon.svg"
          statusIconSvg="/svg/status-icon.svg"
          :userImageSrc="
            booking.customerImage ??
            'https://cdn-icons-png.flaticon.com/512/6858/6858504.png'
          "
        />
      </div>
    </div>

    <div class="mb-2">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Recensioni Recenti</h2>
        <SeeAllButton @on-click="router.push('/reviews')" />
      </div>
      <ReviewExtendedCards />
    </div>
  </div>
</template>

<script setup lang="ts">
import BookingCard from '~/components/ui/cards/dashboard/BookingCard.vue';
import StatsCards from '../ui/cards/dashboard/stats/StatsCards.vue';
import SeeAllButton from '../ui/buttons/SeeAllButton.vue';
import ReviewExtendedCards from '../ui/cards/reviews/ReviewExtendedCards.vue';
import getBookingsAsync from '~/services/http/requests/get/getBookingsAsync';
import type {Booking} from '~/types/bookings/Booking';

const $ticDriveAxios = useTicDriveAxios();
const bookings = ref<Booking[]>([]);
const loadingBookings = ref(false);
const showToast = useToast();

onMounted(async () => {
  try {
    loadingBookings.value = true;
    const res = await getBookingsAsync($ticDriveAxios);
    // bookings.value = res.data;
  } catch (e: any) {
    showToast(
      'error',
      'Errore durante il caricamento delle prenotazioni da confermare',
      e.message,
    );
  } finally {
    loadingBookings.value = false;
  }
});
console.log(bookings);
const router = useRouter();
</script>
