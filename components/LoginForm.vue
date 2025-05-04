<template>
  <div
    class="flex flex-col w-full justify-center items-center max-md:max-w-full"
  >
    <NuxtImg
      src="/svg/TicDriveLogo.svg"
      alt="TicDrive logo"
      width="130"
      height="130"
    />
    <div
      class="mt-8 flex flex-col self-center max-w-full font-medium whitespace-nowrap w-[370px]"
    >
      <h1 class="mb-4 self-center max-w-full text-4xl rounded-none text-tic">
        Benvenuto!
      </h1>

      <div
        class="flex gap-2.5 justify-center items-center mt-8 w-full text-base leading-tight text-center rounded-[30px] max-md:mt-10"
      >
        <TicDriveAuthSlider />
      </div>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col w-[90%] px-14 items-center m-auto max-w-lg lg:max-w-full"
    >
      <TicDriveInput
        id="companyEmail"
        label="Email Aziendale"
        placeholder="Inserisci la Email Aziendale"
        v-model="companyEmail"
      />

      <TicDriveInput
        id="password"
        label="Password"
        type="password"
        placeholder="Inserisci password"
        v-model="password"
      />

      <div class="w-full max-w-lg lg:max-w-full">
        <div
          class="flex justify-between gap-10 mt-4 w-full max-md:mt-10 max-md:max-w-full"
        >
          <CheckboxField
            id="remember-me"
            v-model="rememberMe"
            label="Remember me"
          />
          <button
            type="button"
            class="cursor-pointer self-start text-xs font-light text-black hover:underline focus:outline-none focus:underline"
            @click="forgotPassword"
          >
            Password dimenticata?
          </button>
        </div>
      </div>
      <button
        type="submit"
        :disabled="!password || !companyEmail || loading"
        class="self-center px-16 py-3.5 mt-10 max-w-full text-base text-white whitespace-nowrap bg-drive rounded-[36px] w-[232px] max-md:px-5 max-md:mt-10 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-drive focus:ring-opacity-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
      >
        {{ loading ? 'Caricando...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import useStepStore from '~/store/step';
import CheckboxField from './CheckboxField.vue';
import useAuthStore from '~/store/auth';
import TicDriveAuthSlider from './ui/sliders/TicDriveAuthSlider.vue';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput.vue';

const useStore = useStepStore();
const companyEmail = ref('');
const password = ref('');
const rememberMe = ref(true);
const showToast = useToast();

const authStore = useAuthStore();
const loading = ref(false);

const handleSubmit = async () => {
  try {
    loading.value = true;
    await authStore.login(companyEmail.value, password.value);
    navigateTo({name: 'dashboard'});
  } catch (err: any) {
    showToast(
      'error',
      'Wrong credentials',
      err?.response?.data || 'Wrong credentials. Try again.',
      5000,
    );
  } finally {
    loading.value = false;
  }
};

const forgotPassword = () => {
  console.log('Forgot password clicked');
};

onMounted(() => {
  useStore.resetStore();
});
</script>
