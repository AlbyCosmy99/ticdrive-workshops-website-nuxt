<template>
  <div class="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
    <img
      src="/images/ticDriveLogo.png"
      alt="Company logo"
      class="object-contain self-center max-w-full aspect-square w-[180px]"
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
        <ToggleButton />
      </div>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col w-full px-14 items-center m-auto max-w-lg lg:max-w-full"
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
            type="password"
            id="password"
            placeholder="Inserisci password"
            v-model="password"
            class="bg-transparent outline-none w-full text-neutral-400"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6985640710eeb41e49e1efa67ef16cb3f8b29c3408fb1e345a7504c0c37e74c5?placeholderIfAbsent=true&apiKey=60b2620725b44e1c95ff63fd7ebca566"
            alt="Toggle password visibility"
            class="object-contain shrink-0 my-auto aspect-square w-[18px] cursor-pointer"
            @click="togglePasswordVisibility"
          />
        </div>

        <div class="flex gap-10 mt-4 w-full max-md:mt-10 max-md:max-w-full">
          <div class="flex flex-1 gap-3">
            <CheckboxField
              id="remember-me"
              v-model="rememberMe"
              label="Remember me"
            />
          </div>
          <button
            type="button"
            class="self-start text-xs font-light text-black hover:underline focus:outline-none focus:underline"
            @click="forgotPassword"
          >
            Password dimenticata?
          </button>
        </div>
      </div>

      <button
        type="submit"
        :disabled="!password || !username"
        class="self-center px-16 py-3.5 mt-4 max-w-full text-base text-white whitespace-nowrap bg-green-500 bg-opacity-50 rounded-[36px] w-[232px] max-md:px-5 max-md:mt-10 hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ToggleButton from "./ToggleButton.vue";
import FormInput from "./FormInput.vue";
import CheckboxField from "./CheckboxField.vue";

export default defineComponent({
  name: "LoginForm",
  components: {
    ToggleButton,
    FormInput,
    CheckboxField,
  },
  setup() {
    const username = ref("");
    const password = ref("");
    const rememberMe = ref(true);
    const passwordVisible = ref(false);

const handleSubmit = () => {
  console.log('Login submitted', {
    username: username.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });
};

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

    const forgotPassword = () => {
      console.log("Forgot password clicked");
      // Handle forgot password logic here
    };

    return {
      username,
      password,
      rememberMe,
      passwordVisible,
      handleSubmit,
      togglePasswordVisibility,
      forgotPassword,
    };
  },
});
</script>
