<template>
    <div>
        <form>
            <label for="email">Введите почту</label>

            <input 
            v-model="formdata.email" 
            type="text" 
            id="email"
            />

            <label for="fullname">Введите ФИО</label>

            <input 
            v-model="formdata.fullname" 
            type="text" 
            id="fullname"
            >

            <label for="password">Введите пароль</label>

            <input
            v-model="formdata.password" 
            type="password" 
            id="password"
            >
            
            <button @click="onSubmit()">Зарегистрироваться</button>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { user } from "@/sdk/users"

const router = useRouter()

const formdata = ref({
    email: "",
    fullname: "",
    password: ""
})

const onSubmit = () => {
    user.registration(formdata.value)
    router.push("authorization")
}
</script>

<style lang="scss" scoped>
label {
    color: #fff;
}

* {
    display: block;
}
</style>