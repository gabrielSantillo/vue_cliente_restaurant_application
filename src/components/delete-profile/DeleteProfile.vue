<template>
    <div>
         <div class="delete_div">
        <h1>Delete your profile</h1>
        <input type="text" placeholder="password" ref="pasword">
        <button @click="delete_profile">Delete</button>
    </div>
    <div v-if="log_in_token === null">
      <h2>You must log in first.</h2>
      <router-link to="/login">Log In</router-link>
    </div>
    </div>
</template>

<script>
import cookies from "vue-cookies"
    export default {
          mounted() {
                this.log_in_token = cookies.get(`log_in_token`);
  },
    }
</script>

<style scoped>

</style>