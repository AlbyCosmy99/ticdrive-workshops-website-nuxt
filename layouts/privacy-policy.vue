<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto mb-6">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-semibold">Privacy Policy</h1>
          <p class="text-gray-600 mt-1">
            Informativa sulla Privacy e trattamento dei dati personali
          </p>
        </div>
        <div>
          <img src="/svg/TicDriveLogo.svg" alt="TicDrive" class="h-12" />
        </div>
      </div>
    </div>

    <div
      class="max-w-4xl mx-auto bg-white rounded-md shadow-sm border-2 border-green-500"
    >
      <div class="p-6">
        <slot />

        <div class="mt-8 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-500">
            Ultimo aggiornamento: 5 Maggio 2025
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
