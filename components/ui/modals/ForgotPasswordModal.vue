<template>
  <UiModalsBaseModal :isOpen="isOpen" @close="close" :containerClass="'w-full max-w-md'">
    <template #header>
      <div class="flex items-center pb-2 mb-4 border-b border-gray-100">
        <button @click="handleBackButton" class="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 19L5 12L12 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <div class="flex-grow text-center">
          <span class="text-3xl font-bold text-gray-600">Tic</span>
          <span class="text-3xl font-bold text-green-500">Drive</span>
        </div>
      </div>
    </template>

    <!-- Step: Email -->
    <template v-if="currentStep === 'email'">
      <h1 class="text-2xl font-bold mb-2">Password dimenticata?</h1>
      <p class="text-gray-500 mb-6">Inserisci la tua email per reimpostare la password</p>

      <form @submit.prevent="submitEmail">
        <label class="block text-black font-medium mb-2">Email</label>
        <input
          type="email"
          v-model="email"
          placeholder="Inserisci la tua email"
          class="w-full p-4 bg-gray-100 rounded-lg mb-6 focus:outline-none"
          required
        />
        <button
          type="submit"
          :disabled="!email || loading"
          class="w-full py-4 bg-green-inter text-white font-medium rounded-lg hover:bg-green-dark disabled:bg-gray-300"
        >
          {{ loading ? 'Invio in corso...' : 'Reimposta password' }}
        </button>
      </form>
    </template>

    <!-- Step: Codice verifica -->
    <template v-else-if="currentStep === 'verification'">
      <h1 class="text-2xl font-bold mb-2">Controlla la tua email</h1>
      <p class="text-gray-500 mb-6">Abbiamo inviato un codice a {{ email }}</p>

      <form @submit.prevent="submitVerificationCode">
        <input
          type="text"
          v-model="verificationCode"
          placeholder="Codice a 6 cifre"
          class="w-full p-4 bg-gray-100 rounded-lg mb-6 focus:outline-none"
          maxlength="6"
          pattern="[0-9]{6}"
          inputmode="numeric"
          required
        />
        <button
          type="submit"
          :disabled="!verificationCode || loading || verificationCode.length !== 6"
          class="w-full py-4 bg-green-inter text-white font-medium rounded-lg hover:bg-green-dark disabled:bg-gray-300"
        >
          {{ loading ? 'Verifica in corso...' : 'Verifica codice' }}
        </button>
      </form>
    </template>

    <!-- Step: Nuova password -->
    <template v-else-if="currentStep === 'changePassword'">
      <h1 class="text-2xl font-bold mb-2">Reset Password</h1>
      <p class="text-gray-500 mb-6">Inserisci la tua nuova password</p>

      <form @submit.prevent="submitNewPassword">
        <label class="block text-black font-medium mb-2">Nuova password</label>
        <div class="relative mb-4">
          <input
            :type="showNewPassword ? 'text' : 'password'"
            v-model="newPassword"
            class="w-full p-4 bg-gray-100 rounded-lg focus:outline-none pr-10"
            required
            minlength="8"
          />
          <PasswordEyeToggle :show-password="showNewPassword" @toggle="toggleNewPasswordVisibility" />
        </div>

        <label class="block text-black font-medium mb-2">Conferma nuova password</label>
        <div class="relative mb-2">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="confirmPassword"
            class="w-full p-4 bg-gray-100 rounded-lg focus:outline-none pr-10"
            required
            minlength="8"
          />
          <PasswordEyeToggle :show-password="showConfirmPassword" @toggle="toggleConfirmPasswordVisibility" />
        </div>
        <p v-if="passwordMismatch" class="text-red-500 text-sm mb-4">Le password non corrispondono</p>

        <button
          type="submit"
          :disabled="!newPassword || !confirmPassword || loading || passwordMismatch"
          class="w-full py-4 bg-green-inter text-white font-medium rounded-lg hover:bg-green-dark disabled:bg-gray-300"
        >
          {{ loading ? 'Salvataggio in corso...' : 'Salva nuova password' }}
        </button>
      </form>
    </template>
  </UiModalsBaseModal>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';
import PasswordEyeToggle from '../toggles/PasswordEyeToggle.vue';
import useAuthStore from '~/store/auth';

interface ForgotPasswordModalProps {
  isOpen: boolean;
}

const props = defineProps<ForgotPasswordModalProps>();
const emit = defineEmits(['close']);

const currentStep = ref<'email' | 'verification' | 'changePassword'>('email');
const email = ref('');
const verificationCode = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);

const authStore = useAuthStore();
const $ticDriveAxios = useTicDriveAxios();
const showToast = useToast();

const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const toggleNewPasswordVisibility = () => (showNewPassword.value = !showNewPassword.value);
const toggleConfirmPasswordVisibility = () => (showConfirmPassword.value = !showConfirmPassword.value);

const passwordMismatch = computed(() => newPassword.value && confirmPassword.value && newPassword.value !== confirmPassword.value);

const handleBackButton = () => {
  if (currentStep.value === 'verification') currentStep.value = 'email';
  else if (currentStep.value === 'changePassword') currentStep.value = 'verification';
  else close();
};

const close = () => {
  resetForm();
  emit('close');
};

const resetForm = () => {
  currentStep.value = 'email';
  email.value = '';
  verificationCode.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
  loading.value = false;
  showNewPassword.value = false;
  showConfirmPassword.value = false;
};

const submitEmail = async () => {
  loading.value = true;
  try {
    await $ticDriveAxios.post('/auth/forgot-password', { email: email.value });
    currentStep.value = 'verification';
  } catch {
    showToast('error', 'Errore', 'Impossibile inviare email. Riprova.');
  } finally {
    loading.value = false;
  }
};

const submitVerificationCode = async () => {
  if (!verificationCode.value || verificationCode.value.length !== 6) return;
  loading.value = true;
  try {
    await $ticDriveAxios.post('/auth/send-code-password-forgot', {
      email: email.value,
      code: verificationCode.value,
    });
    currentStep.value = 'changePassword';
  } catch {
    showToast('error', 'Errore', 'Codice non valido. Riprova.');
  } finally {
    loading.value = false;
  }
};

const submitNewPassword = async () => {
  if (!newPassword.value || !confirmPassword.value || passwordMismatch.value) return;
  loading.value = true;
  try {
    await $ticDriveAxios.post('/auth/reset-password', {
      email: email.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value,
    });
    await authStore.login(email.value, newPassword.value);
    showToast('success', 'Successo', 'Password aggiornata con successo');
    close();
  } catch {
    showToast('error', 'Errore', 'Reset fallito. Riprova.');
  } finally {
    loading.value = false;
  }
};
</script>
