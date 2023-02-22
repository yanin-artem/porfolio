<template>
    <div class="v-main-wrapper">
        <vCatalog />
        <vCart v-if="CART.length"
        :cart_data="CART"/>
    </div>
</template>

<script>
import vCatalog from './v-catalog.vue';
import vCart from './v-cart.vue';
import { mapGetters } from 'vuex';
export default {
    name:'v-main-wrapper',
    components:{
        vCatalog,
        vCart
    },
    computed:{
        ...mapGetters(['CART']),
    }
}
</script>

<style lang="sass" scoped>
    .v-main-wrapper
        max-width: 900px
        margin: 0 auto

</style>