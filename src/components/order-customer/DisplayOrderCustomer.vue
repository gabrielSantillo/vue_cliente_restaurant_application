<template>
  <div>
    <div>
      <div class="header">
        <h1>Your Order</h1>
        <router-link to="/restaurant-menu-options">Menu</router-link>
      </div>

      <section class="order_card" v-for="food in foods" :key="food[`id`]">
        <div>
          <img :src="food[`image_url`]" />
          <h3>{{ food[`name`] }}</h3>
          <h4>CAD$ {{ food[`price`] }}</h4>
          <div>
            <button @click="make_order(food, $event)">Order</button>
            <div v-if="track_order"><button>Track Order</button></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
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
          response;
          this.track_order = true;
        })
        .catch((error) => {
          error;
        });
    },
  },
  data() {
    return {
      foods: undefined,
      track_order: false,
    };
  },

  mounted() {
    let foods_json = cookies.get(`selection`);
    this.foods = JSON.parse(foods_json);
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
