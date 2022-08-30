<template>
  <div>
    <section>
      <div class="header">
        <h1>Restaurant</h1>
        <router-link to="/menu">Back to Menu</router-link>
        <router-link to="/cart-order">Cart</router-link>
      </div>

      <div>
        <img :src="banner_url" class="banner" />
        <h3>{{ name }}</h3>
        <h4>{{ city }}</h4>
        <p>{{ bio }}</p>
        <p>{{ phone_number }}</p>
        <p>{{ address }}</p>
      </div>

      <section class="menu_card">
        <div v-for="food in foods" :key="food[`id`]">
          <img :src="food[`image_url`]" alt="" />
          <h4>{{ food[`name`] }}</h4>
          <p>{{ food[`description`] }}</p>
          <p>CAD$ {{ food[`price`] }}</p>
          <button @click="add_to_cart(food, $event)">Order</button>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  methods: {
    add_to_cart(food) {
      this.cart.push(food);
      let cart_json = JSON.stringify(this.cart);
      cookies.set(`selection`, cart_json);
      cookies.set(`restaurant_id`, this.restaurant_id);
    },
  },
  data() {
    return {
      address: undefined,
      banner_url: undefined,
      bio: undefined,
      city: undefined,
      email: undefined,
      name: undefined,
      phone_number: undefined,
      profile_url: undefined,
      restaurant_id: undefined,
      foods: [],
      food_object_json: [],
      cart: [],
    };
  },
  mounted() {
    let restaurant_object = cookies.get(`restaurant_object`);
    this.address = restaurant_object[`address`];
    this.banner_url = restaurant_object[`banner_url`];
    this.bio = restaurant_object[`bio`];
    this.city = restaurant_object[`city`];
    this.name = restaurant_object[`address`];
    this.phone_number = restaurant_object[`phone_number`];
    this.profile_url = restaurant_object[`profile`];
    this.restaurant_id = restaurant_object[`restaurant_id`];

    axios
      .request({
        url: `https://innotechfoodie.ml/api/menu`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
        },
        params: {
          restaurant_id: `${this.restaurant_id}`,
        },
      })
      .then((response) => {
        this.foods = response[`data`];
      })
      .catch((error) => {
        alert(`Sorry, an error have occured. Please reload the page.`);
        error;
      });
  },
};
</script>

<style lang="scss" scoped>
.menu_card {
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

.banner {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.header {
  display: grid;
  grid-template-columns: 5fr 1fr 1fr;
  place-items: center;
  text-align: center;
}
</style>
