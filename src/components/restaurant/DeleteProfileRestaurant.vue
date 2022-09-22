<template>
  <div>
    <div class="delete_div" v-if="log_in_token !== null">
      <router-link to="/dashboard-restaurant">Dashboard</router-link>
      <h1>Delete your profile</h1>
      <input type="text" placeholder="password" ref="password" />
      <button @click="delete_profile">Delete</button>
    </div>

    <div v-if="restaurant_token === null">
      <h2>You must log in first.</h2>
      <router-link to="/login-restaurant">Log In</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  data() {
    return {
      restaurant_token: null,
    };
  },
  mounted() {
    /* on mounted get the token cookie value */
    this.restaurant_token = cookies.get(`restaurant_token`);
  },

  methods: {
    /* this function deletes the restaurant user profile */
    delete_profile() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/restaurant`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`restaurant_token`)}`,
          },
          method: `DELETE`,
          data: {
            password: this.$refs[`password`][`value`],
          },
        })
        .then((response) => {
          /* on success show a success message, remove from the cookie the sign in token, log in token and pushes the user to the signup page */
          response;
          alert(`You have successfully deleted your profile`);
          cookies.remove(`sign_in_token_restaurant`);
          cookies.remove(`log_in_token_restaurant`);
          this.$router.push(`/signup-restaurant`);
        })
        .catch((error) => {
          error;
          /* on failure show a message */
          alert(`Sorry, an error have occured. Please try again.`);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.delete_div {
  display: grid;
  place-items: center;
  row-gap: 10px;

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
      background: #ad1839;
      color: white;
      padding: 10px;
      width: 100px;
      border-radius: 5px;
    }

    >button:hover {
      background: #bc2848;
    }

    >button:active {
      transform: scale(.95);
    }
}
</style>
