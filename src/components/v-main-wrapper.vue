<template>
    <div class="v-main-wrapper">
        <vHeader/>
        <router-view></router-view>
    </div>
</template>

<script>
import vHeader from './v-header.vue';
export default {
    name: 'v-main-wrapper',
    components: {
        vHeader
    },
    computed: {

    }
}
</script>

<style lang="sass">
    .v-main-wrapper
        max-width: 900px
        margin: 0 auto
</style>