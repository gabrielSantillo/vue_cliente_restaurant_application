<template>
  <div class="div_father">
    <section class="restaurant_cards">
      <div
        v-for="restaurant in restaurants"
        :key="restaurant[`restaurant_id`]"
        class="card"
      >
        <img :src="restaurant[`banner_url`]" class="restaurant_img" />
        <div>
          <div>
            <h3>{{ restaurant[`name`] }}</h3>
          <h4>{{ restaurant[`city`] }}</h4>
          <p>{{ restaurant[`address`] }}</p>
          </div>
          <button @click="menu_restaurant_page(restaurant, $event)">
            Menu
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    /* this function leaves the user to the restaurant page */
    menu_restaurant_page(restaurant) {
      /* stringfy the restaurant object */
      let restaurant_object_json = JSON.stringify(restaurant);
      /* set the cookie with the JSON restaurant value */
      cookies.set(`restaurant_object`, restaurant_object_json);
      /* set a cookie with the restaurant_id value */
      cookies.set(`restaurant_id`, `${restaurant[`restaurant_id`]}`);
      /* leave the user to restaraunt menu options */
      this.$router.push(`restaurant-menu-options`);
    },
  },
  data() {
    return {
      /* a variable that will receive all restaurant objects */
      restaurants: [],
    };
  },
  mounted() {
    /* axios request to the restaurant API */
    axios
      .request({
        url: `https://innotechfoodie.ml/api/restaurants`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
        },
      })
      .then((response) => {
        /* on success grab the value of response at data */
        this.restaurants = response[`data`];
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
img {
  width: 90%;
}

.mobile {
  width: 100%;
}
.restaurant_cards {
  display: grid;
  height: 35%;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  margin-top: 50px;
  place-items: center;
  row-gap: 10px;

  > .card {
    display: grid;
    place-items: start;
    > img {
      object-fit: cover;
      background-size: cover;
    }

    > div {
      display: grid;
       grid-template-columns: 1fr 1fr;
      place-items: center;
      width: 90%;

    >button {
      cursor: pointer;
      margin-top: 10px;
      border: none;
      background: #13542D;
      color: white;
      padding: 10px;
      width: 80px;
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
}
</style>
