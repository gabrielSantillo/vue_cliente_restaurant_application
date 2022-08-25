<template>
  <div>
    <div class="header">
      <h1>dashboard</h1>
      <div>
        <button @click="log_out_function">Log Out</button>
      </div>
      
    </div>
    
    <div class="dashboard">
      <add-item></add-item>
      <edit-profile-restaurant></edit-profile-restaurant>
    </div>
    <div v-if="log_in_token === null">
      <h2>It seems you are not logged in. Log up first.</h2>
      <router-link to="/login-restaurant">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import EditProfileRestaurant from "../dashboard-restaurant/EditProfileRestaurant.vue";
import AddItem from "../dashboard-restaurant/AddItem.vue";
export default {
  components: {  EditProfileRestaurant, AddItem },
  data() {
    return {
      log_in_token: null,
    };
  },
  mounted() {
    this.log_in_token = cookies.get(`log_in_token_restaurant`);
  },

  methods: {
    log_out_function() {
      cookies.remove(`log_in_token_restaurant`);
      this.$router.push(`/`);
    }
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
    display: grid;
    grid-auto-flow: column;
    place-items: center;
}

.header {
  display: grid;
  grid-template-columns: 7fr 1fr;
  place-items: center;
}
</style>
