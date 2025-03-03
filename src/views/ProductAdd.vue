<template>
  <div>
    <h1>Tambah Produk</h1>
    <ProductForm @submit="handleAddProduct" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import ProductForm from "@/components/product/ProductForm.vue";
import { addProduct } from "@/services/productService";

const router = useRouter();

const handleAddProduct = async (product: any) => {
  await addProduct(product);
  alert("Produk berhasil ditambahkan!");
  router.push("/products");
};
</script>
