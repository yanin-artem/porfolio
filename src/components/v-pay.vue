<template>
    <div class="v-pay">
        <h1>
            Спасибо за покупку!
        </h1>
        <router-link :to="{name:'catalog'}" class="v-pay__link">
            Вернуться в каталог
        </router-link>
    </div>
</template>

<script>

</script>

<style lang="sass" scoped>
    h1
        color:#fff
        text-align: center
    .v-pay__link
        display: block
        width: 200px
        border: none
        background: linear-gradient(225deg,#18c8ff 14.89%,#933ffe 85.85%)
        border-radius: 12px
        min-height: 40px
        color: #fff
        cursor: pointer
        margin-left: 20px
        text-align: center
        line-height: 40px
        font-size: 20px
        text-decoration: none
        margin: 0 auto
</style>