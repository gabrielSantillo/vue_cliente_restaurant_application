<template>
  <div>
    <div class="header">
      <h1>Order Status</h1>
      <router-link to="/menu">Menu</router-link>
    </div>

    <section class="orders_div">
      <div
        v-for="order in recent_orders"
        :key="order[`order_id`]"
        class="card green"
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

      <section v-if="show_old_orders" class="old_orders">
        <div
          v-for="order in old_orders"
          :key="order[`order_id`]"
          class="card red"
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
      this.show_old_orders = !this.show_old_orders;
    },
  },
  data() {
    return {
      recent_orders: [],
      old_orders: [],
      show_old_orders: false,
      order_history: undefined,
      orders_id_array: [],
      past_orders_by_id: {
        94: []
      },
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

        this.old_orders.sort(function (a, b) {
          if (a.order_id > b.order_id) {
            return -1;
          } else {
            return true;
          }
        });

        for (let i = 0; i < this.old_orders.length; i++) {
          this.orders_id_array.push(`${this.old_orders[i][`order_id`]}`);
        }

        this.orders_id_array = [...new Set(this.orders_id_array)];

        for (let i = 0; i < this.orders_id_array.length; i++) {
          this.past_orders_by_id.orders_id_array[i] = [];
        }

        console.log(`testing`, this.past_orders_by_id)

        /*
        let higher_id = this.old_orders.reduce(function (prev, current) {
          return prev.order_id > current.order_id ? prev : current;
        });
        */

        /*
          this.order_history = this.old_orders.filter(
            (order) => order[`order_id`] <= higher_id[`order_id`]
          );
        */
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
  margin-top: 50px;
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  border-radius: 5px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  place-items: center;

  > .card {
    border-radius: 5px;
    box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);
    padding: 30px;
    margin: 20px;
    width: 200px;
    transition: all 0.3s ease-out;
  }

  > .card h4 {
    color: #a3a5ae;
  }

  > .green {
    border-left: 3px solid #3bb54a;
  }
}

.order_history {
  margin-top: 50px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  padding: 20px;

  > button {
    cursor: pointer;
    margin-top: 10px;
    border: none;
    background: #13542d;
    color: white;
    padding: 10px;
    width: 100px;
    border-radius: 5px;
  }

  > button:hover {
    background: #196838;
  }

  > button:active {
    transform: scale(0.95);
  }
}

.old_orders {
  margin-top: 50px;
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  border-radius: 5px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  place-items: center;

  > .card {
    border-radius: 5px;
    box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);
    padding: 30px;
    margin: 20px;
    width: 200px;
  }

  > .card h4 {
    color: #a3a5ae;
  }

  > .red {
    border-left: 3px solid #b3404a;
  }
}
</style>
