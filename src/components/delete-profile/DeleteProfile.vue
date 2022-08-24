<template>
  <div>
    <div class="delete_div">
      <h1>Delete your profile</h1>
      <input type="text" placeholder="password" ref="password" />
      <button @click="delete_profile">Delete</button>
    </div>
    <div v-if="log_in_token === null">
      <h2>You must log in first.</h2>
      <router-link to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios"
export default {
  mounted() {
    this.log_in_token = cookies.get(`log_in_token`);
  },

  methods: {
    delete_profile() {
        axios.request({
            url: `https://innotechfoodie.ml/api/client`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token`)}`,
          },
          method: `DELETE`,
          data: {
            password: this.$refs[`password`][`value`],
          }, 
        }).then((response) => {
            response
        }).catch((error) => {
            error
        })
    }
  },
};
</script>

<style scoped>
.delete_div {
  display: grid;
  row-gap: 10px;
}
</style>
