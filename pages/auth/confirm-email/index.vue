<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div
      v-if="loading"
      class="flex justify-center items-center overflow-auto h-80"
    >
      <UiSpinnersTicDriveSpinner />
    </div>
    <div
      v-else
      class="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center"
    >
      <h1 class="text-2xl font-semibold mb-4 text-gray-800">
        Conferma la tua email
      </h1>
      <p class="text-gray-600 mb-6">
        Abbiamo inviato una mail di conferma. Clicca sul link nella tua casella
        di posta.
      </p>

      <div class="space-y-4">
        <button
          class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
          @click="checkEmailConfirmation"
        >
          Ho confermato l'email
        </button>

        <button
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition"
          @click="resendEmail"
        >
          Invia di nuovo la mail di conferma
        </button>
        <button
          class="w-full bg-red-200 hover:bg-red-300 text-red-800 font-semibold py-2 px-4 rounded transition"
          @click="authStore.logout()"
        >
          Logout
        </button>
      </div>

      <p v-if="message" class="mt-6 text-sm text-center text-gray-700">
        {{ message }}
      </p>
    </div>
  </div>
  <Toast />
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import useAuthStore from '~/store/auth';

const message = ref('');
const $ticDriveAxios = useTicDriveAxios();
const router = useRouter();
const showToast = useToast();
const authStore = useAuthStore();
const loading = ref(false);

const checkEmailConfirmation = async () => {
  try {
    loading.value = true;
    await $ticDriveAxios.get(
      '/auth/check-email-is-confirmed?email=' + authStore.user?.email,
    );
    router.push('/dashboard');
  } catch (err) {
    showToast(
      'warn',
      "L'email non è ancora stata confermata.",
      'Invia di nuovo la mail di conferma premendo sul pulsante rispettivo.',
    );
  } finally {
    loading.value = false;
  }
};

const resendEmail = async () => {
  try {
    loading.value = true;
    await $ticDriveAxios.post(
      '/auth/send-confirmation-email?email=' + authStore.user?.email,
    );
    showToast(
      'info',
      'Controlla la tua mail.',
      'Una nuova email di conferma è stata inviata.',
    );
  } catch (err) {
    showToast('error', 'Riprova', "Errore durante l'invio. Riprova.");
  } finally {
    loading.value = false;
  }
};
</script>
