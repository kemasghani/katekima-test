import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Products from "@/views/Products.vue";
import ProductAdd from "@/views/ProductAdd.vue";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/products", name: "Products", component: Products },
  { path: "/product-add", name: "ProductAdd", component: ProductAdd },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
