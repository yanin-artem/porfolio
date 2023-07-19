<template>
    <div class="v-cart">
        <h2>Корзина</h2>
        <div class="v-cart__info">
            <div class="v-cart__info__subtitle">
                {{ QUANTITY }} товаров в корзине
            </div>
            <router-link :to="{ name: 'catalog' }">
                <button class="v-cart__info__btn">
                    В каталог
                </button>
            </router-link>
            <div class="v-cart__info-empty" v-if="!CART.length">
                Корзина пуста
            </div>
        </div>
        <vCartItem v-for="(item, index) in CART"
        :key="item.id"
        :cart_item_data="item"
        @deleteFromCart="deleteFromCart(index)"
        @addToCart="addToCart"
        @subtractFromCart="subtractFromCart(index)"/>
    </div>
    <div class="v-cart__cost">
        <div class="v-cart__cost-text">
            Цена: {{ COST }}
        </div>
        <router-link v-if="COST" :to="{ name: 'pay' }" class="v-cart__cost-btn">
            Оплатить
        </router-link>
    </div>
</template>

<script>
import vCartItem from './v-cart-item.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'v-cart',
    components: {
        vCartItem
    },
    props: {
        cart_data: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {
        ...mapActions(['DELETE_FROM_CART', 'ADD_TO_CART', 'SUBTRACT_FROM_CART', 'SET_COST', 'SUBTRACT_COST', 'DELETE_COST', 'ADD_QUANTITY']),
        deleteFromCart(index) {
            this.DELETE_COST(index);
            this.DELETE_FROM_CART(index);
        },
        addToCart(data) {
            this.ADD_QUANTITY(data)
            this.SET_COST(data.product);
        },
        subtractFromCart(index) {
            this.SUBTRACT_COST(index);
            this.SUBTRACT_FROM_CART(index);
        },
    },
    computed: {
        ...mapGetters(['CART', 'QUANTITY', 'COST']),
    },
}
</script>

<style lang="sass" scoped>
    .v-cart
        color: #000
        display: flex
        flex-wrap: wrap
        font-size: 20px
        margin-bottom: 100px
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
            &-empty
                color: grey
                margin-top: 20px
                font-size: 25px
        &__cost
            color: #fff
            display: flex
            align-items: center
            &-btn
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
            &-text
                font-size: 30px

    p
        text-align: center
        font-size: 20px
    h2
        text-align: center
        flex-basis: 100%
        color: #b5c5fc
        text-shadow: 0 0 8px grey
</style>