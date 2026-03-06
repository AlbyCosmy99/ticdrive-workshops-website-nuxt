<template>
  <div
    :class="[
      'border transition-all duration-200 cursor-pointer',
      props.multiline
        ? 'flex items-start gap-3 rounded-2xl px-4 py-3'
        : 'flex min-h-11 items-center gap-3 rounded-full px-3 py-2.5',
      isChecked
        ? 'border-green-500 bg-green-50/40'
        : 'border-gray-300 bg-white hover:border-gray-400',
    ]"
    @click="handleChecked"
  >
    <div
      :class="[
        'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-colors',
        props.multiline ? 'mt-0.5' : '',
        isChecked ? 'border-green-500 bg-white' : 'border-gray-400 bg-white',
      ]"
    >
      <img
        v-if="isChecked"
        src="/images/vector.svg"
        alt="check"
        class="w-4 h-4 m-auto"
      />
    </div>

    <h6 class="min-w-0 flex-1 text-sm font-semibold leading-6">
      <a
        v-if="url"
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
        :class="[
          'block whitespace-normal break-words underline decoration-1 underline-offset-4 transition-colors hover:decoration-2',
          isChecked ? 'text-green-700' : 'text-gray-800',
        ]"
        @click.stop
      >
        {{ name }}
      </a>
      <span
        v-else
        :class="[
          'block whitespace-normal break-words',
          isChecked ? 'text-green-700' : 'text-gray-800',
        ]"
      >
        {{ name }}
      </span>
    </h6>
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
    url?: string;
    multiline?: boolean;
  }>(),
  {
    isChecked: false,
    multiline: false,
  },
);

const emit = defineEmits<{
  (e: 'update:check', value: SharedValue): void;
}>();

const handleChecked = () => {
  emit('update:check', props.value);
};
</script>
