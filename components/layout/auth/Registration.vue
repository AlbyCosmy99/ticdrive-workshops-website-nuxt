<template>
  <div class="flex min-h-screen flex-col bg-white">
    <StepBar
      v-if="stepStore.currentStep > 0"
      :hide-bar="stepStore.currentStep === 1"
    />

    <div class="grid flex-1 grid-cols-1 lg:grid-cols-2 lg:gap-0">
      <div
        class="hidden items-start justify-center px-4 pb-6 sm:px-6 lg:order-1 lg:flex lg:items-center lg:px-8 lg:py-6"
      >
        <div
          class="relative aspect-[5/4] w-full max-w-lg overflow-hidden rounded-[30px] shadow-sm sm:aspect-square lg:max-w-[600px] lg:max-h-[600px]"
        >
          <NuxtImg
            :src="props.mainImage"
            class="absolute inset-0 w-full h-full object-cover"
            alt="Centered Image"
          />
        </div>
      </div>

      <div
        class="order-1 flex min-h-0 items-start justify-center px-4 pb-6 pt-4 sm:px-6 lg:order-2 lg:items-center lg:overflow-y-auto lg:px-8 lg:py-6"
      >
        <div class="w-full max-w-xl">
          <slot name="rightContent" />
        </div>
      </div>

      <Toast />
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
