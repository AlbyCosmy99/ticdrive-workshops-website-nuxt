<template>
  <div class="min-h-screen flex flex-col">
    <div class="bg-yellow-300 h-[5rem]">steps and logo</div>
    <div class="bg-red-300 w-full flex flex-col md:flex-row flex-1">
      <!-- Left Section -->
      <div class="bg-green-300 flex-1 flex justify-center items-center p-4">
        <div
          class="relative w-[90%] h-[70vw] max-w-[500px] max-h-[500px] rounded-xl overflow-hidden"
        >
          <NuxtImg
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI2RLOBO8DYvk8aAUNEs6DJzCJzlgHT7HfAg&s"
            class="absolute inset-0 w-full h-full object-cover"
            alt="Centered Image"
          />
        </div>
      </div>

      <!-- Right Section -->
      <div class="bg-blue-300 flex-1 flex items-center justify-center p-4">
        content
      </div>
    </div>
  </div>
</template>
