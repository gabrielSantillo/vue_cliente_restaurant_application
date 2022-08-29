<template>
  <div>
    <div v-if="foods.length >= 1">
      <div class="header">
        <h1>Your Order</h1>
        <router-link to="/restaurant-menu-options">Menu</router-link>
      </div>

      <section class="order_card"
      v-for="food in foods" :key="food[`id`]">
        <div>
          <img :src="food[`image_url`]" alt="" />
          <h4>{{ food[`name`] }}</h4>
          <p>{{ food[`description`] }}</p>
          <p>CAD$ {{ food[`price`] }}</p>
        </div>
      </section>
    </div>
    <div v-else class="header">
        <h1>{{foods}}</h1>
      <h1>Your cart is empty</h1>
      <router-link to="/restaurant-menu-options">Menu</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
export default {
  data() {
    return {
      foods: [],
    };
  },

  mounted() {
    this.foods.push(cookies.get(`food_object`));
  },
};
</script>

<style lang="scss" scoped>
.order_card {
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  border-radius: 5px;
  width: 100%;
  grid-auto-flow: column;
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
