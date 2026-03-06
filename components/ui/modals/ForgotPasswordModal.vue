<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    aria-modal="true"
    role="dialog"
  >
    <div
      class="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
      @click="close"
    ></div>

    <div
      class="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl"
    >
      <div class="flex items-center border-b border-gray-100 p-5 sm:p-6">
        <button
          type="button"
          class="rounded-full p-1 transition hover:bg-gray-100"
          @click="handleBackButton"
        >
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

        <button
          type="button"
          class="rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label="Chiudi"
          @click="close"
        >
          <svg
            class="h-5 w-5"
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

      <div class="max-h-[min(75vh,40rem)] overflow-y-auto p-5 sm:p-6">
        <div v-if="currentStep === 'email'">
          <div class="mb-8">
            <h1 class="mb-2 text-2xl font-bold">Password dimenticata?</h1>
            <p class="text-gray-500">
              Inserisci la tua email per ricevere il codice di reimpostazione.
            </p>
          </div>

          <form @submit.prevent="submitEmail">
            <div class="mb-8">
              <label class="mb-2 block font-medium text-black">
                La tua email
              </label>
              <input
                v-model="email"
                type="email"
                placeholder="Inserisci la tua email"
                class="w-full rounded-lg border border-gray-200 bg-gray-50 p-4 focus:border-drive focus:outline-none focus:ring-2 focus:ring-green-100"
                required
              />
            </div>

            <button
              type="submit"
              :disabled="!email || loading"
              class="w-full rounded-lg bg-green-inter py-4 font-medium text-white transition duration-200 hover:bg-green-dark focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {{ loading ? 'Invio in corso...' : 'Invia codice' }}
            </button>
          </form>
        </div>

        <div v-else-if="currentStep === 'verification'">
          <div class="mb-8">
            <h1 class="mb-2 text-2xl font-bold">Controlla la tua email</h1>
            <p class="text-gray-500">
              Abbiamo inviato un codice di verifica a {{ email }}. Inserisci il
              codice a 6 cifre ricevuto via email.
            </p>
          </div>

          <form @submit.prevent="submitVerificationCode">
            <div class="mb-8">
              <label class="mb-2 block font-medium text-black">
                Codice di verifica
              </label>
              <input
                v-model="verificationCode"
                type="text"
                placeholder="Inserisci il codice"
                class="w-full rounded-lg border border-gray-200 bg-gray-50 p-4 tracking-[0.35em] focus:border-drive focus:outline-none focus:ring-2 focus:ring-green-100"
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
              class="w-full rounded-lg bg-green-inter py-4 font-medium text-white transition duration-200 hover:bg-green-dark focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {{ loading ? 'Verifica in corso...' : 'Verifica codice' }}
            </button>
          </form>
        </div>

        <div v-else>
          <div class="mb-8">
            <h1 class="mb-2 text-2xl font-bold">Imposta una nuova password</h1>
            <p class="text-gray-500">
              Scegli una nuova password per il tuo account.
            </p>
          </div>

          <form @submit.prevent="submitNewPassword">
            <div class="mb-4">
              <label class="mb-2 block font-medium text-black">
                Nuova password
              </label>
              <div class="relative">
                <input
                  v-model="newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  placeholder="Inserisci la nuova password"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 p-4 pr-12 focus:border-drive focus:outline-none focus:ring-2 focus:ring-green-100"
                  required
                />
                <PasswordEyeToggle
                  :show-password="showNewPassword"
                  @toggle="showNewPassword = !showNewPassword"
                />
              </div>
            </div>

            <div class="mb-8">
              <label class="mb-2 block font-medium text-black">
                Conferma password
              </label>
              <div class="relative">
                <input
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Conferma la nuova password"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 p-4 pr-12 focus:border-drive focus:outline-none focus:ring-2 focus:ring-green-100"
                  required
                />
                <PasswordEyeToggle
                  :show-password="showConfirmPassword"
                  @toggle="showConfirmPassword = !showConfirmPassword"
                />
              </div>
              <p v-if="passwordMismatch" class="mt-2 text-sm text-red-500">
                Le password non coincidono.
              </p>
            </div>

            <button
              type="submit"
              :disabled="isResetDisabled"
              class="w-full rounded-lg bg-green-inter py-4 font-medium text-white transition duration-200 hover:bg-green-dark focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {{ loading ? 'Aggiornamento in corso...' : 'Salva nuova password' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {AxiosError} from 'axios';
import PasswordEyeToggle from '../toggles/PasswordEyeToggle.vue';

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
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const showToast = useToast();
const $ticDriveAxios = useTicDriveAxios();
const forgotPasswordRequestConfig = {
  timeout: 12000,
};

const passwordMismatch = computed(() => {
  return (
    !!newPassword.value &&
    !!confirmPassword.value &&
    newPassword.value !== confirmPassword.value
  );
});

const isResetDisabled = computed(() => {
  return (
    loading.value ||
    !newPassword.value ||
    !confirmPassword.value ||
    passwordMismatch.value
  );
});

const getForgotPasswordErrorMessage = (
  error: AxiosError<{message?: string}> | any,
  fallback: string,
) => {
  const responseMessage =
    typeof error?.response?.data === 'string'
      ? error.response.data
      : error?.response?.data?.message;

  if (error?.code === 'ECONNABORTED') {
    return 'Il server sta impiegando troppo tempo a rispondere. Riprova tra poco.';
  }

  if (error?.response?.status === 503) {
    return (
      responseMessage ||
      "Il servizio email non è disponibile al momento. Riprova tra poco."
    );
  }

  if (!error?.response) {
    return 'Impossibile contattare il server in questo momento.';
  }

  return responseMessage || fallback;
};

const handleBackButton = () => {
  if (currentStep.value === 'verification') {
    currentStep.value = 'email';
    return;
  }

  if (currentStep.value === 'changePassword') {
    currentStep.value = 'verification';
    return;
  }

  close();
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

const syncBodyScroll = (isOpen: boolean) => {
  if (!import.meta.client) {
    return;
  }

  document.body.style.overflow = isOpen ? 'hidden' : '';
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    close();
  }
};

watch(
  () => props.isOpen,
  isOpen => {
    syncBodyScroll(isOpen);
    if (!isOpen) {
      resetForm();
    }
  },
  {immediate: true},
);

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('keydown', handleEscape);
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', handleEscape);
    document.body.style.overflow = '';
  }
});

const submitEmail = async () => {
  if (!email.value) {
    return;
  }

  loading.value = true;
  try {
    await $ticDriveAxios.post('/auth/forgot-password', {
      email: email.value,
    }, forgotPasswordRequestConfig);
    currentStep.value = 'verification';
  } catch (error) {
    showToast(
      'error',
      'Riprova',
      getForgotPasswordErrorMessage(
        error,
        "Errore durante l'invio della mail.",
      ),
    );
  } finally {
    loading.value = false;
  }
};

const submitVerificationCode = async () => {
  if (!verificationCode.value || verificationCode.value.length !== 6) {
    return;
  }

  loading.value = true;
  try {
    await $ticDriveAxios.post('/auth/send-code-password-forgot', {
      email: email.value,
      code: verificationCode.value,
    }, forgotPasswordRequestConfig);

    currentStep.value = 'changePassword';
  } catch (error) {
    showToast(
      'error',
      'Riprova',
      getForgotPasswordErrorMessage(error, 'Il codice non è valido.'),
    );
  } finally {
    loading.value = false;
  }
};

const submitNewPassword = async () => {
  if (isResetDisabled.value) {
    return;
  }

  loading.value = true;
  try {
    await $ticDriveAxios.post('/auth/reset-password', {
      email: email.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value,
    }, forgotPasswordRequestConfig);
    showToast(
      'success',
      'Password aggiornata',
      'La password è stata reimpostata correttamente.',
    );
    close();
  } catch (error: any) {
    showToast(
      'error',
      'Riprova',
      getForgotPasswordErrorMessage(
        error,
        'Non è stato possibile aggiornare la password.',
      ),
    );
  } finally {
    loading.value = false;
  }
};
</script>
