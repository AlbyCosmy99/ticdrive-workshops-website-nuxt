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
          <div class="flex gap-2">
            <TicDrivebutton
              v-if="isEditing"
              label="Annulla"
              @click="cancelEdit"
              custom-class="text-sm font-bold rounded-lg pl-2.5 pr-2.5 pt-2.5 pb-2.5 w-[100px] bg-gray-500 hover:bg-gray-600"
            />
            <TicDrivebutton
              :label="
                isEditing ? (loading ? 'Salvando...' : 'Salva') : 'Modifica'
              "
              @click="onEditProfile"
              :disabled="loading"
              custom-class="text-sm font-bold rounded-lg pl-2.5 pr-2.5 pt-2.5 pb-2.5 w-[100px]"
            />
          </div>
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
          <div v-else class="flex flex-col w-[400px] gap-2">
            <TicDriveInput
              v-model="userData.address.streetAddress"
              placeholder="Via e Numero Civico"
              size="small"
            />
            <TicDriveInput
              v-model="userData.address.city"
              placeholder="Città"
              size="small"
            />
            <TicDriveInput
              v-model="userData.address.province"
              placeholder="Provincia"
              size="small"
            />
            <TicDriveInput
              v-model="userData.address.postalCode"
              placeholder="CAP"
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
import useAuthStore from '~/store/auth';
import TicDrivebutton from '@/components/ui/buttons/TicDrivebutton.vue';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput.vue';

const authStore = useAuthStore();
const isEditing = ref(false);
const loading = ref(false);

const userData = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  phoneNumber: authStore.user?.phoneNumber || '',
  address: {
    streetAddress: '',
    city: '',
    province: '',
    postalCode: ''
  }
});

// Parse the address string if available
if (authStore.user?.address) {
  try {
    // Expected format: "Via e numero, CAP Città, Provincia, Italy"
    const addressParts = authStore.user.address.split(',');
    userData.value.address.streetAddress = addressParts[0]?.trim() || '';
    
    // Extract postal code and city
    if (addressParts[1]) {
      const cityParts = addressParts[1].trim().split(' ');
      if (cityParts.length > 1) {
        userData.value.address.postalCode = cityParts[0] || '';
        userData.value.address.city = cityParts.slice(1).join(' ') || '';
      }
    }
    
    // Extract province
    if (addressParts[2]) {
      userData.value.address.province = addressParts[2].trim() || '';
    }
  } catch (error) {
    console.error('Error parsing address:', error);
  }
}

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

const cancelEdit = () => {
  // Reset form data to original values
  userData.value.name = authStore.user?.name || '';
  userData.value.email = authStore.user?.email || '';
  userData.value.phoneNumber = authStore.user?.phoneNumber || '';
  
  // Reset address fields
  if (authStore.user?.address) {
    try {
      const addressParts = authStore.user.address.split(',');
      userData.value.address.streetAddress = addressParts[0]?.trim() || '';
      
      if (addressParts[1]) {
        const cityParts = addressParts[1].trim().split(' ');
        if (cityParts.length > 1) {
          userData.value.address.postalCode = cityParts[0] || '';
          userData.value.address.city = cityParts.slice(1).join(' ') || '';
        }
      }
      
      if (addressParts[2]) {
        userData.value.address.province = addressParts[2].trim() || '';
      }
    } catch (error) {
      console.error('Error parsing address:', error);
    }
  } else {
    userData.value.address = {
      streetAddress: '',
      city: '',
      province: '',
      postalCode: ''
    };
  }
  
  // Exit editing mode
  isEditing.value = false;
};

const onEditProfile = () => {
  if(isEditing.value) {
    // Format address string like in registration
    const { streetAddress, postalCode, city, province } = userData.value.address;
    const formattedAddress = `${streetAddress}, ${postalCode} ${city}, ${province}, Italy`;
    
    // API call would go here
    // Use formatted address in the API payload
    console.log('Formatted address:', formattedAddress);
    
    // Here you would make the actual API call with all user data
    // Don't forget to include the formatted address
  }

  isEditing.value = !isEditing.value;
}
</script>
