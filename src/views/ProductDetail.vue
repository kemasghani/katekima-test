<template>
  <div>
    <ProductCard :product="product" :loading="loading" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchProductById } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard.vue";

const route = useRoute();
const product = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const id = route.params.id;
    product.value = await fetchProductById(id);
  } catch (error) {
    console.error("Error fetching product:", error);
  } finally {
    loading.value = false;
  }
});
</script>
