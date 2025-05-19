<template>
  <div v-if="loading" class="flex justify-center items-center h-80">
    <UiSpinnersTicDriveSpinner v-if="true" text="Salvando..." />
  </div>
  <div v-else class="bg-white">
    <div class="bg-white mb-6">
      <div class="py-4 px-6">
        <h2 class="text-2xl font-semibold mb-4">Profilo Gestore Officina</h2>
        <div class="flex items-center gap-4 justify-between">
          <div class="flex items-center gap-4">
            <div
              v-if="authStore.user?.images?.length"
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
              :label="
                isEditing ? (loading ? 'Salvando...' : 'Salva') : 'Modifica'
              "
              @click="onEditProfile"
              :disabled="loading"
              custom-class="text-sm font-bold rounded-lg pl-2.5 pr-2.5 pt-2.5 pb-2.5 w-[100px]"
            />
            <TicDrivebutton
              v-if="isEditing"
              label="Annulla"
              @click="cancelEdit"
              custom-class="text-sm font-bold rounded-lg pl-2.5 pr-2.5 pt-2.5 pb-2.5 w-[100px] bg-red-500 hover:bg-red-600 text-white"
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
            >Email</label
          >
          <div class="text-sm font-normal text-tic">
            {{ userData.email }}
          </div>
        </div>
        <div class="mb-6 border-b pb-6">
          <label class="block text-base font-normal text-gray-700 mb-1"
            >Nome</label
          >
          <div v-if="!isEditing" class="text-sm font-normal text-tic">
            {{ userData.name }}
          </div>
          <div v-else class="w-[400px]">
            <TicDriveInput
              v-model="editData.name"
              placeholder="Inserisci il tuo nome completo"
              size="small"
            />
          </div>
        </div>

        <div class="mb-6 border-b pb-6">
          <label class="block text-base font-normal text-gray-700 mb-1"
            >Numero di telefono</label
          >
          <div v-if="!isEditing" class="text-sm font-normal text-tic">
            {{ userData.phoneNumber || 'Numero di telefono non disponibile' }}
          </div>
          <div v-else class="w-[400px]">
            <TicDriveInput
              v-model="editData.phoneNumber"
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
            {{
              `${userData.address?.streetAddress}, ${userData.address?.city}, ${userData.address?.province}, ${userData.address?.postalCode}` ||
              'Indirizzo non disponibile'
            }}
          </div>
          <div v-else class="flex flex-col w-[400px] gap-2">
            <TicDriveInput
              v-model="editData.address.streetAddress"
              placeholder="Via e Numero Civico"
              size="small"
            />
            <TicDriveInput
              v-model="editData.address.city"
              placeholder="Città"
              size="small"
            />
            <TicDriveInput
              v-model="editData.address.province"
              placeholder="Provincia"
              size="small"
            />
            <TicDriveInput
              v-model="editData.address.postalCode"
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
import type {User} from '~/types/auth/User';
import type {Address} from '~/types/localization/Address';

const authStore = useAuthStore();
const isEditing = ref(false);
const loading = ref(false);

const defaultAddress: Address = {
  streetAddress: '',
  city: '',
  province: '',
  postalCode: '',
};

type EditableUser = Omit<User, 'address'> & {address: Address};

const userData = ref<EditableUser>({
  id: authStore.user?.id || '',
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  phoneNumber: authStore.user?.phoneNumber || '',
  address: {...defaultAddress},
});

const editData = ref<EditableUser>({
  ...userData.value,
  address: {...userData.value.address},
});

if (
  typeof authStore.user?.address === 'string' &&
  typeof userData.value.address === 'object'
) {
  try {
    const addressParts = authStore.user.address.split(',');

    const streetAddress = addressParts[0]?.trim() || '';
    const city = addressParts[1]?.trim() || '';
    const province = addressParts[2]?.trim() || '';
    const postalCode = addressParts[3]?.trim().split(' ')[0] || '';

    const parsed: Address = {streetAddress, city, province, postalCode};

    userData.value.address = {...parsed};
    editData.value.address = {...parsed};
  } catch (error) {
    console.error('Error parsing address:', error);
  }
}

const emit = defineEmits(['changePassword']);

const changePassword = () => {
  emit('changePassword');
};

const modifyProfile = async (formattedAddress: string) => {
  await authStore.updateUser(
    editData.value.name,
    editData.value.email,
    editData.value.phoneNumber,
    formattedAddress,
  );
};

const cancelEdit = () => {
  isEditing.value = false;
};

const onEditProfile = () => {
  if (isEditing.value) {
    const {streetAddress, postalCode, city, province} = editData.value
      .address as Address;
    const formattedAddress = `${streetAddress}, ${city}, ${province}, ${postalCode} Italia`;

    console.log('Formatted address:', formattedAddress);

    userData.value = {
      ...editData.value,
      address: {...editData.value.address},
    };

    modifyProfile(formattedAddress);
  } else {
    editData.value = {
      ...userData.value,
      address: {...userData.value.address},
    };
  }

  isEditing.value = !isEditing.value;
};
</script>
