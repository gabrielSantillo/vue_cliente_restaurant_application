<template>
  <div>
    <button @click="delete_item">Delete Item</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    delete_item() {
      axios.request({
        url: `https://innotechfoodie.ml/api/menu`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
        },
        method: `DELETE`,
          data: {
            
          },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
