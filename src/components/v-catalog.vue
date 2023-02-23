<template>
    <div class="v-catalog">
        <div class="v-catalog__header">
            <h1 class="v-catalog__header-title">
            Каталог
        </h1>
        <router-link :to="{name:'cart'}">Cart:{{ CART.length }}</router-link>
        </div>
        <vCatalogItem 
        v-for="product in PRODUCTS"
        :key="product.article"
        :product_data="product"
        @addToCart="addToCart"
        />
    </div>
</template>

<script>
import vCatalogItem from './v-catalog-item.vue';
import { mapActions,mapGetters } from 'vuex';
export default {
    name: 'v-catalog',
    components: {
        vCatalogItem
    },
    data() {
        return {
        }
    },
    methods:{
        ...mapActions(['GET_PRODUCTS_FROM_API','ADD_TO_CART']),
        addToCart(data){
            this.ADD_TO_CART(data);
        }
    },
    computed:{
        ...mapGetters(['PRODUCTS','CART'])
    },
    mounted(){
        this.GET_PRODUCTS_FROM_API().then((response)=>{
            if(response.data){
                console.log("Данные пришли");
            }
        });
    }
}
</script>

<style lang="sass" scoped>
    .v-catalog
        width: 100%
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        &__header
            display: flex
            justify-content: space-between
            align-items: center
            flex-basis: 100%
            &-title
                color: #b5c5fc
                font-family: sans-serif
                text-shadow: 0 0 8px grey
            
    
</style>