<template>
  <div class="bg-white h-[85vh] overflow-y-auto rounded-lg">

    <div class="bg-white h-full">
      <div class="px-6">

        <h2 class="text-2xl font-semibold mb-4">Profilo Gestore Officina</h2>
        <div class="flex items-center gap-4 justify-between mb-6 pb-6">
          <div class="flex items-center gap-4">
            <div class="rounded-full overflow-hidden h-16 w-16">
              <img :src="authStore.user?.profileImageUrl || 'https://via.placeholder.com/64'" alt="Profile Image"
                class="object-cover w-full h-full" />
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ authStore.user?.name || 'Mario Rossi' }}</h3>
              <p class="text-gray-500">{{ authStore.user?.email || 'alexarossi@gmail.com' }}</p>
            </div>
          </div>
        </div>


        <div class="flex items-center justify-center gap-2 mb-6">
          <NuxtImg src="/svg/delete/trash.svg" alt="Delete Icon" width="24" height="24" class="text-red-600" />
          <h2 class="text-xl font-bold">Elimina Account</h2>
        </div>


        <div class="mb-6 pb-6">
          <label class="block text-2x1 font-medium text-gray-700 mb-1">Motivo dell'eliminazione</label>
          <textarea placeholder="Motivo*"
            class="w-full border rounded-lg p-3 text-2x1 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
            rows="3"></textarea>
        </div>


        <div class="mb-6 pb-6">
          <label class="block text-2x1 font-medium text-gray-700 mb-1">
            Inserisci la tua password attuale per procedere con l'eliminazione dell'account.
          </label>
          <input type="password" placeholder="Inserisci la tua password*"
            class="w-full border rounded-md p-3 text-2x1 focus:outline-none focus:ring-2 focus:ring-green-600" />

        </div>


        <div class="mb-6 pb-6 flex justify-center">
          <button type="submit"
            class="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl transition text-sm"
            style="width: 350px; height: 64px;">
            Elimina account
          </button>
        </div>


        <div class="pb-6 text-center">
          <p class="text-lg text-red-600 leading-relaxed">
            L'eliminazione del tuo account è permanente e non può essere annullata.<br />
            Assicurati di aver salvato tutti i dati importanti prima di procedere.<br />
            Se hai dubbi, puoi sempre annullare il processo di eliminazione.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from '~/store/auth';
const authStore = useAuthStore();
</script>
