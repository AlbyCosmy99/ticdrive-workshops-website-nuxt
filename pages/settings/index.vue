<script setup lang="ts">
import {ref} from 'vue';
import Settings from '~/components/settings/Settings.vue';
import ChangePasswordModal from '~/components/ui/modals/ChangePasswordModal.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

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
</script>

<template>
  <div>
    <Settings @change-password="openPasswordModal" />
    <ChangePasswordModal
      :is-open="showPasswordModal"
      @close="closePasswordModal"
      @save="saveNewPassword"
    />
  </div>
</template>
