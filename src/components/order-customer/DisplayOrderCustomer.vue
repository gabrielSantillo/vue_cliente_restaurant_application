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
      let cart = []
      cart.push(food_object);
      let cart_json = JSON.stringify(cart);
      cookies.set(`cart`, cart_json);
    },
  },

  mounted() {
    this.$root.$on(`cart_food`, this.display_food_item);
    
  },
};
</script>

<style lang="scss" scoped>

</style>
