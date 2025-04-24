<template>
  <div class="bg-white">
    <!-- Profile Section -->
    <div class="bg-white mb-6">
      <div class="py-4 px-6">
        <h2 class="text-xl font-bold mb-4">Profilo Gestore Officina</h2>
        <div class="flex items-center gap-4 justify-between">
          <div class="flex items-center gap-4">
            <div class="rounded-full overflow-hidden h-16 w-16">
              <img
                :src="profileImageSrc"
                alt="Profile Image"
                class="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ profileName }}</h3>
              <p class="text-gray-500">{{ profileEmail }}</p>
            </div>
          </div>
          <TicDrivebutton label="Modifica" @click="modifyProfile" />
        </div>
      </div>
    </div>

    <!-- Settings Form -->
    <div class="bg-white">
      <div class="px-6">
        <h2 class="text-xl font-bold mb-6">Impostazioni</h2>

        <!-- Name Field -->
        <div class="mb-6 border-b pb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Nome Cognome</label
          >
          <div class="text-gray-800">Mario Rossi</div>
        </div>

        <!-- Email Field -->
        <div class="mb-6 border-b pb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <div class="text-gray-800">mariorossi@gmail.com</div>
        </div>

        <!-- Phone Field -->
        <div class="mb-6 border-b pb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Numero di telefono</label
          >
          <div class="text-gray-500">
            Aggiungi un numero di telefono per poterti contattare in caso di
            necesità
          </div>
        </div>

        <!-- Address Field -->
        <div class="mb-6 border-b pb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Indirizzo</label
          >
          <div class="text-gray-800">Via Mario Rossi, 12345, Padova PD</div>
        </div>

        <!-- Password Change -->
        <div class="mb-6 border-b pb-6">
          <button
            @click="changePassword"
            class="text-green-600 font-medium hover:text-green-700"
          >
            Cambio Password
          </button>
        </div>

        <!-- Modify Workshop Details -->
        <div class="mb-6 border-b pb-6">
          <button
            @click="modifyWorkshopDetails"
            class="text-green-600 font-medium hover:text-green-700"
          >
            Modifica dettagli Officina
          </button>
        </div>

        <!-- Logout -->
        <div class="mb-6 border-b pb-6">
          <button
            @click="logout"
            class="text-green-600 font-medium hover:text-green-700"
          >
            Logout
          </button>
        </div>

        <!-- Delete Account -->
        <div class="pb-6">
          <button
            @click="deleteAccount"
            class="text-red-500 font-medium hover:text-red-600"
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
import TicDrivebutton from '@/components/ui/buttons/TicDrivebutton.vue';

interface SettingsPageProps {
  profileImagePath?: string;
}

const props = withDefaults(defineProps<SettingsPageProps>(), {
  profileImagePath: 'public/images/Profile.png',
});

const router = useRouter();

const emit = defineEmits([
  'changePassword',
  'modifyWorkshop',
  'deleteAccount',
  'modifyProfile',
]);

// User profile data
const profileName = ref('Alex Rossi');
const profileEmail = ref('alexarossi@gmail.com');

// Compute profile image source with proper PNG handling
const profileImageSrc = ref('/images/Profile.png');

// Functions
const changePassword = () => {
  emit('changePassword');
};

const modifyWorkshopDetails = () => {
  emit('modifyWorkshop');
};

const logout = () => {
  localStorage.removeItem('token');
  router.replace('auth/login');
};

const deleteAccount = () => {
  emit('deleteAccount');
};

const modifyProfile = () => {
  emit('modifyProfile');
};
</script>
