<template>
  <div>
    <div>
      <h1>Order Status</h1>
      <router-link to="/menu">Menu</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
export default {
  mounted() {
    axios
      .request({
        url: `https://innotechfoodie.ml/api/client-order`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
          token: `${cookies.get(`log_in_token`)}`,
        },
      })
      .then((response) => {
            response
      })
      .catch((error) => {
        error;
      });
  },
};
</script>

<style lang="scss" scoped></style>
