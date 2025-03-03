<template>
  <div>
    <h1>Edit Produk</h1>
    <ProductForm
      v-if="product"
      :product="product"
      :isEdit="true"
      @submit="handleEditProduct"
    />
    <p v-else>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProductForm from "@/components/product/ProductForm.vue";
import { fetchProductById, updateProduct } from "@/services/productService";

const route = useRoute();
const router = useRouter();
const product = ref(null);

const fetchProduct = async () => {
  const id = Number(route.params.id);
  product.value = await fetchProductById(id);
};

const handleEditProduct = async (updatedProduct: any) => {
  await updateProduct(route.params.id, updatedProduct);
  alert("Produk berhasil diperbarui!");
  router.push("/products");
};

onMounted(fetchProduct);
</script>
