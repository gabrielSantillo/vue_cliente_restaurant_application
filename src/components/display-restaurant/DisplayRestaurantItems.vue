<template>
  <div>
    <section class="items_card">
      <div v-for="food in foods" :key="food[`id`]">
        <img :src="food[`image_url`]" alt="" />
        <h4>{{ food[`name`] }}</h4>
        <p>{{ food[`description`] }}</p>
        <p>CAD$ {{ food[`price`] }}</p>
        <div class="buttons">
          <button @click="cookie_food_id(food, $event)" class="edit_button">
            Edit Item
          </button>
          <button @click="delete_to_true" class="delete_button">
            Delete Item
          </button>
        </div>
        <div class="buttons" v-if="delete_variable === true">
          <button
            @click="delete_item"
            :food_id="food[`id`]"
            class="delete_button"
          >
            Confirm
          </button>
          <button @click="delete_to_false" class="delete_button">Not delete</button>
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
      this.delete_variable = true;
    },
    delete_to_false() {
      this.delete_variable = false;
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
img {
  width: 100%;
  height: 250px;
}
.items_card {
  margin-top: 50px;
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  > img {
    object-fit: cover;
    justify-self: center;
  }
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 25px;
  place-items: center;
  margin-top: 25px;
  margin-bottom: 40px;
}

.edit_button {
  cursor: pointer;
  margin-top: 10px;
  border: none;
  background: #13542d;
  color: white;
  padding: 10px;
  width: 100px;
  border-radius: 5px;
}

.edit_button:hover {
  background: #196838;
}

> button:active {
  transform: scale(0.95);
}

.delete_button {
  cursor: pointer;
  margin-top: 10px;
  border: none;
  background: #ad1839;
  color: white;
  padding: 10px;
  width: 100px;
  border-radius: 5px;
}

.delete_button:hover {
  background: #bc2848;
}

> .delete_button:active {
  transform: scale(0.95);
}

.confirm_delete_div {
  display: grid;
  grid-auto-flow: column;
  column-gap: 20px;
  margin-top: 20px;
}
</style>
