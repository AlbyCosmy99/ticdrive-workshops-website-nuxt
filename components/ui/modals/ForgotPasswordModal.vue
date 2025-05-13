<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div class="absolute inset-0 bg-black bg-opacity-30" @click="close"></div>

    <div
      class="relative bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden"
    >
      <div class="flex items-center p-6 border-b border-gray-100">
        <button @click="handleBackButton" class="p-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div class="flex-grow text-center">
          <div class="inline-block">
            <span class="text-3xl font-bold text-gray-600">Tic</span>
            <span class="text-3xl font-bold text-green-500">Drive</span>
          </div>
        </div>
      </div>

      <div class="p-6">
        <div v-if="currentStep === 'email'">
          <div class="mb-8">
            <h1 class="text-2xl font-bold mb-2">Password dimenticata?</h1>
            <p class="text-gray-500">
              Inserisci la tua email per reimpostare la password
            </p>
          </div>

          <form @submit.prevent="submitEmail">
            <div class="mb-8">
              <label class="block text-black font-medium mb-2"
                >Your email</label
              >
              <input
                type="email"
                v-model="email"
                placeholder="Insert your email"
                class="w-full p-4 bg-gray-100 rounded-lg focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              :disabled="!email || loading"
              class="w-full py-4 bg-green-inter text-white font-medium rounded-lg hover:bg-green-dark focus:outline-none transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Invio in corso...' : 'Reimposta password' }}
            </button>
          </form>
        </div>

        <div v-else-if="currentStep === 'verification'">
          <div class="mb-8">
            <h1 class="text-2xl font-bold mb-2">Check your email</h1>
            <p class="text-gray-500">
              Abbiamo inviato un codice di verifica a {{ email }}. Inserisci il
              codice a 6 cifre ricevuto nell'email.
            </p>
          </div>

          <form @submit.prevent="submitVerificationCode">
            <div class="mb-8">
              <input
                type="text"
                v-model="verificationCode"
                placeholder="Inserisci codice"
                class="w-full p-4 bg-gray-100 rounded-lg focus:outline-none"
                maxlength="6"
                pattern="[0-9]{6}"
                inputmode="numeric"
                required
              />
            </div>

            <button
              type="submit"
              :disabled="
                !verificationCode || loading || verificationCode.length !== 6
              "
              class="w-full py-4 bg-green-inter text-white font-medium rounded-lg hover:bg-green-dark focus:outline-none transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Verifica in corso...' : 'Verifica codice' }}
            </button>
          </form>
        </div>

        <div v-else-if="currentStep === 'changePassword'">
          <div class="mb-8">
            <h1 class="text-2xl font-bold mb-2">Reset Password</h1>
            <p class="text-gray-500">
              Inserisci la tua nuova password per completare il processo
            </p>
          </div>

          <form @submit.prevent="submitNewPassword">
            <div class="mb-4">
              <label class="block text-black font-medium mb-2"
                >New Password</label
              >
              <div class="relative">
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  v-model="newPassword"
                  placeholder="Inserisci nuova password"
                  class="w-full p-4 bg-gray-100 rounded-lg focus:outline-none pr-10"
                  required
                  minlength="8"
                />
                <div
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  @click="toggleNewPasswordVisibility"
                >
                  <NuxtImg
                    v-if="showNewPassword"
                    src="/svg/stars/occhioaperto.svg"
                    alt="Hide password"
                    class="w-[18px] h-[18px]"
                    width="18"
                    height="18"
                  />
                  <NuxtImg
                    v-else
                    src="/svg/stars/occhiobarrato.svg"
                    alt="Show password"
                    class="w-[18px] h-[18px]"
                    width="18"
                    height="18"
                  />
                </div>
              </div>
            </div>

            <div class="mb-8">
              <label class="block text-black font-medium mb-2"
                >Confirm New Password</label
              >
              <div class="relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  v-model="confirmPassword"
                  placeholder="Conferma nuova password"
                  class="w-full p-4 bg-gray-100 rounded-lg focus:outline-none pr-10"
                  required
                  minlength="8"
                />
                <div
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  @click="toggleConfirmPasswordVisibility"
                >
                  <NuxtImg
                    v-if="showConfirmPassword"
                    src="/svg/stars/occhioaperto.svg"
                    alt="Hide password"
                    class="w-[18px] h-[18px]"
                    width="18"
                    height="18"
                  />
                  <NuxtImg
                    v-else
                    src="/svg/stars/occhiobarrato.svg"
                    alt="Show password"
                    class="w-[18px] h-[18px]"
                    width="18"
                    height="18"
                  />
                </div>
              </div>
              <p v-if="passwordMismatch" class="text-red-500 text-sm mt-2">
                Le password non corrispondono
              </p>
            </div>

            <button
              type="submit"
              :disabled="
                !newPassword || !confirmPassword || loading || passwordMismatch
              "
              class="w-full py-4 bg-green-inter text-white font-medium rounded-lg hover:bg-green-dark focus:outline-none transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Salvataggio in corso...' : 'Salva nuova password' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps, defineEmits, computed} from 'vue';
import useAuthStore from '~/store/auth';

interface PasswordResetModalProps {
  isOpen: boolean;
}

const props = defineProps<PasswordResetModalProps>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const currentStep = ref<'email' | 'verification' | 'changePassword'>('email');
const email = ref('');
const verificationCode = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const showToast = useToast();
const $ticDriveAxios = useTicDriveAxios();
const authStore = useAuthStore();

// Password visibility toggles
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

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

const handleBackButton = () => {
  if (currentStep.value === 'verification') {
    currentStep.value = 'email';
  } else if (currentStep.value === 'changePassword') {
    currentStep.value = 'verification';
  } else {
    close();
  }
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
  showNewPassword.value = false;
  showConfirmPassword.value = false;
  loading.value = false;
};

const submitEmail = async () => {
  if (!email.value) return;
  loading.value = true;
  try {
    await $ticDriveAxios.post('/auth/forgot-password', {
      email: email.value,
    });
    currentStep.value = 'verification';
  } catch (error) {
    showToast('error', 'Riprova', "Errore durante l'invio della mail.");
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
  } catch (error) {
    showToast('error', 'Riprova', 'Il codice non è valido.');
  } finally {
    loading.value = false;
  }
};

const submitNewPassword = async () => {
  if (!newPassword.value || !confirmPassword.value) return;
  if (newPassword.value !== confirmPassword.value) return;

  loading.value = true;
  try {
    await $ticDriveAxios.post('/auth/reset-password', {
      email: email.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value,
    });
    await authStore.login(email.value, newPassword.value);
    showToast('success', 'Successo', 'Password aggiornata con successo.');
    close();
  } catch (error) {
    showToast('error', 'Riprova', 'Errore durante il reset della password.');
  } finally {
    loading.value = false;
  }
};
</script>
