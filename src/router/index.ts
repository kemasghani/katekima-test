import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Orders from "@/views/Order.vue";
import VoucherManagement from "@/views/VoucherManagement.vue";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/orders", name: "Orders", component: Orders },
  {
    path: "/vouchers",
    name: "VoucherManagement",
    component: VoucherManagement,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
