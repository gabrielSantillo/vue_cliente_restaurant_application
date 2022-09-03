<template>
  <div>
    <div class="header">
      <div class="row_one">
        <router-link to="/restaurant-order">Orders</router-link>
        <router-link to="/add-items">Add Items</router-link>
        <button @click="log_out_function">Log Out</button>
      </div>
      <div class="row_two">
        <router-link to="/other-restaurants">Restaurants</router-link>
        <router-link to="/profile-restaurant">Profile</router-link>
        <router-link to="/delete-restaurant">Delete Profile</router-link>
      </div>
    </div>

    <div v-if="log_in_token === null">
      <h2>It seems you are not logged in. Log up first.</h2>
      <router-link to="/login-restaurant">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";

export default {
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
    },
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
  grid-template-rows: 1fr 1fr;
  row-gap: 20px;
  height: 100px;
  margin-top: 20px;

  > .row_one {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;

    > button {
      cursor: pointer;
      margin-top: 10px;
      border: none;
      background: #ad1839;
      color: white;
      padding: 10px;
      width: 80px;
      border-radius: 5px;
    }

    > button:hover {
      background: #bc2848;
    }

    > button:active {
      transform: scale(0.95);
    }
  }

  > .row_two {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;
  }
}
</style>
