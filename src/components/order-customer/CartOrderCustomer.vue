<template>
  <div>
    <h1>CART IS HERE</h1>
    <section class="order_card" v-for="food in foods" :key="food[`id`]">
      <div>
        <img :src="food[`image_url`]" />
        <h3>{{ food[`name`] }}</h3>
        <h4>CAD$ {{ food[`price`] }}</h4>
      </div>
    </section>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  data() {
    return {
      foods: undefined
    }
  },
  mounted () {
    let foods_json = cookies.get(`cart`);
    this.foods = JSON.parse(foods_json)
  },
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
  },
};
</script>

<style lang="scss" scoped></style>
