<template>
    <div class="v-cart-item">
        <!-- <img class="v-cart-item__img" :src="require('../assets/images/' + cart_item_data.image)" alt=""> -->
        <div class="v-cart-item__content">
            <h3>{{ cart_item_data.product.name }}</h3>
            <div  class="v-cart-item__content-text">
            <div>{{ cart_item_data.product.price }}</div>
            <div>{{ cart_item_data.product.about }}</div>
        </div>
        <div class="v-cart-item__quantity">
            <p>Quantity</p>
            <div class="v-cart-item__quantity-logic">
                <button @click="subtractFromCart()" class="material-icons">remove</button>
                <span>{{ cart_item_data.quantity }}</span>
                <button class="material-icons" @click="addToCart()">add</button>
            </div>
            <button @click="deleteFromCart" class="v-cart-item__quantity__btn">Delete</button>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'v-cart-item',
    props: {
        cart_item_data: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    methods: {
        deleteFromCart() {
            this.$emit('deleteFromCart')
        },
        addToCart() {
            this.$emit('addToCart', this.cart_item_data)
        },
        subtractFromCart() {
            this.$emit('subtractFromCart')
        },
    },
    computed: {

    }

}
</script>

<style lang="sass" scoped>
    .v-cart-item
        display: flex
        align-items: center
        flex-basis: 100%
        box-shadow: 0 0 8px 0 grey
        margin: 20px
        height: 230px
        background: #d7ccdc
        border-radius: 20px 
        &__img
            height: 100%
            border-radius: 20px 0 0 20px 
        &__content
            padding: 20px
            width: 100%
            &-text
                display: flex
                justify-content: space-between
                font-size: 16px
        &__quantity
            display: flex
            flex-wrap: wrap
            p
                flex-basis: 100%
            &__btn
                width: 30%
                border: none
                background: linear-gradient(225deg,#18c8ff 14.89%,#933ffe 85.85%)
                border-radius: 12px
                min-height: 35px
                color: #fff
                cursor: pointer
                margin-left: 10%
            &-logic
                display: flex
                align-items: center
                padding: 5px
                background: #fff
                border-radius: 30px
                .material-icons
                    background: none
                    border: none
</style>