<template>
  <form @submit.prevent="handleSubmit" class="product-form">
    <div>
      <label>Nama Produk</label>
      <input v-model="formData.title" type="text" required />
    </div>
    <div>
      <label>Harga</label>
      <input v-model.number="formData.price" type="number" required />
    </div>
    <div>
      <label>Deskripsi</label>
      <textarea v-model="formData.description" required></textarea>
    </div>
    <div>
      <label>Kategori</label>
      <input v-model="formData.category" type="text" required />
    </div>
    <div>
      <label>Gambar URL</label>
      <input v-model="formData.image" type="text" required />
    </div>

    <button type="submit">
      {{ isEdit ? "Update Produk" : "Tambah Produk" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    }),
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);
const formData = ref({ ...props.product });

// Watch for changes in props.product to update formData
watch(
  () => props.product,
  (newProduct) => {
    formData.value = { ...newProduct };
  },
  { deep: true }
);

const handleSubmit = () => {
  emit("submit", formData.value);
};
</script>

<style scoped>
.product-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
