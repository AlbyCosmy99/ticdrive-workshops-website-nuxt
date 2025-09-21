<template>
  <div
    class="absolute right-5 top-1/2 -translate-y-1/2 transform cursor-pointer"
    @click="emit('toggle')"
    role="button"
    tabindex="0"
    aria-label="Toggle password visibility"
  >
    <NuxtImg
      :src="
        showPassword ? '/svg/toggles/showEye.svg' : '/svg/toggles/hideEye.svg'
      "
      :alt="showPassword ? 'Show password' : 'Hide password'"
      width="20"
      height="20"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{showPassword: boolean}>();
const emit = defineEmits(['toggle']);
</script>
