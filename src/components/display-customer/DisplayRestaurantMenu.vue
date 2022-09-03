<template>
  <div>
    <section>
      <div class="header">
        <router-link to="/menu">Menu</router-link>
        <router-link to="/cart-order">Cart</router-link>
      </div>

      <div class="restaurant">
        <img :src="banner_url" />
        <div>
          <div>
            <h3>{{ name }}</h3>
            <h4>{{ city }}</h4>
          </div>
          <div>
            <p>{{ bio }}</p>
            <p>{{ address }}</p>
          </div>
        </div>
        <p>{{ phone_number }}</p>
        <div class="line"></div>
      </div>

      <section class="menu_card">
        <div v-for="food in foods" :key="food[`id`]">
          <img :src="food[`image_url`]" alt="" />
          <h4>{{ food[`name`] }}</h4>
          <p>{{ food[`description`] }}</p>
          <p>CAD$ {{ food[`price`] }}</p>
          <button @click="add_to_cart(food, $event)">Add to cart</button>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  methods: {
    add_to_cart(food) {
      if (cookies.get(`cart`) === null) {
        this.cart.push(food);
      } else {
        let cart_array = JSON.parse(cookies.get(`cart`));
        for (let i = 0; i < cart_array.length; i++) {
          this.cart.push(cart_array[i]);
        }
        this.cart.push(food);
      }

      let cart_json = JSON.stringify(this.cart);
      cookies.set(`cart`, cart_json);
    },
  },
  data() {
    return {
      address: undefined,
      banner_url: undefined,
      bio: undefined,
      city: undefined,
      email: undefined,
      name: undefined,
      phone_number: undefined,
      profile_url: undefined,
      restaurant_id: undefined,
      foods: [],
      food_object_json: [],
      cart: [],
    };
  },
  mounted() {
    let restaurant_object = cookies.get(`restaurant_object`);
    this.address = restaurant_object[`address`];
    this.banner_url = restaurant_object[`banner_url`];
    this.bio = restaurant_object[`bio`];
    this.city = restaurant_object[`city`];
    this.name = restaurant_object[`address`];
    this.phone_number = restaurant_object[`phone_number`];
    this.profile_url = restaurant_object[`profile`];
    this.restaurant_id = restaurant_object[`restaurant_id`];

    axios
      .request({
        url: `https://innotechfoodie.ml/api/menu`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
        },
        params: {
          restaurant_id: `${this.restaurant_id}`,
        },
      })
      .then((response) => {
        this.foods = response[`data`];
      })
      .catch((error) => {
        alert(`Sorry, an error have occured. Please reload the page.`);
        error;
      });
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}

.header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  text-align: center;
  height: 50px;
}

.restaurant {
  display: grid;
  margin-top: 50px;
  place-items: center;

  >img {
    width: 100%;
    object-fit: cover;
  }
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    column-gap: 30px;
  }
}

.line {
  width: 100%;
  height: 2px;
  background-color: #13542d;
  margin-bottom: 5px;
}

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

    >button {
      cursor: pointer;
      margin-top: 10px;
      border: none;
      background: #13542D;
      color: white;
      padding: 10px;
      width: 100px;
      border-radius: 5px;
    }

    >button:hover {
      background: #196838;
    }

    >button:active {
      transform: scale(.95);
    }

  }
}
</style>
