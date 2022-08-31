<template>
  <div>
    <div>
      <div class="header">
        <h1>Your Order</h1>
        <router-link to="/restaurant-menu-options">Menu</router-link>
      </div>

      <section v-for="food in cart" :key="food[`id`]">
        <img :src="food[`image_url`]" />
        <h3>{{ food[`name`] }}</h3>
        <h4>CAD$ {{ food[`price`] }}</h4>
      </section>
      
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    display_food_item(food) {
      let food_object = JSON.parse(food);
      this.cart.push(food_object);
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
