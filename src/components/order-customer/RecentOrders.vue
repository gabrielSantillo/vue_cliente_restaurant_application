<template>
  <div>
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
  </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"
export default {
  data() {
    return {
      /* these variables are expecting to be setted */
      recent_orders: [],
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
            if (response[`data`][j][`order_id`] === orders_id[i]) {
              /* if yes, push the food to the recent_orders varaible at the API response */
              this.recent_orders.push(response[`data`][j]);
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
};
</script>

<style lang="scss" scoped>
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
</style>
