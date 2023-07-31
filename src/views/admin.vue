<template>
    <div>
        <h2>Категории</h2>
        <div class="row"  v-for="category in  categories ">
            <div>
                {{ category.id }}
            </div>
            <div>
                {{ category.name }}
            </div>
            <button @click="toCategoryUpdate(category.id)">Изменить</button>
            <button @click="categoryDelete(category.id)">Удалить</button>
        </div>
        <button @click="toCategoryCreate()">Добавить</button>

        <h2>Продукты</h2>
        <div class="row"  v-for="product in  products ">
            <div>
                {{ product.id }}
            </div>
            <div>
                {{ product.name }}
            </div>
            <button @click="toProductUpdate(product.id)">Изменить</button>
            <button @click="productDelete(product.id)">Удалить</button>
        </div>
        <button @click="toProductCreate()">Добавить</button>

        <h2>Продукты в корзине</h2>
        <div class="row"  v-for="product in cartProducts ">
            <div>
                {{ product.id }}
            </div>
            <div>
                {{ product.name }}
            </div>
            <button @click="toCartProductsUpdate(product.id)">Изменить</button>
            <button @click="cartProductsDelete(product.id)">Удалить</button>
        </div>
        <button @click="toCartProductsCreate()">Добавить</button>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { categoriesApi } from '../sdk/categories'
import { products as productsApi } from '@/sdk/products';
import { cart } from '@/sdk/cart';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


const router = useRouter()
const store = useStore()
const categories = ref(null)


const user = store.getters.USER

const toCategoryUpdate = (id) => {
    router.push({ name: 'admin-category-edit', params: { id: id } })

}
const toCategoryCreate = () => {
    router.push({ name: "admin-category-create" })
}
const categoryDelete = async (id) => {
    await categoriesApi.deleteCategory(id)
    categories.value = (await categoriesApi.fetchCategories()).data
}

const products = ref(null)

const toProductUpdate = (id) => {
    router.push({ name: 'admin-products-edit', params: { id: id } })

}
const toProductCreate = () => {
    router.push({ name: "admin-products-create" })
}
const productDelete = async (id) => {
    await productsApi.deleteProduct(id)
    products.value = (await productsApi.fetchProducts()).data
}

const cartProducts = ref(null)

const toCartProductsUpdate = (id) => {
    router.push({ name: 'admin-cart-edit', params: { id: id } })

}
const toCartProductsCreate = () => {
    router.push({ name: "admin-cart-create" })
}
const cartProductsDelete = async (id) => {
    await cart.deleteCartProduct(id, user.accessTocken)
    cartProducts.value = (await cart.fetchCartProducts(user.accessTocken)).data
}




onMounted(async () => {
    categories.value = (await categoriesApi.fetchCategories()).data

    products.value = (await productsApi.fetchProducts()).data

    cartProducts.value = (await cart.fetchCartProducts(user.accessTocken)).data
})
</script>

<style lang="scss" scoped>
* {
    color: #fff
}

.row {
    display: flex;
}

button {
    color: #000;
}
</style>