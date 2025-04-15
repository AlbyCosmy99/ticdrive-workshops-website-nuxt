<template>
  <div
    class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-gray-500 text-4xl font-semibold">Firma e Accettazione</h1>

    <!-- Garanzia -->
    <h1 class="text-gray-500 text-2xl font-semibold mt-10">
      Garanzia e responsabilità
    </h1>
    <PlusMinusField
      :isMinusDisable="!stepValues.warranty"
      v-model:numberValue="stepValues.warranty"
      label="Garanzia sulla manodopera (durata in mesi):"
      @update:number="updateWarranty"
    />

    <!-- Firma digitale -->
    <h1 class="text-gray-500 text-2xl font-semibold mt-8">Firma digitale</h1>
    <div
      class="p-1 mt-2 border border-gray-500 rounded-xl w-full flex flex-col sm:flex-row gap-3 justify-between relative"
    >
      <div class="grid grid-cols-2 gap-3 w-full sm:w-2/3">
        <div class="flex flex-col">
          <input
            v-model="stepValues.digital.name"
            name="name"
            placeholder="Nome"
            :class="[
              'p-3 outline-none rounded-xl border border-gray-500 focus:border-green-500 w-full max-h-10',
              {'input-error': v$.digital.name.$errors.length},
            ]"
          />
          <span v-if="v$.digital.name.$errors.length" class="invalid-feedback">
            {{ v$.digital.name.$errors[0]?.$message || '' }}
          </span>
        </div>
        <div class="flex flex-col">
          <input
            v-model="stepValues.digital.surname"
            name="surname"
            placeholder="Cognome"
            :class="[
              'p-3 outline-none rounded-xl border border-gray-500 focus:border-green-500 w-full max-h-10',
              {'input-error': v$.digital.surname.$errors.length},
            ]"
          />
          <span
            v-if="v$.digital.surname.$errors.length"
            class="invalid-feedback"
          >
            {{ v$.digital.surname.$errors[0]?.$message || '' }}
          </span>
        </div>
      </div>
      <div class="flex flex-col w-full sm:w-1/3">
        <Calendar
          v-model="date"
          placeholder="(giorno/mese/anno)"
          :class="[
            'outline-none date-picker-wrapper text-center bg-gray-100 px-5 py-2 max-h-10',
            {'input-error': v$.digital.date.$errors.length},
          ]"
        />
        <span v-if="v$.digital.date.$errors.length" class="invalid-feedback">
          {{ v$.digital.date.$errors[0]?.$message || '' }}
        </span>
      </div>
    </div>

    <!-- Conformità -->
    <h1 class="text-gray-500 text-2xl font-semibold mt-8 mb-1">
      Autodichiarazione di conformità
    </h1>
    <RadioOption
      v-for="conf in conformities"
      :key="conf.value"
      class="mt-2"
      :label="conf.label"
      :value="conf.value"
      :isCheck="stepValues.currentConformities.includes(conf.value)"
      @update:isCheck="checkHandle"
    />
  </div>
</template>

<script lang="ts" setup>
import {defineProps, defineExpose, computed} from 'vue';
import {required, helpers} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import useStepStore from '~/store/step';
import Calendar from 'primevue/calendar';

interface DigitalSignature {
  name: string;
  surname: string;
  date: Date | null;
}

interface StepEightData {
  warranty: number;
  digital: DigitalSignature;
  currentConformities: number[];
}

const props = defineProps<{
  stepValues: StepEightData;
}>();

const useStore = useStepStore();
const stepValues = props.stepValues;

defineExpose({
  validate: async () => await v$.value.$validate(),
});

const date = computed({
  get: () => stepValues.digital.date,
  set: (val: Date | null) => (stepValues.digital.date = val),
});

const conformities: {value: number; label: string}[] = [
  {
    value: 1,
    label:
      'Dichiaro che l’autofficina è regolarmente registrata e in possesso di tutti i documenti richiesti dalla normativa italiana per operare legalmente.',
  },
  {
    value: 2,
    label:
      'Accetto la trattenuta della commissione da parte della piattaforma e la modalità di accredito selezionata.',
  },
  {
    value: 3,
    label:
      "Accetto le condizioni di utilizzo della piattaforma e l'informativa sulla privacy (GDPR).",
  },
  {value: 4, label: 'Dichiaro di aderire alla piattaforma.'},
  {
    value: 5,
    label:
      'Dichiaro di aver letto e accettato i Termini e Condizioni della piattaforma.',
  },
];

const rules = computed(() => ({
  digital: {
    name: {
      required: helpers.withMessage('Nome obbligatorio', required),
    },
    surname: {
      required: helpers.withMessage('Cognome obbligatorio', required),
    },
    date: {
      required: helpers.withMessage('Data obbligatoria', required),
    },
  },
}));

const v$ = useVuelidate(rules, stepValues);

const updateWarranty = (action: 'plus' | 'minus') => {
  const current = stepValues.warranty;
  if (action === 'minus' && current > 0) {
    stepValues.warranty = current - 1;
  } else if (action === 'plus') {
    stepValues.warranty = current + 1;
  }
};

const checkHandle = (value: number) => {
  const index = stepValues.currentConformities.indexOf(value);
  if (index !== -1) {
    stepValues.currentConformities.splice(index, 1);
  } else {
    stepValues.currentConformities.push(value);
  }
};
</script>

<style scoped>
.invalid-feedback {
  color: rgb(211, 49, 49);
  font-size: 14px;
  margin-top: 5px;
}
.input-error {
  border: 1px solid rgb(211, 49, 49) !important;
}
.date-picker-wrapper {
  border-radius: 6px !important;
}
</style>
