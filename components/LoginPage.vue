<template>
  <div class="overflow-hidden pb-40 bg-white max-md:pb-24">
    <div
      class="flex flex-wrap items-end w-full bg-zinc-200 max-md:max-w-full"
    ></div>
    <NavigationBar />
    <main
      class="mt-12 ml-10 w-full max-w-[1306px] max-md:mt-10 max-md:max-w-full"
    >
      <div class="flex gap-5 max-md:flex-col">
        <section class="w-[61%] max-md:ml-0 max-md:w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/086874ed-e177-4255-901c-1500a6152874?placeholderIfAbsent=true&apiKey=60b2620725b44e1c95ff63fd7ebca566"
            alt="Login page illustration"
            class="object-contain grow mt-9 w-full aspect-[1.03] rounded-[30px] max-md:mt-10 max-md:max-w-full"
          />
        </section>
        <section class="ml-5 w-[39%] max-md:ml-0 max-md:w-full">
          <LoginForm />
        </section>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import NavigationBar from './NavigationBar.vue';
import LoginForm from './LoginForm.vue';
</script>
