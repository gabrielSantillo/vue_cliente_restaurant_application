<template>
  <div>
    <div class="header">
      <h1>Your Cart</h1>
      <router-link to="/restaurant-menu-options">Menu</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";

export default {
  methods: {
    display_food_item(food) {
      let food_object = JSON.parse(food);
      this.cart.push(food_object);
      let cart_json = JSON.stringify(this.cart);
      cookies.set(`cart`, cart_json);
    },
  },
  data() {
    return {
      cart: [],
    };
  },

  mounted() {
    this.$root.$on(`cart_food`, this.display_food_item);
  },
};
</script>

<style lang="scss" scoped>

</style>
