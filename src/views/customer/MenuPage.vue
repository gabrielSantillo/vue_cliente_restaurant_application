<template>
  <div>
    <div v-if="log_in_token !== null">
      <div class="header_div">
        <h1>Welcome to the menu</h1>
        <button @click="log_out_function">Log Out</button>
        <router-link to="/profile">Edit Profile</router-link>
        <router-link to="/delete">Delete Profile</router-link>
      </div>
      <div class="menu_items">
        <menu-items></menu-items>
      </div>
    </div>

    <div v-if="log_in_token === null">
      <h2>You must log in first.</h2>
      <router-link to="/">Log In</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import MenuItems from '@/components/customer/MenuItems.vue';
export default {
  components: { MenuItems },
  methods: {
    log_out_function() {
      cookies.remove(`log_in_token`);
      this.$router.push(`/`);
    },
  },
  data() {
    return {
      log_in_token: true,
    };
  },
  mounted() {
    this.log_in_token = cookies.get(`log_in_token`);
  },
};
</script>

<style style scoped lang="scss">
.header_div {
  display: grid;
  grid-auto-flow: column;
  place-items: center;

  > button {
    width: 80px;
    height: 25px;
  }
}
</style>
