<template>
  <div>
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
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
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
          if (
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

  data() {
    return {
      /* data wainting to be setted */
      orders: [],
      is_completed: [],
    };
  },
};
</script>

<style lang="scss" scoped>
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

.gray {
  border-left: 3px solid gray;
}
</style>
