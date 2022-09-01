<template>
  <div>
  </div>
</template>

<script>
import cookies from "vue-cookies";

export default {
  methods: {
    display_food_item(food) {
      let food_object = JSON.parse(food);
      if(this.cart.length <= 0){
        this.cart.push(food_object);
      } else {
        let menu_item = JSON.parse(cookies.get(`cart`))
        this.cart.push(menu_item)
      }
      
      let cart_json = JSON.stringify(this.cart);
      cookies.set(`cart`, cart_json);
    },
  },

  data() {
    return {
      cart: []
    }
  },

  mounted() {
    this.$root.$on(`cart_food`, this.display_food_item);
    
  },
};
</script>

<style lang="scss" scoped>

</style>
