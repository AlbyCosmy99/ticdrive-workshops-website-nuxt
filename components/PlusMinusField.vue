<template>
  <div
    class="border-2 border-gray-500 p-4 flex flex-col sm:flex-row justify-between items-center mt-4 rounded-xl"
  >
    <h1 class="text-lg text-gray-500 font-semibold">{{ props.label }}</h1>
    <div class="flex gap-2">
      <div
        :class="[
          'text-white text-center leading-11 font-bold text-xl min-w-10',
          isMinusDisable
            ? 'bg-green-300'
            : 'bg-green-500 cursor-pointer hover:bg-green-700 active:bg-green-500',
        ]"
        @click="clickHandle('minus')"
      >
        -
      </div>
      <input
        class="bg-gray-200 text-center max-w-15 text-xl outline-none"
        v-model="props.numberValue"
        readOnly
      />
      <div
        :class="[
          'text-white text-center leading-11 min-w-10 font-bold cursor-pointer text-xl bg-green-500 hover:bg-green-700 active:bg-green-500',
        ]"
        @click="clickHandle('plus')"
      >
        +
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, defineEmits} from 'vue';

const props = defineProps<{
  isMinusDisable: boolean;
  numberValue: number;
  label: string;
}>();

const emit = defineEmits(['update:number']);

const clickHandle = (value: string) => {
  emit('update:number', value);
};
</script>
