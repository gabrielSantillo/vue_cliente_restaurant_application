<template>
  <div class="container">
    <h1 class="title">Add Item</h1>
    <section>
      <input type="text" placeholder="Description" ref="description" />
      <input type="url" placeholder="image url of the product" ref="img_url" />
      <input type="text" placeholder="name" ref="name" />
      <input type="number" placeholder="price" ref="price" />
      <div>
        <button @click="add_item">Add item</button>
      </div>
    </section>

    <section class="home">
      <router-link to="/dashboard-restaurant">Home</router-link>
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
          alert(
            `You have added ${
              this.$refs[`name`][`value`]
            } to your list of items.`
          );
          location.reload();
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

<style lang="scss" scoped>
.container {
  display: grid;
  place-items: center;
}

section {
  display: grid;
  place-items: center;
  row-gap: 10px;
  > input {
    width: 15%;
    min-width: 200px;
  }
}

.home {
  margin-top: 50px;
}
</style>
