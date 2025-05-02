<template>
  <div class="bg-white h-[85vh] overflow-y-auto rounded-lg border border-gray-200 shadow-sm w-full px-5 py-4">
    <h2 class="text-2xl font-semibold mb-6">Profilo Gestore Officina</h2>
    
    <div class="flex items-center gap-4 mb-10">
      <div class="w-[48px] h-[48px] rounded-full overflow-hidden flex items-center justify-center">
        <img :src="authStore.user?.profileImageUrl || 'https://via.placeholder.com/64'" alt="Profile Image"
          class="w-full h-full object-cover rounded-full" />
      </div>
      <div>
        <h3 class="text-lg font-semibold">{{ authStore.user?.name || 'Alex Rossi' }}</h3>
        <p class="text-gray-500">{{ authStore.user?.email || 'alexarossi@gmail.com' }}</p>
      </div>
    </div>

    <div class="flex justify-center gap-2 mb-14">
      <NuxtImg src="/svg/delete/trash.svg" alt="Delete Icon" width="24" height="24" class="text-red-600" />
      <h2 class="text-xl font-bold text-gray-700">Elimina Account</h2>
    </div>

    <div class="mb-6">
      <label class="block text-gray-700 mb-2">Motivo dell'eliminazione</label>
      <textarea placeholder="Motivo*"
        class="w-full border rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
        rows="3"></textarea>
    </div>

    <div class="mb-6">
      <label class="block text-gray-700 mb-2">
        Inserisci la tua password attuale per procedere con l'eliminazione dell'account.
      </label>
      <input type="password" placeholder="Inserisci la tua password*"
        class="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-gray-300" />
      <p class="text-red-600 text-right mt-1">Password non valida</p>
    </div>

    <div class="mb-8 flex justify-center">
      <button type="submit"
        class="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg py-3 px-6 transition w-full max-w-xs">
        Elimina account
      </button>
    </div>

    <div class="text-center text-red-600">
      <p class="mb-1">L'eliminazione del tuo account è permanente e non può essere annullata.</p>
      <p class="mb-1">Assicurati di aver salvato tutti i dati importanti prima di procedere.</p>
      <p>Se hai dubbi, puoi sempre annullare il processo di eliminazione.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAuthStore from '~/store/auth';
const authStore = useAuthStore();
</script>