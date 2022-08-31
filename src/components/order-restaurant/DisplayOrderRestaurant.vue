<template>
  <div>
    <div class="header">
      <h1>Orders</h1>
      <router-link to="dashboard-restaurant">Dashboard</router-link>
    </div>

    <div class="orders">
      <h1>Not confirmed</h1>
      <section v-for="order in is_not_confirmed" :key="order[`order_id`]">
        <h3>Item: {{ order[`name`] }}</h3>
        <h4>CAD$ {{ order[`price`] }}</h4>
        <div>
          <button @click="confirm_order(order, $event)">Confirm</button>
        </div>
      </section>
    </div>

    <div class="orders">
      <h1>Not Completed</h1>
      <section v-for="order in is_not_completed" :key="order[`order_id`]">
        <h3>Item: {{ order[`name`] }}</h3>
        <h4>CAD$ {{ order[`price`] }}</h4>
        <div>
          <button @click="complete_order(order, $event)">Complete</button>
        </div>
      </section>
    </div>

    <div class="orders" v-if="orders.length >= 1">
      <h1>Completed</h1>
      <section v-for="order in is_completed" :key="order[`order_id`]">
        <h3>Item: {{ order[`name`] }}</h3>
        <h4>CAD$ {{ order[`price`] }}</h4>
      </section>
    </div>

    <div v-else>
      <h1>You have no orders yet.</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    complete_order(order) {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/restaurant-order`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token_restaurant`)}`,
          },
          method: `PATCH`,
          data: {
            order_id: order[`order_id`],
            is_complete: "true",
          },
        })
        .then((response) => {
          response;
          location.reload();
        })
        .catch((error) => {
          error;
          alert(`Sorry an error have occured. Please, refresh the page`);
        });
    },
    confirm_order(order) {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/restaurant-order`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token_restaurant`)}`,
          },
          method: `PATCH`,
          data: {
            order_id: order[`order_id`],
            is_confirmed: "true",
          },
        })
        .then((response) => {
          response;
          location.reload();
        })
        .catch((error) => {
          error;
          alert(`Sorry an error have occured. Please, refresh the page`);
        });
    },
  },
  data() {
    return {
      orders: [],
      is_confirmed: [],
      is_not_confirmed: [],
      is_completed: [],
      is_not_completed: [],
    };
  },
  mounted() {
    axios
      .request({
        url: `https://innotechfoodie.ml/api/restaurant-order`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
          token: `${cookies.get(`log_in_token_restaurant`)}`,
        },
      })
      .then((response) => {
        this.orders = response[`data`];
        for (let i = 0; i < this.orders.length; i++) {
          if (this.orders[i][`is_confirmed`] === 0) {
            this.is_not_confirmed.push(this.orders[i]);
          } else if (
            this.orders[i][`is_confirmed`] === 1 &&
            this.orders[i][`is_complete`] === 0
          ) {
            this.is_not_completed.push(this.orders[i]);
          } else if(this.orders[i][`is_confirmed`] === 1 &&
            this.orders[i][`is_complete`] === 1) {
              this.is_completed.push(this.orders[i])
            }
        }
      })
      .catch((error) => {
        error;
        alert(`Sorry an error have occured. Please, refresh the page`);
      });
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
}

.orders {
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  column-gap: 10px;

  > section {
    box-shadow: 8px 8px 16px rgb(188, 188, 188);
    padding: 5px;
  }
}
</style>
