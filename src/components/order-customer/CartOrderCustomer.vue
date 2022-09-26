<template>
  <div>
    <div class="header">
      <router-link to="/restaurant-menu-options">Menu</router-link>
      <div>
        <button @click="make_order(foods, $event)">Order</button>
      </div>
      <div>
        <button @click="order_status()">Status</button>
      </div>
    </div>
    <div class="line"></div>
    <h1>Cart</h1>

    <cart-page></cart-page>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import CartPage from "./CartPage.vue";
export default {
  components: { CartPage },
  data() {
    return {
      /* data waiting to be setted */
      foods: undefined,
      orders_id: [],
    };
  },
  mounted() {
    /* on mounted grab the cart cookie value */
    let foods_json = cookies.get(`cart`);
    /* set the variable with the cart value */
    this.foods = JSON.parse(foods_json);
  },
  methods: {
    order_status(){
      this.$router.push(`/order-status`);
    },
    /* this function makes the order */
    make_order() {
      let menu_items_id = [];
      /* for loop that goes through to the foods and add the food id in the menu itens array */
      for (let i = 0; i < this.foods.length; i++) {
        menu_items_id.push(this.foods[i][`id`]);
      }
      /* axios request to the client-order API */
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client-order`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`customer_token`)}`,
          },
          method: `POST`,
          data: {
            menu_items: menu_items_id,
            restaurant_id: cookies.get(`restaurant_id`),
          },
        })
        .then((response) => {
          /* on success grab the order_id response */
          this.orders_id.push(response[`data`][`order_id`]);
          /* stringfy the order id */
          let orders_id_json = JSON.stringify(this.orders_id);
          /* set the cookie with the JSON value of the order id */
          cookies.set(`orders_id`, orders_id_json);

          this.$router.push(`/order-status`);
        })
        .catch((error) => {
          error;
          /* on failure show a message */
          alert(`Sorry, an error have occured`);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 20px;

  > div {
    > button {
      cursor: pointer;
      margin-top: 10px;
      border: none;
      background: #13542d;
      color: white;
      padding: 10px;
      width: 80px;
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

.line {
  width: 90%;
  height: 2px;
  background-color: #13542d;
  margin: 20px;
}

h1 {
  text-align: center;
}
.cart {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  place-items: center;
  row-gap: 50px;
  column-gap: 20px;

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
