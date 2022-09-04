<template>
  <div class="div_father">
    <router-link to="/dashboard-restaurant">Dasboard</router-link>
    <section v-if="restaurants_calgary.length >= 1" class="city_restaurant">
      <h1>Calgary</h1>

      <div class="restaurant_cards">
        <div
          v-for="restaurant in restaurants_calgary"
          :key="restaurant[`restaurant_id`]"
        >
          <img :src="restaurant[`banner_url`]" alt="" />
          <h3>{{ restaurant[`name`] }}</h3>
          <p>{{ restaurant[`address`] }}</p>
          <button @click="show_menu_function(restaurant, $event)">Menu</button>
        </div>
      </div>
    </section>

    <section
      section
      v-if="restaurants_toronto.length >= 1"
      class="city_restaurant"
    >
      <h1>Toronto</h1>

      <div class="restaurant_cards">
        <div
          v-for="restaurant in restaurants_toronto"
          :key="restaurant[`restaurant_id`]"
        >
          <img :src="restaurant[`banner_url`]" alt="" />
          <h3>{{ restaurant[`name`] }}</h3>
          <p>{{ restaurant[`address`] }}</p>
          <button @click="show_menu_function(restaurant, $event)">Menu</button>
        </div>
      </div>
    </section>

    <section
      section
      v-if="restaurants_vancouver.length >= 1"
      class="city_restaurant"
    >
      <h1>Vancouver</h1>

      <div class="restaurant_cards">
        <div
          v-for="restaurant in restaurants_vancouver"
          :key="restaurant[`restaurant_id`]"
        >
          <img :src="restaurant[`banner_url`]" alt="" />
          <h3>{{ restaurant[`name`] }}</h3>
          <p>{{ restaurant[`address`] }}</p>
          <button @click="show_menu_function(restaurant, $event)">Menu</button>
        </div>
      </div>
    </section>

    <section v-if="foods.length >= 1" class="menu_card">
      <h1>Menu</h1>
      <div v-for="food in foods" :key="food[`id`]">
        <div class="card">
          <img :src="food[`image_url`]" alt="" />
          <h4>{{ food[`name`] }}</h4>
          <p>{{ food[`description`] }}</p>
          <p>CAD$ {{ food[`price`] }}</p>
        </div>
      </div>
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
      restaurants_calgary: [],
      restaurants_toronto: [],
      restaurants_vancouver: [],
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
        for (let i = 0; i < this.restaurants.length; i++) {
          if (this.restaurants[i][`city`] === `Calgary`) {
            this.restaurants_calgary.push(this.restaurants[i]);
          } else if (this.restaurants[i][`city`] === `Toronto`) {
            this.restaurants_toronto.push(this.restaurants[i]);
          } else {
            this.restaurants_vancouver.push(this.restaurants[i]);
          }
        }
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

.div_father {
  display: grid;
  place-items: center;
}

.city_restaurant {
  display: grid;
  place-items: center;
}
.restaurant_cards {
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  border-radius: 5px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  place-items: center;
  margin-bottom: 30px;
  > div {
    > img {
      width: 300px;
      height: 250px;
      object-fit: cover;
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

.menu_card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  place-items: center;
  row-gap: 50px;
  column-gap: 20px;
}

.card {
  >img {
    width: 300px;
    height: 250px;
    object-fit: cover;
  }
}

</style>
