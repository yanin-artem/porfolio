<template>
    <div>
        <input v-model="form.quantity" type="number">
        <select v-model="form.product" name="product" >
            <option v-for="product in products" :value="product.id">{{ product.name }}</option>
        </select>
        <button @click="onUpdate()">Изменить </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { products as productsApi } from '@/sdk/products';
import { categoriesApi } from '../sdk/categories'
import { useStore } from 'vuex';
import { cart } from '@/sdk/cart';

const store = useStore()


const form = ref({
    quantity: 0,
    product: null,
})
const router = useRouter()
const route = useRoute()
const user = store.getters.USER


const products = ref([])
const cartProduct = ref({})

const onUpdate = () => {
    cart.updateCartProduct(form.value, route.params.id, user.accessTocken)
    router.push({ name: "admin" })
}


onMounted(async () => {
    products.value = (await productsApi.fetchProducts()).data
    cartProduct.value = (await cart.fetchCartProduct(route.params.id, user.accessTocken)).data
    form.value.quantity = cartProduct.value.quantity
    form.value.product = cartProduct.value.product


})

</script>

<style lang="scss" scoped>
* {
    display: block;
}
</style>