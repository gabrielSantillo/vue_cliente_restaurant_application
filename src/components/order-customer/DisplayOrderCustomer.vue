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
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    track_order_function() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client-order`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token`)}`,
          },
        })
        .then((response) => {
          for (let i = 0; i < response[`data`].length; i++) {
            if (response[`data`][i][`order_id`] === this.order_id) {
              this.is_confirmed = response[`data`][i][`is_confirmed`];
              this.is_completed = response[`data`][i][`is_complete`];

              if( this.is_confirmed === 0) {
                this.is_confirmed = `Order not confirmed`
              } else {
                this.is_confirmed = `Order Confirmed`
              }

              if(this.is_completed === 0) {
                this.is_completed = `Order not completed`
              } else {
                this.is_completed = `Order completed`
              }
            }
          }
        })
        .catch((error) => {
          error;
        });
    },
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
  data() {
    return {
      foods: undefined,
      track_order: false,
      order_id: undefined,
      is_confirmed: undefined,
      is_completed: undefined,
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
