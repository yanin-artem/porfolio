<template>
    <div>
        <input v-model="form.name"  type="text">
        <input v-model="form.price" type="number">
        <select v-model="form.category" name="category" >
            <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
        </select>
        <textarea v-model="form.about" name="about" cols="30" rows="10"></textarea>
        <button @click="onCreate()">Создать </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { products as productsApi } from '@/sdk/products';
import { categoriesApi } from '../sdk/categories'

const form = ref({
    name: "",
    image: "",
    price: 0,
    available: true,
    category: null,
    about: ''
})
const router = useRouter()
const categories = ref([])

const onCreate = () => {
    productsApi.createProduct(form.value)
    router.push({ name: "admin" })
}


onMounted(async () => {
    categories.value = (await categoriesApi.fetchCategories()).data
    console.log(categories.value)
})

</script>

<style lang="scss" scoped>
* {
    display: block;
}
</style>