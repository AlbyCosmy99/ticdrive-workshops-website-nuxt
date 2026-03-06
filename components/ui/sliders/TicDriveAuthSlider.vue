<template>
  <div
    class="my-auto flex min-h-[60px] w-full max-w-[370px] min-w-0 items-center justify-center gap-1.5 rounded-[30px] bg-neutral-100 px-2 py-1.5"
    role="tablist"
    aria-label="Login options"
  >
    <button
      role="tab"
      :aria-selected="activeTab === 'login'"
      id="login-tab"
      aria-controls="login-panel"
      @click="setActiveTab('login')"
      :class="[
        baseButtonClasses,
        activeTab === 'login'
          ? 'text-white bg-drive'
          : 'text-black bg-neutral-100',
      ]"
    >
      Login
    </button>
    <button
      role="tab"
      :aria-selected="activeTab === 'register'"
      id="register-tab"
      aria-controls="register-panel"
      @click="handleRegisterClick"
      :class="[
        baseButtonClasses,
        activeTab === 'register'
          ? 'text-white bg-drive'
          : 'text-black bg-neutral-100',
      ]"
    >
      Registrati
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref, defineEmits} from 'vue';
import useStepStore from '~/store/step';

const stepStore = useStepStore();
const emit = defineEmits(['update:tab']);
const activeTab = ref('login');

const baseButtonClasses =
  'my-auto min-h-[50px] flex-1 cursor-pointer rounded-[30px] px-4 py-4 text-center transition-colors duration-200 focus:outline-none focus:ring-0';

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
  emit('update:tab', tab);
  navigateTo(tab === 'login' ? '/auth/login' : '/auth/register');
};

const handleRegisterClick = () => {
  stepStore.currentStep++;
  setActiveTab('register');
};
</script>
