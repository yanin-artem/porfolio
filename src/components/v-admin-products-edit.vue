<template>
    <div>
        <input v-model="form.name"  type="text">
        <input v-model="form.price" type="number">
        <select v-model="form.category" name="category" >
            <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
        </select>
        <textarea v-model="form.about" name="about" cols="30" rows="10"></textarea>
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

const store = useStore()


const form = ref({
    name: "",
    image: "",
    price: 0,
    available: true,
    category: null,
    about: ''
})
const router = useRouter()
const route = useRoute()
const user = store.getters.USER


const products = ref(null)
const categories = ref([])

const onUpdate = () => {
    productsApi.updateProduct(form.value, route.params.id, user.accessTocken)
    router.push({ name: "admin" })
}


onMounted(async () => {
    products.value = (await productsApi.fetchProduct(route.params.id)).data
    categories.value = (await categoriesApi.fetchCategories()).data

    form.value.name = products.value.name
    form.value.price = products.value.price
    form.value.available = products.value.available
    form.value.category = products.value.category.id
    form.value.about = products.value.about

})

</script>

<style lang="scss" scoped>
* {
    display: block;
}
</style>