<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import Settings from '~/components/settings/Settings.vue';
import ChangePasswordModal from '~/components/ui/modals/ChangePasswordModal.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

const router = useRouter();
const showPasswordModal = ref(false);

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
  router.push('/settings/deleteaccount');
};
</script>

<template>
  <div>
    <Settings
      @change-password="openPasswordModal"
      @modify-workshop="handleModifyWorkshop"
      @logout="handleLogout"
      @delete-account="handleDeleteAccount"
    />
    <ChangePasswordModal
      :is-open="showPasswordModal"
      @close="closePasswordModal"
      @save="saveNewPassword"
    />
  </div>
</template>
