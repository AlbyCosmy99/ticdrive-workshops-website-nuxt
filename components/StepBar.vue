<template>
  <div class="px-4 py-10 w-full max-w-lg lg:max-w-full mx-auto">
    <NuxtImg 
      v-if="isRegisterRoute"
      src="/images/ticDriveLogo.png"
      alt="logo"
      class="mx-auto lg:absolute right-0 top-0 w-[150px] h-[150px]"
    />
    <div v-if="currentStep > -1 && isRegisterRoute" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-8 gap-1 w-8/9 ps-6">
      <div 
        v-for="(value, index) in steps"
        :key="index"
        class="mt-2"
      >
        <div 
          :class="[
              'h-[5px]',
              index < currentStep ? 'bg-green-500' : 'bg-gray-200'               
          ]"
        ></div>
        <div class="flex justify-start items-center mt-2">
          <img v-if="index-currentStep < 0" class="me-1" src="/images/step-vector.svg" alt="step-check">
          <div 
            v-else
            :class="[
                'rounded-full border w-4 h-4 me-1 border-gray-500'
            ]"
          >
          </div>
          <h1 class="text-sm text-gray-500">{{ value.value }}</h1>
        </div>
      </div>
    </div>
  </div>    
</template>

<script lang="ts" setup>
  import {ref} from 'vue';
  import useStepStore from '~/store/step';

  const stepStore = useStepStore();
  const route = useRoute();
  const currentStep = computed(() => stepStore.getCurrentStep);
  const isRegisterRoute = computed(() => route.path.startsWith('/auth/register'));
  const steps = ref([
    { step: 1, value: 'Informazioni e contatti' },
    { step: 2, value: 'Tipologia d’officina' },
    { step: 3, value: 'Servizi offerti' },
    { step: 4, value: 'Orari di apertura' },
    { step: 5, value: 'Informazioni fiscali' },
    { step: 6, value: 'Dati di profilo' },
    { step: 7, value: 'Descrizione officina' },
    { step: 8, value: 'Firma e accettazione' },
  ])
</script>