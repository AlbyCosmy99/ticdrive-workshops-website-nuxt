<script setup lang="ts">
import {ref} from 'vue';
import Settings from '~/components/settings/Settings.vue';
import ChangePasswordModal from '~/components/ui/modals/ChangePasswordModal.vue';
import useToast from '~/composables/useToast';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

const showPasswordModal = ref(false);
const toast = useToast();

const openPasswordModal = () => {
  showPasswordModal.value = true;
};

const closePasswordModal = () => {
  showPasswordModal.value = false;
};

const saveNewPassword = (passwordData: {
  currentPassword: string;
  newPassword: string;
}) => {
  console.log('Changing password:', passwordData);
  showPasswordModal.value = false;
};

const handleModifyWorkshop = () => {
  console.log('Modify workshop details');
};

const handleLogout = () => {
  console.log('Logout');
};

const handleDeleteAccount = () => {
  console.log('Delete account');
};

// Handler for profile update
const handleUpdateProfile = async (userData: {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}) => {
  console.log('Updating user profile:', userData);

  try {
    // Show loading state
    toast.info('Aggiornamento in corso...');

    // Call the store method to update the profile
    await authStore.updateProfile(userData);

    // Show success message
    toast.success('Profilo aggiornato con successo!');
  } catch (error) {
    console.error('Error updating profile:', error);
    toast.error("Errore durante l'aggiornamento del profilo.");
  }
};
</script>

<template>
  <div>
    <Settings
      @change-password="openPasswordModal"
      @modify-workshop="handleModifyWorkshop"
      @logout="handleLogout"
      @delete-account="handleDeleteAccount"
      @update-profile="handleUpdateProfile"
    />
    <ChangePasswordModal
      :is-open="showPasswordModal"
      @close="closePasswordModal"
      @save="saveNewPassword"
    />
  </div>
</template>
