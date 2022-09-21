<template>
  <div>
    <div v-if="log_in_token !== null || sign_in_token !== null">
      <edit-profile></edit-profile>
    </div>

    <div v-if="log_in_token === null && sign_in_token === null">
      <h2>You must log in first.</h2>
      <router-link to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";

import EditProfile from "@/components/customer/EditProfile.vue";
export default {
  components: { EditProfile },
  data() {
    return {
      log_in_token: null,
      sign_in_token: null
    };
  },

  mounted() {
    this.log_in_token = cookies.get(`log_in_token`);
    this.sign_in_token = cookies.get(`sign_in_token`);
  },
};
</script>

<style scoped></style>
