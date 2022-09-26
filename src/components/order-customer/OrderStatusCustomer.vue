<template>
  <div>
    <div class="header">
      <h1>Order Status</h1>
      <router-link to="/menu">Menu</router-link>
    </div>

    <recent-orders></recent-orders>

    <old-orders></old-orders>
  </div>
</template>

<script>
import RecentOrders from "./RecentOrders.vue";
import OldOrders from "./OldOrders.vue";
export default {
  components: { RecentOrders, OldOrders },
};
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 5fr 1fr;
  place-items: center;
}

.line {
  width: 100%;
  height: 2px;
  background: black;
  display: block;
}
</style>
