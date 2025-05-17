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
        <BookingCard
          name="Mario Verdi"
          time="Oggi - 13:30"
          service="Cambio olio"
          vehicle="Toyota Corolla 2021"
          price="€120"
          paymentStatus="paid"
          clockIconSvg="/svg/clock-icon.svg"
          toolsIconSvg="/svg/tools-icon.svg"
          carIconSvg="/svg/car-icon.svg"
          paymentIconSvg="/svg/payment-icon.svg"
          statusIconSvg="/svg/status-icon.svg"
          userImageSrc="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
        />
        <BookingCard
          name="Mario Verdi"
          time="Oggi - 13:30"
          service="Cambio olio"
          vehicle="Toyota Corolla 2021"
          price="€120"
          paymentStatus="paid"
          clockIconSvg="/svg/clock-icon.svg"
          toolsIconSvg="/svg/tools-icon.svg"
          carIconSvg="/svg/car-icon.svg"
          paymentIconSvg="/svg/payment-icon.svg"
          statusIconSvg="/svg/status-icon.svg"
          userImageSrc="https://cdn-icons-png.flaticon.com/512/8090/8090457.png"
        />
      </div>
    </div>

    <div class="mb-2">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Recensioni Recenti</h2>
        <SeeAllButton @on-click="router.push('/reviews')" />
      </div>
      <div class="flex flex-col gap-4">
        <ReviewCard
          user="Mario Rossi"
          avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRABxEMu4GRwpNWC8OndvH_fuF5z5r5yQmEaA&s"
          date="24 Dicembre, 2024"
          :rating="5"
          comment="Si vede chiaramente da parte del personale l'esperienza lavorativa nel settore, veloci, onesti nei prezzi e anche simpatici."
          @reply="handleReply"
        />
        <ReviewCard
          user="Paolo Verdi"
          avatar="https://static.vecteezy.com/system/resources/previews/009/305/107/non_2x/man-avatar-clipart-illustration-free-png.png"
          date="15 Gennaio, 2025"
          :rating="4"
          comment="Professionali cortesi disponibili e con prezzi buoni. Molto soddisfatto del servizio."
          @reply="handleReply"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BookingCard from '~/components/ui/cards/dashboard/BookingCard.vue';
import StatsCards from '../ui/cards/dashboard/stats/StatsCards.vue';
import SeeAllButton from '../ui/buttons/SeeAllButton.vue';
import ReviewCard from '../ui/cards/reviews/ReviewCard.vue';

const router = useRouter();

const handleReply = (user: string) => {
  console.log(`Replying to ${user}'s review`);
  // Implement reply functionality here
};
</script>
