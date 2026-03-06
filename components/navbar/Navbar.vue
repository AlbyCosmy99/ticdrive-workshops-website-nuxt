<template>
  <div
    class="flex min-h-[72px] w-full flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-5"
  >
    <div class="flex min-w-0 items-start gap-3">
      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 lg:hidden"
        aria-label="Apri menu"
        @click="emit('toggle-sidebar')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          class="h-5 w-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 7h16M4 12h16M4 17h16"
          />
        </svg>
      </button>

      <div class="min-w-0">
        <h1 class="truncate text-xl font-semibold text-gray-900 sm:text-2xl">
          Ciao, {{ displayName }}
        </h1>
        <p class="text-sm font-normal text-gray-500">
        Organizziamo insieme il lavoro in officina oggi!
        </p>
      </div>
    </div>

    <div class="ml-auto flex min-w-0 items-center gap-3">
      <div class="flex min-w-0 items-center space-x-3">
        <div
          class="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-sm font-semibold uppercase text-gray-600 shadow-sm"
        >
          <NuxtImg
            v-if="userImage"
            :src="userImage"
            alt="Profile"
            class="w-full h-full object-cover rounded-full"
          />
          <span v-else>{{ userInitials }}</span>
        </div>
        <div class="min-w-0 flex-col items-start justify-center sm:flex">
          <span class="truncate font-semibold leading-tight text-gray-800">
            {{ displayName }}
          </span>
          <span class="hidden truncate text-sm text-gray-500 sm:block">
            Profilo officina
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from '~/store/auth';

const authStore = useAuthStore();
const emit = defineEmits<{
  (e: 'toggle-sidebar'): void;
}>();

const displayName = computed(() => authStore.user?.name || 'Officina');
const userImage = computed(() => authStore.user?.images?.[0]?.url || '');
const userInitials = computed(() => {
  const name = displayName.value.trim();
  if (!name) {
    return 'TD';
  }

  return name
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0])
    .join('');
});
</script>
