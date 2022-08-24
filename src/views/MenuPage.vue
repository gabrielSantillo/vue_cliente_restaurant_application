<template>
  <div>
    <div v-if="log_in_token !== null" class="menu_div">
      <h1>Welcome to the menu</h1>
      <log-out></log-out>
      <button @click="leave_to_profile">Profile</button>
    </div>
    <div v-if="log_in_token === null">
      <h2>You must log in first.</h2>
      <router-link to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import LogOut from '@/components/log-out/LogOut.vue';
export default {
  components: { LogOut },
  methods: {
    leave_to_profile() {
        this.$router.push(`/profile`);
    }
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

<style style scoped lang="scss">
.menu_div {
  display: grid;
  grid-auto-flow: column;
  place-items: center;

  > button {
    width: 80px;
    height: 25px;
  }
}
</style>
