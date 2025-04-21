<template>
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-6">Storico Prenotazioni</h2>
      
      <div class="rounded-lg overflow-hidden border border-gray-200">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Nome</th>
                <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Data</th>
                <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Tipo di intervento</th>
                <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">Stato dell'Intervento</th>
                <th class="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(appointment, index) in appointments" :key="index" class="border-b border-gray-200">
                <td class="px-6 py-4 text-sm">{{ appointment.name }}</td>
                <td class="px-6 py-4 text-sm">{{ appointment.date }}</td>
                <td class="px-6 py-4 text-sm">{{ appointment.type }}</td>
                <td class="px-6 py-4 text-sm">
                  <span 
                    class="px-3 py-1 rounded-full text-xs"
                    :class="{
                      'bg-green-light text-drive': appointment.status === 'Completato',
                      'bg-orange-100 text-orange-800': appointment.status === 'Annullato dal Cliente',
                      'bg-red-100 text-red-800': appointment.status === 'Rifiutato',
                      'bg-purple-100 text-purple-800': appointment.status === 'Annullato dall\'Officina'
                    }"
                  >
                    {{ appointment.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm">{{ appointment.id }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const appointments = ref([
    {
      name: 'Christine Brooks',
      date: '20 Sep 2019',
      type: 'Tagliando',
      status: 'Completato',
      id: '#A00001'
    },
    {
      name: 'Rosie Todd',
      date: '02 Sep 2019',
      type: 'Cambio Olio',
      status: 'Annullato dal Cliente',
      id: '#A00002'
    },
    {
      name: 'Darrell Caldwell',
      date: '01 Sep 2019',
      type: 'Sostituzione pneumatici',
      status: 'Rifiutato',
      id: '#A00003'
    },
    {
      name: 'Gilbert Johnston',
      date: '31 Sep 2019',
      type: 'Revisione',
      status: 'Annullato dall\'Officina',
      id: '#A00004'
    },
    {
      name: 'Rosie Todd',
      date: '12 Sep 2019',
      type: 'Sostituzione Candella',
      status: 'Annullato dall\'Officina',
      id: '#A00005'
    },
    {
      name: 'Alfred Murray',
      date: '08 Sep 2019',
      type: 'Revisione',
      status: 'Completato',
      id: '#A00006'
    },
    {
      name: 'Darrell Caldwell',
      date: '04 Sep 2019',
      type: 'Cambio Olio',
      status: 'Rifiutato',
      id: '#A00007'
    },
    {
      name: 'Rosie Todd',
      date: '12 Sep 2019',
      type: 'Tagliando',
      status: 'Annullato dal Cliente',
      id: '#A00008'
    },
    {
      name: 'Alfred Murray',
      date: '18 Sep 2019',
      type: 'Tagliando',
      status: 'Completato',
      id: '#A00009'
    }
  ])
  </script>