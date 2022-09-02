<template>
  <div>
    <div class="header">
      <h1>Order Status</h1>
      <router-link to="/menu">Menu</router-link>
    </div>

    <section>
      <div
        v-for="order in recent_orders"
        :key="order[`order_id`]"
        class="orders_div"
      >
        <h3>{{ order[`name`] }}</h3>
        <p>CAD$ {{ order[`price`] }}</p>
        <h4 v-if="order[`is_confirmed`] === 0">Not confirmed</h4>
        <h4 v-else>Confirmed</h4>
        <h4 v-if="order[`is_complete`] === 0">Not completed</h4>
        <h4 v-else>Completed</h4>
      </div>
    </section>

    <div class="order_history">
      <button @click="display_old_orders">Order History</button>
      <section v-if="show_old_orders">
        <div><h1>Order History</h1></div>
        <div
          v-for="order in old_orders"
          :key="order[`order_id`]"
          class="old_orders"
        >
          <h3>{{ order[`name`] }}</h3>
          <p>CAD$ {{ order[`price`] }}</p>
          <h4 v-if="order[`is_confirmed`] === 0">Not confirmed</h4>
          <h4 v-else>Confirmed</h4>
          <h4 v-if="order[`is_complete`] === 0">Not completed</h4>
          <h4 v-else>Completed</h4>
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
        display_old_orders() {
            this.show_old_orders = !this.show_old_orders
        }
    },
  data() {
    return {
      recent_orders: [],
      old_orders: [],
      show_old_orders: false,
      max_order_id: []
    };
  },
  mounted() {
    axios
      .request({
        url: `https://innotechfoodie.ml/api/client-order`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
          token: `${cookies.get(`log_in_token`)}`,
        },
      })
      .then((response) => {
        let orders_id = JSON.parse(cookies.get(`orders_id`));
        for (let i = 0; i < orders_id.length; i++) {
          for (let j = 0; j < response[`data`].length; j++) {
            if (response[`data`][j][`order_id`] === orders_id[i]) {
              this.recent_orders.push(response[`data`][j]);
            } else {
              this.old_orders.push(response[`data`][j]);
            }
          }
        }

        
        this.max_order_id = this.old_orders.reduce(function(prev, current) {
            return prev.order_id > current.order_id ? prev : current;
        })
        
        console.log(this.max_order_id);
      })
      .catch((error) => {
        error;
      });
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 5fr 1fr;
  place-items: center;
}

.orders_div {
  box-shadow: 8px 8px 16px rgb(255, 210, 210);
  padding: 10px;
  margin: 10px;
  width: 150px;
  text-align: center;
  border-radius: 25px;
}

.order_history {
  margin-top: 50px;
  display: grid;
  place-items: center;
  background-color: rgb(215, 215, 215);
  border-radius: 10px;
  padding: 20px;
}

.old_orders {
  padding: 10px;
  margin: 10px;
  width: 150px;
  text-align: center;
  border-radius: 25px;
  background-color: white;
}
</style>
