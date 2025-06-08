<template>
  <div
    :class="`flex ${
      bookings.length === 2
        ? 'justify-evenly'
        : bookings.length === 0
          ? 'justify-center'
          : ''
    }`"
  >
    <div
      v-if="loadingBookings"
      class="h-40 w-full justify-center items-center flex"
    >
      <UiSpinnersTicDriveSpinner />
    </div>
    <NoBookings
      v-else-if="bookings.length === 0"
      :title="
        bookingType === 'Waiting'
          ? 'Non hai ancora prenotazioni da confermare.'
          : 'Non hai ancora prenotazioni confermate.'
      "
      :subtitle="
        bookingType === 'Waiting'
          ? 'Le richieste da confermare appariranno qui non appena ricevute.'
          : 'Le richieste confermate appariranno qui.'
      "
    />
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
      status="to-confirm"
    />
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import NoBookings from '~/components/bookings/NoBookings.vue';
import getBookingsAsync from '~/services/http/requests/get/getBookingsAsync';
import type {Booking} from '~/types/bookings/Booking';
import BookingCard from './BookingCard.vue';
import type {BookingStatus} from '~/types/bookings/BookingStatus';

const $ticDriveAxios = useTicDriveAxios();
const bookings = ref<Booking[]>([]);
const loadingBookings = ref(false);
const showToast = useToast();

const props = withDefaults(
  defineProps<{
    bookingType?: BookingStatus;
    skip?: number;
    take?: number;
  }>(),
  {
    bookingType: undefined,
    skip: 0,
    take: 10,
  },
);

onMounted(async () => {
  try {
    loadingBookings.value = true;
    const res = await getBookingsAsync(
      $ticDriveAxios,
      props.bookingType,
      props.skip,
      props.take,
    );
    bookings.value = res.data.bookings;
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
</script>
