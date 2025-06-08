<template>
  <div class="flex border border-gray-200 rounded-full overflow-hidden shadow-sm">
    <button
      @click="() => changeView('day')"
      :class="[
        'px-4 py-2 font-medium transition-colors',
        modelValue === 'day' ? 'bg-drive text-white' : 'bg-white text-gray-700',
      ]"
    >
      Giorno
    </button>
    <button
      @click="() => changeView('week')"
      :class="[
        'px-4 py-2 font-medium transition-colors',
        modelValue === 'week' ? 'bg-drive text-white' : 'bg-white text-gray-700',
      ]"
    >
      Settimana
    </button>
    <button
      @click="() => changeView('month')"
      :class="[
        'px-4 py-2 font-medium transition-colors',
        modelValue === 'month' ? 'bg-drive text-white' : 'bg-white text-gray-700',
      ]"
    >
      Mese
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: 'day' | 'week' | 'month'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'day' | 'week' | 'month'): void
}>()

const changeView = (view: 'day' | 'week' | 'month') => {
  emit('update:modelValue', view)
}
</script>
