<!-- pages/settings/index.vue -->
<script setup lang="ts">
import {ref} from 'vue';
import PasswordChangeModal from '~/components/ui/settings/PasswordChangeModal.vue';
import SettingsPage from '~/components/ui/settings/SettingPage.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

// Profile image path - you can get this from your user store or API
const profileImagePath = ref('/assets/images/profile/alex-rossi');

// State for password modal
const showPasswordModal = ref(false);

// Methods for password modal
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
  // Handle password change logic here
  console.log('Changing password:', passwordData);
  showPasswordModal.value = false;
  // API call would go here
};

// Other handlers
const handleModifyWorkshop = () => {
  console.log('Modify workshop details');
  // Navigate or open modal for workshop details
};

const handleLogout = () => {
  console.log('Logout');
  // Implement logout logic
};

const handleDeleteAccount = () => {
  console.log('Delete account');
  // Show confirmation dialog and handle account deletion
};
</script>

<template>
  <div>
    <SettingsPage
      :profile-image-path="profileImagePath"
      @change-password="openPasswordModal"
      @modify-workshop="handleModifyWorkshop"
      @logout="handleLogout"
      @delete-account="handleDeleteAccount"
    />
    <PasswordChangeModal
      :is-open="showPasswordModal"
      @close="closePasswordModal"
      @save="saveNewPassword"
    />
  </div>
</template>
