<template>
  <div class="bg-white">
    <div class="bg-white mb-6">
      <div class="py-4 px-6">
        <h2 class="text-2xl font-semibold mb-4">Profilo Gestore Officina</h2>
        <div class="flex items-center gap-4 justify-between">
          <div class="flex items-center gap-4">
            <div class="rounded-full overflow-hidden h-[94px] w-[94px]">
              <NuxtImg
                :src="authStore.user?.profileImageUrl"
                alt="Profile Image"
                class="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ authStore.user?.name }}</h3>
              <p class="text-gray-500 font-poppins">
                {{ authStore.user?.email }}
              </p>
            </div>
          </div>
          <TicDrivebutton
            label="Modifica"
            @click="modifyProfile"
            custom-class="text-sm font-bold rounded-lg pl-2.5 pr-2.5 pt-2.5 pb-2.5"
          />
        </div>
      </div>
    </div>

    <div class="bg-white">
      <div class="px-6">
        <h2 class="text-xl font-semibold mb-6">Impostazioni</h2>

        <div class="mb-6 border-b pb-6">
          <label class="block text-base font-normal text-gray-700 mb-1"
            >Nome Cognome</label
          >
          <div class="text-sm font-normal text-tic">
            {{ authStore.user?.name }}
          </div>
        </div>

        <div class="mb-6 border-b pb-6">
          <label class="block text-base font-normal text-gray-700 mb-1"
            >Email</label
          >
          <div class="text-sm font-normal text-tic">
            {{ authStore.user?.email }}
          </div>
        </div>

        <div class="mb-6 border-b pb-6">
          <label class="block text-base font-normal text-gray-700 mb-1"
            >Numero di telefono</label
          >
          <div class="text-sm font-normal text-tic">
            {{
              authStore.user?.phoneNumber ||
              'Numero di telefono non disponibile'
            }}
          </div>
        </div>

        <div class="mb-6 border-b pb-6">
          <label class="block text-base font-normal text-gray-700 mb-1"
            >Indirizzo</label
          >
          <div class="text-sm font-normal text-tic">
            {{ authStore.user?.address || 'Indirizzo non disponibile' }}
          </div>
        </div>

        <div class="mb-6 border-b pb-6">
          <button
            @click="changePassword"
            class="text-drive text-base font-normal hover:text-green-700"
          >
            Cambio Password
          </button>
        </div>

        <div class="mb-6 border-b pb-6">
          <button
            @click="modifyWorkshopDetails"
            class="text-drive text-base font-normal hover:text-green-700"
          >
            Modifica dettagli Officina
          </button>
        </div>

        <div class="mb-6 border-b pb-6">
          <button
            @click="authStore.logout()"
            class="text-drive text-base font-normal hover:text-green-700"
          >
            Logout
          </button>
        </div>

        <div class="pb-6">
          <button
            @click="deleteAccount"
            class="text-[16] text-red-500 font-poppins hover:text-red-600"
          >
            Elimina account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import useAuthStore from '~/store/auth';
import TicDrivebutton from '@/components/ui/buttons/TicDrivebutton.vue';

interface SettingsPageProps {
  profileImagePath?: string;
}

const props = withDefaults(defineProps<SettingsPageProps>(), {
  profileImagePath: 'public/images/Profile.png',
});

const router = useRouter();
const authStore = useAuthStore();

const emit = defineEmits([
  'changePassword',
  'modifyWorkshop',
  'deleteAccount',
  'modifyProfile',
]);

const changePassword = () => {
  emit('changePassword');
};

const modifyWorkshopDetails = () => {
  emit('modifyWorkshop');
};

const deleteAccount = () => {
  emit('deleteAccount');
};

const modifyProfile = () => {
  emit('modifyProfile');
};
</script>
