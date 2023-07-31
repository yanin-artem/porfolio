import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "catalog",
    component: () => import("../components/v-catalog.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../components/v-cart.vue"),
    props: true,
  },
  {
    path: "/pay",
    name: "pay",
    component: () => import("../components/v-pay.vue"),
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("../components/v-registration.vue"),
  },
  {
    path: "/authorization",
    name: "authorization",
    component: () => import("../components/v-authorization.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/admin.vue"),
  },
  {
    path: "/admin-products-edit/:id",
    name: "admin-products-edit",
    component: () => import("../components/v-admin-products-edit.vue"),
  },
  {
    path: "/admin-products-create",
    name: "admin-products-create",
    component: () => import("../components/v-admin-products-create.vue"),
  },
  {
    path: "/admin-cart-edit/:id",
    name: "admin-cart-edit",
    component: () => import("../components/v-admin-cart-edit.vue"),
  },
  {
    path: "/admin-cart-create",
    name: "admin-cart-create",
    component: () => import("../components/v-admin-cart-create.vue"),
  },
  {
    path: "/admin-category-edit/:id",
    name: "admin-category-edit",
    component: () => import("../components/v-admin-category-edit.vue"),
  },
  {
    path: "/admin-category-create",
    name: "admin-category-create",
    component: () => import("../components/v-admin-category-create.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
