<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div class="absolute inset-0 bg-black bg-opacity-30" @click="close"></div>
    <div
      class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative z-10"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold">Cambio Password</h3>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Password attuale</label
          >
          <div class="relative">
            <input
              :type="showCurrentPassword ? 'text' : 'password'"
              v-model="currentPassword"
              class="w-full p-2 border border-gray-300 rounded-md pr-10"
              required
            />
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" @click="toggleCurrentPasswordVisibility">
              <NuxtImg v-if="showCurrentPassword" src="/svg/stars/occhioaperto.svg" alt="Hide password" class="w-[18px] h-[18px]" width="18" height="18" />
              <NuxtImg v-else src="/svg/stars/occhiobarrato.svg" alt="Show password" class="w-[18px] h-[18px]" width="18" height="18" />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Nuova password</label
          >
          <div class="relative">
            <input
              :type="showNewPassword ? 'text' : 'password'"
              v-model="newPassword"
              class="w-full p-2 border border-gray-300 rounded-md pr-10"
              required
            />
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" @click="toggleNewPasswordVisibility">
              <NuxtImg v-if="showNewPassword" src="/svg/stars/occhioaperto.svg" alt="Hide password" class="w-[18px] h-[18px]" width="18" height="18" />
              <NuxtImg v-else src="/svg/stars/occhiobarrato.svg" alt="Show password" class="w-[18px] h-[18px]" width="18" height="18" />
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Conferma nuova password</label
          >
          <div class="relative">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              class="w-full p-2 border border-gray-300 rounded-md pr-10"
              required
            />
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" @click="toggleConfirmPasswordVisibility">
              <NuxtImg v-if="showConfirmPassword" src="/svg/stars/occhioaperto.svg" alt="Hide password" class="w-[18px] h-[18px]" width="18" height="18" />
              <NuxtImg v-else src="/svg/stars/occhiobarrato.svg" alt="Show password" class="w-[18px] h-[18px]" width="18" height="18" />
            </div>
          </div>
          <p v-if="passwordMismatch" class="mt-1 text-sm text-red-600">
            Le password non corrispondono
          </p>
        </div>

        <div class="flex justify-end">
          <button
            type="button"
            @click="close"
            class="mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Annulla
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600"
          >
            Salva
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';

interface PasswordChangeModalProps {
  isOpen: boolean;
}

const props = defineProps<PasswordChangeModalProps>();
const emit = defineEmits(['close', 'save']);

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

// Password visibility toggles
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const toggleCurrentPasswordVisibility = () => {
  showCurrentPassword.value = !showCurrentPassword.value;
};

const toggleNewPasswordVisibility = () => {
  showNewPassword.value = !showNewPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const passwordMismatch = computed(() => {
  return (
    newPassword.value &&
    confirmPassword.value &&
    newPassword.value !== confirmPassword.value
  );
});

const close = () => {
  emit('close');
  resetForm();
};

const handleSubmit = () => {
  if (!passwordMismatch.value) {
    emit('save', {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
    });
    resetForm();
  }
};

const resetForm = () => {
  currentPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
  showCurrentPassword.value = false;
  showNewPassword.value = false;
  showConfirmPassword.value = false;
};
</script>
