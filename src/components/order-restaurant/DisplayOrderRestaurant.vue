<template>
  <div>
    <div class="header">
      <h1>Orders</h1>
      <router-link to="dashboard-restaurant">Dashboard</router-link>
    </div>

    <div class="red_line"></div>

    <confirm-button></confirm-button>

    <div class="green_line"></div>

    <complete-button></complete-button>

    <div class="gray_line"></div>

    <order-history></order-history>
  </div>
</template>

<script>
import ConfirmButton from "./DisplayOrdersToBeConfirmed.vue";
import CompleteButton from "./DisplayOrdersToBeCompleted.vue";
import OrderHistory from "./OrderHistory.vue";
export default {
  components: { ConfirmButton, CompleteButton, OrderHistory },
};
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
}

.red_line {
  width: 100%;
  background: #ad1839;
  height: 2px;
}

.green_line {
  width: 100%;
  background: #409c1f;
  height: 2px;
}

.gray_line {
  width: 100%;
  background: gray;
  height: 2px;
}
</style>
