<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="self-start mt-4 text-base text-black block"
    >
      {{ label }}
    </label>

    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      :class="inputClasses"
      :aria-invalid="Boolean(errorMessage)"
      :aria-describedby="errorMessage ? `${id}-error` : undefined"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :readonly="readonly"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />

    <span v-if="errorMessage" :id="`${id}-error`" class="invalid-feedback">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';

type InputSize = 'standard' | 'small';
type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

const props = withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    placeholder?: string;
    size?: InputSize;
    type?: InputType;
    modelValue: string;
    errorMessage?: string;
    autocomplete?: string;
    disabled?: boolean;
    readonly?: boolean;
  }>(),
  {
    id: '',
    label: '',
    placeholder: '',
    size: 'standard',
    type: 'text',
    errorMessage: '',
    autocomplete: 'off',
    disabled: false,
    readonly: false,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputClasses = computed(() => [
  'mt-3 w-full text-base font-light bg-white rounded-3xl border border-solid border-neutral-400 text-black outline-none focus:border-green-500 transition duration-150 ease-in-out',
  props.size === 'small' ? 'px-5 py-3' : 'px-8 py-4',
  props.errorMessage && 'input-error',
]);
</script>

<style scoped>
.invalid-feedback {
  color: rgb(211, 49, 49);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}
.input-error {
  border-color: rgb(211, 49, 49) !important;
}
</style>
