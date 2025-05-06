<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <div class="max-w-4xl mx-auto mb-6">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h1 class="text-2xl font-semibold">Domande Frequenti</h1>
                    <p class="text-gray-600 mt-1">Come possiamo aiutarti?</p>
                </div>
                <div>
                    <img src="/svg/TicDriveLogo.svg" alt="TicDrive" class="h-12" />
                </div>
            </div>
        </div>

        <div class="max-w-4xl mx-auto bg-white rounded-md shadow-sm border-2 border-green-500">
            <div class="p-6">
                <!-- Search Section -->
                <div class="mb-8">
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input type="text" v-model="searchQuery" placeholder="Cerca per parola chiave"
                            class="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-gray-400">
                    </div>
                </div>

                <!-- FAQ Section -->
                <div class="mb-8">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-semibold">Le più richieste</h2>
                        <a href="#" class="text-green-500 hover:text-green-600">Vedi tutte</a>
                    </div>

                    <div class="space-y-4">
                        <div v-for="(faq, index) in faqs" :key="index"
                            class="border rounded-lg p-4 cursor-pointer hover:border-gray-400"
                            @click="toggleFaq(index)">
                            <div class="flex justify-between items-center">
                                <h3 class="text-lg font-medium">{{ faq.question }}</h3>
                                <svg class="w-6 h-6 transform transition-transform duration-200"
                                    :class="faq.isOpen ? 'text-green-500 rotate-45' : 'text-gray-500'" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div v-if="faq.isOpen" class="mt-4 text-gray-600 transition-all duration-200 ease-in-out">
                                {{ faq.answer }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Form Section -->
                <div class="mt-8 pt-6">
                    <div class="border-2 border-green-500 rounded-lg p-6">
                        <h2 class="text-xl font-semibold mb-4">Contattaci Direttamente</h2>
                        <form @submit.prevent="submitForm" class="space-y-4">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
                                <input type="text" id="name" v-model="formData.name"
                                    class="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500">
                            </div>

                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" v-model="formData.email"
                                    class="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500">
                            </div>

                            <div>
                                <label for="message" class="block text-sm font-medium text-gray-700">Messaggio</label>
                                <textarea id="message" v-model="formData.message" rows="4"
                                    class="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500"></textarea>
                            </div>

                            <div class="flex justify-end">
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
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'Support',
    setup() {
        const searchQuery = ref('')
        const formData = ref({
            name: '',
            email: '',
            message: ''
        })

        const faqs = ref([
            {
                question: 'Come posso prenotare un servizio su TicDrive?',
                answer: 'Apri l\'app o il sito di TicDrive, inserisci i dettagli del veicolo e la posizione, quindi seleziona il tipo di servizio e l\'orario. La prenotazione è semplice e veloce.',
                isOpen: false
            },
            {
                question: 'Come posso aggiungere o aggiornare un metodo di pagamento?',
                answer: 'Vai al tuo profilo e tocca "Metodi di pagamento" per aggiungere o aggiornare l\'opzione preferita.',
                isOpen: false
            },
            {
                question: 'Posso prenotare un servizio durante il fine settimana?',
                answer: 'Si, puoi programmare servizi qualsiasi giorno della settimana, compresi i fine settimana.',
                isOpen: false
            },
            {
                question: 'Posso cancellare o modificare una prenotazione?',
                answer: 'Si, le prenotazioni possono essere cancellate o modificate almeno 24 ore prima dell\'orario previsto.',
                isOpen: false
            }
        ])

        const toggleFaq = (index: number) => {
            faqs.value[index].isOpen = !faqs.value[index].isOpen
        }

        const submitForm = async () => {
            console.log('Form submitted:', formData.value)
            formData.value = {
                name: '',
                email: '',
                message: ''
            }
        }

        return {
            searchQuery,
            formData,
            faqs,
            toggleFaq,
            submitForm
        }
    }
})
</script>