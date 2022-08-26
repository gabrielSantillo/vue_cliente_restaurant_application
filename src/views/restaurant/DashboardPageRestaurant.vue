<template>
  <div>
    <dashboard-restaurant></dashboard-restaurant>
    <div class="dashboard_options">
      <router-link to="/add-items">Add Items</router-link>
      <router-link to="/profile-restaurant">Edit Profile</router-link>
      <router-link to="/delete-restaurant">Delete Profile</router-link>
    </div>
    
  </div>
</template>

<script>
import DashboardRestaurant from "@/components/restaurant/DashboardRestaurant.vue";
export default {
  components: { DashboardRestaurant },
};
</script>

<style scoped>
.dashboard_options {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  margin-top: 50px;
}
</style>
