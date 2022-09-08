<template>
  <div>
    <div class="container">
      <router-link to="/dashboard-restaurant">Dashboard</router-link>
      <h1 class="title">Add Item</h1>
      <input type="text" placeholder="Description" ref="description" />
      <input type="url" placeholder="image url of the product" ref="img_url" />
      <input type="text" placeholder="name" ref="name" />
      <input type="number" placeholder="price" ref="price" />
      <button @click="add_item">Add item</button>
    </div>

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
    /* this function add restaurant items to the menu API */
    add_item() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/menu`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token_restaurant`)}`,
          },
          method: `POST`,
          /* data being sent */
          data: {
            description: this.$refs[`description`][`value`],
            image_url: this.$refs[`img_url`][`value`],
            name: this.$refs[`name`][`value`],
            price: this.$refs[`price`][`value`],
          },
        })
        .then((response) => {
          /* on success show the user a message of success and reload the page */
          response;
          alert(
            `You have added ${
              this.$refs[`name`][`value`]
            } to your list of items.`
          );
          location.reload();
        })
        .catch((error) => {
          /* on failure show a message */
          error;
          alert(`Sorry, an error have occured. Try again.`);
        });
    },
  },

  mounted() {
    /* on mounted get the token cookie value */
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
  row-gap: 10px;

  >img {
    width: 50px;
    margin-bottom: 30px;
    justify-self: start;
  }

  > input {
    min-width: 250px;
    max-width: 350px;
    border: 1.5px solid rgb(207, 207, 207);
    min-height: 20px;
    padding: 5px;
    border-radius: 5px;
  }

      > input::placeholder {
      color: rgb(207, 207, 207);
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
</style>
