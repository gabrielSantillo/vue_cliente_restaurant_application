<template>
  <div>
    <section>
      <div class="food" v-if="item_eddited === false">
        <img :src="image_url" />
        <h4>{{ name }}</h4>
        <p>{{ description }}</p>
        <p>CAD$ {{ price }}</p>
      </div>

      <div v-else class="response">
        <h1> You have eddited your item.</h1>
      </div>

      <div class="input">
        <input
          type="url"
          placeholder="image url of the product"
          ref="img_url"
        /><input type="text" placeholder="name" ref="name" />
        <input type="text" placeholder="Description" ref="description" />
        <input type="number" placeholder="price" ref="price" />
        <button @click="edit_item">Edit item</button>
      </div>
    </section>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  methods: {
    edit_item() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/menu`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token_restaurant`)}`,
          },
          method: `PATCH`,
          data: {
            description: this.$refs[`description`][`value`],
            image_url: this.$refs[`img_url`][`value`],
            name: this.$refs[`name`][`value`],
            price: this.$refs[`price`][`value`],
            menu_id: `${this.menu_id}`,
          },
        })
        .then((response) => {
          response;
          this.item_eddited = true;
        })
        .catch((error) => {
          error;
          alert(`Sorry, an error have occured. Try again.`);
        });
    },
  },
  data() {
    return {
      name: undefined,
      description: undefined,
      image_url: undefined,
      price: undefined,
      menu_id: undefined,
      item_eddited: false,
    };
  },
  mounted() {
    let food_object = cookies.get(`food_id`);
    this.name = food_object[`name`];
    this.description = food_object[`description`];
    this.image_url = food_object[`image_url`];
    this.price = food_object[`price`];
    this.menu_id = food_object[`id`];
  },
};
</script>

<style lang="scss" scoped>
section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  margin-top: 50px;
  height: 350px;
}

.food {
  text-align: center;
}

img {
  width: 200px;
  height: 200px;
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
}

.input {
  display: grid;
  height: 60%;
  place-items: center;

  > input {
    height: 30px;
    width: 250px;
  }
}

button {
  margin-top: 20px;
}

.response {
    display: grid;
    place-items: center;
    text-align: center;
}
</style>
