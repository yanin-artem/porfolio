<template>
    <div class="v-catalog-item" >
        <!-- <img :src="require('../assets/images/' + product_data.image)" alt=""> -->
        <h2 class="v-catalog-item__title">
            {{ product_data.name }}
        </h2>
        <div class="v-catalog-item__category">
            {{ product_data.category.name }}
        </div>
        <div class="v-catalog-item__about">
            {{ product_data.about }}
        </div>
        <div class="v-catalog-item__buyarea">
            <div class="v-catalog-item__buyarea-text">
                {{ product_data.price }} 
            </div>
            <button @click="addToCart" class="v-catalog-item__buyarea-btn">
                В корзину
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'v-catalog-item',
    props: {
        product_data: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {

        };
    },
    methods: {
        addToCart() {
            this.$emit('addToCart', this.product_data);
        },
    }
}
</script>

<style lang="sass">
    .v-catalog-item
        flex-basis: 23%
        margin: 20px
        padding: 20px
        min-height: 300px
        box-shadow: 0 0 8px 0 grey
        background: #d7ccdc
        border-radius: 20px 
        text-align: center
        position: relative
        img
            width: 180px
            height: 140px
        &__title
            margin: 10px 0 0 
        &__category
            color: grey
        &__about
            font-size: 14px
            margin-top: 8px
        &__buyarea
            position: absolute
            bottom: 20px
            width: 80%
            display: flex
            justify-content: space-between
            align-items: center
            &-text
            &-btn
                width: 60%
                border: none
                background: linear-gradient(225deg,#18c8ff 14.89%,#933ffe 85.85%)
                border-radius: 12px
                min-height: 35px
                color: #fff
                cursor: pointer
    .v-catalog-item.active
        flex-basis: 5%



</style>