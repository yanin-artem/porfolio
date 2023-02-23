<template>
    <div class="v-cart">
        <h2>Корзина</h2>
        <div class="v-cart__info">
            <div class="v-cart__info__subtitle">
            {{ CART.length }} товаров в корзине
        </div>
        <router-link :to="{name:'catalog'}">
            <button class="v-cart__info__btn">
                В каталог
            </button>
        </router-link>
        <div v-if="!CART.length">
            Корзина пуста
        </div>
        </div>
        <vCartItem v-for="(item,index) in CART"
        :key="item.article"
        :cart_item_data="item"
        @deleteFromCart="deleteFromCart(index)"/>
    </div>
</template>

<script>
import vCartItem from './v-cart-item.vue';
import { mapActions, mapGetters} from 'vuex';
export default {
    name: 'v-cart',
    components:{
        vCartItem
    },
    props:{
        cart_data:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    computed:{
        ...mapGetters(['CART'])
    },
    methods:{
        ...mapActions(['DELETE_FROM_CART']),
        deleteFromCart(index){
            this.DELETE_FROM_CART(index);
        }
    }
}
</script>

<style lang="sass" scoped>
    .v-cart
        color: #000
        display: flex
        flex-wrap: wrap
        font-size: 20px
        margin-bottom: 100px
        font-family: sans-serif
        &__info
            display: flex
            flex-direction: column
            align-items: center
            flex-basis: 100%
            &__subtitle
                color: grey
            &__btn
                width: 100px
                border: none
                background: linear-gradient(225deg,#18c8ff 14.89%,#933ffe 85.85%)
                border-radius: 12px
                min-height: 35px
                color: #fff
                cursor: pointer
                margin-top: 20px

    p
        text-align: center
        font-size: 20px
    h2
        text-align: center
        flex-basis: 100%
        color: #b5c5fc
        text-shadow: 0 0 8px grey
</style>