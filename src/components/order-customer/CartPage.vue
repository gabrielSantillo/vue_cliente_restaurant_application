<template>
  <div>
    <section class="cart">
      <div v-for="food in foods" :key="food[`id`]">
        <img :src="food[`image_url`]" />
        <h3>{{ food[`name`] }}</h3>
        <h4>CAD$ {{ food[`price`] }}</h4>
        <button @click="delete_item(food, $event)">Delete</button>
      </div>
    </section>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  methods: {
    /* this function deletes the item in the cart */
    delete_item(food) {
      /* setting the variable with the cookie value of cart */
      let cart = JSON.parse(cookies.get(`cart`));
      /* for loop that will go through the cart */
      for (let i = 0; i < cart.length; i++) {
        /* checking if the the food id is equal to the cart id */
        if (food[`id`] === cart[i][`id`]) {
          /* if yes, splice this item */
          cart.splice(i, 1);
          /* set the cookie again */
          cookies.set(`cart`, JSON.stringify(cart));
          /* setting the variable with the cart value */
          this.foods = cart;
          return;
        }
      }
    },
  },
  mounted() {
    /* on mounted grab the cart cookie value */
    let foods_json = cookies.get(`cart`);
    /* set the variable with the cart value */
    this.foods = JSON.parse(foods_json);

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

        if (this.recent_orders[0][`is_complete`] === 1) {
          cookies.remove(`cart`);
        }
      })
      .catch((error) => {
        error;
        /* on failure show a message */
        alert(`Sorry, something went wrong. Try again.`);
      });
  },

  data() {
    return {
      /* data waiting to be setted */
      foods: undefined,
      recent_orders: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.cart {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  place-items: center;
  row-gap: 50px;
  column-gap: 20px;
  margin-top: 50px;

  > div {
    > img {
      width: 250px;
      height: 250px;
      object-fit: cover;
    }

    > button {
      cursor: pointer;
      margin-top: 10px;
      border: none;
      background: #ad1839;
      color: white;
      padding: 10px;
      width: 80px;
      border-radius: 5px;
    }

    > button:hover {
      background: #bc2848;
    }

    > button:active {
      transform: scale(0.95);
    }
  }
}
</style>
