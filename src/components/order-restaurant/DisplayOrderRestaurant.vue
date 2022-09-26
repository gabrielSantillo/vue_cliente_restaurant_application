<template>
  <div>
    <div class="header">
      <h1>Orders</h1>
      <router-link to="dashboard-restaurant">Dashboard</router-link>
    </div>

    <div class="red_line"></div>

    <confirm-button></confirm-button>

    <div class="green_line"></div>

    <complete-button></complete-button>

    <div class="gray_line"></div>

    <div class="orders" v-if="orders.length >= 1">
      <section
        v-for="order in is_completed"
        :key="order[`order_id`]"
        class="orders_card gray"
      >
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
import ConfirmButton from './ConfirmButton.vue';
import CompleteButton from './CompleteButton.vue';
export default {
  components: { ConfirmButton, CompleteButton },
  methods: {
    /* this function update the value of is_complete to true */
    complete_order(order) {
      /* axios request to the restaurant-order API */
      axios
        .request({
          url: `https://innotechfoodie.ml/api/restaurant-order`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`restaurant_token`)}`,
          },
          method: `PATCH`,
          /* the data that update the variable is_complete */
          data: {
            order_id: order[`order_id`],
            is_complete: "true",
          },
        })
        .then((response) => {
          /* on success, reload the page */
          response;
          location.reload();
        })
        .catch((error) => {
          error;
          /* on failure show a message */
          alert(`Sorry an error have occured. Please, refresh the page`);
        });
    },

  },
  data() {
    return {
      /* data wainting to be setted */
      orders: [],
      is_confirmed: [],
      is_not_confirmed: [],
      is_completed: [],
      is_not_completed: [],
    };
  },
  mounted() {
    /* on mounted axios request to the restaurant order API */
    axios
      .request({
        url: `https://innotechfoodie.ml/api/restaurant-order`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
          token: `${cookies.get(`restaurant_token`)}`,
        },
      })
      .then((response) => {
        /* on success get the order at response at data */
        this.orders = response[`data`];
        /* loop through this order */
        for (let i = 0; i < this.orders.length; i++) {
          /* if at is_confirmed is zero */
          if (this.orders[i][`is_confirmed`] === 0) {
            /* if yes, push this order to is not confirmed variable */
            this.is_not_confirmed.push(this.orders[i]);
          } else if (
            /* if is confirmed but not completed */
            this.orders[i][`is_confirmed`] === 1 &&
            this.orders[i][`is_complete`] === 0
          ) {
            /* push to the order to not completed variable */
            this.is_not_completed.push(this.orders[i]);
          } else if (
            /* if is confirmed and complete */
            this.orders[i][`is_confirmed`] === 1 &&
            this.orders[i][`is_complete`] === 1
          ) {
            /* push to the is completd variable */
            this.is_completed.push(this.orders[i]);
          }
        }

        /* sorting the order */
        this.orders.sort(function (a, b) {
          if (a.order_id > b.order_id) {
            return -1;
          } else {
            return true;
          }
        });

      })
      .catch((error) => {
        /* on failure show a message */
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
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: 100px;

  > section {
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
}

.orders_card {
  display: grid;
  place-items: center;
  border-radius: 5px;
  box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);
  padding: 10px;
  width: 280px;
  margin: 20px;
}

.red {
  border-left: 3px solid #ad1839;
}

.green {
  border-left: 3px solid #409c1f;
}

.gray {
  border-left: 3px solid gray;
}

.red_line {
  width: 100%;
  background: #ad1839;
  height: 2px;
}

.green_line {
  width: 100%;
  background: #409c1f;
  height: 2px;
}

.gray_line {
  width: 100%;
  background: gray;
  height: 2px;
}
</style>
