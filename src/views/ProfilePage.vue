<template>
  <div>
    <div v-if="log_in_token !== null" class="profile_div">
        <div>
            <edit-profile></edit-profile>
        </div>
        <div>
            <delete-profile></delete-profile>
        </div>
      
      
    </div>

    <div v-if="log_in_token === null">
      <h2>You must log in first.</h2>
      <router-link to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import EditProfile from "@/components/edit-profile/EditProfile.vue";
import DeleteProfile from "@/components/delete-profile/DeleteProfile.vue";
export default {
  components: { EditProfile, DeleteProfile },
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
.profile_div {
    display: grid;
    grid-auto-flow: column;
    place-items: center;
}
</style>
