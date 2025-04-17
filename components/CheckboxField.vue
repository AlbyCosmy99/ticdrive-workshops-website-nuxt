<template>
  <div class="flex flex-row items-center gap-2 text-xs">
    <div
      role="checkbox"
      :aria-checked="props.modelValue"
      :id="props.id"
      tabindex="0"
      class="flex items-center justify-center w-4 h-4 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
      :class="
        props.modelValue ? 'bg-green-500' : 'bg-white border border-neutral-400'
      "
      @click="toggle"
      @keydown="onKeyDown"
    >
      <NuxtImg
        v-if="props.modelValue"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fa13158c850602d991655f5fb4dddd60294f0b79bd26cb02697e2fc9ae9f76b6?placeholderIfAbsent=true&apiKey=60b2620725b44e1c95ff63fd7ebca566"
        alt=""
        aria-hidden="true"
        class="object-contain w-3"
        width="16"
        height="16"
      />
    </div>

    <label
      :for="props.id"
      class="cursor-pointer font-light text-black select-none"
      @click="toggle"
    >
      {{ props.label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: string;
  label: string;
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const toggle = () => {
  emit('update:modelValue', !props.modelValue);
};

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    toggle();
  }
};
</script>
