<template>
  <div
    class="border border-tic py-4 px-6 rounded-lg h-[66.6667vh] flex flex-col items-center gap-4"
  >
    <NuxtImg
      src="/images/ticDriveLogo.png"
      alt="Company logo"
      class="object-contain aspect-square"
      width="120"
      height="120"
    />
    <button
      @click="$router.push('/dashboard')"
      class="mt-auto w-full bg-drive text-white py-2 px-4 rounded hover:bg-drive/90 transition"
    >
      Dashboard
    </button>
    <button
      @click="$router.push('/bookings')"
      class="mt-auto w-full bg-drive text-white py-2 px-4 rounded hover:bg-drive/90 transition"
    >
      Bookings
    </button>
    <button
      @click="$router.push('/calendar')"
      class="mt-auto w-full bg-drive text-white py-2 px-4 rounded hover:bg-drive/90 transition"
    >
      Calendar
    </button>
    <button
      @click="$router.push('/settings')"
      class="mt-auto w-full bg-drive text-white py-2 px-4 rounded hover:bg-drive/90 transition"
    >
      Settings
    </button>
  </div>
</template>
