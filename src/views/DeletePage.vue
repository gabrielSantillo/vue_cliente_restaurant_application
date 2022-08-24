<template>
  <div>
    <delete-profile></delete-profile>
  </div>
</template>

<script>
import DeleteProfile from '@/components/delete-profile/DeleteProfile.vue'

   export default {
  components: { DeleteProfile },
        
    }

</script>

<style scoped>
div {
    display: grid;
    place-items: center;
}
</style>
