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

    
  },

  data() {
    return {
      /* data waiting to be setted */
      foods: undefined,
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
