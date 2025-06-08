<template>
  <BaseModal :isOpen="isOpen" title="Cambio Password" @close="close">
    <template v-if="loading">
      <div class="flex justify-center items-center h-40">
        <UiSpinnersTicDriveSpinner text="Cambio password in corso..." />
      </div>
    </template>

    <template v-else>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password attuale</label>
          <div class="relative">
            <input
              :type="showCurrentPassword ? 'text' : 'password'"
              v-model="currentPassword"
              class="w-full p-2 border border-gray-300 rounded-md pr-10"
            />
            <PasswordEyeToggle :show-password="showCurrentPassword" @toggle="toggleCurrentPasswordVisibility" />
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Nuova password</label>
          <div class="relative">
            <input
              :type="showNewPassword ? 'text' : 'password'"
              v-model="newPassword"
              class="w-full p-2 border border-gray-300 rounded-md pr-10"
            />
            <PasswordEyeToggle :show-password="showNewPassword" @toggle="toggleNewPasswordVisibility" />
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Conferma nuova password</label>
          <div class="relative">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              class="w-full p-2 border border-gray-300 rounded-md pr-10"
            />
            <PasswordEyeToggle :show-password="showConfirmPassword" @toggle="toggleConfirmPasswordVisibility" />
          </div>
        </div>

        <div class="flex justify-end">
          <button type="button" @click="close" class="mr-3 px-4 py-2 text-sm text-gray-700 hover:text-gray-900">Annulla</button>
          <button type="submit" class="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600">
            Salva
          </button>
        </div>
      </form>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import PasswordEyeToggle from '../toggles/PasswordEyeToggle.vue';
import useAuthStore from '~/store/auth';
import BaseModal from './BaseModal.vue';


const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['close']);

const showToast = useToast();
const authStore = useAuthStore();

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const toggleCurrentPasswordVisibility = () => (showCurrentPassword.value = !showCurrentPassword.value);
const toggleNewPasswordVisibility = () => (showNewPassword.value = !showNewPassword.value);
const toggleConfirmPasswordVisibility = () => (showConfirmPassword.value = !showConfirmPassword.value);

const passwordMismatch = computed(() => newPassword.value && confirmPassword.value && newPassword.value !== confirmPassword.value);

const close = () => {
  emit('close');
  resetForm();
};

const resetForm = () => {
  currentPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
  showCurrentPassword.value = false;
  showNewPassword.value = false;
  showConfirmPassword.value = false;
};

const handleSubmit = async () => {
  if (passwordMismatch.value) return showToast('warn', 'Le password non coincidono.', 'Aggiusta le password.');
  if (!currentPassword.value) return showToast('warn', 'Password corrente obbligatoria.', 'Inseriscila.');
  if (!newPassword.value) return showToast('warn', 'Nuova password obbligatoria.', 'Inseriscila.');
  if (!confirmPassword.value) return showToast('warn', 'Conferma obbligatoria.', 'Ripeti la password.');

  loading.value = true;
  await authStore.changePassword(currentPassword.value, newPassword.value, confirmPassword.value);
  loading.value = false;
  close();
};
</script>
