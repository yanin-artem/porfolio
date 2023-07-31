<template>
    <div>
        <input v-model="form.name"  type="text">
        <button @click="onChange">Изменить </button>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { categoriesApi } from '../sdk/categories'

const form = ref({
    name: ""
})
const category = ref(null)
const route = useRoute()
const router = useRouter()

const onChange = () => {
    categoriesApi.updateCategory(form.value, route.params.id)
    router.push({ name: "admin" })
}
onMounted(async () => {
    category.value = await categoriesApi.fetchCategory(route.params.id)
    form.value.name = category.value.data.name

})


</script>

<style lang="scss" scoped></style>