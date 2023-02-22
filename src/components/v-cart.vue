<template>
    <div class="v-cart">
        <h2>Корзина</h2>
        <vCartItem v-for="(item,index) in cart_data"
        :key="item.article"
        :cart_item_data="item"
        @deleteFromCart="deleteFromCart(index)"/>
    </div>
</template>

<script>
import vCartItem from './v-cart-item.vue';
import { mapActions} from 'vuex';
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
    p
        text-align: center
        font-size: 20px
    h2
        text-align: center
        flex-basis: 100%
        color: #b5c5fc
        text-shadow: 0 0 8px grey
</style>