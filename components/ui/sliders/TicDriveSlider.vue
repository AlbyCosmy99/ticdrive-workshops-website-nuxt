<template>
  <button
    type="button"
    :aria-pressed="isChecked"
    :class="[
      'mt-2 flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-3 text-left transition-all duration-200',
      isChecked
        ? 'border-green-300 bg-green-50/60'
        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
    ]"
    @click="handleClick"
  >
    <h1
      :class="[
        'truncate text-lg font-semibold sm:text-xl',
        isChecked ? 'text-gray-700' : 'text-gray-500',
      ]"
    >
      {{ name }}
    </h1>

    <div
      :class="[
        'relative h-7 w-14 flex-shrink-0 rounded-full transition-all duration-300 ease-in-out',
        isChecked ? 'bg-drive' : 'bg-gray-300',
      ]"
    >
      <div
        :class="[
          'absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all duration-300 ease-in-out',
          isChecked ? 'left-8' : 'left-1',
        ]"
      ></div>
    </div>
  </button>
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
