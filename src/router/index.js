import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path:'/',
    name:'catalog',
    component: () =>import('../components/v-catalog.vue')
  },
 {
  path:'/cart',
  name:'cart',
  component: () =>import('../components/v-catalog.vue'),
  props:true
 },
 {
  path:'/pay',
  name:'pay',
  component: () =>import('../components/v-pay.vue'),
 },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
