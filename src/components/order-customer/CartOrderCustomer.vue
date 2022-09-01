<template>
  <div>
      <h1>Your Cart</h1>
      <router-link to="/restaurant-menu-options">Menu</router-link>
    <section class="order_card" v-for="food in foods" :key="food[`id`]">
      <div>
        <img :src="food[`image_url`]" />
        <h3>{{ food[`name`] }}</h3>
        <h4>CAD$ {{ food[`price`] }}</h4>
        <button>Delete</button>
      </div>
    </section>
    <div v-if="order_made === false">
      <button @click="make_order(foods, $event)">Order</button>
    </div>
    <div v-else>
      <button @click="order_status">Order Status</button>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  data() {
    return {
      foods: undefined,
      order_made: false,
      orders_id: []
    };
  },
  mounted() {
    let foods_json = cookies.get(`cart`);
    this.foods = JSON.parse(foods_json);

    if(cookies.get(`order_made`) !== null) {
      this.order_made = true
    }
  },
  methods: {
    order_status() {
      this.$router.push(`/order-status`)
    },
    make_order() {
      for (let i = 0; i < this.foods.length; i++) {
        axios
          .request({
            url: `https://innotechfoodie.ml/api/client-order`,
            headers: {
              "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
              token: `${cookies.get(`log_in_token`)}`,
            },
            method: `POST`,
            data: {
              menu_items: `${this.foods[i][`id`]}`,
              restaurant_id: `${cookies.get(`restaurant_id`)}`,
            },
          })
          .then((response) => {
            this.orders_id.push(response[`data`][`order_id`])
            let orders_id_json = JSON.stringify(this.orders_id)
            cookies.set(`orders_id`, orders_id_json)
            cookies.set(`order_made`, `yes`);
            location.reload();
          })
          .catch((error) => {
            error;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.order_card {
  display: grid;
  border-radius: 5px;
  width: 100%;
  place-items: center;
  margin-bottom: 25px;

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
</style>
