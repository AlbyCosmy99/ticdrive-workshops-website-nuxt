<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="self-start mt-4 text-base text-black block">
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
      :class="[
        'mt-3 max-w-full w-full text-base font-light bg-white rounded-3xl border border-solid border-neutral-400 text-black-400 w-[435px] max-md:px-5 outline-none focus:border-green-500',
        size === 'standard' ? 'px-8 py-4' :
        size === 'small' ? 'px-5 py-3' : 'px-8 py-4'
        ,
        { 'input-error': errorMessage }
      ]"
    />
    <span v-if="errorMessage" class="invalid-feedback">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormInput",
  props: {
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "standard"
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
});
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
