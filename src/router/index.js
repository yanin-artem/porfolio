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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
