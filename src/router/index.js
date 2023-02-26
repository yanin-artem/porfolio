import { createRouter, createWebHashHistory } from 'vue-router'
import vCart from '../components/v-cart.vue'
import vCatalog from '../components/v-catalog.vue'
import vPay from '../components/v-pay.vue'

const routes = [
  {
    path:'/',
    name:'catalog',
    component:vCatalog
   },
 {
  path:'/cart',
  name:'cart',
  component:vCart,
  props:true
 },
 {
  path:'/pay',
  name:'pay',
  component:vPay,
 },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
