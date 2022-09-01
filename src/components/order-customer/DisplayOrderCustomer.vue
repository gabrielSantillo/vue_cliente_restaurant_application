<template>
  <div>
  </div>
</template>

<script>
import cookies from "vue-cookies";

export default {

  data() {
    return {
      cart: undefined
    }
  },

  mounted() {
    this.cart = JSON.parse(cookies.get(`cart`))
    console.log(this.cart)
    
  },
};
</script>

<style lang="scss" scoped>

</style>
