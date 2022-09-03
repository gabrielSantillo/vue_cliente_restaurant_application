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
      foods: undefined,
      order_made: false,
      orders_id: [],
    };
  },
  mounted() {
    let foods_json = cookies.get(`cart`);
    this.foods = JSON.parse(foods_json);

    if (cookies.get(`order_made`) !== null) {
      this.order_made = true;
    }
  },
  methods: {
    delete_item(food) {
      let cart = JSON.parse(cookies.get(`cart`));
      for (let i = 0; i < cart.length; i++) {
        if (food[`id`] === cart[i][`id`]) {
          cart.splice(i, 1);
          cookies.set(`cart`, JSON.stringify(cart));
          this.foods = cart;
          return;
        }
      }
    },
    order_status() {
      this.$router.push(`/order-status`);
    },
    make_order() {
      let menu_items_id = [];
      for (let i = 0; i < this.foods.length; i++) {
        menu_items_id.push(this.foods[i][`id`]);
      }
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
          this.orders_id.push(response[`data`][`order_id`]);
          let orders_id_json = JSON.stringify(this.orders_id);
          cookies.set(`orders_id`, orders_id_json);
          cookies.set(`order_made`, `yes`);
          location.reload();
        })
        .catch((error) => {
          error;
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
