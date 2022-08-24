<template>
  <div>
    <div class="delete_div">
      <h1>Delete Profile</h1>
    </div>
    <div v-if="log_in_token === null">
      <h2>You must log in first.</h2>
      <router-link to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import cookies from 'vue-cookies'
export default {
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

<style scoped>
.delete_div {
    display: grid;
    place-items: center;
}
</style>
