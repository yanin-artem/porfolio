<template>
    <div class="v-catalog">
        <div class="v-catalog__header" ref="header">
            <h1 class="v-catalog__header-title">
            Каталог
        </h1>
        <div class="v-catalog__header__cart"
        :class="{fixed:show}">
        <router-link class="v-catalog__header-link" :to="{name:'cart'}">
            <i class="v-catalog__header-icon material-icons">shopping_cart</i>
            {{ QUANTITY }}
        </router-link>
        </div>
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
            show:true
        }
    },
    methods:{
        ...mapActions(['GET_PRODUCTS_FROM_API','ADD_TO_CART','SET_COST']),
        addToCart(data){
            this.ADD_TO_CART(data);
            this.SET_COST(data);
        },
    },
    computed:{
        ...mapGetters(['PRODUCTS','CART','QUANTITY']),
    },
    mounted(){
        this.GET_PRODUCTS_FROM_API().then((response)=>{
            if(response.data){
                console.log("Данные пришли");
            }
        });

        const observer = new IntersectionObserver(()=>{
            this.show=!this.show;
        },{
            threshold:0.4
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
                right: 10vwы
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
            
    
</style>