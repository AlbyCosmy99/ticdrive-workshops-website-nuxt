<template>
    <div class="min-h-screen bg-gray-50 p-6">

        <div class="max-w-4xl mx-auto mb-6">
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h1 class="text-2xl font-semibold">Privacy Policy</h1>
                    <p class="text-gray-600 mt-1">Informativa sulla Privacy e trattamento dei dati personali</p>
                </div>
                <div>
                    <img src="/svg/TicDriveLogo.svg" alt="TicDrive" class="h-12" />
                </div>
            </div>
        </div>


        <div class="max-w-4xl mx-auto bg-white rounded-md shadow-sm border-2 border-green-500">
            <div class="p-6">
                <div class="prose max-w-none" v-html="privacyPolicyText"></div>

                <div class="mt-8 pt-6 border-t border-gray-200">
                    <p class="text-sm text-gray-500">Ultimo aggiornamento: {{ lastUpdated }}</p>

                    <div class="mt-6">
                        <button @click="goBack"
                            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                            Indietro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'PrivacyPolicy',
    props: {
        content: {
            type: String,
            default: `
          <h2 class="text-xl font-semibold mb-4">1. Introduzione</h2>
          <p>Benvenuto nella nostra Informativa sulla Privacy. Questo documento spiega come raccogliamo, utilizziamo e gestiamo i tuoi dati personali quando utilizzi i nostri servizi.</p>
          
          <h2 class="text-xl font-semibold mb-4 mt-6">2. Informazioni che raccogliamo</h2>
          <p>Raccogliamo informazioni per fornire servizi migliori ai nostri utenti. I tipi di informazioni che raccogliamo includono:</p>
          <ul class="list-disc pl-6 my-3">
            <li>Informazioni che ci fornisci direttamente</li>
            <li>Informazioni che raccogliamo sul tuo utilizzo dei nostri servizi</li>
            <li>Informazioni da fonti di terze parti</li>
          </ul>
          
          <h2 class="text-xl font-semibold mb-4 mt-6">3. Come utilizziamo le tue informazioni</h2>
          <p>Utilizziamo le informazioni che raccogliamo per:</p>
          <ul class="list-disc pl-6 my-3">
            <li>Fornire, mantenere e migliorare i nostri servizi</li>
            <li>Sviluppare nuovi prodotti e funzionalità</li>
            <li>Personalizzare i nostri servizi per te</li>
            <li>Misurare le prestazioni e le analisi</li>
            <li>Comunicare con te riguardo ai nostri servizi</li>
            <li>Proteggere contro abusi e attività illegali</li>
          </ul>
          
          <h2 class="text-xl font-semibold mb-4 mt-6">4. Condivisione delle informazioni</h2>
          <p>Non condividiamo le tue informazioni personali con aziende, organizzazioni o individui esterni alla nostra azienda tranne nei seguenti casi:</p>
          <ul class="list-disc pl-6 my-3">
            <li>Con il tuo consenso</li>
            <li>Per motivi legali</li>
            <li>Con fornitori di servizi fidati che lavorano per nostro conto</li>
          </ul>
          
          <h2 class="text-xl font-semibold mb-4 mt-6">5. Le tue scelte</h2>
          <p>Hai determinate scelte riguardo alle informazioni che raccogliamo e come vengono utilizzate:</p>
          <ul class="list-disc pl-6 my-3">
            <li>Accedere e aggiornare le tue informazioni</li>
            <li>Eliminare le tue informazioni</li>
            <li>Disattivare alcune raccolte di dati</li>
          </ul>
          
          <h2 class="text-xl font-semibold mb-4 mt-6">6. Sicurezza dei dati</h2>
          <p>Lavoriamo duramente per proteggere le tue informazioni da accessi non autorizzati, alterazioni, divulgazioni o distruzioni.</p>
          
          <h2 class="text-xl font-semibold mb-4 mt-6">7. Modifiche a questa informativa</h2>
          <p>Potremmo aggiornare questa Informativa sulla Privacy di tanto in tanto. Ti informeremo di eventuali modifiche pubblicando la nuova Informativa sulla Privacy in questa pagina.</p>
          
          <h2 class="text-xl font-semibold mb-4 mt-6">8. Contattaci</h2>
          <p>Se hai domande su questa Informativa sulla Privacy, contattaci all'indirizzo privacy@ticdrive.it.</p>
        `
        },
        lastUpdated: {
            type: String,
            default: '5 Maggio 2025'
        }
    },
    setup(props) {
        const router = useRouter()
        const privacyPolicyText = ref(props.content)

        const goBack = () => {
            router.back()
        }

        return {
            privacyPolicyText,
            goBack,
            lastUpdated: props.lastUpdated
        }
    }
})
</script>