<template>
  <div>
    <div class="delete_div" v-if="log_in_token !== null">
      <h1>Delete your profile</h1>
      <input type="text" placeholder="password" ref="password" />
      <button @click="delete_profile">Delete</button>
    </div>

    

    <div v-if="log_in_token_restaurant === null">
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
      log_in_token_restaurant: null,
    };
  },
  mounted() {
    this.log_in_token_restaurant = cookies.get(`log_in_token_restaurant`);
  },

  methods: {
    delete_profile() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/restaurant`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token_restaurant`)}`,
          },
          method: `DELETE`,
          data: {
            password: this.$refs[`password`][`value`],
          },
        })
        .then((response) => {
          response;
          alert(`You have successfully deleted your profile`);
          cookies.remove(`sign_in_token_restaurant`);
          cookies.remove(`log_in_token_restaurant`);
          this.$router.push(`/signup-restaurant`);
        })
        .catch((error) => {
          error;
          alert(`Sorry, an error have occured. Please try again.`);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.delete_div {
  display: grid;
  row-gap: 10px;

  > input {
    width: 15%;
    min-width: 200px;
  }

  >button {
    width: 10%;
  }
}
</style>
