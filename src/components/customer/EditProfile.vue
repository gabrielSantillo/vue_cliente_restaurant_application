<template>
  <div>
    <div class="profile_div" v-if="profile_updated === false">
      <router-link to="/menu">Menu</router-link>
      <h1>Edit your profile</h1>
      
      <input type="email" placeholder="email" ref="email" />
      <input type="text" placeholder="first name" ref="first_name" />
      <input type="text" placeholder="last name" ref="last_name" />
      <input type="text" placeholder="username" ref="username" />
      <input type="password" placeholder="password" ref="password" />
      <button @click="edit_profile_function">Edit</button>
    </div>

    <div v-else>
        <h1>Back to the Menu</h1>
        <router-link to="/menu">Menu</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {

  mounted () {
    axios.request({
      
    });
  },
    data() {
        return {
          /* setting profile_updated to false */
            profile_updated: false
        }
    },
  methods: {
    back_to_menu() {
      /* function that leave the user to the menu page */
      this.$rooter.push(`menu`)
    },
    edit_profile_function() {
    /* axios request to the client API */
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token`)}`,
          },
          method: `PATCH`,
          /* sending this data to update */
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
          /* on success show a message and set the variable profile_updated to true */
          response;
          alert(`You have updated your profile information.`);
          this.profile_updated = true;
        })
        .catch((error) => {
          /* on failure show a message */
          error;
          alert(`Sorry, an error have occured. Please, try again.`);
        });
    },
  },
};
</script>

<style style scoped lang="scss">
.profile_div {
  display: grid;
  place-items: center;
  row-gap: 10px;

  >img {
    width: 50px;
    margin-bottom: 30px;
    justify-self: start;
  }

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
