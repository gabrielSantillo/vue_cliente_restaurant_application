<template>
  <div>
    <button>Log Out</button>
  </div>
</template>

<script>
import cookies from "vue-cookies"
export default {
  methods: {
    log_out_function() {
      cookies.remove(`log_in_token`);
      this.$router.push(`/login`);
    },
  },
};
</script>

<style scoped></style>
