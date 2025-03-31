<template>
  <div
    class="step-2 flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-4xl text-gray-500 font-semibold">Tipologia di servizi offerti</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 mt-8">
      <RadioOption
        v-for="(value, index) in serviceTypes"
        :key="index"
        :label="value.label"
        :value="value.value"
        :isCheck="props.stepValues.currentServiceType.includes(value.value)"
        @update:isCheck="handleRadioSelection"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';

  const serviceTypes = [
    { value: 1, label: 'Cambio olio' },
    { value: 2, label: 'Rotazione pneumatici' },
    { value: 3, label: 'Revisione Auto' },
    { value: 4, label: 'Lucidatura fari' },
    { value: 5, label: 'Ricarica gas clima' },
    { value: 6, label: 'Oscuramento vetri  ' },
    { value: 7, label: 'Ricarica batteria' },
    { value: 8, label: 'Controllo pre-viaggio' },
    { value: 9, label: 'Soccorso stradale' },
    { value: 10, label: 'Assistenza Acquisto Auto' },
    { value: 11, label: 'Lavagio sedili' },
    { value: 12, label: 'Autodemolizione' },
    { value: 13, label: 'Lavagio cruscotto' },
    { value: 14, label: 'Lucidatura carozzeria' },
  ]

  const props = defineProps<{
    stepValues: object
  }>();

  const emit = defineEmits(['update:isCheck']);

  const handleRadioSelection = (value: any) => {
    emit('update:isCheck', value);
  }

</script>
