<template>
  <div>
    <div class="delete_div" v-if="log_in_token !== null">
      <router-link to="/menu">Menu</router-link>
      <h1>Delete your profile</h1>
      <input type="text" placeholder="password" ref="password" />
      <button @click="delete_profile">Delete</button>
    </div>
    <div v-if="log_in_token === null">
      <h2>You must log in first.</h2>
      <router-link to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios"
export default {

  data() {
    return {
      /* setting log_in_token to null */
      log_in_token: null
    }
  },
  mounted() {
    /* on mounted getting the cookie value of log_in_token */
    this.log_in_token = cookies.get(`log_in_token`);
  },

  methods: {
    delete_profile() {
      /* axios request to the client API */
        axios.request({
            url: `https://innotechfoodie.ml/api/client`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token`)}`,
          },
          method: `DELETE`,
          data: {
            password: this.$refs[`password`][`value`],
          }, 
        }).then((response) => {
          /* at response alert to the user a success message */
            response
            alert(`You have successfully deleted your profile`);
            /* remove the sign in token */
            cookies.remove(`sign_in_token`);
            /* remove the log in token */
            cookies.remove(`log_in_token`);
            /* leave the user to sign up page */
            this.$router.push(`/signup`);
        }).catch((error) => {
            error
            /* if error show a message */
            alert(`Sorry, an error have occured. Please try again.`)
        })
    }
  },
};
</script>

<style style scoped lang="scss">
.delete_div {
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
