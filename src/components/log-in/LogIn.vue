<template>
  <div>
    <div class="log_in">
      <input type="email" placeholder="email" ref="email" />
      <input type="password" placeholder="password" ref="password" />
      <button @click="log_in_function">Enter</button>
    </div>

    <h2>If you are not sign up</h2>
    <router-link to="/">Sign Up</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    /* use gabriel@gabriel.com
    password 123 */
    log_in_function() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client-login`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
          },
          method: `POST`,
          data: {
            email: this.$refs[`email`][`value`],
            password: this.$refs[`password`][`value`],
          },
        })
        .then((response) => {
          response[`data`][`client_id`];
          response[`data`][`token`];
          this.$router.push(`/menu`);
        })
        .catch((error) => {
          error;
        });
    },
  },
};
</script>

<style style scoped lang="scss">
.log_in {
  display: grid;
  width: 120px;
  row-gap: 10px;
}
</style>
