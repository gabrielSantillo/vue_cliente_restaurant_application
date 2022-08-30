<template>
    <div>
        <router-link to="/dashboard-restaurant">Back</router-link>
        <others-restaurants></others-restaurants>
    </div>
</template>

<script>
import OthersRestaurants from '@/components/restaurant/OthersRestaurants.vue'
    export default {
  components: { OthersRestaurants },
        
    }
</script>

<style lang="scss" scoped>

</style>