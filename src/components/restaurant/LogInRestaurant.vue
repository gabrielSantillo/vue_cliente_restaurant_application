<template>
  <div>
    <div class="log_in" v-if="sign_in_token === null">
      <h1>Log In</h1>
      <input type="email" placeholder="email" ref="email" />
      <input type="password" placeholder="password" ref="password" />
      <button @click="log_in_function">Enter</button>
    </div>

    <div v-if="sign_in_token === null">
      <h2>If you don't have an account yet. Sign up first.</h2>
      <router-link to="/signup-restaurant">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  methods: {
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
          cookies.set(`restaurant_id`, `${response[`data`][`restaurantId`]}`);
          cookies.set(`log_in_token_restaurant`, response[`data`][`token`]);
          this.$router.push(`/dashboard-restaurant`);
        })
        .catch((error) => {
          error;
          alert(`Sorry, ana error have occured. Try again.`);
        });
    },
  },

  data() {
    return {
      /** NEED TO CHANGE THIS LOGIC FOR THE USER BE ABLE TO LOG IN */
      sign_in_token: null,
    };
  },
  mounted() {
    this.sign_in_token = cookies.get(`sign_in_token_restaurant`);
  },
};
</script>

<style lang="scss" scoped>
.log_in {
  display: grid;
  place-items: center;
  row-gap: 10px;
  > input {
    width: 15%;
    min-width: 200px;
  }
}
</style>
