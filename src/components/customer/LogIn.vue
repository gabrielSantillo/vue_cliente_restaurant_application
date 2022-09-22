<template>
  <div>
    <div class="log_in">
      <h1>Log In</h1>
      <input type="email" placeholder="email" ref="email" />
      <input type="password" placeholder="password" ref="password" />
      <button @click="log_in_function">Enter</button>
    </div>

    <div class="sign_up" v-if="customer_token === null">
      <h2>If you don't have an account yet, sign up first.</h2>
      <router-link to="/signup">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";

export default {
  data() {
    return {
      /* setting the variable sign_in_token to null */
      customer_token: null,
    };
  },
  mounted() {
    /* on mounted get the value of the cooke sign_in_token */
    this.customer_token = cookies.get(`customer_token`);
  },
  methods: {
    /* axios request to the client API to send log in information*/
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
          /* on success set the cookie value to the token received from the API */
          cookies.set(`client_id`, response[`data`][`client_id`]);
          cookies.set(`customer_token`, response[`data`][`token`]) ;
          /* leave the user to the menu page */
          this.$router.push(`/menu`);
        })
        .catch((error) => {
          error
          /* on failure show a message */
          alert(`Sorry, ana error have occured. Try again.`);
        });
    },
  },
};
</script>

<style style scoped lang="scss">
.log_in {
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

.sign_up {
  margin-top: 50px;
  display: grid;
  place-items: center;
  text-align: center;
}
</style>
