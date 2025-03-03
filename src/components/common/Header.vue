<template>
  <header
    class="bg-white shadow-md py-4 px-6 flex justify-between items-center w-full"
  >
    <h1
      class="text-xl font-semibold text-gray-800 translate-x-[55px] md:translate-x-[0px]"
    >
      {{ pageTitle }}
    </h1>
    <button
      @click="logout"
      class="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded transition-all"
    >
      Logout
    </button>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const pageTitle = computed(() => {
  if (!route || !route.path) return "My Order App";
  const titles = {
    "/": "Dashboard",
    "/orders": "Orders",
    "/vouchers": "Voucher Management",
  };
  return titles[route.path] || "My Order App"; // Default title if path not found
});

const logout = () => {
  console.log("User logged out");
};
</script>
