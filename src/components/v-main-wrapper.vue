<template>
    <div class="v-main-wrapper">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name:'v-main-wrapper',
    components:{

    },
    computed:{

    }
}
</script>

<style lang="sass">
    .v-main-wrapper
        max-width: 900px
        margin: 0 auto
</style>