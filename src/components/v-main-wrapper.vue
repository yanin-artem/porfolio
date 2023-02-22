<template>
    <div class="v-main-wrapper">
        <vCatalog />
        <vCart />
    </div>
</template>

<script>
import vCatalog from './v-catalog.vue';
import vCart from './v-cart.vue';
export default {
    name:'v-main-wrapper',
    components:{
        vCatalog,
        vCart
    }
}
</script>

<style lang="sass" scoped>
    .v-main-wrapper
        display: flex
        justify-content: center
        align-items: center
        max-width: 900px
        margin: 0 auto

</style>