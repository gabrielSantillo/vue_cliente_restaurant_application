<template>
  <div>
    <h2>Sign Up</h2>
    <form>
      <input type="email" placeholder="email" ref="email" />
      <input type="text" placeholder="first name" ref="first_name" />
      <input type="text" placeholder="last name" ref="last_name" />
      <input type="text" placeholder="username" ref="username" />
      <input type="password" placeholder="password" ref="password" />
      <button @click="sign_up_function">Sign up</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
export default {
  methods: {
    /* use gabriel@ca.com
    password 123 */
    sign_up_function() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
          },
          method: `POST`,
          data: {
            email: this.$refs[`email`][`value`],
            first_name: this.$refs[`first_name`][`value`],
            last_name: this.$refs[`last_name`][`value`],
            image_url: `https://media.istockphoto.com/id/619400810/photo/mr-who.webp?s=612x612&w=is&k=20&c=TVND3ti-cQDEE1dkWkaPrNIhv_1vslVWJ-to0g0_Cxw=`,
            username: this.$refs[`username`][`value`],
            password: this.$refs[`password`][`value`],
          },
        })
        .then((response) => {
          response[`data`][`client_id`];
          cookies.set(`sign_in_token`, response[`data`][`token`]) ;
          this.$router.push(`/`);
        })
        .catch((error) => {
          error
          alert(`Sorry, an error have occured. Try again.`);
        });
    },
  },
};
</script>

<style style scoped lang="scss">
form {
  display: grid;
  width: 120px;
  row-gap: 10px;
}
</style>
