<template>
  <div>
    <div v-if="log_in_token !== null">
      <h1>Welcome to the menu</h1>
      <button @click="log_out_function">Log Out</button>
    </div>
    <div v-if="log_in_token === null">
      <h2>You must log in first.</h2>
      <router-link to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
export default {
  methods: {
    log_out_function() {
      cookies.remove(`log_in_token`);
      this.$router.push(`/login`);
    },
  },
  data() {
    return {
      log_in_token: null,
    };
  },
  mounted() {
    this.log_in_token = cookies.get(`log_in_token`);
  },
};
</script>

<style scoped></style>
