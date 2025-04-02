<template>
  <div class="flex gap-2 items-center justify-center">
    <div class="flex items-center">
      <button
        type="button"
        :aria-checked="props.modelValue"
        role="checkbox"
        :id="props.id"
        class="cursor-pointer flex justify-center items-center w-5 h-5 rounded min-h-5 focus:outline-none focus:ring-2 focus:ring-green-500"
        :class="
          props.modelValue
            ? 'bg-green-500'
            : 'bg-white border border-neutral-400'
        "
        @click="toggle"
      >
        <img
          v-if="modelValue"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa13158c850602d991655f5fb4dddd60294f0b79bd26cb02697e2fc9ae9f76b6?placeholderIfAbsent=true&apiKey=60b2620725b44e1c95ff63fd7ebca566"
          alt=""
          aria-hidden="true"
          class="object-contain w-3"
        />
      </button>
    </div>
    <label
      :for="props.id"
      class="text-xs font-light text-black cursor-pointer"
      @click="toggle"
    >
      {{ props.label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps} from 'vue';

const props = defineProps<{
  id: {
    type: String;
    required: true;
  };
  label: {
    type: String;
    required: true;
  };
  modelValue: {
    type: Boolean;
    default: false;
  };
}>();

const emit = defineEmits(['update:modelValue']);

const toggle = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>
