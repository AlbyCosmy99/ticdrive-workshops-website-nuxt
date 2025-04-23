<template>
  <div
    class="flex flex-col w-full mx-auto max-w-lg max-md:mt-10 lg:max-w-full justify-center"
  >
    <h1 class="text-gray-500 text-4xl font-semibold">Informazioni profilo</h1>
    <h1 class="text-gray-500 text-2xl font-semibold mt-10">
      Foto dell'Autofficina
    </h1>
    <h1 class="text-gray-500 text-lg font-semibold mt-3">
      Carica fino a 5 foto dell'autofficina per mostrarle ai clienti.
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5 mb-10">
      <div
        class="w-full relative bg-gray-200 aspect-[1/1] hover:bg-gray-300 active:bg-gray-200 rounded-xl"
        @click="openImage(-1)"
      >
        <div
          v-if="!images[4]"
          class="transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute"
        >
          <img src="/images/add_photo.jpg" class="w-5 h-5 mx-auto" />
          <h1 class="text-gray-500 text-md font-normal mt-2">Upload photo</h1>
          <input
            type="file"
            accept="image/*"
            ref="mainInputRefs"
            class="hidden"
            @change="handleImage($event, 4)"
          />
        </div>
        <div v-else class="relative w-full h-full">
          <img :src="images[4]" class="w-full h-full" />
          <img
            src="/images/image-delete.png"
            class="w-10 h-10 absolute top-2 right-2 cursor-pointer"
            @click.stop.prevent="removeImage(4)"
          />
        </div>
      </div>
      <div class="grid grid-cols sm:grid-cols-2 gap-2 rounded-xl">
        <div
          v-for="(value, index) in [...Array(4).keys()]"
          :key="index"
          class="w-full relative bg-gray-200 aspect-[1/1] hover:bg-gray-300 active:bg-gray-200 rounded-xl"
          @click="openImage(index)"
        >
          <div
            v-if="!images[index]"
            class="transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute"
          >
            <img src="/images/add_photo.jpg" class="w-5 h-5 mx-auto" />
            <h1 class="text-gray-500 text-md font-normal mt-2 text-center">
              Upload photo
            </h1>
            <input
              type="file"
              accept="image/*"
              :ref="el => setInputRef(el, index)"
              class="hidden"
              @change="handleImage($event, index)"
            />
          </div>
          <div v-else class="relative w-full h-full">
            <img :src="images[index]" class="w-full h-full" />
            <img
              src="/images/image-delete.png"
              class="w-6 h-6 absolute top-2 right-2 cursor-pointer"
              @click.stop.prevent="removeImage(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import useStepStore from '~/store/step';

const useStore = useStepStore();

const inputRefs = ref<(HTMLInputElement | null)[]>([]);
const mainInputRefs = ref<HTMLInputElement | null>();
const images = ref<(string | null)[]>(useStore.stepSixData.images);

const openImage = (index: number) => {
  console.log(inputRefs);
  if (inputRefs.value[index]) {
    inputRefs.value[index]!.click();
  } else if (index === -1) {
    mainInputRefs.value!.click();
  }
};
const handleImage = (event: Event, index: number) => {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput) {
    const file = fileInput.files![0];
    const prevImageUrl = URL.createObjectURL(file);
    images.value[index] = prevImageUrl;
    useStore.stepSixData.images[index] = prevImageUrl;
    console.log(file);
    console.log(images.value);
  }
};
const removeImage = (index: number) => {
  images.value[index] = null;
  useStore.stepSixData.images[index] = null;
};

const setInputRef = (el: HTMLInputElement | null, index: number) => {
  inputRefs.value[index] = el;
};
</script>
