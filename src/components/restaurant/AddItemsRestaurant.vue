<template>
  <div>
    <h1>Add Item</h1>
    <section>
      <input type="text" placeholder="Description" ref="description" />
      <input type="url" placeholder="image url of the product" ref="img_url" />
      <input type="text" placeholder="name" ref="name" />
      <input type="number" placeholder="price" ref="price" />
      <button @click="add_item">Add item</button>
    </section>

    <div v-if="log_in_token === null">
      <h2>It seems you are not logged in. Log up first.</h2>
      <router-link to="/login-restaurant">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    add_item() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/menu`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token_restaurant`)}`,
          },
          method: `POST`,
          data: {
            description: this.$refs[`description`][`value`],
            image_url: this.$refs[`img_url`][`value`],
            name: this.$refs[`name`][`value`],
            price: this.$refs[`price`][`value`],
          },
        })
        .then((response) => {
          response;
          alert(`You have added ${this.$refs[`name`]} to your list of items.`);
        })
        .catch((error) => {
          error;
          alert(`Sorry, an error have occured. Try again.`);
        });
    },
  },

  mounted() {
    this.log_in_token = cookies.get(`log_in_token_restaurant`);
  },

  data() {
    return {
      log_in_token: null,
    };
  },
};
</script>

<style lang="scss" scoped></style>
