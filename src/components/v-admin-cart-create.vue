<template>
    <div>
        <input v-model="form.quantity" type="number">
        <select v-model="form.product" name="product" >
            <option v-for="product in products" :value="product.id">{{ product.name }}</option>
        </select>
        <button @click="onCreate()">Создать </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { products as productsApi } from '@/sdk/products';
import { cart } from '@/sdk/cart';
import { useStore } from 'vuex';


const store = useStore()
const user = store.getters.USER


const form = ref({
    product: undefined,
    quantity: 0,
    cart: user.id
})
const router = useRouter()

const onCreate = () => {
    cart.createCartProduct(form.value, user.accessTocken)
    router.push({ name: "admin" })
}

const products = ref([])


onMounted(async () => {
    products.value = (await productsApi.fetchProducts()).data
})

</script>

<style lang="scss" scoped>
* {
    display: block;
}
</style>