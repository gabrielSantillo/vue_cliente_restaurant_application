<template>
    <div>
        <div class="title">
            <h1>Edit your Item</h1>
            <router-link to="/dashboard-restaurant">Dashboard</router-link>
        </div>
        
        <edit-items></edit-items>
    </div>
</template>

<script>
import EditItems from '@/components/display-restaurant/EditItems.vue'
    export default {
  components: { EditItems },
        
    }
</script>

<style lang="scss" scoped>
.title {
    display: grid;
    grid-template-columns: 6fr 1fr;
    place-items: center;

    >h1 {
        justify-self: start;
    }
}
</style>