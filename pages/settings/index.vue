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
const handleUpdateProfile = (userData: {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}) => {
  console.log('Updating user profile:', userData);
  // In a real application, this would call an API to update the user data
  // For now, we'll just show a success toast
  toast.success('Profilo aggiornato con successo!');
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
