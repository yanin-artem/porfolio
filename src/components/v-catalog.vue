<template>
    <div class="v-catalog">
        <div class="v-catalog__header" ref="header">
            <h1 class="v-catalog__header-title">
            Каталог
        </h1>
        <div class="v-catalog__header__cart"
        :class="{ fixed: show }">
        <router-link class="v-catalog__header-link" :to="{ name: 'cart' }">
            <i class="v-catalog__header-icon material-icons">shopping_cart</i>
            {{ QUANTITY }}
        </router-link>
        </div>
        </div>
        <vCatalogItem 
        v-for="product in getProducts"
        :key="product.id + product.available"
        :product_data="product"
        @addToCart="addToCart"
        />
        <transition name="slide">
            <div v-if="ERROR" class="v-catalog__error">
                <div class="v-catalog__error-text">
                    {{ ERROR_MESSAGE }}
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import vCatalogItem from './v-catalog-item.vue';
import { mapActions, mapGetters } from 'vuex';
import { products } from "@/sdk/products"
export default {
    name: 'v-catalog',
    components: {
        vCatalogItem
    },
    data() {
        return {
            show: true
        }
    },
    methods: {
        ...mapActions(['GET_PRODUCTS_FROM_API', 'ADD_TO_CART', 'SET_COST', "GET_CART_FROM_API"]),
        async addToCart(data) {
            data.available = await products.toggleAvailable(data).available
            this.ADD_TO_CART(data);
            this.SET_COST(data);
        },

    },
    computed: {
        ...mapGetters(['PRODUCTS', 'CART', 'QUANTITY', 'ERROR', 'ERROR_MESSAGE']),
        getProducts() {
            return this.PRODUCTS.filter(item => item.available === true)
        }
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API().then((response) => {
            if (response.data) {
                console.log("Данные пришли");
            }
        });

        this.GET_CART_FROM_API()

        const observer = new IntersectionObserver(() => {
            this.show = !this.show;
        }, {
            threshold: 0.4
        });
        observer.observe(this.$refs.header);
    }
}
</script>

<style lang="sass" scoped>
    .v-catalog
        width: 100%
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        position: relative
        &__header
            display: flex
            justify-content: space-between
            align-items: center
            flex-basis: 100%
            &__cart.fixed
                position: fixed
                top: 10vh
                right: 10vw
            &-link
                text-decoration: none
                color: #b5c5fc
                &:active
                 color:#18c8ff
            &-icon
                font-size: 40px
            &-title
                color: #b5c5fc
                text-shadow: 0 0 8px grey
        &__error
            position: absolute
            display: flex
            align-items: center
            justify-content: center
            z-index: 1
            top: 80vh
            right: 0
            max-width: 500px
            min-height: 30px
            padding: 40px
            color: #fff
            animation: leave 5.5s
            right: -50vw
            background: linear-gradient(292deg,#a064ff33,#0a001900),#ffffff0d
            border: 1px solid #f0f9
            border-radius: 10px
            box-shadow: 0 0 15px #fff3
            &-text
                display: block
                overflow: hidden
                white-space: nowrap
                border-right: .15em solid #8e24aa
                animation: typing 3.5s steps(30, end),blink-caret .7s step-end infinite
    @keyframes typing 
        0% 
            width: 0
        100%
            width: 100%

    @keyframes blink-caret 
        0%
        100%
            border-color: transparent 50% 
        50%
            border-color: #8e24aa
    

    @keyframes leave
        0%
            right: 0
        75%
            right: 0
        100% 
            right: -50vw
  
    
</style>