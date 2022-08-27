<template>
  <div>
    <section
      v-for="restaurant in restaurants"
      :key="restaurant[`restaurant_id`]"
      class="restaurant_cards"
    >
      <div>
        <img :src="restaurant[`banner_url`]" alt="" />
        <h4>{{ restaurant[`city`] }}</h4>
        <p>{{ restaurant[`address`] }}</p>
        <button @click="menu_restaurant_page(restaurant, $event)">Menu</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
export default {
    methods: {
        menu_restaurant_page(restaurant) {
            let restaurant_object_json = JSON.stringify(restaurant);
            cookies.set(`restaurant_object`, restaurant_object_json);
            this.$router.push(`restaurant-menu-options`);
        }
    },
  data() {
    return {
      restaurants: [],
    };
  },
  mounted() {
    axios
      .request({
        url: `https://innotechfoodie.ml/api/restaurants`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
        },
      })
      .then((response) => {
        this.restaurants = response[`data`];
        this.restaurants;
      })
      .catch((error) => {
        alert(`Sorry, an error have occured. Please reload the page.`);
        error;
      });
  },
};
</script>

<style lang="scss" scoped>
.restaurant_cards {
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  border-radius: 5px;
  width: 100%;
  grid-auto-flow: column;

  > div {
    margin: 20px;
    display: grid;
    box-shadow: 8px 8px 16px rgb(191, 191, 191);
    padding: 15px;
    border-radius: 5px;
    width: 30%;
    place-items: center;
    text-align: center;

    > img {
      width: 200px;
      height: 200px;
      max-width: 300px;
      max-height: 300px;
      object-fit: cover;
    }
  }
}
</style>
