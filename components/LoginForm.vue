<template>
  <div class="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
    <NuxtImg
      src="/images/ticDriveLogo.png"
      alt="Company logo"
      class="object-contain self-center max-w-full aspect-square w-[180px]"
      width="180"
      height="180"
    />

    <div
      class="flex flex-col self-center max-w-full font-medium whitespace-nowrap w-[370px]"
    >
      <h1
        class="self-center max-w-full text-4xl rounded-none text-zinc-600 text-tic"
      >
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
      <FormInput
        id="username"
        label="Username"
        placeholder="Inserisci username"
        v-model="username"
      />

      <div class="w-full max-w-lg lg:max-w-full">
        <div class="self-start mt-2.5 text-base text-black">
          <label for="password">Password</label>
        </div>

        <div
          class="flex gap-5 justify-between px-8 py-4 mt-3 max-w-full w-full text-base font-light bg-white rounded-3xl border border-solid border-neutral-400 border-opacity-60 text-neutral-400 w-[435px] max-md:px-5"
        >
          <input
            :type="passwordVisible ? 'text' : 'password'"
            id="password"
            placeholder="Inserisci password"
            v-model="password"
            class="bg-transparent outline-none w-full text-neutral-400"
          />
          <NuxtImg
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6985640710eeb41e49e1efa67ef16cb3f8b29c3408fb1e345a7504c0c37e74c5?placeholderIfAbsent=true&apiKey=60b2620725b44e1c95ff63fd7ebca566"
            alt="Toggle password visibility"
            class="object-contain shrink-0 my-auto aspect-square w-[18px] cursor-pointer"
            @click="togglePasswordVisibility"
            width="18"
            height="18"
          />
        </div>
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
            Password dimenticataaa?
          </button>
        </div>
      </div>
      <button
        type="submit"
        :disabled="!password || !username || loading"
        class="self-center px-16 py-3.5 mt-10 max-w-full text-base text-white whitespace-nowrap bg-drive bg-opacity-50 rounded-[36px] w-[232px] max-md:px-5 max-md:mt-10 hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-drive focus:ring-opacity-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
      >
        {{ loading ? 'Loading...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, onMounted} from 'vue';
import useStepStore from '~/store/step';
import FormInput from './FormInput.vue';
import CheckboxField from './CheckboxField.vue';
import useAuthStore from '~/store/auth';
import TicDriveAuthSlider from './ui/sliders/TicDriveAuthSlider.vue';

const useStore = useStepStore();
const username = ref('');
const password = ref('');
const rememberMe = ref(true);
const passwordVisible = ref(false);

// Computed property for password input type
const passwordInputType = computed(() =>
  passwordVisible.value ? 'text' : 'password',
);
const authStore = useAuthStore();
const loading = ref(false);

const handleSubmit = async () => {
  try {
    loading.value = true;
    await authStore.login(username.value, password.value);
    navigateTo({name: 'dashboard'});
  } catch (err) {
  } finally {
    loading.value = false;
  }
};

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const forgotPassword = () => {
  console.log('Forgot password clicked');
};

onMounted(() => {
  useStore.resetStore();
});
</script>
