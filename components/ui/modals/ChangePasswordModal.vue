<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <div
      v-if="loading"
      class=" bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative z-10 flex justify-center items-center"
    >
      <UiSpinnersTicDriveSpinner text="Cambio password in corso..." />
    </div>
    <span v-else class="fixed inset-0 z-50 flex items-center justify-center">
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
              />
              <PasswordEyeToggle
                :show-password="showCurrentPassword"
                @toggle="toggleCurrentPasswordVisibility"
              />
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
              />
              <PasswordEyeToggle
                :show-password="showNewPassword"
                @toggle="toggleNewPasswordVisibility"
              />
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
              />
              <PasswordEyeToggle
                :show-password="showConfirmPassword"
                @toggle="toggleConfirmPasswordVisibility"
              />
            </div>
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
    </span>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import PasswordEyeToggle from '../toggles/PasswordEyeToggle.vue';
import useAuthStore from '~/store/auth';

interface PasswordChangeModalProps {
  isOpen: boolean;
}

const showToast = useToast();
const authStore = useAuthStore();

const props = defineProps<PasswordChangeModalProps>();
const emit = defineEmits(['close']);

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);

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

const handleSubmit = async () => {
  if (passwordMismatch.value) {
    showToast('warn', 'Le password non coincidono. ', 'Aggiusta le password.');
  }
  if (!currentPassword.value) {
    showToast(
      'warn',
      'Password corrente obbligatoria. ',
      'Inserisci la password corrente.',
    );
  }
  if (!newPassword.value) {
    showToast(
      'warn',
      'Password nuova obbligatoria. ',
      'Inserisci la nuova password.',
    );
  }
  if (!confirmPassword.value) {
    showToast(
      'warn',
      'Password ripetuta obbligatoria. ',
      'Ripeti la password.',
    );
  }
  if (!passwordMismatch.value && confirmPassword.value) {
    loading.value = true;
    await authStore.changePassword(
      currentPassword.value,
      newPassword.value,
      confirmPassword.value,
    );
    emit('close');
    resetForm();
    loading.value = false;
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
