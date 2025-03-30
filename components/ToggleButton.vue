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
      class="gap-2.5 self-stretch px-4 py-4 my-auto text-center min-h-[50px] rounded-[30px] shadow-[0px_4px_10px_rgba(0,0,0,0.08)] w-[175px] focus:outline-none focus:ring-2 focus:ring-green-500"
      :class="
        activeTab === 'login'
          ? 'text-white bg-green-500'
          : 'text-black bg-neutral-100'
      "
      @click="setActiveTab('login')"
    >
      Login
    </button>
    <button
      role="tab"
      :aria-selected="activeTab === 'register'"
      id="register-tab"
      aria-controls="register-panel"
      class="gap-2.5 self-stretch px-4 py-4 my-auto text-center min-h-[50px] rounded-[30px] w-[175px] focus:outline-none focus:ring-2 focus:ring-green-500"
      :class="
        activeTab === 'register'
          ? 'text-white bg-green-500'
          : 'text-black bg-neutral-100'
      "
      @click="setActiveTab('register')"
    >
      Registrati
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ToggleButton",
  emits: ["update:tab"],
  setup(_, { emit }) {
    const activeTab = ref("login");

    const setActiveTab = (tab: string) => {
      activeTab.value = tab;
      emit("update:tab", tab);
      navigateTo(tab === 'login' ? '/auth/login' : '/auth/register');
    };

    return {
      activeTab,
      setActiveTab,
    };
  },
});
</script>
