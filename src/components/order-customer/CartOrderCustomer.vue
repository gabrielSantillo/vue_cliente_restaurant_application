<template>
  <div>
    <section class="order_card" v-for="food in foods" :key="food[`id`]">
      <div>
        <img :src="food[`image_url`]" />
        <h3>{{ food[`name`] }}</h3>
        <h4>CAD$ {{ food[`price`] }}</h4>
        <div>
          <button @click="make_order(food, $event)">Order</button>
        </div>
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
          response[`data`][`order_id`];
        })
        .catch((error) => {
          error;
        });
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
