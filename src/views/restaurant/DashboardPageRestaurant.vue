<template>
  <div>
    <dashboard-restaurant></dashboard-restaurant>
    <div class="dashboard_options">
      <router-link to="/restaurant-order">Orders</router-link>
      <router-link to="/add-items">Add Items</router-link>
      <router-link to="/profile-restaurant">Edit Profile</router-link>
      <router-link to="/delete-restaurant">Delete Profile</router-link>
    </div>

    <section>
      <div class="restaurant_profile">
        <display-restaurant-info></display-restaurant-info>
      </div>

      <div class="restaurant_items">
        <display-restaurant-items></display-restaurant-items>
      </div>
    </section>
  </div>
</template>

<script>
import DashboardRestaurant from "@/components/restaurant/DashboardRestaurant.vue";
import DisplayRestaurantInfo from "@/components/display-restaurant/DisplayRestaurantInfo.vue";
import DisplayRestaurantItems from "@/components/display-restaurant/DisplayRestaurantItems.vue";
export default {
  components: {
    DashboardRestaurant,
    DisplayRestaurantInfo,
    DisplayRestaurantItems,
  },
};
</script>

<style scoped>
.dashboard_options {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  margin-top: 50px;
}

section {
  margin-top: 100px;
  place-items: center;
  display: grid;
}
</style>
