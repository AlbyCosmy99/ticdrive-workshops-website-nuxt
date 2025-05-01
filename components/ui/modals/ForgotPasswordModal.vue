<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">

        <div class="absolute inset-0 bg-black bg-opacity-30" @click="close"></div>


        <div class="relative bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">

            <div class="flex items-center p-6 border-b border-gray-100">
                <button @click="handleBackButton" class="p-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M12 19L5 12L12 5" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>


                <div class="flex-grow text-center">
                    <div class="inline-block">
                        <span class="text-3xl font-bold text-gray-600">Tic</span>
                        <span class="text-3xl font-bold text-green-500">Drive</span>
                    </div>
                </div>
            </div>


            <div class="p-6">

                <div v-if="currentStep === 'email'">

                    <div class="mb-8">
                        <h1 class="text-2xl font-bold mb-2">Password dimenticata?</h1>
                        <p class="text-gray-500">
                            Inserisci la tua email per reimpostare la password
                        </p>
                    </div>


                    <form @submit.prevent="submitEmail">
                        <div class="mb-8">
                            <label class="block text-black font-medium mb-2">Your email</label>
                            <input type="email" v-model="email" placeholder="Insert your email"
                                class="w-full p-4 bg-gray-100 rounded-lg focus:outline-none" required />
                        </div>

                        <button type="submit" :disabled="!email || isLoading"
                            class="w-full py-4 bg-green-inter text-white font-medium rounded-lg hover:bg-green-dark focus:outline-none transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed">
                            {{ isLoading ? 'Invio in corso...' : 'Reimposta password' }}
                        </button>
                    </form>
                </div>


                <div v-else-if="currentStep === 'verification'">

                    <div class="mb-8">
                        <h1 class="text-2xl font-bold mb-2">Check your email</h1>
                        <p class="text-gray-500">
                            Abbiamo inviato un codice di verifica a {{ email }}. Inserisci il codice a 6 cifre ricevuto
                            nell'email.
                        </p>
                    </div>


                    <form @submit.prevent="submitVerificationCode">
                        <div class="mb-8">
                            <input type="text" v-model="verificationCode" placeholder="Inserisci codice"
                                class="w-full p-4 bg-gray-100 rounded-lg focus:outline-none" maxlength="6"
                                pattern="[0-9]{6}" inputmode="numeric" required />
                        </div>

                        <button type="submit"
                            :disabled="!verificationCode || isLoading || verificationCode.length !== 6"
                            class="w-full py-4 bg-green-inter text-white font-medium rounded-lg hover:bg-green-dark focus:outline-none transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed">
                            {{ isLoading ? 'Verifica in corso...' : 'Verifica codice' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

interface PasswordResetModalProps {
    isOpen: boolean;
}

const props = defineProps<PasswordResetModalProps>();

// Define emits with types
const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'submit', data: { email: string }): void;
    (e: 'verification-success', data: { email: string, code: string }): void;
}>();

// Form data
const currentStep = ref<'email' | 'verification'>('email');
const email = ref('');
const verificationCode = ref('');
const isLoading = ref(false);

// Methods
const handleBackButton = () => {
    if (currentStep.value === 'verification') {
        currentStep.value = 'email';
    } else {
        close();
    }
};

const close = () => {
    resetForm();
    emit('close');
};

const resetForm = () => {
    currentStep.value = 'email';
    email.value = '';
    verificationCode.value = '';
    isLoading.value = false;
};

const submitEmail = async () => {
    if (!email.value) return;

    isLoading.value = true;
    try {
        // Simulate API call - just a brief delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Emit submit event with email
        emit('submit', { email: email.value });

        // Immediately transition to verification screen WITH showing a notification
        currentStep.value = 'verification';
    } catch (error) {
        console.error('Error processing email:', error);
    } finally {
        isLoading.value = false;
    }
};

const submitVerificationCode = async () => {
    if (!verificationCode.value || verificationCode.value.length !== 6) return;

    isLoading.value = true;
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Emit success event with email and code
        emit('verification-success', {
            email: email.value,
            code: verificationCode.value
        });

        // Reset form after successful verification
        resetForm();
    } catch (error) {
        console.error('Error verifying code:', error);
    } finally {
        isLoading.value = false;
    }
};
</script>