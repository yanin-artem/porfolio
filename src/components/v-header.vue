<template>
    <div class="header">
        <button @click="toAuthorization()">Войти</button>
        <button @click="toRegistration()">Зарегистрироваться</button>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const toAuthorization = () => {
    router.push("authorization")
}

const toRegistration = () => {
    router.push("registration")
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;

    &* {
        display: block;
    }
}
</style>