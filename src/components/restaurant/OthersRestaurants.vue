<template>
  <div>
    <section
      v-for="restaurant in restaurants"
      :key="restaurant[`restaurant_id`]"
      class="restaurant_cards"
    >
      <div>
        <img :src="restaurant[`banner_url`]" alt="" />
        <h3>{{ restaurant[`name`] }}</h3>
        <h4>{{ restaurant[`city`] }}</h4>
        <p>{{ restaurant[`address`] }}</p>
        <button @click="show_menu_function(restaurant, $event)">Menu</button>
      </div>
    </section>

    <section v-if="foods.length >= 1" class="menu_card">
      <h1>Menu</h1>
      <div v-for="food in foods" :key="food[`id`]">
        <img :src="food[`image_url`]" alt="" />
        <h4>{{ food[`name`] }}</h4>
        <p>{{ food[`description`] }}</p>
        <p>CAD$ {{ food[`price`] }}</p>
      </div>
    </section>

    <section v-else>
        <h1>This restaurant doesn't have any item registered yet.</h1>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    show_menu_function(restaurant) {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/menu`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
          },
          params: {
            restaurant_id: `${restaurant[`restaurant_id`]}`,
          },
        })
        .then((response) => {
          this.foods = response[`data`];
          this.show_menu = true;
        })
        .catch((error) => {
          alert(`Sorry, an error have occured. Please reload the page.`);
          error;
        });
    },
  },
  data() {
    return {
      restaurants: [],
      show_menu: false,
      foods: [],
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

.menu_card {
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  border-radius: 5px;
  width: 100%;
  grid-auto-flow: column;
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
  }
}
</style>
