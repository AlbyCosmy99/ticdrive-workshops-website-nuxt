<template>
  <div class="h-screen flex flex-col">
    <StepBar
      v-if="stepStore.currentStep > 0"
      :hide-bar="stepStore.currentStep === 1"
    />
    <div class="w-full grid grid-cols-1 lg:grid-cols-2 flex-1 min-h-0">
      
      <!-- Left Section -->
      <div class="flex justify-center items-center p-4">
        <div
          class="relative w-[90%] aspect-square max-w-lg lg:max-w-[600px] lg:max-h-[600px] rounded-[30px] overflow-hidden"
        >
          <NuxtImg
            :src="props.mainImage"
            class="absolute inset-0 w-full h-full object-cover"
            alt="Centered Image"
          />
        </div>
      </div>

      <!-- Right Section -->
      <div
        class="lg:overflow-y-auto p-4 flex justify-center items-center flex-col min-h-0"
      >
        <slot name="rightContent" />
        <Toast />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import Toast from 'primevue/toast';
import useStepStore from '~/store/step';
import StepBar from '~/components/StepBar.vue';

const props = defineProps<{
  mainImage: string;
}>();

const stepStore = useStepStore();
</script>
