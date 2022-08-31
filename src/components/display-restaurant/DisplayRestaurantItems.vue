<template>
  <div>
    <div>
      <h1>Restaurant Items</h1>
    </div>

    <section v-for="food in foods" :key="food[`id`]" class="items_card">
      <div>
        <img :src="food[`image_url`]" alt="" />
        <h4>{{ food[`name`] }}</h4>
        <p>{{ food[`description`] }}</p>
        <p>CAD$ {{ food[`price`] }}</p>
        <div>
          <button @click="cookie_food_id(food, $event)">Edit Item</button>
          <button @click="delete_to_true">Delete Item</button>
          </div>
          <div class="confirm_delete_div" v-if="delete_variable === true">
            <button @click="delete_item" :food_id="food[`id`]">
              Confirm
            </button>
            <button @click="delete_to_false">Not delete</button>
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
    delete_to_true() {
      this.delete_variable = true
    },
    delete_to_false() {
      this.delete_variable = false
    },
    cookie_food_id(food) {
      let food_object_json = JSON.stringify(food);
      cookies.set(`food_id`, food_object_json);
      this.$router.push(`/edit-item`);
    },
    delete_item(details) {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/menu`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token_restaurant`)}`,
          },
          method: `DELETE`,
          data: {
            menu_id: `${details[`target`].getAttribute(`food_id`)}`,
          },
        })
        .then((response) => {
          response;
          location.reload();
        })
        .catch((error) => {
          alert(`Sorry, an error have occured. Please reload the page.`);
          error;
        });
    },
  },

  data() {
    return {
      foods: [],
      food_id: undefined,
      delete_variable: false,
    };
  },
  mounted() {
    axios
      .request({
        url: `https://innotechfoodie.ml/api/menu`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
        },
        params: {
          restaurant_id: `${cookies.get(`restaurant_id`)}`,
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
.items_card {
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

    > div {
      display: grid;
      grid-auto-flow: column;
      place-items: center;
      column-gap: 20px;
    }
  }
}

.confirm_delete_div {
  display: grid;
  grid-auto-flow: column;
  column-gap: 20px;
  margin-top: 20px;
}
</style>
