<template>
  <div class="h-screen flex flex-col">
    <StepBar v-if="showStepBar" />
    <div class="w-full grid grid-cols-1 lg:grid-cols-2 flex-1 min-h-0">
      <!-- Left Section -->
      <div class="flex justify-center items-center p-4">
        <div
          class="relative w-[90%] aspect-square max-w-lg lg:max-w-[550px] lg:max-h-[550px] rounded-xl overflow-hidden"
        >
          <NuxtImg
            :src="mainImage"
            class="absolute inset-0 w-full h-full object-cover"
            alt="Centered Image"
          />
        </div>
      </div>

      <!-- Right Section -->
      <div class="overflow-y-auto p-4 flex flex-col min-h-0">
        <slot name="rightContent" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StepBar from "../StepBar.vue";

defineProps({
  showStepBar: {
    type: Boolean,
    default: true,
  },
  mainImage: {
    type: String,
  },
});
</script>
