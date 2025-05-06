<template>
  <div
    :class="[
      'py-2 px-6 rounded-xl border relative flex mt-2 items-center justify-between',
      isChecked ? 'border-green-500' : 'border-gray-500',
    ]"
  >
    <h1 class="text-gray-500 text-2xl font-semibold">
      {{ name }}
    </h1>
    <div class="relative w-14 h-6 cursor-pointer" @click="handleClick">
      <div
        :class="[
          'absolute inset-0 rounded-full transition-all duration-300 ease-in-out',
          isChecked
            ? 'bg-green-500 border-green-500'
            : 'bg-gray-500 border-gray-500',
        ]"
      ></div>
      <div
        :class="[
          'absolute top-1/2 transform -translate-y-1/2 bg-white w-6 h-6 rounded-full shadow-md transition-all duration-300 ease-in-out',
          isChecked ? 'left-8' : 'left-0',
        ]"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, defineEmits, withDefaults} from 'vue';

type SharedValue = any;

const props = withDefaults(
  defineProps<{
    id: number;
    isChecked: boolean;
    name: string;
    value: SharedValue;
  }>(),
  {
    isChecked: false,
    name: '',
  },
);

const emit = defineEmits<{
  (e: 'update:check', value: SharedValue): void;
}>();

const handleClick = () => {
  emit('update:check', props.value);
};
</script>
