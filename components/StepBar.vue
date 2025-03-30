<template>
  <div class="px-4 py-10">
    <div v-if="currentStep > -1 && isRegisterRoute" class="grid grid-cols-8 gap-1 w-8/9 ps-6">
      <div 
          v-for="(value, index) in steps"
          :key="index"
      >
        <div 
          :class="[
              'h-[5px]',
              index < currentStep ? 'bg-green-500' : 'bg-gray-200'               
          ]"
        ></div>
        <div class="flex justify-center items-center mt-2">
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
    <NuxtImg 
        v-if="isRegisterRoute"
        src="/images/ticDriveLogo.png"
        alt="logo"
        class="absolute right-0 top-0 w-[150px] h-[150px]"
    />
  </div>    
</template>

<script lang="ts">
import {ref} from 'vue';
import useStepStore from '~/store/step';

export default defineComponent({
    name: "StepBar",
    setup() {
        const stepStore = useStepStore();
        const route = useRoute();
        const currentStep = computed(() => stepStore.getCurrentStep);
        const isRegisterRoute = computed(() => route.path.startsWith('/auth/register'));
        const steps = ref([
            { step: 1, value: 'Informazioni e contatti' },
            { step: 1, value: 'Tipologia d’officina' },
            { step: 1, value: 'Servizi offerti' },
            { step: 1, value: 'Orari di apertura' },
            { step: 1, value: 'Informazioni fiscali' },
            { step: 1, value: 'Dati di profilo' },
            { step: 1, value: 'Descrizione officina' },
            { step: 1, value: 'Firma e accettazione' },
        ])
        return {
            stepStore,
            currentStep,
            steps,
            isRegisterRoute
        }
    }
});

</script>