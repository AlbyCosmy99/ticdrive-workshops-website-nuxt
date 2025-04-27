<template>
  <div
    class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-4xl text-gray-500 font-semibold">
      Tipologia di servizi offerti
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 mt-8">
      <TicDriveRadio
        v-for="service in services"
        :key="service.id"
        :id="service.id"
        :name="service.title"
        :value="service"
        :isChecked="
          !!stepStore.stepFourData.services.find(s => s.id === service.id)
        "
        @update:check="handleRadioSelection"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TicDriveRadio from '~/components/ui/radios/TicDriveRadio.vue';
import useStepStore from '~/store/step';
import type {Service} from '~/types/Service';

const stepStore = useStepStore();

const handleRadioSelection = (service: Service) => {
  const index = stepStore.stepFourData.services.findIndex(
    s => s.id === service.id,
  );
  if (index === -1) {
    stepStore.stepFourData.services.push(service);
  } else {
    stepStore.stepFourData.services.splice(index, 1);
  }
};

const services: Service[] = [
  {
    id: 1,
    title: 'Cambio olio',
    description: "Sostituzione dell'olio motore e del filtro",
    icon: 'car-check',
  },
  {
    id: 2,
    title: 'Rotazione pneumatici',
    description: "Rotazione degli pneumatici per garantire un'usura uniforme",
    icon: 'car-check',
  },
  {
    id: 3,
    title: 'Revisione Auto',
    description:
      'Controllo completo del veicolo per garantire la sicurezza e conformità',
    icon: 'car-check',
  },
  {
    id: 4,
    title: 'Lucidatura fari',
    description: 'Ripristino della trasparenza e luminosità dei fari',
    icon: 'headlight',
  },
  {
    id: 5,
    title: 'Ricarica gas clima',
    description: 'Ricarica del gas del sistema di climatizzazione',
    icon: 'air-conditioning',
  },
  {
    id: 6,
    title: 'Oscuramento vetri',
    description: "Applicazione di pellicole oscuranti sui vetri dell'auto",
    icon: 'window-tint',
  },
  {
    id: 7,
    title: 'Ricarica batteria',
    description: "Ricarica o sostituzione della batteria dell'auto",
    icon: 'battery',
  },
  {
    id: 8,
    title: 'Controllo pre-viaggio',
    description: 'Controllo completo del veicolo prima di un lungo viaggio',
    icon: 'checklist',
  },
  {
    id: 9,
    title: 'Soccorso stradale',
    description: 'Assistenza in caso di guasto o incidente',
    icon: 'roadside-assistance',
  },
  {
    id: 10,
    title: 'Assistenza Acquisto Auto',
    description: "Consulenza e supporto nell'acquisto di un'auto nuova o usata",
    icon: 'car-purchase',
  },
  {
    id: 11,
    title: 'Lavaggio sedili',
    description: "Pulizia profonda dei sedili dell'auto",
    icon: 'seat-cleaning',
  },
  {
    id: 12,
    title: 'Autodemolizione',
    description: 'Servizio di demolizione e smaltimento veicoli',
    icon: 'car-recycling',
  },
  {
    id: 13,
    title: 'Lavaggio cruscotto',
    description: 'Pulizia e trattamento del cruscotto e degli interni',
    icon: 'dashboard-cleaning',
  },
  {
    id: 14,
    title: 'Lucidatura carrozzeria',
    description:
      'Trattamento estetico per ripristinare la brillantezza della vernice',
    icon: 'car-polish',
  },
];
</script>
