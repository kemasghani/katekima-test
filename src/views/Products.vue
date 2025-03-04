<template>
  <div>
    <h1>Daftar Produk</h1>
    <button @click="$router.push('/product-add')">Tambah Produk</button>
    <DataTable
      :products="products"
      :loading="loading"
      @edit="editProduct"
      @delete="deleteProduct"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable from "@/components/common/DataTable.vue";
import { fetchProducts, deleteProduct } from "@/services/productService";

const products = ref([]);
const loading = ref(true);

const fetchData = async () => {
  loading.value = true;
  products.value = await fetchProducts();
  loading.value = false;
};

onMounted(fetchData);

const editProduct = (id: number) => {
  window.location.href = `/edit-product/${id}`;
};

const deleteProductById = async (id: number) => {
  await deleteProduct(id);
  fetchData();
};
</script>
