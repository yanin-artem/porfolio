<template>
    <div>
        <input v-model="form.name"  type="text">
        <button @click="onCreate">Создать </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { categoriesApi } from '../sdk/categories'

const form = ref({
    name: ""
})
const router = useRouter()


const onCreate = () => {
    categoriesApi.createCategory(form.value)
    router.push({ name: "admin" })
}



</script>

<style lang="scss" scoped></style>