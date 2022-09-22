<template>
  <div>
    <section class="menu_card">
      <div v-for="(food, index) in foods" :key="index">
        <img :src="food[`image_url`]" alt="" />
        <h4>{{ food[`name`] }}</h4>
        <p>{{ food[`description`] }}</p>
        <p>CAD$ {{ food[`price`] }}</p>
        <button @click="add_to_cart(food, $event)">Add to cart</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    /* function that add the item to the cart */
    add_to_cart(food) {
      /*check if the cookie cart is not empty */
      if (cookies.get(`cart`) === null) {
        /* if yes, add the item in the array */
        this.cart.push(food);
      } else {
      /* if not, get the cookie cart as JSON and turn into array again */
        let cart_array = JSON.parse(cookies.get(`cart`));
        /* for loop that goes the cart arrays and adds the itens in the cart again*/
        for (let i = 0; i < cart_array.length; i++) {
          this.cart.push(cart_array[i]);
        }
        /* add the food that was just clicked to be added */
        this.cart.push(food);
      }

      /* transform the array in a JSON */
      let cart_json = JSON.stringify(this.cart);
      /* set the cookie cart with the JSON value */
      cookies.set(`cart`, cart_json);
    },
  },
  data() {
    return {
      foods: [],
      cart: []
    };
  },
  mounted() {
    axios
      .request({
        /* axios request to the menu API */
        url: `https://innotechfoodie.ml/api/menu`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
        },
        params: {
          restaurant_id: `${cookies.get(`restaurant_id`)}`,
        },
      })
      .then((response) => {
        /* on success get the items that are in response at data */
        this.foods = response[`data`];
      })
      .catch((error) => {
        /* on failure show a message */
        alert(`Sorry, an error have occured. Please reload the page.`);
        error;
      });
  },
};
</script>

<style lang="scss" scoped>
.menu_card {
  margin-top: 50px;
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  border-radius: 5px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  place-items: center;

  > div {
    > img {
      width: 300px;
      height: 300px;
      object-fit: cover;
    }

    > p {
      width: 300px;
    }

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
</style>
