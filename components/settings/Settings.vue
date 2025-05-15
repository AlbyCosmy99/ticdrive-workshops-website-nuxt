<template>
  <div class="bg-white">
    <div class="bg-white mb-6">
      <div class="py-4 px-6">
        <h2 class="text-2xl font-semibold mb-4">Profilo Gestore Officina</h2>
        <div class="flex items-center gap-4 justify-between">
          <div class="flex items-center gap-4">
            <div
              v-if="authStore.user?.images.length"
              class="rounded-full overflow-hidden h-[94px] w-[94px]"
            >
              <NuxtImg
                :src="authStore.user?.images[0].url"
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
            :label="
              isEditing ? (loading ? 'Salvando...' : 'Salva') : 'Modifica'
            "
            @click="toggleEdit"
            :disabled="loading"
            custom-class="text-sm font-bold rounded-lg pl-2.5 pr-2.5 pt-2.5 pb-2.5 w-[100px]"
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
          <div v-if="!isEditing" class="text-sm font-normal text-tic">
            {{ authStore.user?.name }}
          </div>
          <div v-else class="w-[400px]">
            <TicDriveInput
              v-model="userData.name"
              placeholder="Inserisci il tuo nome completo"
              size="small"
            />
          </div>
        </div>

        <div class="mb-6 border-b pb-6">
          <label class="block text-base font-normal text-gray-700 mb-1"
            >Email</label
          >
          <div v-if="!isEditing" class="text-sm font-normal text-tic">
            {{ authStore.user?.email }}
          </div>
          <div v-else class="w-[400px]">
            <TicDriveInput
              v-model="userData.email"
              placeholder="Inserisci la tua email"
              type="email"
              size="small"
            />
          </div>
        </div>

        <div class="mb-6 border-b pb-6">
          <label class="block text-base font-normal text-gray-700 mb-1"
            >Numero di telefono</label
          >
          <div v-if="!isEditing" class="text-sm font-normal text-tic">
            {{
              authStore.user?.phoneNumber ||
              'Numero di telefono non disponibile'
            }}
          </div>
          <div v-else class="w-[400px]">
            <TicDriveInput
              v-model="userData.phoneNumber"
              placeholder="Inserisci il tuo numero di telefono"
              type="tel"
              size="small"
            />
          </div>
        </div>

        <div class="mb-6 border-b pb-6">
          <label class="block text-base font-normal text-gray-700 mb-1"
            >Indirizzo</label
          >
          <div v-if="!isEditing" class="text-sm font-normal text-tic">
            {{ authStore.user?.address || 'Indirizzo non disponibile' }}
          </div>
          <div v-else class="w-[400px]">
            <TicDriveInput
              v-model="userData.address"
              placeholder="Inserisci il tuo indirizzo"
              size="small"
            />
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
            @click="authStore.logout()"
            class="text-red-500 text-base font-normal hover:text-red-700"
          >
            Logout
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
import TicDriveInput from '@/components/ui/inputs/TicDriveInput.vue';

interface SettingsPageProps {
  profileImagePath?: string;
}

const props = withDefaults(defineProps<SettingsPageProps>(), {
  profileImagePath: 'public/images/Profile.png',
});

const router = useRouter();
const authStore = useAuthStore();
const isEditing = ref(false);
const loading = ref(false);

// Initialize user data from auth store
const userData = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  phoneNumber: authStore.user?.phoneNumber || '',
  address: authStore.user?.address || '',
});

const emit = defineEmits([
  'changePassword',
  'modifyWorkshop',
  'deleteAccount',
  'modifyProfile',
  'updateProfile',
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

const toggleEdit = async () => {
  if (isEditing.value) {
    // Save changes
    try {
      loading.value = true;
      await emit('updateProfile', userData.value);
      isEditing.value = false;

      // Refresh the display data from the store after save
      userData.value = {
        name: authStore.user?.name || '',
        email: authStore.user?.email || '',
        phoneNumber: authStore.user?.phoneNumber || '',
        address: authStore.user?.address || '',
      };
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      loading.value = false;
    }
  } else {
    // Enter edit mode
    isEditing.value = true;
  }
};
</script>
