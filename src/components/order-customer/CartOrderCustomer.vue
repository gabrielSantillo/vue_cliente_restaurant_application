<template>
  <div>
    <h1>CART IS HERE</h1>
    <section class="order_card" v-for="food in foods" :key="food[`id`]">
      <div>
        <img :src="food[`image_url`]" />
        <h3>{{ food[`name`] }}</h3>
        <h4>CAD$ {{ food[`price`] }}</h4>
        <div>
          <button @click="make_order(food, $event)">Order</button>
          <div v-if="track_order" @click="track_order_function(food, $event)">
            <button>Track Order</button>
            <div
              v-if="is_confirmed !== undefined && is_completed !== undefined"
            >
              <p>{{ is_confirmed }}</p>
              <p>{{ is_completed }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  methods: {
    make_order(food) {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client-order`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token`)}`,
          },
          method: `POST`,
          data: {
            menu_items: `${food[`id`]}`,
            restaurant_id: `${cookies.get(`restaurant_id`)}`,
          },
        })
        .then((response) => {
          this.order_id = response[`data`][`order_id`];
          this.track_order = true;
        })
        .catch((error) => {
          error;
        });
    },
    data() {
      return {
        foods: undefined,
      };
    },
    mounted() {
        let food_json = cookies.get(`cart_food`);
        this.foods = JSON.parse(food_json)
    },
  },
};
</script>

<style lang="scss" scoped></style>
