<template>
  <div
    :class="[
      'py-2 px-6 rounded-xl border relative flex mt-2 items-center justify-between',
      isCheck ? 'border-green-500' : 'border-gray-500',
    ]"
  >
    <h1 class="text-gray-500 text-2xl font-semibold">
      {{ label }}
    </h1>
    <div class="relative w-14 h-6 cursor-pointer" @click="handleClick">
      <div
        :class="[
          'absolute inset-0 rounded-full transition-all duration-300 ease-in-out',
          isCheck
            ? 'bg-green-500 border-green-500'
            : 'bg-gray-500 border-gray-500',
        ]"
      ></div>
      <div
        :class="[
          'absolute top-1/2 transform -translate-y-1/2 bg-white w-6 h-6 rounded-full shadow-md transition-all duration-300 ease-in-out',
          isCheck ? 'left-7' : 'left-1',
        ]"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, defineEmits, withDefaults} from 'vue';

const props = withDefaults(
  defineProps<{
    isCheck: boolean;
    value: number;
    label: string;
  }>(),
  {
    isCheck: false,
    label: '',
  },
);

const emit = defineEmits<{
  (e: 'update:isCheck', value: number): void;
}>();

const handleClick = () => {
  emit('update:isCheck', props.value);
};
</script>
