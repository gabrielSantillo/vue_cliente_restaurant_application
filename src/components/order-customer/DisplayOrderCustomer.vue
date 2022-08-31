<template>
  <div>
    <div class="header">
      <h1>Your Cart</h1>
      <router-link to="/restaurant-menu-options">Menu</router-link>
    </div>

    <cart-order-customer></cart-order-customer>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import CartOrderCustomer from './CartOrderCustomer.vue';

export default {
  components: { CartOrderCustomer },
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
      track_order: false,
      order_id: undefined,
      is_confirmed: undefined,
      is_completed: undefined,
    };
  },

  mounted() {
    this.$root.$on(`cart_food`, this.display_food_item);
  },
};
</script>

<style lang="scss" scoped>
.order_card {
  display: grid;
  border-radius: 5px;
  width: 100%;
  place-items: center;

  > div {
    > img {
      width: 300px;
      height: 300px;
      object-fit: cover;
    }

    > p {
      width: 300px;
    }
  }
}

.header {
  display: grid;
  grid-template-columns: 5fr 1fr;
  place-items: center;
  text-align: center;
}
</style>
