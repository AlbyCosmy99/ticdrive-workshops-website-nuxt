<template>
  <div class="w-full">
    <label
      v-if="props.label"
      :for="props.id"
      class="self-start mt-4 text-base text-black block"
    >
      {{ props.label }}
    </label>
    <input
      :type="props.type"
      :id="props.id"
      :placeholder="props.placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :class="[
        'mt-3 max-w-full w-full text-base font-light bg-white rounded-3xl border border-solid border-neutral-400 text-black-400 w-[435px] max-md:px-5 outline-none focus:border-green-500',
        props.size === 'standard'
          ? 'px-8 py-4'
          : props.size === 'small'
          ? 'px-5 py-3'
          : 'px-8 py-4',
        {'input-error': errorMessage},
      ]"
    />
    <span v-if="errorMessage" class="invalid-feedback">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps} from 'vue';
const props = defineProps<{
  id: {
    type: string;
    default: '';
  };
  label: {
    type: string;
    default: '';
  };
  placeholder: {
    type: string;
    default: '';
  };
  size: {
    type: string;
    default: 'standard';
  };
  type: {
    type: string;
    default: 'text';
  };
  modelValue: {
    type: string;
    default: '';
  };
  errorMessage: {
    type: string;
    default: '';
  };
}>();
const emits = defineEmits(['update:modelValue']);
</script>

<style scoped>
.invalid-feedback {
  color: rgb(211, 49, 49);
  font-size: 14px;
  margin-top: 5px;
}
.input-error {
  border-color: rgb(211, 49, 49) !important;
}
</style>
