<template>
  <div class="sign_up">
    <h2>Sign Up as Customer</h2>
    <input type="email" placeholder="email" ref="email" />
    <input type="text" placeholder="first name" ref="first_name" />
    <input type="text" placeholder="last name" ref="last_name" />
    <input type="text" placeholder="username" ref="username" />
    <input type="password" placeholder="password" ref="password" />
    <button @click="sign_up_function">Sign up</button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  methods: {
    
    sign_up_function() {
      /* axios request to sign up the user */
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
          },
          method: `POST`,
          /* sending this data as the user information */
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
          /* on success, set the cookie with the token received from the API response */
          cookies.set(`client_id`, response[`data`][`client_id`]);
          cookies.set(`sign_in_token`, response[`data`][`token`]);
          /* leave the user to the log in page */
          this.$router.push(`/menu`);
        })
        .catch((error) => {
          error;
          /* on failure show the user a message */
          alert(`Sorry, an error have occured. Try again.`);
        });
    },
  },
};
</script>

<style style scoped lang="scss">
.sign_up {
  display: grid;
  place-items: center;
  row-gap: 10px;

  > input {
    min-width: 250px;
    max-width: 350px;
    border: 1.5px solid rgb(207, 207, 207);
    min-height: 20px;
    padding: 5px;
    border-radius: 5px;
  }

      > input::placeholder {
      color: rgb(207, 207, 207);
    }

    >button {
      cursor: pointer;
      margin-top: 10px;
      border: none;
      background: #13542D;
      color: white;
      padding: 10px;
      width: 100px;
      border-radius: 5px;
    }

    >button:hover {
      background: #196838;
    }

    >button:active {
      transform: scale(.95);
    }
}
</style>
