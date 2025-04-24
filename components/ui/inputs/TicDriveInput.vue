<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="self-start mt-4 text-base text-black block"
    >
      {{ label }}
    </label>

    <div class="relative mt-3">
      <input
        :type="localType"
        :id="id"
        :placeholder="placeholder"
        :value="modelValue"
        :class="[
          inputClasses,
          'pr-12', // space for the icon
        ]"
        :aria-invalid="Boolean(errorMessage)"
        :aria-describedby="errorMessage ? `${id}-error` : undefined"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :readonly="readonly"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />

      <NuxtImg
        v-if="type === 'password'"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6985640710eeb41e49e1efa67ef16cb3f8b29c3408fb1e345a7504c0c37e74c5?placeholderIfAbsent=true&apiKey=60b2620725b44e1c95ff63fd7ebca566"
        alt="Toggle password visibility"
        class="absolute right-8 top-1/2 transform -translate-y-1/2 w-[18px] cursor-pointer"
        @click="togglePasswordVisibility"
        width="18"
        height="18"
      />
    </div>

    <span v-if="errorMessage" :id="`${id}-error`" class="invalid-feedback">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed} from 'vue';

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

const showPassword = ref(false);
const localType = computed(() =>
  props.type === 'password'
    ? showPassword.value
      ? 'text'
      : 'password'
    : props.type,
);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const inputClasses = computed(() => [
  'w-full text-base font-light bg-white rounded-3xl border border-solid border-neutral-400 text-black outline-none focus:border-green-500 transition duration-150 ease-in-out',
  props.size === 'small' ? 'px-5 py-3' : 'px-8 py-4',
  props.errorMessage && 'input-error',
]);
</script>
