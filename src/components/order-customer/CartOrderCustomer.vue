<template>
  <div>
    <div class="header">
      <router-link to="/restaurant-menu-options">Menu</router-link>
      <div v-if="order_made === false">
        <button @click="make_order(foods, $event)">Order</button>
      </div>
      <div v-else>
        <button @click="order_status">Order Status</button>
      </div>
    </div>
    <div class="line"></div>
    <h1>Cart</h1>
    
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
  data() {
    return {
      /* data waiting to be setted */
      foods: undefined,
      order_made: false,
      orders_id: [],
    };
  },
  mounted() {
    /* on mounted grab the cart cookie value */
    let foods_json = cookies.get(`cart`);
    /* set the variable with the cart value */
    this.foods = JSON.parse(foods_json);

/* check if the order_made cookie is different that null */
    if (cookies.get(`order_made`) !== null) {
      /* if yes, set the variable to true */
      this.order_made = true;
    }
  },
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
    /* leaves the user to the order status page */
    order_status() {
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
            token: `${cookies.get(`log_in_token`)}`,
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
          /* set a cookie of order_made to yes */
          cookies.set(`order_made`, `yes`);
          /* reloead the page */
          location.reload();
        })
        .catch((error) => {
          error;
          /* on failure show a message */
          alert(`Sorry, an error have occured`)
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;

  > div {
    > button {
      cursor: pointer;
      margin-top: 10px;
      border: none;
      background: #13542d;
      color: white;
      padding: 10px;
      width: 120px;
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
