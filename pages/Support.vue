<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <div class="max-w-4xl mx-auto mb-6">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h1 class="text-2xl font-semibold">Supporto</h1>
                    <p class="text-gray-600 mt-1">Centro assistenza e contatti</p>
                </div>
                <div>
                    <img src="/svg/TicDriveLogo.svg" alt="TicDrive" class="h-12" />
                </div>
            </div>
        </div>

        <div class="max-w-4xl mx-auto bg-white rounded-md shadow-sm border-2 border-green-500">
            <div class="p-6">
                <div class="prose max-w-none" v-html="supportContent"></div>

                <div class="mt-8 space-y-6">
                    <form @submit.prevent="submitForm" class="space-y-4">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
                            <input type="text" id="name" v-model="formData.name" 
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" v-model="formData.email"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
                        </div>

                        <div>
                            <label for="message" class="block text-sm font-medium text-gray-700">Messaggio</label>
                            <textarea id="message" v-model="formData.message" rows="4"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"></textarea>
                        </div>

                        <div class="flex justify-between items-center pt-6 border-t border-gray-200">
                            <button @click="goBack"
                                type="button"
                                class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                                Indietro
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                                Invia messaggio
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'Support',
    setup() {
        const router = useRouter()
        const formData = ref({
            name: '',
            email: '',
            message: ''
        })

        const supportContent = ref(`
            <h2 class="text-xl font-semibold mb-4">Come possiamo aiutarti?</h2>
            <p class="mb-4">Siamo qui per assisterti in caso di domande, problemi o feedback sui nostri servizi. Compila il modulo sottostante e ti risponderemo il prima possibile.</p>
            
            <h3 class="text-lg font-semibold mb-2">Contatti diretti</h3>
            <ul class="list-disc pl-6 mb-6">
                <li>Email: support@ticdrive.it</li>
                <li>Telefono: +39 123 456 7890</li>
                <li>Orari: Lun-Ven 9:00-18:00</li>
            </ul>
        `)

        const goBack = () => {
            router.back()
        }

        const submitForm = async () => {
            // Implement your form submission logic here
            console.log('Form submitted:', formData.value)
            // Reset form after submission
            formData.value = {
                name: '',
                email: '',
                message: ''
            }
            // Show success message or handle errors
        }

        return {
            supportContent,
            formData,
            goBack,
            submitForm
        }
    }
})
</script>