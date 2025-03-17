<template>
  <div>
    <label :for="id" class="self-start mt-4 text-base text-black block">
      {{ label }}
    </label>
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="px-8 py-4 mt-3 max-w-full text-base font-light bg-white rounded-3xl border border-solid border-neutral-400 text-neutral-400 w-[435px] max-md:px-5 outline-none focus:border-green-500"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormInput",
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
});
</script>
