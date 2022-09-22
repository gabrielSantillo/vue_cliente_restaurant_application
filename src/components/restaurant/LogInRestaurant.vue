<template>
  <div>
    <div class="log_in" v-if="sign_in_token === null">
      <h1>Log In</h1>
      <input type="email" placeholder="email" ref="email" />
      <input type="password" placeholder="password" ref="password" />
      <button @click="log_in_function">Enter</button>
    </div>

    <div class="sign_up" v-if="sign_in_token === null">
      <h2>If you don't have an account yet, sign up first.</h2>
      <router-link to="/signup-restaurant">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  methods: {
    /* this function log in the user */
    log_in_function() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/restaurant-login`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
          },
          method: `POST`,
          data: {
            email: this.$refs[`email`][`value`],
            password: this.$refs[`password`][`value`],
          },
        })
        .then((response) => {
          /* on success set the restaurant id as a cookie */
          cookies.set(`restaurant_id`, `${response[`data`][`restaurantId`]}`);
          /* set the restaurant log in token as a cookie */
          cookies.set(`restaurant_token`, response[`data`][`token`]);
          /* pushes the user to the dashboard page */
          this.$router.push(`/dashboard-restaurant`);
        })
        .catch((error) => {
          error;
          /*on failure show a message */
          alert(`Sorry, ana error have occured. Try again.`);
        });
    },
  },

  data() {
    return {
      sign_in_token: null,
    };
  },
  mounted() {
    /* on mounted get the sign in token cookie value */
    this.sign_in_token = cookies.get(`restaurant_token`);
  },
};
</script>

<style lang="scss" scoped>
.log_in {
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

  > button {
    cursor: pointer;
    margin-top: 10px;
    border: none;
    background: #ad1839;
    color: white;
    padding: 10px;
    width: 100px;
    border-radius: 5px;
  }

  > button:hover {
    background: #bc2848;
  }

  > button:active {
    transform: scale(0.95);
  }
}

.sign_up {
  margin-top: 50px;
  display: grid;
  place-items: center;
  text-align: center;
}
</style>
