<template>
  <div
    class="flex gap-1.5 justify-center items-center self-stretch py-1.5 pr-2 pl-2 my-auto bg-neutral-100 min-h-[60px] min-w-60 rounded-[30px] w-[370px]"
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
          ? 'text-white bg-green-500'
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
  'cursor-pointer gap-2.5 self-stretch px-4 py-4 my-auto text-center min-h-[50px] rounded-[30px] w-[175px] focus:outline-none focus:ring-0 transition-colors duration-200';

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
