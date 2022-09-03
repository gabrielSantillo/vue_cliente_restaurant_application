<template>
  <div>
    <dashboard-restaurant></dashboard-restaurant>

    <display-restaurant-info></display-restaurant-info>

    <display-restaurant-items></display-restaurant-items>
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

<style scoped></style>
