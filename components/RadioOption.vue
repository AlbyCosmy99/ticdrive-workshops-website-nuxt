<template>
  <div
    :class="[
      'rounded-full px-3 py-3 border flex items-center cursor-pointer',
      isCheck ? 'border-green-500' : 'border-gray-500',
    ]"
    @click="handleCheck"
  >
    <div
      :class="[
        'rounded-full border w-6 h-6 absolute',
        isCheck ? 'border-green-500' : 'border-gray-500',
      ]"
    >
      <img
        v-if="isCheck"
        src="/images/vector.svg"
        alt="check"
        class="w-4 h-4 m-auto"
      />
    </div>
    <h1 :class="['ms-8 text-sm font-semibold', {'text-green-600': isCheck}]">
      {{ label }}
    </h1>
  </div>
</template>

<script lang="ts">
<<<<<<< HEAD
<<<<<<< HEAD
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'RadioOption',
        props: {
            label: {
                type: String,
                default: ""
            },
            isCheck: {
                type: Boolean,
                default: false
            },
            value: {
                type: null
            }
        },
        emits: ['update:isCheck'],
        setup(props, { emit }) {
=======
=======
>>>>>>> fafb1a952f231c198146f3789fc53014d904c100
import {defineComponent} from 'vue';
export default defineComponent({
  name: 'RadioOption',
  props: {
    label: {
      type: String,
      default: '',
    },
    isCheck: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
    },
  },
  emits: ['update:isCheck'],
  setup(props, {emit}) {
    const handleCheck = () => {
      emit('update:isCheck', props.value);
    };
<<<<<<< HEAD
>>>>>>> fafb1a952f231c198146f3789fc53014d904c100
=======
>>>>>>> fafb1a952f231c198146f3789fc53014d904c100

    return {
      handleCheck,
    };
  },
});
</script>
