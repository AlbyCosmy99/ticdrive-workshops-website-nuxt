<template>
  <div class="p-4 w-full max-w-lg lg:max-w-full mx-auto">
    <NuxtImg
      v-if="isRegisterRoute"
      src="/images/ticDriveLogo.png"
      alt="logo"
      class="mx-auto lg:absolute right-4 top-0 w-[120px] h-[120px]"
      width="120"
      height="120"
    />

    <div
      v-if="stepStore.currentStep >= 0 && isRegisterRoute && !hideBar"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-8 gap-1 w-8/9 ps-6"
    >
      <div v-for="(step, index) in stepStore.steps" :key="index" class="mt-2">
        <div
          :class="[
            'h-[5px]',
            index + 2 < stepStore.currentStep ? 'bg-green-500' : 'bg-gray-200',
          ]"
        ></div>

        <!-- Step circle and label -->
        <div class="flex justify-start items-center mt-2">
          <!-- Completed Step -->
          <NuxtImg
            v-if="index + 2 < stepStore.currentStep"
            class="me-1"
            src="/images/step-vector.svg"
            alt="step-check"
            width="16"
            height="16"
            aria-hidden="true"
          />

          <!-- Inactive Step -->
          <div
            v-else
            :class="['rounded-full border w-4 h-4 me-1 border-gray-500']"
            role="presentation"
          ></div>

          <h1 class="text-sm text-gray-500">{{ step.value }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import useStepStore from '~/store/step';
import {useRoute} from 'vue-router';

const stepStore = useStepStore();
const route = useRoute();

const isRegisterRoute = computed(() => route.path.startsWith('/auth/register'));

const props = defineProps({
  hideBar: {
    type: Boolean,
    default: false,
  },
});
</script>
