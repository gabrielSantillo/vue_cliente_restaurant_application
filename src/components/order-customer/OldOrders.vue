<template>
  <div>
    <div class="order_history">
      <button @click="display_old_orders">Order History</button>
      <section v-if="show_old_orders === true">
        <section
          v-for="order_id in orders_id_array"
          :key="order_id"
          class="old_orders"
        >
          <div
            v-for="item in past_orders_by_id[order_id]"
            :key="item"
            class="card red"
          >
            <h3>{{ item[`name`] }}</h3>
            <p>CAD$ {{ item[`price`] }}</p>
            <h4 v-if="item[`is_confirmed`] === 0">Not confirmed</h4>
            <h4 v-else>Confirmed</h4>
            <h4 v-if="item[`is_complete`] === 0">Not completed</h4>
            <h4 v-else>Completed</h4>
          </div>
          <br /><br /><br />
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  data() {
    return {
      /* these variables are expecting to be setted */
      old_orders: [],
      show_old_orders: false,
      orders_id_array: [],
      past_orders_by_id: {},
    };
  },

  mounted() {
    /* on mounted axios request to the client-order API */
    axios
      .request({
        url: `https://innotechfoodie.ml/api/client-order`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
          token: `${cookies.get(`customer_token`)}`,
        },
      })
      .then((response) => {
        /* on success get the cookie with the order id value */
        let orders_id = JSON.parse(cookies.get(`orders_id`));
        /* loop through orders id length */
        for (let i = 0; i < orders_id.length; i++) {
          /* loop through the API response at data */
          for (let j = 0; j < response[`data`].length; j++) {
            /* checks if the order id in the api is equal the cookie order id */
            if (response[`data`][j][`order_id`] !== orders_id[i]) {
              /* if yes, push the food to the recent_orders varaible at the API response */
              this.old_orders.push(response[`data`][j]);
            }
          }
        }

        /* sorting the old orders */
        this.old_orders.sort(function (a, b) {
          if (a.order_id > b.order_id) {
            return -1;
          } else {
            return true;
          }
        });

        /* adding the order ids to an array */
        for (let i = 0; i < this.old_orders.length; i++) {
          this.orders_id_array.push(`${this.old_orders[i][`order_id`]}`);
        }

        /* reversing the orders id array */
        this.orders_id_array.reverse();
        /* making this arrays of string be an array of number */
        this.orders_id_array = this.orders_id_array.map(Number);

        /* for loop that goes to the array of orders id and set as the key the order id and as the value empty arrays */
        for (let i = 0; i < this.orders_id_array.length; i++) {
          this.past_orders_by_id[this.orders_id_array[i]] = [];
        }

        /* for loop that through the orders id array */
        for (let i = 0; i < this.orders_id_array.length; i++) {
          /* for loop through old orders */
          for (let j = 0; j < this.old_orders.length; j++) {
            /* checks if they have the same order id */
            if (this.orders_id_array[i] === this.old_orders[j][`order_id`]) {
              /* if yes, push this order to the key order id */
              this.past_orders_by_id[this.orders_id_array[i]].push(
                this.old_orders[j]
              );
            }
          }
        }
      })
      .catch((error) => {
        error;
        /* on failure show a message */
        alert(`Sorry, something went wrong. Try again.`);
      });
  },

  methods: {
    /* this function set the variable to true */
    display_old_orders() {
      this.show_old_orders = !this.show_old_orders;
    },
  },
};
</script>

<style lang="scss" scoped>
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
