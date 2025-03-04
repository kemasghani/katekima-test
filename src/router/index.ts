import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Products from "@/views/Products.vue";
import ProductAdd from "@/views/ProductAdd.vue";
import ProductDetail from "@/views/ProductDetail.vue";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/products", name: "Products", component: Products },
  { path: "/product-add", name: "ProductAdd", component: ProductAdd },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
  }, // Added route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
