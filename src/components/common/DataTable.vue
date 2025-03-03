<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Search Input -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        placeholder="Cari Produk..."
        class="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        @input="saveSearch"
      />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow-md">
      <table class="w-full border-collapse">
        <thead class="bg-blue-500 text-white">
          <tr>
            <th class="px-4 py-3 text-left">No</th>
            <th
              @click="sortBy('title')"
              class="px-4 py-3 text-left cursor-pointer select-none"
            >
              Nama
              <span class="ml-1">{{ sortOrder === "asc" ? "▲" : "▼" }}</span>
            </th>
            <th class="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="3" class="px-4 py-3 text-center">Loading...</td>
          </tr>
          <tr
            v-else
            v-for="(product, index) in sortedProducts"
            :key="product.id"
            class="border-b hover:bg-gray-100"
          >
            <td class="px-4 py-3">
              {{ (currentPage - 1) * perPage + index + 1 }}
            </td>
            <td class="px-4 py-3">{{ product.title }}</td>
            <td class="px-4 py-3 text-center">
              <button
                @click="$emit('edit', product.id)"
                class="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                @click="$emit('delete', product.id)"
                class="px-3 py-1 ml-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center justify-between mt-4">
      <select
        v-model="perPage"
        @change="updatePerPage(perPage)"
        class="p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>

      <div>
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 mr-2 font-semibold text-white bg-blue-500 rounded disabled:bg-gray-300"
        >
          Prev
        </button>
        <span class="text-gray-700"
          >Page {{ currentPage }} of {{ totalPages }}</span
        >
        <button
          @click="nextPage"
          :disabled="currentPage >= totalPages || totalPages === 0"
          class="px-4 py-2 ml-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { fetchProducts } from "@/services/productService";
import { usePagination } from "@/composables/usePagination";

// Reactive variables
const products = ref([]);
const loading = ref(true);
const searchQuery = ref(localStorage.getItem("searchQuery") || "");
const sortOrder = ref<"asc" | "desc">("asc");

// Filter products based on searchQuery
const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) {
    return products.value; // If search is empty, show all products
  }
  console.log(products.value);

  const filtered = products.value.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  return filtered.length > 0 ? filtered : []; // If no results, return empty array
});
// Use Pagination composable with filtered data
const { currentPage, perPage, totalPages, updatePerPage, prevPage, nextPage } =
  usePagination(filteredProducts);

// Fetch Data from API
const fetchData = async () => {
  loading.value = true;
  const data = await fetchProducts();
  products.value = data;
  loading.value = false;
};

// Sorting function
const sortBy = (key: string) => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
};

// Save search query to localStorage
const saveSearch = () => {
  localStorage.setItem("searchQuery", searchQuery.value);
};

// Paginate the filtered results
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredProducts.value.slice(start, end);
});

// Sort the paginated products
const sortedProducts = computed(() => {
  return [...paginatedProducts.value].sort((a, b) => {
    const valueA = a.title.toLowerCase();
    const valueB = b.title.toLowerCase();
    return sortOrder.value === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });
});

// Fetch data initially
onMounted(fetchData);
</script>
