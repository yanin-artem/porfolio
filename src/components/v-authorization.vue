<template>
    <div>
        <form>
            <label for="email">Введите почту</label>

            <input 
            v-model="formdata.email" 
            type="text" 
            id="email"
            />

            <label for="password">Введите пароль</label>

            <input
            v-model="formdata.password" 
            type="password" 
            id="password"
            >
            
            <button @click="onSubmit()">Авторизоваться</button>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { user } from "@/sdk/users"
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()

const formdata = ref({
    email: "",
    password: ""
})

const onSubmit = async () => {
    const { data } = await user.authorization(formdata.value)
    console.log(data)
    store.dispatch("SET_USER", data)
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