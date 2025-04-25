<template>
  <div
    :class="[
      'rounded-full px-3 py-3 border flex items-center cursor-pointer relative',
      isChecked ? 'border-green-500' : 'border-gray-500',
    ]"
    @click="handleChecked"
  >
    <div
      :class="[
        'rounded-full border w-6 h-6 absolute',
        isChecked ? 'border-green-500' : 'border-gray-500',
      ]"
    >
      <img
        v-if="isChecked"
        src="/images/vector.svg"
        alt="check"
        class="w-4 h-4 m-auto"
      />
    </div>
    <h1 :class="['ms-8 text-sm font-semibold', {'text-green-600': isChecked}]">
      {{ name }}
    </h1>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, withDefaults, defineEmits} from 'vue';

type SharedValue = any;

const props = withDefaults(
  defineProps<{
    id: number;
    name: string;
    value: SharedValue;
    isChecked: boolean;
  }>(),
  {
    label: '',
    isChecked: false,
  },
);

const emit = defineEmits<{
  (e: 'update:check', value: SharedValue): void;
}>();

const handleChecked = () => {
  emit('update:check', props.value);
};
</script>
